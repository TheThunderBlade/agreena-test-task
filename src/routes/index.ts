import {Router} from "express";
import AuthRoutes from "./Auth.routes";
import CertificateRoutes from "./Certificate.routes";

const router = Router();

router.use(AuthRoutes);
router.use(CertificateRoutes);

export default router;