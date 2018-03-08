

const commando = require('discord.js-commando');

class KillChatCommand extends commando.Command
    {   
        constructor(client)
        {
            super(client,
                {
                    name: 'kill',
                    group: 'chat',
                    memberName: 'kill',
                    description: 'Kills the chat, or a user.',
                    examples: ['s!kill', 's!kill `@mention`'],
                });
        }
        async run(message)
        {
            let user = message.mentions.users.first();
            if(user)
                return message.say(user + " :point_left: :gun:");
            return message.say(`CHAT :point_left: :gun:`);
        }
    }   

module.exports = KillChatCommand;