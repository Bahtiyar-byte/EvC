const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const jobs = sequelize.define(
    'jobs',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      status: {
        type: DataTypes.ENUM,

        values: ['Initiation', 'InProgress', 'Completed'],
      },

      task_assignments: {
        type: DataTypes.TEXT,
      },

      progress_updates: {
        type: DataTypes.TEXT,
      },

      communication_logs: {
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

  jobs.associate = (db) => {
    db.jobs.belongsToMany(db.users, {
      as: 'assigned_users',
      foreignKey: {
        name: 'jobs_assigned_usersId',
      },
      constraints: false,
      through: 'jobsAssigned_usersUsers',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.jobs.hasMany(db.documents, {
      as: 'documents_job',
      foreignKey: {
        name: 'jobId',
      },
      constraints: false,
    });

    db.jobs.hasMany(db.estimates, {
      as: 'estimates_job',
      foreignKey: {
        name: 'jobId',
      },
      constraints: false,
    });

    db.jobs.hasMany(db.invoices, {
      as: 'invoices_job',
      foreignKey: {
        name: 'jobId',
      },
      constraints: false,
    });

    //end loop

    db.jobs.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.jobs.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return jobs;
};
