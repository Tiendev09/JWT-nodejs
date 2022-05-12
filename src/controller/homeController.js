import userSevice from '../service/userService';
const res = require("express/lib/response");

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}
const handleUser = async(req, res) => {
    let listUser = await userSevice.GetUserList();
    return res.render("user.ejs", { listUser });

}
const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    userSevice.CreateNewUser(email, password, username);
    return res.redirect("/user");
}
const handleDeleteUser = async(req, res) => {
    await userSevice.deleteUser(req.params.id);
    return res.redirect("/user");
}
const getUpdateUserPage = async(req, res) => {
    let id = req.params.id;
    let user = await userSevice.getUserById(id);
    let userData = {};
    userData = user;
    // console.log("check user:", user);
    return res.render("user-update.ejs", { userData });
}
const handleUpdateUser = async(req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;
    await userSevice.updateUser(email, username, id);
    return res.redirect("/user");
}
module.exports = {
    handleHelloWorld,
    handleUser,
    handleCreateNewUser,
    handleDeleteUser,
    getUpdateUserPage,
    handleUpdateUser
}