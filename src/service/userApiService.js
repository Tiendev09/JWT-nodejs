import db from "../models/index";
import bcrypt from 'bcryptjs';
var salt = bcrypt.genSaltSync(10);
const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}
const checkEmailExists = async(email) => {
    let user = await db.User.findOne({
        where: {
            email: email,
        }
    });
    if (user) {
        return true;
    }
    return false;
}

const checkPhoneExists = async(phone) => {
    let user = await db.User.findOne({
        where: {
            phone: phone,
        }
    });
    if (user) {
        return true;
    }
    return false;
}
const getAllUser = async() => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "email", "username", "phone", "gender", "adress"],
            include: { model: db.Group, attributes: ["name", "description"] }
        });
        if (users) {
            return {
                EM: 'Get data success',
                EC: 0,
                DT: users,
            }
        } else {
            return {
                EM: 'Something wrong with services...',
                EC: 1,
                DT: [],
            }
        }

    } catch (e) {
        console.log(e);
    }
}
const getUserWithPaginate = async(page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.User.findAndCountAll({
                offset: offset,
                limit: limit,
                attributes: ["id", "email", "username", "phone", "gender", "adress"],
                include: { model: db.Group, attributes: ["name", "description", "id"] },
                order: [
                    ["id", "asc"]
                ]
            })
            // console.log("count", count, "row", rows);
        let totalPages = Math.ceil(count / limit);
        let data = {
                totalRows: count,
                totalPages: totalPages,
                users: rows
            }
            // console.log("check data", data);
        return {
            EM: 'OK',
            EC: 0,
            DT: data,
        }

    } catch (e) {
        console.log(e);
        return {
            EM: 'Something wrong with services...',
            EC: 1,
            DT: [],
        }
    }
}
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}
const createNewUser = async(data) => {
    try {
        let isEmailExists = await checkEmailExists(data.email);
        if (isEmailExists === true) {
            return {
                EM: 'The email is already exists',
                EC: 1,
                DT: "email"
            }
        }
        let isPhoneExists = await checkPhoneExists(data.phone);
        if (isPhoneExists === true) {
            return {
                EM: "The phone number is already exists",
                EC: 1,
                DT: "phone"
            }
        }
        let hashPassword = hashUserPassword(data.password);
        await db.User.create({
            email: data.email,
            username: data.username,
            phone: data.phone,
            password: hashPassword,
            address: data.address,
            groupId: data.groupId,
            gender: data.gender
        })
        return {
            EM: "Success",
            EC: 0,
            DT: []
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'Something wrong with services...',
            EC: 1,
            DT: [],
        }
    }
}
const updateUser = async(data) => {
    try {
        if (!data.groupId) {
            return {
                EM: 'Error with empty group id',
                EC: 1,
                DT: 'groupId',
            }
        }
        let user = await db.User.findOne({
            where: { id: data.id },
        })
        if (user) {
            //update
            await user.update({
                username: data.username,
                adress: data.adress,
                gender: data.gender,
                groupId: data.groupId
            });
            return {
                EM: 'Update user success',
                EC: 0,
                DT: '',
            }
        } else {
            return {
                EM: 'User not found',
                EC: 1,
                DT: '',
            }
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'Something wrong with services...',
            EC: 1,
            DT: [],
        }
    }
}
const deleteUser = async(id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        })
        if (user) {
            await user.destroy();
            return {
                EM: 'Delete user success',
                EC: 0,
                DT: [],
            }
        } else {
            return {
                EM: 'User not exists',
                EC: 2,
                DT: [],
            }
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'error from services...',
            EC: 1,
            DT: [],
        }
    }
}
module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser,
    getUserWithPaginate
}