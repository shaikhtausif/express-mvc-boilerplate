'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    role_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },

    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },

    phone_number: {
      type: DataTypes.STRING(45),
      unique: true
    },

    password: {
      type: DataTypes.STRING(145),
      allowNull: true
    },

    token: {
      type: DataTypes.STRING(145),
      allowNull: true
    },

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    is_email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    is_phone_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },

    updated_by: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },{
    timestamps: false,
    freezeTableName: true
  });
  User.associate = function(models) {
    User.hasOne(models.user, {foreignKey: 'created_by'});  
    User.hasOne(models.user, {foreignKey: 'updated_by'});  
  };

  return User;
};