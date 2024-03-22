const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const appointments = sequelize.define(
    'appointments',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      start_time: {
        type: DataTypes.DATE,
      },

      end_time: {
        type: DataTypes.DATE,
      },

      description: {
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

  appointments.associate = (db) => {
    db.appointments.belongsToMany(db.users, {
      as: 'attendees',
      foreignKey: {
        name: 'appointments_attendeesId',
      },
      constraints: false,
      through: 'appointmentsAttendeesUsers',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.appointments.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.appointments.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return appointments;
};
