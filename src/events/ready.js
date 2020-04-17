module.exports = async client => {
  console.log("BOT INICIADO!!")
  client.user.setActivity(`Sirvo fielmente a ${client.guilds.cache.size} server!`)
}