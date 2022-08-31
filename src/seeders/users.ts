import bcrypt from 'bcrypt';

export const users = async () => [
    {
        UserName: 'TestUser1',
        Email: 'TUser1@gmail.com',
        Password: await bcrypt.hash('123456bb', 5),
    },
    {
        UserName: 'TestUser2',
        Email: 'TUser2@gmail.com',
        Password: await bcrypt.hash('123456bb', 5),
    },
    {
        UserName: 'TestUser3',
        Email: 'TUser3@gmail.com',
        Password: await bcrypt.hash('123456bb', 5),
    },
    {
        UserName: 'TestUser4',
        Email: 'TUser4@gmail.com',
        Password: await bcrypt.hash('123456bb', 5),
    },
    {
        UserName: 'TestUser5',
        Email: 'TUser5@gmail.com',
        Password: await bcrypt.hash('123456bb', 5),
    },
    {
        UserName: 'TestUser6',
        Email: 'TUser6@gmail.com',
        Password: await bcrypt.hash('123456bb', 5),
    },
    {
        UserName: 'TestUser7',
        Email: 'TUser7@gmail.com',
        Password: await bcrypt.hash('123456bb', 5),
    },
    {
        UserName: 'TestUser8',
        Email: 'TUser8@gmail.com',
        Password: await bcrypt.hash('123456bb', 5),
    },
    {
        UserName: 'TestUser9',
        Email: 'TUser9@gmail.com',
        Password: await bcrypt.hash('123456bb', 5),
    },
    {
        UserName: 'TestUser10',
        Email: 'TUser10@gmail.com',
        Password: await bcrypt.hash('123456bb', 5),
    },
];