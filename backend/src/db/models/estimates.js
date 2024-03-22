const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const estimates = sequelize.define(
    'estimates',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      estimate_number: {
        type: DataTypes.TEXT,
      },

      material_cost: {
        type: DataTypes.DECIMAL,
      },

      labor_cost: {
        type: DataTypes.DECIMAL,
      },

      total_cost: {
        type: DataTypes.DECIMAL,
      },

      profit_margin: {
        type: DataTypes.DECIMAL,
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

  estimates.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.estimates.belongsTo(db.jobs, {
      as: 'job',
      foreignKey: {
        name: 'jobId',
      },
      constraints: false,
    });

    db.estimates.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.estimates.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return estimates;
};
