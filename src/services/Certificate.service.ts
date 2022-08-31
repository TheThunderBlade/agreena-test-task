import ApiError from "./Error.service";
import db from "../models";
import { TransferMyCertificateInterface } from '../interfaces/Certificates/TransferMyCertificateInterface.interface'
import {UserAttributes} from "../models/user";
import {CarbonCertificatesAttributes} from "../models/CarbonCertificates";

class CertificateService {
    private user: UserAttributes;
    constructor(user: UserAttributes) {
        this.user = user;
    }

    getOwnedCertificates = async (): Promise<CarbonCertificatesAttributes[]> => {
        try {
            return await db.CarbonCertificates.findAll({
                where: { Status: 'owned' },
                include: [
                    {
                        model: db.User,
                        as: 'users',
                    },
                ],
            });
        } catch (e: TypeError | any) {
            throw ApiError.internal(e.message);
        }
    }

    getAvailableCertificates = async (): Promise<CarbonCertificatesAttributes[]> => {
        try {
            return await db.CarbonCertificates.findAll({
                where: { Status: 'available' }
            })
        } catch (e: TypeError | any) {
            throw ApiError.internal(e.message);
        }
    }

    transferMyCertificate = async (transferData: TransferMyCertificateInterface): Promise<void> => {
        try {
            const myCertificate = await db.CarbonCertificates.findOne({ where: {
                    CertificateId: transferData.CertificateId,
                    UserId: this.user.UserId,
                } });
            if (!myCertificate) {
                throw ApiError.notFound('Certificate not found');
            }

            await myCertificate.update({
                UserId: transferData.anotherUserId,
                Status: 'transferred',
            })
        } catch (e: TypeError | any) {
            throw ApiError.internal(e.message);
        }
    }
}

export default CertificateService;