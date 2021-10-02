'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // define association here
    /*
    remember that : 
    User hasMany Post, Comment, Like
    Post hasMany Comment, Like
    and
    Comment belongsTo User and Post
    */
   /*
   The Comment.belongsTo(User) association means
   that a One-To-One relationship exists between Comment and User,
   with the FOREIGN KEY being defined in the source model (Comment)
   */
    static associate(models) {
      models.Comment.belongsTo(models.User, {
        onDelete: 'CASCADE'
      })
      models.Comment.belongsTo(models.Post, {
        onDelete: 'CASCADE'
      })
    }
  };
  Comment.init({
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
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
    },
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      validate: {
        isInt: true,
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};