const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const Enmap = require("enmap");

client.config = require("./config.json");
// Music Modules
client.music = require("discord.js-musicbot-addon");
// Following the previous example.
client.music.start(client, {
  // Set the api key used for YouTube.
  youtubeKey: client.config.youtube_token,
  botPrefix: "-",
  anyoneCanSkip: true,
  // Make it so the owner (you) bypass permissions for music.
  ownerOverMember: true,
  ownerID: "68467110958866432",
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`${client.config.prefix}command`, {type: "PLAYING"})
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});
client.login(client.config.token);
