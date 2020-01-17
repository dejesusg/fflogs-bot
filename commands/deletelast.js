const Discord = require('discord.js');
// Command to view a parse
exports.run = async (client, message, args) => {
    // prevent bot looping with bots
    if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;
    if (message.author.id != 'Bot Owner ID Here') {
        message.reply("You are not authorized to use that command.")
        return;
    }
    if (message.content.startsWith(client.config.prefix + "deletelast")) {
        if(args[0] > 0)
            message.channel.bulkDelete(args[0]);
    }
}
