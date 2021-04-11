var Discord = require('discord.js')
const fs = require("fs")
const { PREFIX } = require("../../config")
const db = require('quick.db')
const { stripIndents } = require("common-tags");

module.exports = {
config: {
    name: "help",
    description: "Help Menu",
    usage: "1) m / help \ n2) m / help [nom du module] \ n3) m / help [commande (nom ou alias)]",
    example: "1) m / aide \ n2) m / utilitaire d'aide \ n3) m / interdiction d'aide",
    aliases: ['h']
},
run: async (bot, message, args) => {
    let prefix;
    if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };

if(message.content.toLowerCase() === `${prefix}help`){
    var log = new Discord.MessageEmbed()
    .setTitle("**Menu d'aide: principal**")
    .setColor(`#d9d9d9`)
    .addField(`**👑Moderation**`, `[ \`${prefix}aide mod\` ]`, true)
    .addField(`**⚙️Utilitaire**`, `[ \`${prefix}utilitaire d'aide\` ]`, true)

message.channel.send(log);
} 
else if(args[0].toLowerCase() === "mod") {
    var commandArray = "1) Ban \ n2) Kick \ n3) Whois \ n4) Unban \ n5) Warn \ n6) Mute \ n7) Purge \ n8) Slowmode \ n9) Nick \ n10) Roleinfo"
    var commandA2 = "11) Rolememberinfo \ n12) Setmodlog \ n13) Disablemodlog \ n14) Verrouiller (Verrouiller le canal) \ n15) Déverrouiller (Déverrouiller le canal) \ n16) Verrouiller (Verrouiller complètement tout le serveur. [POUR LES URGENCES UNIQUEMENT]) \ n17) Hackban \\ forceban <id>"
    
    pageN1 = "**\n💠Commands: **\n`\`\`js\n" + commandArray + "\`\`\`";
    pageN2 = "**\n💠Commands: **\n`\`\`js\n" + commandA2 + "\`\`\`";
    
    let pages = [pageN1, pageN2]
    let page = 1 

    var embed = new Discord.MessageEmbed()
        .setTitle('**Menu Aide: [Modération]👑**')
        .setColor("#d9d9d9") // Set the color
        .setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
        .setDescription(pages[page-1])

        message.channel.send({embed}).then(msg => {
            msg.react('⬅').then( r => {
            msg.react('➡')
            
            // Filters
            const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id
            const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id
            
            const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000})
            const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000})
            
            backwards.on('collecter', (r, u) => {
                if (page === 1) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
                page--
                embed.setDescription(pages[page-1])
                embed.setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
                msg.edit(embed)
                r.users.remove(r.users.cache.filter(u => u === message.author).first())
            })
            
            forwards.on('collecter', (r, u) => {
                if (page === pages.length) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
                page++
                embed.setDescription(pages[page-1])
                embed.setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
                msg.edit(embed)
                r.users.remove(r.users.cache.filter(u => u === message.author).first())
            })
            
            
            })
            })
}

else if(args[0].toLowerCase() === "util") {
    var embed = new Discord.MessageEmbed()
    .setTitle('**Menu Aide: [Utilitaire]**')
    .setColor("#d9d9d9") // Set the color
    .setDescription("```js" + `1) Prefix [${prefix}préfixe d'aide pour plus d'informations] \ n 2) Aide [${prefix}aide pour plus d'informations]` + "```")
}

else {
    const embed = new Discord.MessageEmbed()
    .setColor("#d9d9d9")
    .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL())
    .setThumbnail(bot.user.displayAvatarURL())

    let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
    if (!command) return message.channel.send(embed.setTitle("**Commande non valide!**").setDescription(`**Fais \`${prefix}help\` Pour la liste des commandes!**`))
    command = command.config

    embed.setDescription(stripIndents`
    ** Command -** [    \`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\`   ]\n
    ** Description -** [    \`${command.description || "Aucune description fournie."}\`   ]\n
    ** Usage -** [   \`${command.usage ? `\`${command.usage}\`` : "Pas d'utilisation"}\`   ]\n
    ** Examples -** [   \`${command.example ? `\`${command.example}\`` : "Aucun exemple trouvé"}\`   ]\n
    ** Aliases -** [   \`${command.aliases ? command.aliases.join(" , ") : "Rien."}\`   ]`)
    embed.setFooter(message.guild.name, message.guild.iconURL())

    return message.channel.send(embed)
}

    

}

}