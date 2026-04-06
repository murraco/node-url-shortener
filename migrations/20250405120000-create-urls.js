module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Urls', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      longUrl: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      numLogs: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Urls');
  },
};
