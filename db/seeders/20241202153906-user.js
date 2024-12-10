'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword1 = await bcrypt.hash('123456', 10);
    const hashedPassword2 = await bcrypt.hash('234567', 10);
    const hashedPassword3 = await bcrypt.hash('345678', 10);


    await queryInterface.bulkInsert('Users', [
			{ email: 'user1@mail.ru', password: hashedPassword1, createdAt: new Date(), updatedAt: new Date() },
			{ email: 'user2@gmail.com', password: hashedPassword2, createdAt: new Date(), updatedAt: new Date() },
			{ email: 'user3@gmail.com', password: hashedPassword3, createdAt: new Date(), updatedAt: new Date() },
		]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
