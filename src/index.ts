import db from './models';
import { users } from './seeders/users';
import {createSequelizeFunc} from "./helpers/createSequelizeFunc";
import {generateCertificates} from "./helpers/generateCertificates";
import createServer from "./app";

const PORT = process.env.PORT || 5000;

const app = createServer();

db.sequelize.sync().then(() => {
    app.listen(PORT, async () => {
        try {
            const checkUsers = await db.User.findAll();

            if (checkUsers.length === 0) {
                const usersData = await users();
                await createSequelizeFunc(usersData, 'User');
            }

            const checkCertificates = await db.CarbonCertificates.findAll();
            if (checkCertificates.length === 0) {
                const certificates = await generateCertificates();
                await createSequelizeFunc(certificates, 'CarbonCertificates');
            }

            console.log(`App listening on port ${PORT}`);
        } catch (e) {
            console.log(e);
        }
    })
})