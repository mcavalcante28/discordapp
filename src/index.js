const Discord = require('discord.js');
const Enmap = require('enmap');
const fs = require('fs');

const config = require('../config.json');

const client = new Discord.Client();

client.config = config;

Discord.User.user

/* Tentativa de colocar mais propriedades num objeto */
var userActivity = {
  hours: 0,
  reward: 0,
  points: 0
};

Discord.User.userActivity = userActivity

// console.log(Discord.User);


client.on('voiceStateUpdate', function (oldMember, newMember) {

  const user = newMember.member.user.username
  const userId = newMember.member.user.id

  const oldChannel = oldMember.channel
  const newChannel = newMember.channel

  const serv = newMember.guild.name

  if (!newMember.member.user.bot) {
    if(oldMember.channel === null) {
      console.log('Usuário: ' + user + ', com id: ' + userId + ', acabou de entrar no servidor: ' + serv + ', direto para o canal: ' + newChannel.name);
    } else if (newMember.channel === null){
      console.log('Usuário: ' + user + ', com id: ' + userId + ', acabou de sair do servidor: ' + serv + ', direto do canal: ' + oldChannel.name);
    } else {
      if (oldChannel.name == newChannel.name) {
        newMember.mute ?
        console.log('Usuário: ' + user + ', se mantém no mesmo servidor: ' + serv + ', e no mesmo canal: ' + newChannel.name + ', mas agora está mutado!')
        : console.log('Usuário: ' + user + ', se mantém no mesmo servidor: ' + serv + ', e no mesmo canal: ' + newChannel.name + ', mas agora está desmutado!');
               
        console.log(newMember.member.user.userActivity);
        
      } else {
        console.log('Usuário: ' + user + ', com id: ' + userId + ', saiu do canal: ' + oldChannel.name + ', para o canal: ' + newChannel.name + ', no servidor: ' + serv);
        newMember.mute ? console.log('O usuário: ' + user + ', está mutado!') : console.log('O usuário: ' + user + ', está desmutado!');
      }
    
    }
  }
});

/*****************************************************/

fs.readdir('src/events', (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir('src/commands', (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith('.js')) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split('.')[0];
    console.log(`carregando ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(config.token);
