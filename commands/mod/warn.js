const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        name: "warn",
        description: "warn members",
        usage: "m / warn <mention du membre / identifiant du membre> [raison]",
        aliases: []
    },
    run: async (bot, message, args) => {
        let warnPermErr = new MessageEmbed()
        .setTitle("**Erreur d'autorisation utilisateur!**")
        .setDescription("**Désolé, vous ne disposez pas des autorisations nécessaires pour l'utiliser! ❌**")
            if(!message.channel.permissionsFor(message.member).has(['MANAGE_MESSAGES'])) return message.channel.send(warnPermErr);
    
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if(!member) return message.reply("Veuillez mentionner un membre valide de ce serveur");
        
            let reason = args.slice(1).join(' ');
            if(!reason) reason = "(Aucune raison fournie)";
            
            member.send(`Vous avez été averti par <${message.author.username}> Pour cette raison: ${reason}`)
            .catch(error => message.channel.send(`Pardon <${message.author}> Je n'ai pas pu prévenir à cause de : ${error}`));
            let warnEmbed = new MessageEmbed()
            .setTitle("**__Rapport d'avertissement__**")
            .setDescription(`**<@${member.user.id}> a été averti par <@${message.author.id}>**`)
            .addField(`**Reason:**`, `\`${reason}\``)
            .addField(`**Action:**`, `\`Warn\``)
            .addField(`**Moderator:**`, `${message.author}`)

            message.channel.send(warnEmbed)

    }
}