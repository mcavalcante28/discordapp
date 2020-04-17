const targetRole = 'marcus';
var targetRoleID = [];
var findRole;
var memberTarget = {
  member: '',
  channel: '',
};

exports.run = async (client, message) => {

  console.log(client);
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
          }
        })
      }
    })
    if(findRole){
      message.reply(` Nosso querido ${memberTarget.name} está no canal ${memberTarget.channel}. Cumprimente-o!`)
      findRole = 0;
    }else{
      message.reply(` Infelizmente quem você está procurando não está entre nós D:`)
    }
}

