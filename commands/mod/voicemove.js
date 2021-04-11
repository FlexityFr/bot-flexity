const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
    
        name: "vcmove",
        description: "déplace un membre d'un canal vocal à un autre",
        usage: "vcmove <user> <channel>",
       
    },

    run: async(bot, message, args) => {
         if (!message.member.hasPermission("MOVE_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**Vous ne disposez pas des autorisations nécessaires pour interdire les utilisateurs! - [MOVE_MEMBERS]**");
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return message.channel.send("Impossible de trouver l'utilisateur mentionné dans cette guilde.")

        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[1]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
        if (!channel.type === "voice") return message.channel.send("Impossible de localiser le channel vocal. Assurez-vous de mentionner un channel vocal et non un channel texte!") 

        try {
            member.voice.setChannel(channel);
            message.channel.send("Succès ✅: membre déplacé!")
        } 
        
        catch(error) {
            console.log(error);
            message.channel.send("Oops! Une erreur inconnue s'est produite. Veuillez réessayer plus tard.")
        }

    }
}