const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class JobsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const jobs = await db.jobs.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        status: data.status || null,
        task_assignments: data.task_assignments || null,
        progress_updates: data.progress_updates || null,
        communication_logs: data.communication_logs || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await jobs.setAssigned_users(data.assigned_users || [], {
      transaction,
    });

    return jobs;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const jobsData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      status: item.status || null,
      task_assignments: item.task_assignments || null,
      progress_updates: item.progress_updates || null,
      communication_logs: item.communication_logs || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const jobs = await db.jobs.bulkCreate(jobsData, { transaction });

    // For each item created, replace relation files

    return jobs;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const jobs = await db.jobs.findByPk(id, {}, { transaction });

    await jobs.update(
      {
        title: data.title || null,
        status: data.status || null,
        task_assignments: data.task_assignments || null,
        progress_updates: data.progress_updates || null,
        communication_logs: data.communication_logs || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await jobs.setAssigned_users(data.assigned_users || [], {
      transaction,
    });

    return jobs;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const jobs = await db.jobs.findByPk(id, options);

    await jobs.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await jobs.destroy({
      transaction,
    });

    return jobs;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const jobs = await db.jobs.findOne({ where }, { transaction });

    if (!jobs) {
      return jobs;
    }

    const output = jobs.get({ plain: true });

    output.documents_job = await jobs.getDocuments_job({
      transaction,
    });

    output.estimates_job = await jobs.getEstimates_job({
      transaction,
    });

    output.invoices_job = await jobs.getInvoices_job({
      transaction,
    });

    output.assigned_users = await jobs.getAssigned_users({
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
        model: db.users,
        as: 'assigned_users',
        through: filter.assigned_users
          ? {
              where: {
                [Op.or]: filter.assigned_users.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.assigned_users ? true : null,
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('jobs', 'title', filter.title),
        };
      }

      if (filter.task_assignments) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'jobs',
            'task_assignments',
            filter.task_assignments,
          ),
        };
      }

      if (filter.progress_updates) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'jobs',
            'progress_updates',
            filter.progress_updates,
          ),
        };
      }

      if (filter.communication_logs) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'jobs',
            'communication_logs',
            filter.communication_logs,
          ),
        };
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

      if (filter.status) {
        where = {
          ...where,
          status: filter.status,
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
          count: await db.jobs.count({
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
      : await db.jobs.findAndCountAll({
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
          Utils.ilike('jobs', 'title', query),
        ],
      };
    }

    const records = await db.jobs.findAll({
      attributes: ['id', 'title'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['title', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }
};
