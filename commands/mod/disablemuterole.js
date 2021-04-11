const db = require('quick.db');

module.exports = {
    config: {
        name: "désactiver le rôle muet",
        aliases: ['clearrôlemuet', 'mute', 'désactivermute', 'muteole'],
        description: 'Disables Server Mute Role',
        usage: '[role name | role mention | role ID]',
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Vous ne disposez pas des autorisations requises! - [ADMINISTRATOR]**")

        try {
            let a = db.fetch(`muterole_${message.guild.id}`)

            if (!a) {
                return message.channel.send("**Il n'y a pas de muterole configuré pour désactiver!**")
            } else {
                let role = message.guild.roles.cache.get(a)
                db.delete(`muterole_${message.guild.id}`)

                message.channel.send(`**\`${role.name}\` A été désactivé avec succès**`)
            }
            return;
        } catch {
            return message.channel.send("**Error - `Les autorisations ou le rôle manquants n'existent pas`**")
        }
    }
}