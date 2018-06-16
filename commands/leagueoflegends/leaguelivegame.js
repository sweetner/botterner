const commando = require('discord.js-commando');
const Discord = require('discord.js');

const LeagueJs = require('leaguejs');
const api = new LeagueJs(process.env.RIOT_API);


class LeagueLiveGameCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'leaguelivegame',
			group: 'leagueoflegends',
			memberName: 'leaguelivegame',
            description: 'Shows data of a live game of a player.',
            examples: ['s!leaguelivegame `na|euw|eune|tr|ru` `summoner name`'],
			throttling: {
				usages: 1,
				duration: 10
            },
            args: [
                {
                    key: 'text',
                    prompt: 'Whats the desired server?',
                    type: 'string',
                    default: ''
                }
            ]
		});
	}

    async run(message, {text}) 
    {
        const botMsg = await message.reply('Generating the game data... if it takes too long there might be a problem.');
        var server = text.substring(0, text.indexOf(' ')).toLowerCase();
        var summonername = text.substring(text.indexOf(' ')).replace(/\s+/g, ' ').trim();
        if (!(server == 'na' || server == 'euw' || server == 'eune' || server == 'ru' || server == 'tr'))
            return botMsg.edit(`Server is not supported.\nThe supported servers are \`na euw eune ru tr\`\nPlease make sure you type the server first!`);
        if (summonername.length > 16)
            return botMsg.edit(`The summoner name is too long to be real!`);
        api.Summoner
            .gettingByName(summonername, server)
            .then(sum => {
                api.Spectator
                    .gettingActiveGame(sum.id, server)
                    .then(spect => {
                        api.StaticData
                            .gettingChampions(server, {dataById : true})
                            .then(champ => {
                                var blueTeamData = {players: '', bans: ''};
                                var redTeamData = {players: '', bans: ''};
                                var gameType;
                                console.log(spect.bannedChampions)
                                for (var i = 0 ; i < spect.participants.length ; i++)
                                {
                                    if (spect.participants[i].teamId == 100)
                                    {
                                        blueTeamData.players += `(${champ.data[spect.participants[i].championId].name}) **${spect.participants[i].summonerName}** \n`;
                                    }
                                    if (spect.participants[i].teamId == 200)
                                    {
                                        redTeamData.players += `(${champ.data[spect.participants[i].championId].name}) **${spect.participants[i].summonerName}** \n`;
                                       
                                    }
                                }
                                switch (spect.gameQueueConfigId) {
                                    case 0: gameType = 'Custom game'; break;
                                    case 78:
                                    case 70: gameType = 'One for all'; break;
                                    case 72:
                                    case 73: gameType = 'Snowdown Showdown'; break;
                                    case 98:
                                    case 75: gameType = 'Hexakil'; break;
                                    case 76: gameType = 'URF'; break;
                                    case 100: gameType = 'Aram'; break;
                                    case 325: gameType = 'All random'; break;
                                    case 400: gameType = '5v5 Draft Pick'; break;
                                    case 420: gameType = '5v5 Ranked Solo/Duo'; break;
                                    case 430: gameType = '5v5 Blind Pick'; break;
                                    case 440: gameType = '5v5 Ranked Flex'; break;
                                    case 450: gameType = '5v5 ARAM'; break;
                                    case 460: gameType = '3v3 Blind Pick'; break;
                                    case 470: gameType = '3v3 Ranked Flex'; break;
                                    case 600: gameType = '5v5 Blood Moon'; break;
                                    case 610: gameType = 'Dark Star: Singularity'; break;
                                    case 700: gameType = 'Clash games 5v5'; break;
                                    case 800:
                                    case 810:
                                    case 820:
                                    case 830:
                                    case 840:
                                    case 850: gameType = 'Bot game'; break;
                                    case 940: gameType = 'Nexus siege'; break;
                                    case 950:
                                    case 960: gameType = 'Doom bots'; break;
                                    case 980:
                                    case 990: gameType = 'Star Guardian Invasion'; break;
                                    case 1000: gameType = 'PROJECT'; break;
                                    case 1010: gameType = 'Snow ARURF'; break;
                                    default: gameType = 'Unknown'; break;
                                };
                                var embed = new Discord.RichEmbed()
                                    .setTitle(`Live game of ${sum.name} || Game length - ${Math.floor(spect.gameLength / 60)}:${spect.gameLength % 60 < 10 ? '0'+(spect.gameLength % 60) : spect.gameLength % 60}`)
                                    .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/8.8.2/img/profileicon/${sum.profileIconId}.png`)
                                    .addField("Game mode", `${gameType}`, false)
                                    .addField("Blue Team", blueTeamData.players, true)
                                    .addField("Red Team", redTeamData.players, true)
                                    .setColor(0x00FFFF)
                                    .setFooter(`Requested by ${message.author.tag}`)
                                botMsg.edit(embed);
                            })
                            .catch(err => {
                                'use strict';
                                console.log(err);
                            });
                    })
                    .catch(err => {
                        'use strict';
                        botMsg.edit(message.author + ', Summoner might not be ingame and/or you typed the wrong Summoner Name\n(Bot/Custom games arent supported)');
                        console.log(err);
                    });
            })
            .catch(err => {
                'use strict';
                botMsg.edit(message.author + ', Summoner might not be ingame and/or you typed the wrong Summoner Name\n(Bot/Custom games arent supported)');
                console.log(err);
            });
            return;

	}
};



module.exports = LeagueLiveGameCommand;