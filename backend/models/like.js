'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // define association  here
    /*
    remember that : 
    User hasMany Post, Comment, Like
    Post hasMany Comment, Like
    and
    Like belongsTo User and Post
    */
   /*
   The Like.belongsTo(User) association means
   that a One-To-One relationship exists between Like and User,
   with the FOREIGN KEY being defined in the source model (Like)
   */
    static associate(models) {
      // define association here
      models.Like.belongsTo(models.User, {
        onDelete: 'cascade'
      })
      models.Like.belongsTo(models.Post, {
        onDelete: 'cascade'
      })
    }
  };
  Like.init({
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
    modelName: 'Like'
  });
  return Like;
};