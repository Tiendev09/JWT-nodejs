import db from "../models/index";


const getAllRoles = async() => {
    try {
        let roles = await db.Role.findAll({
            attributes: ["id", "url", "description"],
            // include: { model: db.Group, attributes: ["name", "description"] }
        });
        if (roles) {
            return {
                EM: 'Get all roles success',
                EC: 0,
                DT: roles,
            }
        } else {
            return {
                EM: 'Something wrong with services...',
                EC: 1,
                DT: [],
            }
        }

    } catch (e) {
        console.log(e);
    }
}
const getRoleWithPaginate = async(page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.Role.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "url", "description"],
            // include: { model: db.Group, attributes: ["name", "description", "id"] },
            order: [
                ["id", "desc"]
            ]
        })
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            roles: rows
        }
        return {
            EM: 'OK',
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
const getRoleByGroup = async(id) => {
    try {
        if (!id) {
            return {
                EM: 'Not found any roles',
                EC: 0,
                DT: []
            }
        }
        let roles = await db.Group.findOne({
            where: { id: id },
            attributes: ["id", "name", "description"],
            include: [{ model: db.Role, attributes: ["id", "url", "description"], through: { attributes: [] } }]

        })
        return {
            EM: 'Get role by group success',
            EC: 0,
            DT: roles
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
const createNewRoles = async(roles) => {
    try {
        //lay tat ca cac role dang co trong db
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        })
        const persists = roles.filter(({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url2 === url1))
        if (persists.length === 0) {
            return {
                EM: 'Nothing to create...',
                EC: 0,
                DT: [],
            }
        }
        await db.Role.bulkCreate(persists);
        return {
            EM: `Create success: ${persists.length} roles...`,
            EC: 0,
            DT: [],
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
const deleteRole = async(id) => {
    try {
        let role = await db.Role.findOne({
            where: { id: id }
        })
        if (role) {
            await role.destroy();
            return {
                EM: 'Delete role success',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'Role not exists...',
                EC: 0,
                DT: [],
            }
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
const assignRolestoGroup = async(data) => {
    try {
        /**
         * cac buoc gan quyen cho group
         * b1: xoa tat ca cac role da ton tai
         * b2:gan lai cac role vua duoc chon
         */
        await db.Group_Role.destroy({
            where: { groupId: +data.groupId }
        })
        await db.Group_Role.bulkCreate(data.groupRoles);
        // console.log(data.groupRoles);
        return {
            EM: 'Assign role to group success...',
            EC: 0,
            DT: []
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
    createNewRoles,
    getRoleWithPaginate,
    getAllRoles,
    deleteRole,
    getRoleByGroup,
    assignRolestoGroup
}