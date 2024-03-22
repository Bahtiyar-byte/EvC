const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class DocumentsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const documents = await db.documents.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await documents.setJob(data.job || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.documents.getTableName(),
        belongsToColumn: 'file',
        belongsToId: documents.id,
      },
      data.file,
      options,
    );

    return documents;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const documentsData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const documents = await db.documents.bulkCreate(documentsData, {
      transaction,
    });

    // For each item created, replace relation files

    for (let i = 0; i < documents.length; i++) {
      await FileDBApi.replaceRelationFiles(
        {
          belongsTo: db.documents.getTableName(),
          belongsToColumn: 'file',
          belongsToId: documents[i].id,
        },
        data[i].file,
        options,
      );
    }

    return documents;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const documents = await db.documents.findByPk(id, {}, { transaction });

    await documents.update(
      {
        title: data.title || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await documents.setJob(data.job || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.documents.getTableName(),
        belongsToColumn: 'file',
        belongsToId: documents.id,
      },
      data.file,
      options,
    );

    return documents;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const documents = await db.documents.findByPk(id, options);

    await documents.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await documents.destroy({
      transaction,
    });

    return documents;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const documents = await db.documents.findOne({ where }, { transaction });

    if (!documents) {
      return documents;
    }

    const output = documents.get({ plain: true });

    output.file = await documents.getFile({
      transaction,
    });

    output.job = await documents.getJob({
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

      {
        model: db.file,
        as: 'file',
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
          [Op.and]: Utils.ilike('documents', 'title', filter.title),
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
          count: await db.documents.count({
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
      : await db.documents.findAndCountAll({
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
          Utils.ilike('documents', 'title', query),
        ],
      };
    }

    const records = await db.documents.findAll({
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
