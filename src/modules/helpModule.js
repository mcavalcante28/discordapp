const Discord = require('discord.js');

/*Tópicos dos Help's*/
const helpBot = [
  '+analysis - ',
  '+top - ',
  '+reward - Give or Take reward points',
  '+info - ',
  '+reset - Reset statistics & settings',
  '+patch - View Patchnotes',
];

const helpInfo = [
  '+info <user> - ',
  '+info <channel> - ',
  '+info server - ',
  '+info bot - ',
];

const helpAnalysis = ['+analysis m -', '+analysis m <year> -', '+analysis y -'];

/*Descrição dos Help's*/
const helpBotDescription = [
  ' .\nEx.: +analysis h, for more infos.',
  'View server statistics about users and channels.\nEx.: +top h, for more infos.',
  'Give or Take rewards points of a user.\nEx.: +reward h, for more infos.',
  'Information about a user, channel, server and bot configuration on this server.\nEx.: +info h, for more infos.',
  'Reset server statistics (admin only).\nEx.: +reset h, for more infos.',
  'Get an overview of latest patches and check the detailed changes of a specific patch.\nEx.: +patch h, for more infos.',
];

const helpInfoDescription = [
  'Information about a user.\nEx.: +info u <user>.',
  'Information about some channel, with top user and time waste.\nEx.: +info <channel>.',
  'Basic information about the server.\nEx.: +info serv',
  'Information about the bot, patch and version.\nEx.: +info bot.'
];

const helpAnalysisDescription = [
  'Verify the quantity of members that enter in this server this month.\nEx.: +analysis m',
  'Verify the quantity of members that enter in this server in a specif month of some year.\nEx.: +analysis m 2020',
  'Verify the quantity of members that enter in this server on each year .\nEx.: +analysis y',
];

/*Funções dos Help's*/
function helpInfoFunction() {
  const helpEmbed = new Discord.MessageEmbed()
  .setTitle('Info Manual')
  .setColor('7CFC00')
  .addFields(
    helpInfo.map((help, index) => {
      return {
        name: `${help}`,
        value: `${helpInfoDescription[index]}`,
        inline: false,
      };
    })
  );
  return helpEmbed;
}

function helpBotFunction() {
  const helpEmbed = new Discord.MessageEmbed()
    .setTitle('NomeBot Manual')
    .setColor('7CFC00')
    .setDescription(
      'Contact us for more information or questions: (some email here) '
    )
    .addFields(
      helpBot.map((help, index) => {
        return {
          name: `${help}`,
          value: `${helpBotDescription[index]}`,
          inline: false,
        };
      })
    );

  return helpEmbed;
}

function helpAnalysisFunction() {
  const helpEmbed = new Discord.MessageEmbed()
    .setTitle('Analysis Manual')
    .setColor('7CFC00')
    .addFields(
      helpAnalysis.map((help, index) => {
        return {
          name: `${help}`,
          value: `${helpAnalysisDescription[index]}`,
          inline: false,
        };
      })
    );

  return helpEmbed;
}

module.exports = {
  helpInfo,
  helpInfoDescription,
  helpInfoFunction,

  helpBot,
  helpBotDescription,
  helpBotFunction,

  helpAnalysis,
  helpAnalysisDescription,
  helpAnalysisFunction,
};
