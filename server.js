'use strict'

const server = require('./src/app');
const models = require('./models');

const PORT = 3000;

async function main() { 
  await models.sequelize.sync({ force: true });

  server.listen(3000, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });
}

main();