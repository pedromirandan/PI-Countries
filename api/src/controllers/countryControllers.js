const { conn } = require("../db.js")
const { Countries, Activities } = conn.models;

async function getCountries(req, res) {
    try {
        const result = await Countries.findAll();
        res.json(result)
    } catch (error) {
        res.status(404).json({
            "ERROR": error.message
        })
    }
}

async function getCountryByID(req, res) {
    try {
        const { idPais } = req.params;
        const result = await Countries.findByPk(idPais, { include: Activities });
        res.json(result);
    } catch (error) {
        res.status(404).json({
            "ERROR": error.message
        })
    }
}

async function getCountryByQuery(req, res) {
    try {
        const result = [];
        const { name } = req.query;
        const allCountries = await Countries.findAll();
        allCountries.forEach((element) => {
            if (element.name.toLowerCase().includes(name.toLowerCase())) result.push(element)
        })
        if (!result.length) throw {message: `El país requerido no existe (${name})`} 
        res.json(result)
    } catch (error) {
        res.status(404).json({
            "ERROR": error.message
        })
    }
}

module.exports = {
    getCountries,
    getCountryByQuery,
    getCountryByID
}