require("dotenv").config();
import express from "express";
import configViewEngine from "./config/ViewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import bodyParser from 'body-parser';
import connection from './config/connectdb';
import configCors from './config/configCors';
import cookieParser from 'cookie-parser';
let app = express();


//config body-parser
// setup body-parser trước router
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//config cookieParser
app.use(cookieParser());
connection();


const PORT = process.env.PORT || 8080; //nen khai bao port trong file .env
// Add headers before the routes are defined
//phai de tren router
configCors(app);





configViewEngine(app);
initWebRoutes(app);
initApiRoutes(app);

app.use((req, res) => {
    return res.send("404 not found");
});
// app.listen() truyen port 
app.listen(PORT, () => {
    console.log("JWT backend is running on the port " + PORT);
});