const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const invoices = sequelize.define(
    'invoices',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      invoice_number: {
        type: DataTypes.TEXT,
      },

      amount: {
        type: DataTypes.DECIMAL,
      },

      issue_date: {
        type: DataTypes.DATE,
      },

      status: {
        type: DataTypes.ENUM,

        values: ['Draft', 'Sent', 'Paid', 'Overdue'],
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  invoices.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.invoices.belongsTo(db.jobs, {
      as: 'job',
      foreignKey: {
        name: 'jobId',
      },
      constraints: false,
    });

    db.invoices.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.invoices.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return invoices;
};
