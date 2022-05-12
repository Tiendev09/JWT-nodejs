import db from "../models/index";
import bcrypt from 'bcryptjs';
var salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
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
const registerNewUser = async(rawUserData) => {
    try {
        //b1 check email password phone xem co ton tai trong csdl chua
        let isEmailExists = await checkEmailExists(rawUserData.email);
        // console.log("check email", isEmailExists)
        if (isEmailExists === true) {
            return {
                EM: 'The email is already exists',
                EC: 1
            }
        }
        let isPhoneExists = await checkPhoneExists(rawUserData.phone);
        if (isPhoneExists === true) {
            return {
                EM: "The phone number is already exists",
                EC: 1
            }
        }
        //b2 hash password 
        let hashPassword = hashUserPassword(rawUserData.password);
        //create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            phone: rawUserData.phone,
            password: hashPassword,
        })
        return {
            EM: "Success",
            EC: 0
        }
    } catch (e) {
        console.log("Check error", e);
        return {
            EM: "somthing wrong in service",
            EC: -2
        }
    }

}
module.exports = {
    registerNewUser
}