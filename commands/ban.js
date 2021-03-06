exports.run = (client, message, [mention, ...reason]) => {
    const modRole = message.guild.roles.find(role => role.name === "Moderator");
    if (!modRole)
      return console.log("The Mods role does not exist");
  
    if (!message.member.roles.has(modRole.id))
      return message.reply("You can't use this command.");
  
    if (message.mentions.members.size === 0)
      return message.reply("Please mention a user to kick");
  
    if (!message.guild.me.hasPermission("KICK_MEMBERS"))
      return message.reply("");
  
    const banMember = message.mentions.members.first();
  
    banMember.ban(reason.join(" ")).then(member => {
      message.reply(`${member.user.username} was succesfully **BANNED**.`);
    });
  };