const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

  const categoryID = "928614555272245288"

  var userName = message.author.username;

  var userDiscriminator = message.author.discriminator;

  var reason = args.join(" ");
  if(!reason) return message.channel.send("Gelieve een reden mee te geven.");

  var ticketBestaat = false;

  message.guild.channels.cache.forEach((channel)) ; {

   if(channel.name == userName.tolowerCase() + "-" + userDiscriminator) {

   message.channel.send("Je hebt al een ticket aangemaakt.");

   ticketBestaat = true;

   return;

   }

  if (ticketBestaat) return; 

  message.guild.channels.create(userName.tolowerCase() + "-" + userDiscriminator, {type: "text"}).then((createdChan) =>{

    createdChan.setParent(categoryID).then((settedParent) => {

      // Perms zodat iedereen niets kan lezen.
settedParent.permissionOverwrites.edit(message.guild.roles.cache.find(x => x.name === "@everyone"), {
 
  SEND_MESSAGES: false,
  VIEW_CHANNEL: false

});

// READ_MESSAGE_HISTORY Was vroeger READ_MESSAGES
// Perms zodat de gebruiker die het command heeft getypt alles kan zien van zijn ticket.
settedParent.permissionOverwrites.edit(message.author.id, {
  CREATE_INSTANT_INVITE: false,
  READ_MESSAGE_HISTORY: true,
  SEND_MESSAGES: true,
  ATTACH_FILES: true,
  CONNECT: true,
  ADD_REACTIONS: true
});

// Perms zodat de gebruikers die admin zijn alles kunnen zien van zijn ticket.
settedParent.permissionOverwrites.edit(message.guild.roles.cache.find(x => x.name === "Support Team"), {
  CREATE_INSTANT_INVITE: false,
  READ_MESSAGE_HISTORY: true,
  SEND_MESSAGES: true,
  ATTACH_FILES: true,
  CONNECT: true,
  ADD_REACTIONS: true
});

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0'); // Nul toevoegen als het bv. 1 is -> 01
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
today = `${dd}/${mm}/${yyyy}`;


   let embedParent = new discord.MessageEmbed()
   .setAuthor(message.author.username, message.author.displayAvatarURL({ size: 4096 }))
   .setTitle('Nieuw Ticket')
   .addField(
     {name: "Reden", value: reason , inline: true},
     {name: "Aangemaakt op", value: today , inline: true }
   );

   message.channel.send('Ticket is aangemaakt.');

   settedParent.send({embeds: [embedParent] });

    }).catch(err =>{
      message.channel.send('Er is iets mis gelopen');
    });

  }).catch(err =>{
    message.channel.send('Er is iets mis gelopen');
  });


  }

}

module.exports.help = {
    name: "ticket"
}