const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ContactsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const contacts = await db.contacts.create(
      {
        id: data.id || undefined,

        first_name: data.first_name || null,
        last_name: data.last_name || null,
        phone_number: data.phone_number || null,
        email: data.email || null,
        category: data.category || null,
        interaction_history: data.interaction_history || null,
        project_notes: data.project_notes || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return contacts;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const contactsData = data.map((item, index) => ({
      id: item.id || undefined,

      first_name: item.first_name || null,
      last_name: item.last_name || null,
      phone_number: item.phone_number || null,
      email: item.email || null,
      category: item.category || null,
      interaction_history: item.interaction_history || null,
      project_notes: item.project_notes || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const contacts = await db.contacts.bulkCreate(contactsData, {
      transaction,
    });

    // For each item created, replace relation files

    return contacts;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const contacts = await db.contacts.findByPk(id, {}, { transaction });

    await contacts.update(
      {
        first_name: data.first_name || null,
        last_name: data.last_name || null,
        phone_number: data.phone_number || null,
        email: data.email || null,
        category: data.category || null,
        interaction_history: data.interaction_history || null,
        project_notes: data.project_notes || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return contacts;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const contacts = await db.contacts.findByPk(id, options);

    await contacts.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await contacts.destroy({
      transaction,
    });

    return contacts;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const contacts = await db.contacts.findOne({ where }, { transaction });

    if (!contacts) {
      return contacts;
    }

    const output = contacts.get({ plain: true });

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
    let include = [];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.first_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('contacts', 'first_name', filter.first_name),
        };
      }

      if (filter.last_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('contacts', 'last_name', filter.last_name),
        };
      }

      if (filter.phone_number) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'contacts',
            'phone_number',
            filter.phone_number,
          ),
        };
      }

      if (filter.email) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('contacts', 'email', filter.email),
        };
      }

      if (filter.interaction_history) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'contacts',
            'interaction_history',
            filter.interaction_history,
          ),
        };
      }

      if (filter.project_notes) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'contacts',
            'project_notes',
            filter.project_notes,
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

      if (filter.category) {
        where = {
          ...where,
          category: filter.category,
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
          count: await db.contacts.count({
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
      : await db.contacts.findAndCountAll({
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
          Utils.ilike('contacts', 'first_name', query),
        ],
      };
    }

    const records = await db.contacts.findAll({
      attributes: ['id', 'first_name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['first_name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.first_name,
    }));
  }
};
