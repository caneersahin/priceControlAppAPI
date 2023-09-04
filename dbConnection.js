// dbConnection.js
const sql = require('mssql');

const config = {
  user: 'test',
  password: '14715721',
  server: 'DESKTOP-7MMOHMJ/SQLEXPRESS', // Veritabanı sunucu adresi
  database: 'pricesProject',
  options: {
      encrypt: true, // Gerekli olabilir, özellikle Azure SQL kullanıyorsanız
      trustServerCertificate: true
  }
};

const pool = new sql.ConnectionPool(config);

module.exports = pool;
