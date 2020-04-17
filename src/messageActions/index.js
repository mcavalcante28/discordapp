const {format} = require('date-fns');

module.exports ={

  chooseMessage(msg){

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
      const {id, memberCount, ownerID, joinedTimestamp,name} = msg.guild;
      console.log(msg.guild)
      const existTime = format(new Date(joinedTimestamp), 'dd.MM.yyyy');
      ownerName = msg.guild.members.cache.get(ownerID).user.username;
      msg.reply(`${name}: Este server pertence a: ${ownerName}. Contamos com ${memberCount} membros. Existe desde: ${existTime}`)
    }
   
  }

}