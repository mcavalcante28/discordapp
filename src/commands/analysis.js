const {format, formatISO, compareAsc, getYear} = require('date-fns')
const Discord = require("discord.js");
let idMembers = [];
let cont = 0;
let dateMembers = [];
const yearOne = [];
let entries4Year = []
exports.run = async(client, message) => {


  const currentYear = getYear(new Date());
  const initialYear = getYear(new Date(message.guild.createdAt))
  let arrayYears = [];

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
  // message.reply(`Entraram em 2017 ${entries4Year[0].length}, 2018 ${entries4Year[1].length}, 2019 ${entries4Year[2].length}`)

  const exampleEmbed = new Discord.MessageEmbed()
  .setTimestamp()
  .setTitle(`${message.guild.name}`)
  .setColor("RANDOM")
  .setDescription(`Crescimento do servidor ${message.guild.name}`)
  .addFields( arrayYears.map((year,index) =>{
    return(
      { name: `Ano: ${year}`, value: `Novos membros: ${entries4Year[index].length}`}
    )
  })
		
	)


message.reply(exampleEmbed);



}