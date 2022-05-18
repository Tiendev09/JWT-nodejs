import db from "../models/index";
const getGroup = async() => {
    try {
        let data = await db.Group.findAll({
            order: [
                ["name", "ASC"]
            ]
        });
        return {
            EM: 'Get groups success',
            EC: 0,
            DT: data,
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'Something wrong with services...',
            EC: 1,
            DT: [],
        }
    }
}
module.exports = {
    getGroup,
}