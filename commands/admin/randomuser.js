

const commando = require('discord.js-commando');
class RandomUserCommand extends commando.Command
    {   
        constructor(client)
        {
            super(client,
                {
                    name: 'randomuser',
                    group: 'admin',
                    memberName: 'randomuser',
                    description: 'Mentions a random user.',
                    examples: ['s!randomuser'],
                    guildOnly: true
                });
        }

        hasPermission(message) {
            if(message.guild) 
                return (this.client.isOwner(message.author)||message.member.hasPermission('MENTION_EVERYONE'));
        }


        async run(message)
        {
            let serverMembers = message.guild.members.array();
            message.say(`${serverMembers[Math.floor(Math.random() * serverMembers.length)]}`);
            return;
        }
    }   

module.exports = RandomUserCommand;