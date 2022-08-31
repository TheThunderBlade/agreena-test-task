import {Application, Router} from "express";
import CertificateController from "../controllers/Certificate.controller";
import AuthMiddleware from '../middlewares/Auth.middleware';

const certificateRoutes = Router();

certificateRoutes.get('/getOwnedCertificates',
    <Application>AuthMiddleware,
    <Application>CertificateController.getOwnedCertificates);
certificateRoutes.get('/getAvailableCertificates',
    <Application>AuthMiddleware,
    <Application>CertificateController.getAvailableCertificates);
certificateRoutes.post('/transferMyCertificate',
    <Application>AuthMiddleware,
    <Application>CertificateController.transferMyCertificate);

export default certificateRoutes;