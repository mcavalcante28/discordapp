const Discord = require('discord.js');
const { format } = require('date-fns');

const helpModule = require('../modules/helpModule.js');


// const guildMember = new Discord.GuildMember()

exports.run = async (client, message) => {
  const args = message.content.slice(1).split(' ');  

  if (args.length === 1) {
    message.reply(
      'O comando `+info` permite obter informações seja de um usuário, canal, servidor ou o próprio Bot. Digite `+info h`, para maiores informações.\n_Ex.: +info h_'
    );
  }

  if (args.length >= 2) {
    switch (args[1]) {
      case 'u':
          if (args[2] == null) {
            message.reply("Comando inválido, certifique-se de colocar *<@usuário>* logo após o `+info u <@usuário>`.")
          } else {
            const clientServer = require('../index.js')

            const guildMemberId = args[2].substring(2, args[2].length - 1)
            const guildMembers = clientServer.clientTeste.users

            const guildUser = guildMembers.cache.get(guildMemberId)

            console.log(guildUser);
           
            //clientServer.clientTeste.users.cache.get(guildMemberId).username            

            const infoUserEmbed = new Discord.MessageEmbed()
            .setTitle(`Stats for ${guildMembers.cache.get(guildMemberId).username} on server ${message.guild.name}`)
            .setColor('00FFFF')
            .addFields(
              { name: '🎧 Hours', value: 'Em breve', inline: true}
              ,{ name: '📝 Messages', value: 'Em breve', inline: true}
              ,{ name: '🏆 Rewards', value: 'Em breve lista de rewards.', inline: true}
              ,{ name: 'Points', value: 'Em breve lista de points', inline: true}
              ,{ name: 'Most active voicechannels', value: 'Em breve lista de canais de texto.', inline: false}
              ,{ name: 'Most active textchannels', value: 'Em breve lista de canais de texto.', inline: false}
            )

            message.reply(infoUserEmbed)           
          }
          break;
      case 'c':
          if (args[2] == null) {
            message.reply("Comando inválido, certifique-se de colocar *<channel>* logo após o `+info c <channel>`.")
          } else {
            const clientServer = require('../index.js')


            // console.log(message.guild);
          }
          break;
      case 'serv':
        const infoServEmbed = new Discord.MessageEmbed()
          .setTimestamp()
          .setTitle(`${message.guild.name}`)
          .setColor('00FFFF')
          .setDescription(`Algumas informações de ${message.guild.name}`)
          .addFields(
            {
              name: 'Região do Servidor',
              value: `${message.guild.region}`,
              inline: true,
            },
            {
              name: 'Fundador do Servidor',
              value: `${message.guild.owner}`,
              inline: true,
            },
            {
              name: 'Total de canais',
              value: `${message.guild.channels.cache.size}`,
              inline: true,
            },
            {
              name: 'Criado em:',
              value: `${format(
                new Date(message.guild.createdAt),
                'dd.MM.yyyy'
              )}`,
              inline: true,
            },
            {
              name: 'Total de Membros:',
              value: `${message.guild.memberCount}`,
              inline: true,
            }
          );
        message.reply(infoServEmbed);
        break;
      case 'bot':
        message.reply("Em breve maiores informações sobre o NomeBot!")
        break;
      case 'h':
        const infoHelpEmbed = helpModule.helpInfoFunction();
        message.reply(infoHelpEmbed);
        break;
      default:
        message.reply('comando inválido!');
        break;
    }
  }
};
