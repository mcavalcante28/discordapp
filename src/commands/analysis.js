const {format, addDays, addYears, subDays, subYears, addMonths, subMonths} = require('date-fns')

let idMembers = [];
let cont = 0;
let dateMembers = [];
exports.run = async(client, message) => {

  // console.log(message.guild.members);
  message.guild.members.cache.map(member => {
    
    if(!member.user.bot){
      idMembers[cont] = member.user.id;
      cont = cont+1
    }
  })
  idMembers.map((id, index) =>{
    dateMembers[index] = message.guild.members.cache.get(id).joinedTimestamp;
  })

  console.log(dateMembers);
}