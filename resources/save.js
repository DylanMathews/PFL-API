const Sequelize = require('sequelize')
const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./database.sqlite"
})

const Save = sequelize.define('save', {
	raw: Sequelize.BLOB
})

Save.parse = binary_file => {
	//TODO: Implement save parser
}

Save.prototype.toJson = () => {
	const json = Save.parse(this.raw)

	return json
}

module.exports = Save