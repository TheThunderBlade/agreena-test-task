import CertificateService from "../services/Certificate.service";
import express, {NextFunction} from "express";
import {RequestInterface} from "../interfaces/Request/Request.interface";

class CertificateController {
    getOwnedCertificates = async (req: RequestInterface, res: express.Response, next: NextFunction) => {
        try {
            const { user } = req;
            const CertificatesSvc = new CertificateService(user);
            const ownedCertificates = await CertificatesSvc.getOwnedCertificates();
            res.status(200).json(ownedCertificates);
        } catch (e) {
            next(e);
        }
    }

    getAvailableCertificates = async (req: RequestInterface, res: express.Response, next: NextFunction) => {
        try {
            const { user } = req;
            const CertificatesSvc = new CertificateService(user);
            const availableCertificates = await CertificatesSvc.getAvailableCertificates();
            res.status(200).json(availableCertificates);
        } catch (e) {
            next(e);
        }
    }

    transferMyCertificate = async (req: RequestInterface, res: express.Response, next: NextFunction) => {
        try {
            const { user } = req;
            const { anotherUserId, CertificateId } = req.body;
            const CertificatesSvc = new CertificateService(user);
            await CertificatesSvc.transferMyCertificate({ anotherUserId, CertificateId });
            res.status(200).json({ message: `Certificate was successfully transferred on user with ${anotherUserId} ID` });
        } catch (e) {
            next(e);
        }
    }
}

export default new CertificateController();