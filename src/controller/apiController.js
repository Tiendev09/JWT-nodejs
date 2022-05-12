import loginRegisterService from '../service/loginRegisterService';
const testApi = (req, res) => {
    return res.status(200).json({
        message: "ok",
        data: "test api"
    });
}
const handleRegister = async(req, res) => {
    console.log("check", req.body);
    try {
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: "Missing required parameters",
                EC: "1",
                DT: ""
            })
        }
        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                EM: "Your password must have mor than 3 letters",
                EC: "1",
                DT: ""
            })
        }
        //goi service
        let data = await loginRegisterService.registerNewUser(req.body);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ""
        })
    } catch (e) {
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: ""
        });
    }
    // console.log("call me");
}
module.exports = {
    testApi,
    handleRegister
}