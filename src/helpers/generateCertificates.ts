import crypto from "crypto";
import db from "../models";

const countryMap = new Map([
    [1, 'Ukraine'],
    [2, 'USA'],
    [3, 'Poland'],
    [4, 'Netherlands'],
    [5, 'Germany'],
    [6, 'Italy'],
    [7, 'Spain'],
    [8, 'Romania'],
    [9, 'Greece'],
    [10, 'Switzerland'],
])

export const generateCertificates = async () => {
    const certificates = [];
    const fiveUsers = await db.User.findAll({ limit: '5' });
    for (let i = 1; i <= 95; i++) {
        certificates.push({
           Country: countryMap.get(crypto.randomInt(1, 10)),
           Status:  'available',
        });
    }
    for (let i = 0; i < 5; i++) {
        certificates.push({
            Country: countryMap.get(crypto.randomInt(1, 10)),
            Status:  'owned',
            UserId: fiveUsers[i].UserId,
        });
    }
    return certificates;
};
