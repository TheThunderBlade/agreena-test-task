'use strict';
import { Model } from 'sequelize';

export interface UserAttributes {
  UserId: number,
  UserName: string,
  Email: string,
  Password: string,
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    UserId!: number;
    UserName!: string;
    Email!: string;
    Password!: string;
    static associate(models: any) {
      User.hasOne(models.UserSession, {
          as: 'userSessions',
          foreignKey: 'UserId',
          sourceKey: 'UserId',
          onDelete: 'cascade',
      });

      User.hasMany(models.CarbonCertificates, {
          as: 'carbonCertificates',
          foreignKey: 'UserId',
          sourceKey: 'UserId',
          onDelete: 'cascade',
      });
    }
  }
  User.init({
      UserId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      UserName: { type: DataTypes.STRING, unique: true, allowNull: false },
      Email: { type: DataTypes.STRING, unique: true, allowNull: false },
      Password: { type: DataTypes.STRING, allowNull: false },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
