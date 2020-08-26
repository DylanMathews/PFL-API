const Sequelize = require('sequelize')
const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./database.sqlite"
})

const User = sequelize.define('user', {
	firstName: Sequelize.TEXT,
	lastName: Sequelize.TEXT
})

module.exports = User