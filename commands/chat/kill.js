

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
                    args: [
                        {
                            key: 'user',
                            prompt: 'Who would you like to kill?',
                            type: 'user',
                            default: false
                        }
                    ]
                });
        }
        async run(message, { user })
        {
            if(user)
                return message.say(user + " :point_left: :gun:");
            return message.say(`CHAT :point_left: :gun:`);
        }
    }   

module.exports = KillChatCommand;