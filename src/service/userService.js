import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

// create the connection, specify bluebird as Promise
// const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'test', Promise: bluebird });



// create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'jwt'
// });
var salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}
const CreateNewUser = async(email, password, username) => {
    let hashPass = hashUserPassword(password);
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('insert into users (email,password,username) value (?,?,?)', [email, hashPass, username]);
    } catch (e) {
        console.log(e);
    }

}
const GetUserList = async() => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    let users = [];
    try {
        const [rows, fields] = await connection.execute('select * from users');
        return rows;
    } catch (e) {
        console.log(e)
    }


}
const deleteUser = async(id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('delete from users where id = ?', [id]);
        return rows;
    } catch (e) {
        console.log(e)
    }
}
const getUserById = async(id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('select * from users where id = ?', [id]);
        return rows;
    } catch (e) {
        console.log(e)
    }
}
const updateUser = async(email, username, id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('update users set email = ?,username = ? where id=?', [email, username, id]);
        return rows;
    } catch (e) {
        console.log(e)
    }
}
module.exports = {
    CreateNewUser,
    GetUserList,
    deleteUser,
    getUserById,
    updateUser

}