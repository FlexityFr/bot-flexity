const { ownerID } = require('../../owner.json') 

module.exports = {
    config: {
      name: "dm",
      description: "DM un utilisateur du serveur",
      aliases: ['dm']
    },
    run: async (bot, message, args) => {
        
        if(!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES") && !ownerID.includes(message.author.id)) return;


      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!user)
        return message.channel.send(
          `Vous n'avez pas mentionné d'utilisateur ou vous avez donné un identifiant non valide`
        );
      if (!args.slice(1).join(" "))
        return message.channel.send("Vous n'avez pas spécifié votre message");
      user.user
        .send(args.slice(1).join(" "))
        .catch(() => message.channel.send("Cet utilisateur n'a pas pu recevoir de DM!"))
        .then(() => message.channel.send(`Envoyé un message à ${user.user.tag}`));
    },
  };