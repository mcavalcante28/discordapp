module.exports = async (client) => {
  console.log(
    `\nBot inicializado às ${new Date().toLocaleTimeString()} do dia ${new Date().toLocaleDateString()}\n`
  );

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
