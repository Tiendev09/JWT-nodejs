'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.addColumn('Users',
            'adress', {
                type: Sequelize.STRING
            }
        );
        await queryInterface.addColumn('Users',
            'gender', {
                type: Sequelize.STRING
            },
        );
        await queryInterface.addColumn('Users',
            'phone', {
                type: Sequelize.STRING
            },
        );
        await queryInterface.addColumn('Users',
            'groupId', {
                type: Sequelize.INTEGER,
            },
        );
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Users', 'address');
        await queryInterface.removeColumn('Users', 'gender');
        await queryInterface.removeColumn('Users', 'phone');
        await queryInterface.removeColumn('Users', 'groupId');
    }
};