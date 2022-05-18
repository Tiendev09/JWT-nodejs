import db from "../models/index";

const getGroupWithRoles = async(user) => {
    //scope
    let roles = await db.Group.findAll({
        where: { id: user.groupId },
        include: { model: db.Role, attributes: ["id", "url", "description"], through: { attributes: [] } }
    });
    return roles ? roles : {};
    // console.log("Check roles", roles);
}
module.exports = {
    getGroupWithRoles
}