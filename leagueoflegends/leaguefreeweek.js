const commando = require('discord.js-commando');
const Discord = require('discord.js');

const LeagueJs = require('leaguejs');
const api = new LeagueJs(`RGAPI-0f4a3a90-68fa-482b-850f-62dc311c0912`); //process.env.RIOT_API


class LeagueFreeWeekCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'leaguefreeweek',
			group: 'leagueoflegends',
			memberName: 'leaguefreeweek',
            description: 'Shows the league of legends free champions rotations.',
            examples: ['s!leaguefreeweek'],
			throttling: {
				usages: 1,
				duration: 10
            }
		});
	}

    async run(message, {}) 
    {
        var freeweek = ``;
        const botMsg = await message.reply('Generating free week rotation ... if it takes too long there might be a problem.');
        api.Champion
            .gettingList('na', {freeToPlay: true})
            .then(list => {
                api.StaticData
                    .gettingChampions('na', {dataById : true})
                    .then(champs =>{
                        for (var i = 0; i < list.champions.length; i++)
                            freeweek += champs.data[list.champions[i].id].name + '\n';
                        var embed = new Discord.RichEmbed()
                            .setTitle(`Free week rotation`)
                            .setThumbnail(`https://vignette.wikia.nocookie.net/leagueoflegends/images/6/66/Fat_Poro_Icon.png/revision/latest?cb=20150215130030`)
                            .addField("List", freeweek)
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
                console.log(err);
            });
        return;
	}
};



module.exports = LeagueFreeWeekCommand;