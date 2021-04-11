const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
        name: "ban",
        aliases: ["b", "bannir"],
        description: "Bannir l'utilisateur",
        usage: "[nom | pseudo | mention | ID] <raison> (facultatif)",
    },
    run: async (bot, message, args) => {
        try {
            if (!message.member.hasPermission("BAN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**Vous n'avez pas l'autorisation d'interdire les utilisateurs! - [BAN_MEMBERS]**");
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("**Je n'ai pas les autorisations pour interdire les utilisateurs! - [BAN_MEMBERS]**");
            if (!args[0]) return message.channel.send("**Veuillez fournir un utilisateur à bannir!**")

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!banMember) return message.channel.send("**L'utilisateur n'est pas dans le serveur**");
            if (banMember === message.member) return message.channel.send("**Vous ne pouvez pas vous interdire**")

            var reason = args.slice(1).join(" ");

            if (!banMember.bannable) return message.channel.send("**Je ne peux pas kick l'utilisateur**")
            try {
            message.guild.members.ban(banMember)
            banMember.send(`**Bonjour, vous avez été banni de ${message.guild.name} pour - ${reason || "Sans raison"}**`).catch(() => null)
            } catch {
                message.guild.members.ban(banMember)
            }
            if (reason) {
            var sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${banMember.user.username}** a été banni pour ${reason}`)
            message.channel.send(sembed)
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${banMember.user.username}** a été banni`)
            message.channel.send(sembed2)
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "ban")
                .addField("**Banni**", banMember.user.username)
                .addField("**ID**", `${banMember.id}`)
                .addField("**Banni Par**", message.author.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
};