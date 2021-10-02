'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // define the association here
    /*
    The Post.hasmany(Comment) association means
    that a One-To-Many relationship exists between Post and Comment,
    with the FOREIGN KEY being defined in the target model (Comment)
    */
    static associate(models) {
      models.Post.hasMany(models.Comment);
      models.Post.hasMany(models.Like);

      models.Post.belongsTo(models.User, {
        onDelete: 'cascade'
      });
    }
    /*
    To create a One-To-Many relationship
    the hasmany and belongsTo associations are user together
    */
   /*
   The Post.belongsTo(User) association means
   that a One-To-One relationship exists between Post and User,
   with the FOREIGN KEY being defined in the source model (Post)
   */
  };
  Post.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    media: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      validate: {
        isInt: true,
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Post'
  });
  return Post;
};