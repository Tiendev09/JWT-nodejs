import express from "express";
import configViewEngine from "./configs/ViewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from 'body-parser';
let app = express();

configViewEngine(app);
//config body-parser
// setup body-parser trước router
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

initWebRoutes(app);



const PORT = process.env.PORT || 8080; //nen khai bao port trong file .env
// app.listen() truyen port 
app.listen(PORT, () => {
    console.log("JWT backend is running on the port " + PORT);
});