let targetRole;
var targetRoleID = [];
var findRole;
var memberTarget = {
  member: '',
  channel: '',
  play: '',
};


exports.run = async (client, message) => {

  const args = message.content.slice(1).split(' ');
  
  if(args.length === 2){
    targetRole = args[1];
    message.reply(`Você está rastreando a role ${targetRole}`)
  } else if(args.length === 1 && !targetRole){
    message.reply(`Você não digitou a role desejada`)
  } 

    if(targetRole){
      message.guild.roles.cache.map(role =>{
        if(message.guild.roles.cache.get(role.id).name === targetRole){
            targetRoleID = role.id;
        } if(!targetRoleID){
          targetRoleID = [];
        }
      })
        message.guild.channels.cache.map(channel => {
          if(channel.type === 'voice' && channel.members){
            channel.members.map(member =>{
              findRole = member._roles.find(role => role === targetRoleID)
              if(findRole){
                memberTarget.name = member.user.username;
                memberTarget.channel = channel.name;
                let game = member.user.presence.activities.filter(activity => activity.type === "PLAYING")
                if(game){
                  game.map(game =>{
                    memberTarget.play = game.name;
                  })
                  game = 0;
                }
              }
            })
          }
        })
        if(findRole){
          if(memberTarget.play){
            message.reply(` Nosso querido ${memberTarget.name} está no canal ${memberTarget.channel} jogando ${memberTarget.play}. Cumprimente-o!`)
            findRole = 0;
          } else{
            message.reply(` Nosso querido ${memberTarget.name} está no canal ${memberTarget.channel}. Cumprimente-o!`)
            findRole = 0;
          }
        }else{
          message.reply(` Infelizmente quem você está procurando não está entre nós D:`)
        }
    }

  // if(!targetRole && args[1]){
  //   targetRole = args[1];
  //   message.reply(`Você está rastreando a role ${targetRole}`)
  // } 
  // else if(!targetRole && !args[1]){
  //   message.reply(`Você não digitou a role desejada`)
  // } 
  // else if(targetRole && args[1]){
  //   targetRole = args[1];
  //   message.reply(`Você alterou a role rastreada para ${targetRole}`)
  // } 

}

