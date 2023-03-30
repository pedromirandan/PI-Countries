const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('country_activity', {
        countryID: {
            type: DataTypes.STRING,
            foreignKey: true,
        },
        activityID: {
            type: DataTypes.UUID,
            foreignKey: true
        }
    }, {
        timestamps: false
    });
};
