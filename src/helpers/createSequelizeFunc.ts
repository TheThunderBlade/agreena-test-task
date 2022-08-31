import db from "../models";

export const createSequelizeFunc = async (data: any, tableName: string) => {
    data.map(async (dataItem: object) => {
        await db[tableName].create(dataItem);
    });
};