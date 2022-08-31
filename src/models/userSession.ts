'use strict';
import { Model } from 'sequelize';

export interface UserSessionAttributes {
    TokenId: number,
    RefreshToken: string,
    UserId: number,
}

module.exports = (sequelize: any, DataTypes: any) => {
    class UserSession extends Model<UserSessionAttributes> implements UserSessionAttributes{
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        TokenId!: number;
        RefreshToken!: string;
        UserId!: number;
        static associate(models: any) {
            UserSession.belongsTo(models.User, {
                as: 'users',
                foreignKey: 'UserId',
                onDelete: 'cascade',
            });
        }
    }
    UserSession.init({
        TokenId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        RefreshToken: { type: DataTypes.STRING, allowNull: false },
        // @ts-ignore
        UserId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false, },
    }, {
        sequelize,
        modelName: 'UserSession',
    });
    return UserSession;
};
