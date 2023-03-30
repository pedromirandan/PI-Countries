//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const axios = require("axios");
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Countries, Continents, Capitals, FlagImages } = require('./src/db.js')

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {

  axios("https://restcountries.com/v3/all")
    .then(response => {
      response.data.forEach(country => {
        Countries.create({
          ID: country.cca3,
          name: country.name.common,
          flagImage: country.flags ? country.flags[0] : "No existe",
          continent: country.continents ? country.continents[0] : "No existe",
          capital: country.capital ? country.capital[0]: "No existe",
          subregion: country.subregion ? country.subregion : "No existe",
          area: country.area,
          population: country.population
        })
      })
    })
  server.listen(3001, () => {
    console.log('%s listening at http://localhost:3001'); // eslint-disable-line no-console
  });
});
