const targetRole = 'marcus';
var targetRoleID = [];

exports.run = async (client, message) => {

  message.guild.roles.cache.filter(role =>{
    if(message.guild.roles.cache.get(role.id).name === targetRole){
        targetRoleID = role.id;
    }
  })
    message.guild.channels.cache.filter((channel, index) => {
      if(channel.type === 'voice'){
        channel.members.filter((member, index) =>{
          member._roles.filter(role =>{
            if(role === targetRoleID){
              message.reply(`${member.user.username} está no canal ${channel.name}`)
            }
          })
        })
      }
    })

}

