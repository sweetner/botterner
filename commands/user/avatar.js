const commando = require('discord.js-commando');

class AvatarCommand extends commando.Command
    {   
        constructor(client)
        {
            super(client,
                {
                    name: 'avatar',
                    group: 'user',
                    memberName: 'avatar',
                    description: 'Posts the avatar picture of a user.',
                    examples: ['s!avatar', 's!avatar `@mention`'],
                    args: [
                        {
                            key: 'user',
                            prompt: 'Who \'s avatar picture would you like to see?',
                            type: 'user',
                            default: false
                        }
                    ]
                });
        }
        async run(message, { user })
        {
            if(user)
                return message.say(`There you go! \n${user.avatarURL}`);
            return message.say(`There you go! \n${message.author.displayAvatarURL}`);
        }
    }   

module.exports = AvatarCommand;