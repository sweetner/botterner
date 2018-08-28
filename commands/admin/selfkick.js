

const commando = require('discord.js-commando');

class SelfKickCommand extends commando.Command
    {   
        constructor(client)
        {
            super(client,
                {
                    name: 'selfkick',
                    group: 'admin',
                    memberName: 'selfkick',
                    description: 'selfKicks a user.',
                    examples: ['s!selfkick `@mention`'],
                    guildOnly: true,
                    args:[
                        {
                            key: 'text',
                            prompt: 'Whats the reason for the kick?',
                            type: 'string',
                            default: 'No reason has been added.'
                        }
                    ]
                });
        }

        hasPermission(message) {
            if(message.guild) 
                console.log(message.author);
                return (this.client.isOwner(message.author) || message.member.id == 285842307440443403  );
        }


        async run(message, {text} )
        {
            message.guild.leave();
            return;
        }
    }   

module.exports = SelfKickCommand;
