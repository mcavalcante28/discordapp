const { format, getMonth, compareAsc, getYear } = require('date-fns');
const Discord = require('discord.js');

const helpModule = require('../modules/helpModule.js');

let idMembers = [];
let cont = 0;
let dateMembers = [];
let ordernedDates;

exports.run = async (client, message) => {
  const currentYear = getYear(new Date());
  const currentMonth = getMonth(new Date());

  const initialYear = getYear(new Date(message.guild.createdAt));

  let arrayYears = [];
  let arrayMonths = [
    'Janeiro',
    'Feveireiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  let newCurrentMonth = arrayMonths[currentMonth];

  let initYear = initialYear;

  for (var i = 0; i <= currentYear - initialYear; i++) {
    arrayYears[i] = initYear;
    initYear++;
  }

  message.guild.members.cache.map((member) => {
    if (!member.user.bot) {
      idMembers[cont] = member.user.id;
      cont++;
    }
  });

  idMembers.map((id, index) => {
    cont = 0;
    dateMembers[index] = new Date(
      message.guild.members.cache.get(id).joinedTimestamp
    );
  });

  ordernedDates = dateMembers.sort(compareAsc);

  const args = message.content.slice(1).split(' ');

  if (args.length === 1) {
    message.reply(
      'O comando +analysis permite obter informações detalhadas sobre o crescimento do servidor. Digite +analysis h, para maiores informações.\nEx.: +analysis h'
    );
  }

  if (args.length >= 2) {
    switch (args[1]) {
      case 'm':
        if (args[2]) {
          const countYears = arrayYears.length;
          if (args[2] > arrayYears[countYears - 1] || args[2] < arrayYears[0]) {
            message.reply(' o ano selecionado não consta na base de dados!');
          } else {
            const entries4Month = [];
            arrayMonths.map((month, index) => {
              entries4Month[index] = ordernedDates.filter(
                (date) =>
                  getMonth(date) === index &&
                  getYear(date) === parseInt(args[2])
              );
            });

            const mensalEmbedPerYear = new Discord.MessageEmbed()
              .setTimestamp()
              .setTitle(`${message.guild.name}`)
              .setColor('FF0000')
              .setDescription(`Contagem de novos membros no ano de ${args[2]}:`)
              .addFields(
                arrayMonths.map((month, index) => {
                  return {
                    name: `${arrayMonths[index]}`,
                    value: `${entries4Month[index].length}`,
                    inline: true,
                  };
                })
              );
            message.reply(mensalEmbedPerYear);
          }
        } else {
          const mensalEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setTitle(`${message.guild.name}`)
            .setColor('FF0000')
            .setDescription(
              `Contagem de novos membros no mês:`
            )
            .addFields({
              name: `${arrayMonths[currentMonth]}`,
              value: `${arrayMonths[currentMonth].length}`,
              inline: true,
            });
          message.reply(mensalEmbed);
        }
        break;
      case 'y':
        const entries4Year = [];
        arrayYears.map((year, index) => {
          entries4Year[index] = ordernedDates.filter(
            (date) => getYear(date) === year
          );
        });
        const anualEmbed = new Discord.MessageEmbed()
          .setTimestamp()
          .setTitle(`${message.guild.name}`)
          .setColor('FF0000')
          .setDescription(`Crescimento do servidor ao longo do tempo:`)
          .addFields(
            arrayYears.map((year, index) => {
              return {
                name: `${year}`,
                value: `${entries4Year[index].length}`,
                inline: true,
              };
            })
          );
        message.reply(anualEmbed);
        break;
      case 'h':
        const helpEmbed = helpModule.helpAnalysisFunction(
          message.guild.name.toString()
        );
        message.reply(helpEmbed);
        break;
      default:
        message.reply('comando inválido!');
        break;
    }
  }
};
