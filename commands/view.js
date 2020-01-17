const Discord = require('discord.js');
const request = require('request');
// Command to view a parse
exports.run = async (client, message, args) => {
    // prevent bot looping with bots
    if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;
    //
    if (message.content.startsWith(client.config.prefix + "view")) {
        const server_name = args[0];
        const fname = args[1];
        const lname = args[2];
        const fullname = fname + ' ' + lname;
        // message.reply("Checking parses for: " + fullname + " on " + server_name + "\n");
        const region = getRegion(server_name);
        function getRegion(s) {
            var na = s.match(/^(Adamantoise|Balmung|Cactuar|Coeurl|Faerie|Gilgamesh|Goblin|Jenova|Mateus|Midgardsormr|Sargatanas|Siren|Zalera|Behemoth|Brynhildr|Diabolos|Excalibur|Famfrit|Hyperion|Lamia|Leviathan|Malboro|Ultros)$/);
            var eu = s.match(/^(Cerberus|Lich|Louisoix|Moogle|Odin|Omega|Phoenix|Ragnarok|Shiva|Zodiark)$/);
            if(na != null) {
                return 'NA';
            }
            if(eu != null) {
                return 'EU';
            }
            else return 'JP';
        }
        const url = 'https://www.fflogs.com/v1/rankings/character/' + fullname + '/' + server_name + '/' + region + '/?metric=dps&api_key='+ client.config.fflogs_token;
        var rankings;
        var total_rankings;
        var log_url = String('https://www.fflogs.com/character/' + region + '/' + server_name + '/' + fname + "%20" + lname);
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const embed = new Discord.RichEmbed();
                embed.setTitle(fullname);
                embed.setURL(log_url);
                rankings = JSON.parse(body);
                total_rankings = Object.keys(rankings).length;

                var parses = [
                    {boss:"Chaos", job:"N/A", total:0, percentile:0},
                    {boss:"Midgardsormr", job:"N/A", total:0, percentile:0},
                    {boss:"Omega", job:"N/A", total:0, percentile:0},
                    {boss:"Omega-M and Omega-F", job:"N/A", total:0, percentile:0},
                    {boss:"The Final Omega", job:"N/A", total:0, percentile:0}
                ];
                var i;
                var firstFloorID = 60;
                for(i = 0; i < total_rankings; i++) {
                    if(rankings[i].encounterID == firstFloorID && parses[0].percentile < rankings[i].percentile) {
                        parses[0].job = rankings[i].spec;
                        parses[0].total = rankings[i].total;
                        parses[0].percentile = rankings[i].percentile;
                    } else
                    if(rankings[i].encounterID == firstFloorID+1 && parses[1].percentile < rankings[i].percentile) {
                        parses[1].job = rankings[i].spec;
                        parses[1].total = rankings[i].total;
                        parses[1].percentile = rankings[i].percentile;
                    } else
                    if(rankings[i].encounterID == firstFloorID+2 && parses[2].percentile < rankings[i].percentile) {
                        parses[2].job = rankings[i].spec;
                        parses[2].total = rankings[i].total;
                        parses[2].percentile = rankings[i].percentile;
                    } else
                    if(rankings[i].encounterID == firstFloorID+3 && parses[3].percentile < rankings[i].percentile) {
                        parses[3].job = rankings[i].spec;
                        parses[3].total = rankings[i].total;
                        parses[3].percentile = rankings[i].percentile;
                    } else
                    if(rankings[i].encounterID == firstFloorID+4 && parses[4].percentile < rankings[i].percentile) {
                        parses[4].job = rankings[i].spec;
                        parses[4].total = rankings[i].total;
                        parses[4].percentile = rankings[i].percentile;
                    }
                    else continue;
                }
                for(i = 0; i < parses.length; i++) {
                    var job = "**" + parses[i].job + "** | "
                    var dpsandper = parses[i].total + "\t-- " + "**[" + parses[i].percentile + "%]**";
                    var parseinfo = job + '\t' + dpsandper;
                    embed.addField(parses[i].boss, parseinfo);
                }
                var average = (parses[0].percentile + parses[1].percentile + parses[2].percentile + parses[3].percentile + parses[4].percentile)/5
                // setting embed ribbon color depending on parse average
                if(average < 25)  embed.setColor(0xd3d3d3);
                else if(average >= 25 && average <= 49)  embed.setColor(0x7cfc00);
                else if(average >= 50 && average <= 74)  embed.setColor(0x0000ff);
                else if(average >= 75 && average <= 94)  embed.setColor(0x9013FE);
                else if(average >= 95 && average <= 99)  embed.setColor(0xffa500);
                else embed.setColor(0xffd700);
                message.channel.send({embed});
            }
        });
    }
};
