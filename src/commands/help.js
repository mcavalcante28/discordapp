exports.run = async (client, message) => {
  const Discord = require("discord.js");
  const {format} = require('date-fns')

  const gAvatar = message.guild.iconURL;
  const exampleEmbed = new Discord.MessageEmbed()
  .setTimestamp()
  .setTitle(`${message.guild.name}`)
  .setThumbnail(gAvatar)
  .setColor("RANDOM")
  .setDescription(`Algumas informações de ${message.guild.name}`)
  .addFields(
		{ name: 'Região do Servidor', value: `${message.guild.region}`, inline:true },
		{ name: 'Fundador do Servidor', value:`${message.guild.owner}`, inline: true },
    { name: 'Total de canais', value: `${message.guild.channels.cache.size}`, inline: true },
    { name: 'Criado em:', value: `${format(new Date(message.guild.createdAt), 'dd.MM.yyyy')}`, inline: true },
    { name: 'Total de Membros:', value: `${message.guild.memberCount}`, inline: true },
	)

console.log(message.guild.channels)
message.reply(exampleEmbed);
}