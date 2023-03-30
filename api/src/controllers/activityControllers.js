const { conn } = require("../db.js")
const { Countries, Activities } = conn.models;

async function getActivities(req, res) {
    try {
      const result = await Activities.findAll();
    res.json(result)  
    } catch (error) {
        res.status(400).json({
            "ERROR": error.message
        })
    }
}

async function postActivities(req, res) {
    try {
        const { name, difficulty, duration, season, idPais } = req.body;
        const activity = await Activities.create({
            name,
            difficulty,
            duration,
            season
        });
        for (let i = 0; i < idPais.length; i++) {
            var country = await Countries.findByPk(idPais[i])
            activity.addCountry(country)
        }
        res.json(activity)
    } catch (error) {
        res.status(400).json({
            "ERROR": error.message
        })
    }
}

module.exports = {
    getActivities,
    postActivities
}