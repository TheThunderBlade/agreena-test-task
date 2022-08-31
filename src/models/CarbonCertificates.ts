'use strict';
import { Model } from 'sequelize';

export interface CarbonCertificatesAttributes {
    CertificateId: number,
    Country: string,
    Status: string,
}

module.exports = (sequelize: any, DataTypes: any) => {
    class CarbonCertificates extends Model<CarbonCertificatesAttributes> implements CarbonCertificatesAttributes{
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        CertificateId!: number;
        Country!: string;
        Status!: string;
        UserId: number | null | undefined;
        static associate(models: any) {
            CarbonCertificates.belongsTo(models.User, {
                as: 'users',
                foreignKey: 'UserId',
                onDelete: 'cascade',
            })
        }
    }
    CarbonCertificates.init({
        CertificateId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        Country: { type: DataTypes.STRING, allowNull: false },
        Status: { type: DataTypes.STRING, allowNull: false },
        // @ts-ignore
        UserId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: true, defaultValue: null },
    }, {
        sequelize,
        modelName: 'CarbonCertificates',
    });
    return CarbonCertificates;
};
