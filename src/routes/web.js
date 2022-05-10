import express from "express";
import homeController from "../controller/homeController";
const router = express.Router();
//req:request,  res: response
const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld);
    router.get("/user", homeController.handleUser);
    router.post("/users/create-user", homeController.handleCreateNewUser);
    router.post("/users/delete-user/:id", homeController.handleDeleteUser);
    router.get("/users/update-user/:id", homeController.getUpdateUserPage);
    router.post("/update-user", homeController.handleUpdateUser);


    return app.use("/", router);
}
export default initWebRoutes;