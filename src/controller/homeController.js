import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});

const res = require("express/lib/response");

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}
const handleUser = (req, res) => {
    return res.render("user.ejs");
}
const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    connection.query(
        'insert into users (email,password,username) value (?,?,?)', [email, password, username],
        function(err, results, fields) {
            if (err) {
                console.log(err);
            }
        }
    );
    return res.send("handleCreateNewUser");
}
module.exports = {
    handleHelloWorld,
    handleUser,
    handleCreateNewUser
}