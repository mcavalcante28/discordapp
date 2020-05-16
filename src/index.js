const Discord = require('discord.js');
const Enmap = require('enmap');
const fs = require('fs');

const config = require('../config.json');

const client = new Discord.Client();

client.config = config;

const clientTeste = client //Variável Exportada

client.on('voiceStateUpdate', async function (oldMember, newMember) {
  const user = newMember.member.user.username
  const userId = newMember.member.user.id

  const oldChannel = oldMember.channel
  const newChannel = newMember.channel

  if(newMember.member.user.hoursActivity == null) {
    //Settar o primeiro valor!
    newMember.member.user.hoursActivity = 0
  } 

  const serv = newMember.guild.name

  if (!newMember.member.user.bot) {
    if(oldMember.channel === null) {
      console.log('Usuário: ' + user + ', com id: ' + userId + ', acabou de entrar no servidor: ' + serv + ', direto para o canal: ' + newChannel.name + ', às ' + new Date().toLocaleTimeString());
      newMember.member.user.firstEntered = new Date().valueOf() //Miliseg armazenado para o cálculo de permanência
    } else if (newMember.channel === null){
      console.log('Usuário: ' + user + ', com id: ' + userId + ', acabou de sair do servidor: ' + serv + ', direto do canal: ' + oldChannel.name + ', às ' + new Date().toLocaleTimeString());
      
      newMember.member.user.logoutTime = new Date().valueOf()
      let periodMiliseg = newMember.member.user.logoutTime - newMember.member.user.firstEntered
      newMember.member.user.hoursActivity += hoursCounter(periodMiliseg)
    } else {
      if (oldChannel.name == newChannel.name) {
        newMember.mute ?
        console.log('Usuário: ' + user + ', se mantém no mesmo servidor: ' + serv + ', e no mesmo canal: ' + newChannel.name + ', mas agora está mutado!')
        : console.log('Usuário: ' + user + ', se mantém no mesmo servidor: ' + serv + ', e no mesmo canal: ' + newChannel.name + ', mas agora está desmutado!');  

      } else {
        console.log('Usuário: ' + user + ', com id: ' + userId + ', saiu do canal: ' + oldChannel.name + ', para o canal: ' + newChannel.name + ', no servidor: ' + serv);
        newMember.mute ? console.log('O usuário: ' + user + ', está mutado!') : console.log('O usuário: ' + user + ', está desmutado!');
      }
    }
  }
});

function hoursCounter(miliseg) {

  let hoursReturn = 0

  miliseg >= 6000 ? hoursReturn = (miliseg / 3600000) : hoursReturn = 0

  return parseFloat(hoursReturn.toFixed(2))
}

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
module.exports = {
  clientTeste
}