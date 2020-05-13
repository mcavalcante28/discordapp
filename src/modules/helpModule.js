const Discord = require('discord.js');

const helpAnalysis = [
  '+analysis m',
  '+analysis m <year>',
  '+analysis y',
];

const helpAnalysisDescription = [
  'Verify the quantity of members that enter in this server this month.\nEx.: +analysis m',
  'Verify the quantity of members that enter in this server in a specif month of some year.\nEx.: +analysis m 2020',
  'Verify the quantity of members that enter in this server on each year .\nEx.: +analysis y',
];

function helpAnalysisFunction(message) {
  const helpEmbed = new Discord.MessageEmbed()
    .setTitle(message)
    .setColor('7CFC00')
    .setDescription('Manual - Analysis Settings')
    .addFields(
      helpAnalysis.map((help, index) => {
        return {
          name: `${help}`,
          value: `${helpAnalysisDescription[index]}`,
          inline: false,
        };
      })
    );

  return helpEmbed
}

module.exports = {
  helpAnalysis,
  helpAnalysisDescription,
  helpAnalysisFunction,
};
