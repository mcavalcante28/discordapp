module.exports = async (client) => {
  console.log('BOT INICIADO!!');
  console.log();
  
  if (client.guilds.cache.size > 2) {
    client.user.setActivity(
      `Sirvo fielmente a ${client.guilds.cache.size} servers!`
    );
  } else {
    client.user.setActivity(
      `Sirvo fielmente a ${client.guilds.cache.size} server!`
    );
  }
};
