const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
    
        name: "assourdir",
        description: "Assourdir un membre dans un canal vocal",
        usage: "assourdir <user>",
        aliases: ["deaf"]
       
    },

    run: async(bot, message, args) => {
         if (!message.member.hasPermission("DEAFEN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**Vous ne disposez pas des autorisations nécessaires pour interdire les utilisateurs! - [DEAFEN_MEMBERS]**");
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return message.channel.send("Impossible de trouver l'utilisateur mentionné dans ce serveur.")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Aucune raison fournie"


        try {
            member.voice.setDeaf(true, reason);
            message.channel.send("Succès ✅: membre assourdi")
        } 
        
        catch(error) {
            console.log(error)
            message.channel.send("Oops! Une erreur inconnue s'est produite. Veuillez réessayer plus tard.")
        }

    }
}