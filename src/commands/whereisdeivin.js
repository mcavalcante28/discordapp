const targetRole = 'marcus';
var targetRoleID = [];

exports.run = async (client, message) => {

  message.guild.roles.cache.filter(role =>{
    if(message.guild.roles.cache.get(role.id).name === targetRole){
        targetRoleID = role.id;
        console.log('Role ID: ' + targetRoleID)
    } if(!targetRoleID){
      targetRoleID = [];
    }
  })
  console.log(targetRoleID);
    message.guild.channels.cache.filter((channel, index) => {
      if(channel.type === 'voice' && channel.members){
        channel.members.filter(member =>{
          member._roles.find(role =>{
            if(role === targetRoleID){
              message.reply(`${member.user.username} está no canal ${channel.name}`)
            } else{ 
              message.reply(`Deivin is not playing`)
            }
          })
        })
      } else{
        message.reply(`Deivin is not playing`)
      }
    })
}

