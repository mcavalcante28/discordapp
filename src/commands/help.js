const helpModule = require('../modules/helpModule.js');

exports.run = async (client, message) => {
    const args = message.content.slice(1).split(' ');

    if (args.length === 1) {
        const helpEmbed = helpModule.helpBotFunction();
        message.reply(helpEmbed);
      }
}