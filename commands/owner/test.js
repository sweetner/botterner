

const commando = require('discord.js-commando');
const Discord = require('discord.js');

class TestCommand extends commando.Command
    {   
        constructor(client)
        {
            super(client,
                {
                    name: 'test',
                    group: 'owner',
                    memberName: 'test',
                    description: 'This is a test command.',
                    examples: ['this command changes often.'],
                });
        }

        hasPermission(message) {
            if(message.guild) 
                return (this.client.isOwner(message.author));
            return false;
        }


        async run(message)
        {
            let user = message.mentions.users.first();
            if(user)
                return message.say(user + " :point_left: :gun:");
            return message.say(`CHAT :point_left: :gun:`);
        }
    }   

module.exports = TestCommand;




