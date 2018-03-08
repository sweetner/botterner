const commando = require('discord.js-commando');
const Discord = require('discord.js');


class InviteCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'invite',
			group: 'util',
			memberName: 'invite',
			description: 'Sends an invite link of the bot.',
			throttling: {
				usages: 5,
				duration: 10
			}
		});
	}

	async run(message) {
        message.client.generateInvite('ADMINISTRATOR')
            .then(link => {
                message.channel.send(`Generated bot invite link: ${link}`)
            });
	}
};


module.exports = InviteCommand;