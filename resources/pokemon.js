const Sequelize = require('sequelize')
const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./database.sqlite"
})

const Pokemon = sequelize.define('pokemon', {
	trainerId: Sequelize.INTEGER,
	species: Sequelize.TEXT,
	level: Sequelize.INTEGER,
	blob: Sequelize.BLOB
})

module.exports = Pokemon