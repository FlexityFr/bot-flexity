module.exports = {
    config: {
          name: "slowmode",
          description: "Définir le mode lent pour le canal!",
          aliases: ['sm']
    },
  run: async (bot, message, args) => {
  
    if (!args[0])
      return message.channel.send(
        `Vous n'avez pas spécifié la durée en secondes pendant laquelle vous souhaitez régler le mode lent de cette channel également!`
      );
      
    if (isNaN(args[0])) return message.channel.send(`Ce n'est pas un nombre!`);
    
    message.channel.setRateLimitPerUser(args[0]);
    message.channel.send(
      `Réglez également le mode lent de ce channel **${args[0]}**`
    );
  },
};