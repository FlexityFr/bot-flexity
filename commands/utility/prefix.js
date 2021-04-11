const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const { PREFIX } = require("../../config")

module.exports = {
    config: {
        name: "prefix",
        description: "Chnage / Know Le préfixe du serveur ou le préfixe global",
        usage: "m / préfixe <nouveau préfixe / réinitialisation>",
        example: "1) m/prefix = \n2) m/réinitialisation du préfixe",
        aliases: ["prefix"]
    },

    run: async (bot, message, args) => {
        let option = args[0];

            //PERMISSION
     if(!message.member.hasPermission("MANAGE_GUILD")) {
                return message.channel.send("Vous n'êtes pas autorisé ou n'avez pas l'autorisation de modifier le préfixe")
              }
            
            if(!option) {
                prefix = db.fetch(`prefix_${message.guild.id}`)
                if (!prefix) prefix = PREFIX;
                let prefEmbed = new MessageEmbed()
                .setColor('YELLOW')
                .setThumbnail(message.guild.iconURL())
                .setDescription(`**\nMon préfixe pour \`${message.guild.name}\`  est  **` - `  \`${prefix}\` \n**Type \`${prefix}help\` pour aider**`)
              
              message.channel.send(prefEmbed);
            }

            if(option.toLowerCase() === "réinitialiser") {
                db.delete(`prefix_${message.guild.id}`)
                return await message.channel.send("Préfixe réinitialisé ✅")
            }
            
            if(args[1]) {
              return message.channel.send("Vous ne pouvez pas définir de préfixe un double argument")
            }
            
            if(args[0].length > 4) {
              return message.channel.send("Vous ne pouvez pas envoyer de préfixe de plus de 4 caractères")
            }
            
            if(args.join("") === PREFIX) {
              db.delete(`prefix_${message.guild.id}`)
             return await message.channel.send("Préfixe réinitialisé ✅")
            }
            
            db.set(`prefix_${message.guild.id}`, args[0])
          await message.channel.send(`Fait ✅ | Préfixe de bot défini sur ${args[0]}`)
            

        }
        
    }