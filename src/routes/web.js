import express from "express";

const router = express.Router();
//req:request,  res: response
const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("Hello world") //phan hoi
    })
    return app.use("/", router);
}
export default initWebRoutes;