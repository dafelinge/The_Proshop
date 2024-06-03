//provides functions for hashing passwords using secure algorithm
import bcrypt from 'bcryptjs';

const users = [
    {
        name : 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin : true,
    },
    {
        name : 'John Doe',
        email: 'john@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin : false,
    },
    {
        name : 'Jane Doe',
        email: 'jane@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin : false,
    },
];

//export so that it can be used by other modules
export default users;