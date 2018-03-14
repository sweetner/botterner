const commando = require('discord.js-commando');
const Discord = require('discord.js');

const LeagueJs = require('leaguejs');
const api = new LeagueJs('RGAPI-79ca9d80-b28e-42de-850c-d83fedf097dd');


class LeagueProfileCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'leagueprofile',
			group: 'leagueoflegends',
			memberName: 'leagueprofile',
            description: 'Shows the requested league of legends summoner profile.',
            examples: ['s!leagueprofile `na|euw|eune|tr|ru` `summoner name`'],
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
        const botMsg = await message.reply('Generating the profile... if it takes too long there might be a problem.');
        var server = text.substring(0, text.indexOf(' ')).toLowerCase();
        var summonername = text.substring(text.indexOf(' ')).replace(/\s+/g, ' ').trim();
        if (!(server == 'na' || server == 'euw' || server == 'eune' || server == 'ru' || server == 'tr'))
            return botMsg.edit(`Server is not supported.\nThe supported servers are \`na euw eune ru tr\`\nPlease make sure you type the server first!`);
        if (summonername.length > 16)
            return botMsg.edit(`The summoner name is too long to be real!`);
        api.Summoner
            .gettingByName(summonername, server)
            .then(sum => {
                api.League
                    .gettingPositionsForSummonerId(sum.id, server)
                    .then(rank => {
                        api.ChampionMastery
                            .gettingBySummoner(sum.id, server)
                            .then(mastery => {
                                api.StaticData
                                    .gettingChampions(server, {dataById : true})
                                    .then(champs => {
                                        var embed = new Discord.RichEmbed()
                                        .setTitle(`Profile of ${sum.name}`)
                                            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/8.5.2/img/profileicon/${sum.profileIconId}.png`)
                                            .addField("Server", `${server.toUpperCase()}`, true)
                                            .addField("Level", `**${sum.summonerLevel}**`, true)
                                            .addBlankField()
                                            .addField(rank[0] ? rank[0].queueType.replace('_', ' ').replace('_', ' ') : 'Unranked', `${rank[0] ? rank[0].tier : 'Unranked'} ${rank[0] ? rank[0].rank : ''} ${rank[0] ? rank[0].leaguePoints + ' LP' : ''} `, true)
                                            .addField(rank[1] ? rank[1].queueType.replace('_', ' ').replace('_', ' ') : 'Unranked', `${rank[1] ? rank[1].tier : 'Unranked'} ${rank[1] ? rank[1].rank : ''} ${rank[1] ? rank[1].leaguePoints + ' LP' : ''} `, true)
                                            .addField(rank[2] ? rank[2].queueType.replace('_', ' ').replace('_', ' ') : 'Unranked', `${rank[2] ? rank[2].tier : 'Unranked'} ${rank[2] ? rank[2].rank : ''} ${rank[2] ? rank[2].leaguePoints + ' LP' : ''} `, true)
                                            .addBlankField()
                                            .addField(mastery[0] ? champs.data[mastery[0].championId].name : "Didn't play champions", mastery[0] ? `${mastery[0].championPoints} mastery points \nMastery level **${mastery[0].championLevel}**` : 'n/a', true)
                                            .addField(mastery[1] ? champs.data[mastery[1].championId].name : "Didn't play champions", mastery[1] ? `${mastery[1].championPoints} mastery points \nMastery level **${mastery[1].championLevel}**` : 'n/a', true)
                                            .addField(mastery[2] ? champs.data[mastery[2].championId].name : "Didn't play champions", mastery[2] ? `${mastery[2].championPoints} mastery points \nMastery level **${mastery[2].championLevel}**` : 'n/a', true)
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
                                botMsg.edit(`${message.author}, summoner name not found in server ${server}`);
                                console.log(err);
                            });
                    })
                    .catch(err => {
                        'use strict';
                        botMsg.edit(`${message.author}, summoner name not found in server ${server}`);
                        console.log(err);
                    });
                
            })
            .catch(err => {
                'use strict';
                botMsg.edit(`${message.author}, summoner name not found in server ${server}`);   
                console.log(err);
            });
            return;

	}
};



module.exports = LeagueProfileCommand;