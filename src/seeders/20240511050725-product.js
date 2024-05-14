'use strict';
const db = require('../models/index');
var XLSX = require("xlsx");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const workbook = XLSX.readFile('public/Productos prueba técnica.xlsx')
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    let jsonData = XLSX.utils.sheet_to_json(worksheet)

    jsonData = jsonData.map((obj, index) => {
      const newObj = {};
      for (const key in obj) {
        const newKey = key.toLowerCase().replace(/\s+/g, "_"); // Convertir a minúsculas y reemplazar espacios por guiones bajos
        newObj[newKey] = obj[key];
      }
      newObj.createdAt = new Date()
      newObj.updatedAt = new Date()
      return newObj;
    });

    await queryInterface.bulkInsert('Products', jsonData)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
