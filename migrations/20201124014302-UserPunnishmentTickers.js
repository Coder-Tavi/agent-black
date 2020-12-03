module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('UserPunishmentTickers', {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    punishmentID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'PunishmentLevels',
        key: 'ID',
      },
    },
    userID: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    ammountLeft: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('UserPunishmentTickers'),
};
