const {format,getMonth,compareAsc, getYear} = require('date-fns')
const Discord = require("discord.js");
let idMembers = [];
let cont = 0;
let dateMembers = [];
let entries4Year = []
let entries4Month = [];
let test = []

exports.run = async(client, message) => {


  const currentYear = getYear(new Date());
  const initialYear = getYear(new Date(message.guild.createdAt))
  let arrayYears = [];
  let arrayMonths = [1,2,3,4,5,6,7,8,9,10,11,12];
  let initYear = initialYear

  for(var i = 0;i<=(currentYear-initialYear);i++){
    arrayYears[i] = initYear;
    initYear++;
  }
  message.guild.members.cache.map(member => {
    
    if(!member.user.bot){
      idMembers[cont] = member.user.id;
      cont = cont+1
    }
  })
  idMembers.map((id, index) =>{
    dateMembers[index] = new Date(message.guild.members.cache.get(id).joinedTimestamp);
  })
  const ordernedDates = dateMembers.sort(compareAsc);

  arrayYears.map((year, index) => {
    entries4Year[index] = ordernedDates.filter(date => getYear(date) === year);
  })
  
  arrayYears.map((year, index_i) => {
    arrayMonths.map((month, index)=>{
      entries4Month[index] = ordernedDates.filter(date => getMonth(date) === index && getYear(date) === year);
    })
  })

  console.log(entries4Month)
  const Embed = new Discord.MessageEmbed()
  .setTimestamp()
  .setTitle(`${message.guild.name}`)
  .setColor("RANDOM")
  .setDescription(`Crescimento do servidor ${message.guild.name}`)
  .addFields(arrayYears.map((year,index) =>{
    return(
      { name: `${year}`, value: `${entries4Year[index].length}`, inline:true}
    )
  })
		
	)
message.reply(Embed);

}