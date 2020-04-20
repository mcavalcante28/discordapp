const {format,getMonth,compareAsc, getYear} = require('date-fns')
const Discord = require("discord.js");
let idMembers = [];
let cont = 0;
let dateMembers = [];
let entries4Year = []
let entries4Month = [1];

exports.run = async(client, message) => {
  const currentYear = getYear(new Date());
  const initialYear = getYear(new Date(message.guild.createdAt))
  let arrayYears = [];
  let arrayMonths = ['Janeiro','Feveireiro','Março',
                      'Abril','Maio','Junho',
                      'Julho','Agosto','Setembro',
                      'Outubro','Novembro','Dezembro'];

  let initYear = initialYear

  for(var i = 0;i<=(currentYear-initialYear);i++){
    arrayYears[i] = initYear;
    initYear++;
  }
  message.guild.members.cache.map(member => {
    
    if(!member.user.bot){
      idMembers[cont] = member.user.id;
      cont++;
    }
  })
  idMembers.map((id, index) =>{
    dateMembers[index] = new Date(message.guild.members.cache.get(id).joinedTimestamp);
  })
  const ordernedDates = dateMembers.sort(compareAsc);


  const args = message.content.slice(1).split(' ');
  
  if(args.length >= 2){
    switch (args[1]){
      case 'mensal':
        arrayMonths.map((month, index)=>{
          entries4Month[index] = ordernedDates.filter(date => getMonth(date) === index && getYear(date) === parseInt(args[2]));
        })
        const Embed1 = new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle(`${message.guild.name}`)
        .setColor("RANDOM")
        .setDescription(`Contagem de novos membros por mês no ano de ${args[2]}`)
        .addFields(arrayMonths.map((month ,index) =>{
          return(
            { name: `${arrayMonths[index]}`, value: `${entries4Month[index].length}`, inline:true}
          )
        })
        )
        message.reply(Embed1);
        break;


      case 'anual':
        arrayYears.map((year, index) => {
          entries4Year[index] = ordernedDates.filter(date => getYear(date) === year);
        })
        const Embed2 = new Discord.MessageEmbed()
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
        message.reply(Embed2);
        break;
    }
  }


}