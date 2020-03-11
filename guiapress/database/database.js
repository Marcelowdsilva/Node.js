const Sequelize = require("sequelize")

const connection = new Sequelize('guiapress','root', '4601191Lucy',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00" //ajustando o tempo do sequelize para onde vai ficar a aplicação que nesse caso é no Brasil.
})

module.exports = connection