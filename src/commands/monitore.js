const {format} = require('date-fns')
var date;
exports.run = async (client, message) => {


  client.on('presenceUpdate', (oldMember, newMember) =>{
    client.guilds.cache.get(message.guild.id).channels.cache.map(channel =>{
      if(channel.type === 'voice' && channel.members){
        date = format(new Date(), 'dd.MM.yyyy');
        console.log(date)
      } 
    })
  })

}
