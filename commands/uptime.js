exports.run = (client, message, args) => {
    const seconds = (client.uptime / 1000) % 60 ;
    const minutes = ((client.uptime / (1000*60)) % 60);
    const hours   = ((client.uptime / (1000*60*60)) % 24);
    message.channel.send("Bot uptime: " + Math.floor(hours) + " hours, " + Math.floor(minutes) + " minutes, " + Math.floor(seconds) + " seconds.").catch(console.error);
};