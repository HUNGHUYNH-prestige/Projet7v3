'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // define association here
    /*
    The User.hasmany(Post) association means
    that a One-To-Many relationship exists between User and Post,
    with the FOREIGN KEY being defined in the target model (Post)
    */
    static associate(models) {
      models.User.hasMany(models.Post);
      models.User.hasMany(models.Comment);
      models.User.hasMany(models.Like);
    }
    /*
    To create a One-To-Many relationship,
    the hasmany and belongsTo associations are used together
    with Post, Comment and Like
    */
  };
  User.init({
    firstname: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        is: /^[^-\s][a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        notEmpty: true
      }
    },
    lastname: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        is: /^[^-\s][a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        notEmpty: true
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    profilePicture: {
      type: DataTypes.STRING
    },
    department: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};