const db = require("quick.db")

module.exports = {
    config: {
        name: "setmodlogchannel",
        category: "moderation",
        aliases: ['setm', 'sm', 'smc', 'setmodlog'],
        description: "Définit un channel sur lequel le bot peut envoyer des journaux de modération!",
        usage: "[mention de la chaîne | ID de channel | nom du channel]",
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Vous ne disposez pas des autorisations requises! - [ADMINISTRATOR]**")
    if (!args[0]) {
      let b = await db.fetch(`modlog_${message.guild.id}`);
      let channelName = message.guild.channels.cache.get(b);
      if (message.guild.channels.cache.has(b)) {
        return message.channel.send(
          `**Le Channel Modlog défini sur ce serveur est \`${channelName.name}\`!**`
        );
      } else
        return message.channel.send(
          "**Veuillez saisir un nom ou un identifiant de chaîne à définir!**"
        );
    }
        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!channel || channel.type !== 'text') return message.channel.send("**Veuillez saisir un channel de texte valide!**");

        try {
            let a = await db.fetch(`modlog_${message.guild.id}`)

            if (channel.id === a) {
                return message.channel.send("**Ce channel est déjà défini comme channel Modlog!**")
            } else {
                bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("**Ensemble de channel Modlog!**")
                db.set(`modlog_${message.guild.id}`, channel.id)

                message.channel.send(`**Le channel Modlog a été défini avec succès dans \`${channel.name}\`!**`)
            }
        } catch {
            return message.channel.send("**Erreur - `Les autorisations manquantes ou le canal n'est pas un canal de texte!`**");
        }
    }
};