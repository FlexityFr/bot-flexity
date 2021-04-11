const Discord = require("discord.js")
const moment = require('moment');

const status = {
    online: "Online",
    idle: "Inactif",
    dnd: "Ne pas déranger",
    offline: "Offline/Invisible"
};

module.exports = {
    config: {
        name: "whois",
        description: "userinfo",
        usage: "m / whois <mentionner un membre / identifiant de membre>",
        aliases: ['ui', 'userinfo']
    },
    run: async (bot, message, args) => {
        var permissions = [];
        var acknowledgements = 'Rien';
        let whoisPermErr = new Discord.MessageEmbed()
        .setTitle("**Erreur d'autorisation utilisateur!**")
        .setDescription("**Désolé, vous ne disposez pas des autorisations nécessaires pour l'utiliser! ❌**")

        if(!message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES") ) return message.channel.send(whoisPermErr)

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        

        if(member.hasPermission("KICK_MEMBERS")){
            permissions.push("Kick Members");
        }
        
        if(member.hasPermission("BAN_MEMBERS")){
            permissions.push("Ban Members");
        }
        
        if(member.hasPermission("ADMINISTRATOR")){
            permissions.push("Administrateur");
        }
    
        if(member.hasPermission("MANAGE_MESSAGES")){
            permissions.push("Gérer les messages");
        }
        
        if(member.hasPermission("MANAGE_CHANNELS")){
            permissions.push("Gérer les Channels");
        }
        
        if(member.hasPermission("MENTION_EVERYONE")){
            permissions.push("Mention Everyone");
        }
    
        if(member.hasPermission("MANAGE_NICKNAMES")){
            permissions.push("Gérer les Pseudo");
        }
    
        if(member.hasPermission("MANAGE_ROLES")){
            permissions.push("Gérer les Roles");
        }
    
        if(member.hasPermission("MANAGE_WEBHOOKS")){
            permissions.push("Gérer les Webhooks");
        }
    
        if(member.hasPermission("MANAGE_EMOJIS")){
            permissions.push("Gérer les Emojis");
        }
    
        if(permissions.length == 0){
            permissions.push("Aucune autorisation de clé trouvée");
        }
    
        if(member.user.id == message.guild.ownerID){
            acknowledgements = 'Propriétaire du serveur';
        }
    
        const embed = new Discord.MessageEmbed()
            .setDescription(`<@${member.user.id}>`)
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setColor('#2F3136')
            .setFooter(`ID: ${message.author.id}`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .addField("__Status__",`${status[member.user.presence.status]}`, true)
            .addField('__Rejoint à:__ ',`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
            .addField('__Créé sur__', member.user.createdAt.toLocaleString(), true)
            .addField(`\n__Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]__`,`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "Aucun rôle"}`, true)
            .addField("\n__Remerciements:__ ", `${acknowledgements}`, true)
            .addField("\n__Permissions:__ ", `${permissions.join(` | `)}`);
            
        message.channel.send({embed});
    
    }
    }
