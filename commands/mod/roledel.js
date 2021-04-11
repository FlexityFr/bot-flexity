const { MessageEmbed } = require("discord.js");
module.exports = {
  config: {
    name: "roledel",
    description: "Supprimer un rôle d'un membre",
    usage: "m / roledel <mention du membre / id du membre> <mention du rôle / id du rôle>",
    aliases: ['role del ',' role delete ',' rdel']
  },
  run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.channel.send("Vous n'êtes pas autorisé à exécuter cette commande!")

    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!rMember) return message.channel.send("Veuillez indiquer un utilisateur pour lequel supprimer un rôle.")
    
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    
    if(!role) return message.channel.send("Veuillez indiquer un rôle à supprimer dudit utilisateur.") 
    

    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("Je n'ai pas l'autorisation d'exécuter cette commande. Veuillez me donner l'autorisation de gérer les rôles!")

    if(!rMember.roles.cache.has(role.id)) {
      let rolDEL_err = new MessageEmbed()
      .setColor(`#FF0000`)
      .setDescription(`Erreur ❌ | ${rMember.displayName}, N'a pas ce rôle!`);

      return message.channel.send(rolDEL_err)
    
    } else {

      await rMember.roles.remove(role.id).catch(e => console.log(e.message))
      
      let rolDEL = new MessageEmbed()
      .setColor(`#00FF00`)
      .setDescription(`Succès ✅ | ${rMember} a été supprimé de **${role.name}**`)

      message.channel.send(rolDEL)
    
    }

  },
};
