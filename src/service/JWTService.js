import db from "../models/index";

const getGroupWithRoles = async(user) => {
    //scope
    let roles = await db.Group.findOne({
        where: { id: user.groupId },
        // include nhieu thi cần dấu [] nếu không sẽ bị lỗi
        include: [{ model: db.Role, attributes: ["id", "url", "description"], through: { attributes: [] } }]
    });
    // console.log("check roles", roles);
    return roles ? roles : {};

}
module.exports = {
    getGroupWithRoles
}