const { ownerID } = require('../../owner.json') 

module.exports = {
    config: {
        name: "purge",
        aliases: [],
        category: "moderation",
        description: "Supprime les messages d'un channel",
        usage: "m / purge [quantité de messages]"
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous ne disposez pas des autorisations suffisantes!- [MANAGE_MESSAGES]")
        if (isNaN(args[0]))
            return message.channel.send('**Veuillez fournir un montant valide pour supprimer les messages!**');

        if (args[0] > 100)
            return message.channel.send("**Veuillez fournir un nombre inférieur à 100!**");

        if (args[0] < 1)
            return message.channel.send("**Veuillez fournir un nombre supérieur à 1!**");

        message.channel.bulkDelete(args[0])
            .then(messages => message.channel.send(`**Supprimé avec succès \`${messages.size}/${args[0]}\` messages**`).then(msg => msg.delete({ timeout: 5000 }))).catch(() => null)
    }
}