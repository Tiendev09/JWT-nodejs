import db from "../models/index";
import bcrypt from 'bcryptjs';
import { Op } from "sequelize";
import { getGroupWithRoles } from "./JWTService";
import { createJWT } from "../middleware/JWTAction";
require("dotenv").config();
var salt = bcrypt.genSaltSync(10);
const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}
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
            groupId: 4
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

const handleUserLogin = async(rawData) => {
    try {

        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })
        if (user) {
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            if (isCorrectPassword === true) {
                let groupWithRoles = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    username: user.username,
                    groupWithRoles,


                }
                let token = createJWT(payload);
                return {
                    EM: "OK",
                    EC: 0,
                    DT: {
                        access_Token: token,
                        groupWithRoles,
                        email: user.email,
                        username: user.username
                    }
                }
            }
        }

        // console.log("Not user with email/phone", rawData.valueLogin, "Password", rawData.password);
        return {
            EM: "Your email/phone number or password incorrect!",
            EC: 1,
            DT: ""
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
    registerNewUser,
    handleUserLogin
}