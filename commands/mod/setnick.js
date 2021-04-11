const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    config: {
        name: "setnick",
        aliases: ["sn", 'nick'],
        category: "moderation",
        description: "Définit ou modifie le pseudo d'un utilisateur",
        usage: "[mention | nom | surnom | ID] <pseudo>",
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**Vous ne disposez pas des autorisations nécessaires pour modifier le pseudo! - [MANAGE_GUILD]**");

        if (!message.guild.me.hasPermission("CHANGE_NICKNAME")) return message.channel.send("**Je n'ai pas l'autorisation de changer de pseudo! - [CHANGE_NICKNAME]**");
      
        if (!args[0]) return message.channel.send("**Veuillez entrer un utilisateur!**")
      
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
        if (!member) return message.channel.send("**Merci d'entrer un nom d'utilisateur!**");

        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**Impossible de définir ou de modifier le pseudo de cet utilisateur!**')

        if (!args[1]) return message.channel.send("**Veuillez saisir un pseudo**");

        let nick = args.slice(1).join(' ');

        try {
        member.setNickname(nick)
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`**Changement de surnom de ${member.displayName} to ${nick}**`)
        message.channel.send(embed)
        } catch {
            return message.channel.send("**Permissions manquantes - [CHANGE_NICKNAME]")
        }

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        const sembed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#ff0000")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Moderation**", "setpseudo")
            .addField("**pseudo a changé de**", member.user.username)
            .addField("**pseudo Changé par**", message.author.username)
            .addField("**pseudo Changé en**", args[1])
            .addField("**Date**", message.createdAt.toLocaleString())
            .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(sembed)
    }
}