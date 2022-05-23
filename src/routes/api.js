import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import groupController from "../controller/groupController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";
import roleController from "../controller/roleController";
const router = express.Router();

//req:request,  res: response



const initApiRoutes = (app) => {
    router.all("*", checkUserJWT, checkUserPermission);
    router.get("/test-api", apiController.testApi);
    // register login routes
    router.post("/register", apiController.handleRegister)
    router.post("/login", apiController.handleLogin)
    router.post("/logout", apiController.handleLogout)
    router.get("/account", userController.getUserAccount)

    //user Routes
    router.get("/user/read", userController.readFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    //group Routes
    router.get("/group/read", groupController.readFunc);

    //Roles routes
    router.get("/role/read", roleController.readFunc);
    router.post("/role/create", roleController.createFunc);
    router.put("/role/update", roleController.updateFunc);
    router.delete("/role/delete", roleController.deleteFunc);
    router.get("/role/by-group/:groupId", roleController.getRoleByGroup);
    router.post("/role/assign-to-group", roleController.assignRolestoGroup);


    return app.use("/api/v1", router);
}
export default initApiRoutes;