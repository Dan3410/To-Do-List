const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('db', 'test', 'password',{
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
  })
  
  try{
    sequelize.authenticate();
    console.log('Connection has been established successfully')
  } catch(error){
    console.log('Unable to connect to the database: ',error);
  }
  

module.exports = sequelize