const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class EstimatesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const estimates = await db.estimates.create(
      {
        id: data.id || undefined,

        estimate_number: data.estimate_number || null,
        material_cost: data.material_cost || null,
        labor_cost: data.labor_cost || null,
        total_cost: data.total_cost || null,
        profit_margin: data.profit_margin || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await estimates.setJob(data.job || null, {
      transaction,
    });

    return estimates;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const estimatesData = data.map((item, index) => ({
      id: item.id || undefined,

      estimate_number: item.estimate_number || null,
      material_cost: item.material_cost || null,
      labor_cost: item.labor_cost || null,
      total_cost: item.total_cost || null,
      profit_margin: item.profit_margin || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const estimates = await db.estimates.bulkCreate(estimatesData, {
      transaction,
    });

    // For each item created, replace relation files

    return estimates;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const estimates = await db.estimates.findByPk(id, {}, { transaction });

    await estimates.update(
      {
        estimate_number: data.estimate_number || null,
        material_cost: data.material_cost || null,
        labor_cost: data.labor_cost || null,
        total_cost: data.total_cost || null,
        profit_margin: data.profit_margin || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await estimates.setJob(data.job || null, {
      transaction,
    });

    return estimates;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const estimates = await db.estimates.findByPk(id, options);

    await estimates.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await estimates.destroy({
      transaction,
    });

    return estimates;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const estimates = await db.estimates.findOne({ where }, { transaction });

    if (!estimates) {
      return estimates;
    }

    const output = estimates.get({ plain: true });

    output.job = await estimates.getJob({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.jobs,
        as: 'job',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.estimate_number) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'estimates',
            'estimate_number',
            filter.estimate_number,
          ),
        };
      }

      if (filter.material_costRange) {
        const [start, end] = filter.material_costRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            material_cost: {
              ...where.material_cost,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            material_cost: {
              ...where.material_cost,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.labor_costRange) {
        const [start, end] = filter.labor_costRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            labor_cost: {
              ...where.labor_cost,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            labor_cost: {
              ...where.labor_cost,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.total_costRange) {
        const [start, end] = filter.total_costRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            total_cost: {
              ...where.total_cost,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            total_cost: {
              ...where.total_cost,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.profit_marginRange) {
        const [start, end] = filter.profit_marginRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            profit_margin: {
              ...where.profit_margin,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            profit_margin: {
              ...where.profit_margin,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.job) {
        var listItems = filter.job.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          jobId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.estimates.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.estimates.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('estimates', 'estimate_number', query),
        ],
      };
    }

    const records = await db.estimates.findAll({
      attributes: ['id', 'estimate_number'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['estimate_number', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.estimate_number,
    }));
  }
};
