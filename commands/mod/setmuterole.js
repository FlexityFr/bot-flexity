const db = require("quick.db");

module.exports = {
  config: {
    name: "setmuterole",
    aliases: ["setmute", "smrole", "smr"],
    description: "Définit un rôle muet pour les utilisateurs muets!",
    usage: "[nom du rôle | mention de rôle | ID de rôle]",
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "**Vous ne disposez pas des autorisations requises! - [ADMINISTRATOR]**"
      );
    if (!args[0]) {
      let b = await db.fetch(`muterole_${message.guild.id}`);
      let roleName = message.guild.roles.cache.get(b);
      if (message.guild.roles.cache.has(b)) {
        return message.channel.send(
          `**Muterole défini dans ce serveur est \`${roleName.name}\`!**`
        );
      } else
        return message.channel.send(
          "**Veuillez saisir un nom de rôle ou un ID à définir!**"
        );
    }

    let role =
      message.mentions.roles.first() ||
      bot.guilds.cache.get(message.guild.id).roles.cache.get(args[0]) ||
      message.guild.roles.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role)
      return message.channel.send("**Veuillez saisir un nom ou un identifiant de rôle valide!**");

    try {
      let a = await db.fetch(`muterole_${message.guild.id}`);

      if (role.id === a) {
        return message.channel.send(
          "**Ce rôle est déjà défini comme muterole!**"
        );
      } else {
        db.set(`muterole_${message.guild.id}`, role.id);

        message.channel.send(
          `**\`${role.name}\` A été défini avec succès comme Muterole!**`
        );
      }
    } catch (e) {
      return message.channel.send(
        "**Error - `Les autorisations ou le rôle manquants n'existent pas!`**",
        `\n${e.message}`
      );
    }
  }
};
