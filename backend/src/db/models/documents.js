const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const documents = sequelize.define(
    'documents',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
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

  documents.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.documents.belongsTo(db.jobs, {
      as: 'job',
      foreignKey: {
        name: 'jobId',
      },
      constraints: false,
    });

    db.documents.hasMany(db.file, {
      as: 'file',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.documents.getTableName(),
        belongsToColumn: 'file',
      },
    });

    db.documents.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.documents.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return documents;
};
