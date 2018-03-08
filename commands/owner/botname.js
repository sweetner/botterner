const commando = require('discord.js-commando');
const Discord = require('discord.js');

class BotNameCommand extends commando.Command
    {   
        constructor(client)
        {
            super(client,
                {
                    name: 'botname',
                    group: 'owner',
                    memberName: 'botname',
                    description: 'Changes the username of the bot. Keep empty for the default name.',
                    examples: ['s!botname `name`, s!botname'],
                    args: [
                        {
                            key: 'name',
                            prompt: 'What\'s the desired name?',
                            type: 'string',
                            default: ''
                        }
                    ]
                });
        }

        hasPermission(message) {
            if(message.guild) 
                return (this.client.isOwner(message.author));
            return false;
        }

        async run(message, {name})
        {
            if (!name)
            {
                this.client.user.setUsername('Botterner');
                return;
            }
            this.client.user.setUsername(name);
            return;
        }
    }   

module.exports = BotNameCommand;