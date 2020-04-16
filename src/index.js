const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json');
const {format} = require('date-fns');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('ESTOU ONLINE!')
});

client.on('message', msg => {

  if (msg.content === '+ready') {
    msg.channel.send('Ready go baby!!');
  } 

  if (msg.content === '+age'){
    const followage = format(new Date(msg.member.joinedTimestamp), 'dd.MM.yyyy');
    msg.reply(`Você está no canal desde ${followage}`);
  }

  if(msg.content === '+record_age'){
    const timestamps = (msg.guild)
    console.log(timestamps);
  }

  if(msg.content === '+server'){
    const {memberCount, ownerID, name} = msg.guild;
    const existTime = format(new Date(joinedTimestamp), 'dd.MM.yyyy');

    ownerName = msg.guild.members.cache.get(ownerID).user.username;

    msg.reply(`${name}: Este server pertence a: ${ownerName}. Contamos com ${memberCount} membros. Existe desde: ${existTime}`)
  }
});

client.on("presenceUpdate", function(oldMember, newMember){
  if(oldMember.clientStatus.desktop !== newMember.clientStatus.desktop){
    console.log("MUDOU!")
  }
});

client.login(config.token);