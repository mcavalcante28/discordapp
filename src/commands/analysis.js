const {format, formatISO, compareAsc, getYear} = require('date-fns')

let idMembers = [];
let cont = 0;
let dateMembers = [];
const yearOne = [];
exports.run = async(client, message) => {

  const currentYear = getYear(new Date());
  const initialYear = getYear(new Date(message.guild.joinedTimestamp))
  let arrayYears = [];
    for(i = initialYear; i === currentYear ; i++) {
      arrayYears[i] = initialYear+1;
    }
    console.log(arrayYears)
  
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

  ordernedDates.map((date, index) =>{
    if(compareAsc(date, new Date(2018,0,1)) === -1 ){
      yearOne[index] = format(date, 'dd.MM.yyyy');
    }
  })
  console.log(format(new Date(2018,1,1), 'dd.MM.yyyy'));
  // console.log(yearOne)



}