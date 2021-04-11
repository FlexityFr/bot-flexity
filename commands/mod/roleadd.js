const { MessageEmbed } = require("discord.js");
const { ownerID } = require("../../owner.json")
module.exports = {
  config: {
    name: "roleadd",
    description: "Ajouter un rôle à un membre ",
    usage: "m / roleadd <mention / id du membre> <mention du rôle / id du rôle>",
    aliases: ['role add', 'radd']
  },
  run: async (client, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES"]) && !ownerID.includes(message.author.id)) return message.channel.send("Vous n'êtes pas autorisé à exécuter cette commande!")

    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!rMember) return message.channel.send("Veuillez fournir un utilisateur pour ajouter un rôle également.")
    
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    
    if(!role) return message.channel.send("Veuillez fournir un rôle à ajouter audit utilisateur.") 
    

    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("Je n'ai pas l'autorisation d'exécuter cette commande. Veuillez me donner l'autorisation de gérer les rôles!")

    if(rMember.roles.cache.has(role.id)) {
        
      return message.channel.send(`${rMember.displayName}, a déjà le rôle!`)
    
    } else {
        
      await rMember.roles.add(role.id).catch(e => console.log(e.message))
      
      message.channel.send(`${rMember.displayName} a été ajouté à **${role.name}**`)
    
    }

  },
};