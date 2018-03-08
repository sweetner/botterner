const commando = require('discord.js-commando');
const path = require('path');

class ChangeLogCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'changelog',
			group: 'util',
			memberName: 'changelog',
			description: 'Shows the changelog of a bot.',
			throttling: {
				usages: 5,
				duration: 10
			}
		});
	}

    async run(message) 
    {
        message.reply(`Send you a DM with the change log link.`);
        message.author.send('https://github.com/sweetner/botterner-updated/blob/master/Changelog.txt');
        return;
	}
};


module.exports = ChangeLogCommand;