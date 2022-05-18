import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index';
var salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}
const CreateNewUser = async(email, password, username) => {
    let hashPass = hashUserPassword(password);
    try {
        await db.User.create({
            email: email,
            password: hashPass,
            username: username
        })
    } catch (e) {
        console.log(e);
    }

}
const GetUserList = async() => {

    //test relationship
    let newUser = await db.User.findOne({
        where: {
            id: 1,
        },
        //lay cac truong du lieu mong muon
        attributes: ["id", "email", "username"],
        include: { model: db.Group, attributes: ["name", "description"] },
        // include: { model: db.Group },cach 2
        raw: true,
        nest: true, //sd khi dung voi include
    })

    let roles = await db.Role.findAll({
        include: { model: db.Group, where: { id: 1 } },
        raw: true,
        nest: true,
    })

    console.log("Check user", newUser);
    console.log("Check roles", roles)
    let users = [];
    users = await db.User.findAll();
    return users;


}
const deleteUser = async(id) => {
    await db.User.destroy({
        where: {
            id: id
        }
    });
}
const getUserById = async(id) => {
    let user = {};
    user = await db.User.findOne({
        where: {
            id: id
        }
    });
    return user.get({ plain: true });

}
const updateUser = async(email, username, id) => {
    await db.User.update({
        email: email,
        username: username
    }, {
        where: {
            id: id
        }
    })
}
module.exports = {
    CreateNewUser,
    GetUserList,
    deleteUser,
    getUserById,
    updateUser

}