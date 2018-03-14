

const commando = require('discord.js-commando');


class NickNameCommand extends commando.Command
    {   
        constructor(client)
        {
            super(client,
                {
                    name: 'nickname',
                    aliases: ['nick'],
                    group: 'admin',
                    memberName: 'nickname',
                    description: 'Changes the nickname of a user.',
                    examples: ['s!nickname `@mention` `name`', 's!nick `@mention` `name`'],
                    guildOnly: true,
                    args: [
                        {
                            key: 'user',
                            prompt: 'What user would you like to change the name of?',
                            type: 'user',
                        },
                        {
                            key: 'text',
                            prompt: 'What would you like to be the new name of your target?',
                            type: 'string',
                            validate: text => {
                                if (text.length <= 32) 
                                    return true;
                                return 'The nickname is above 32 characters. Please try again.';
                             }
                        }
                    ]
                });
        }

        hasPermission(message) {
            if(message.guild)
                return (this.client.isOwner(message.author) ||  message.member.hasPermission('MANAGE_NICKNAMES'));
        }


        async run(message, { user, text })
        {
            if (!(message.guild.member(message.author).hasPermission("MANAGE_NICKNAMES") || this.client.isOwner(message.author)))
                return;
            message.guild.member(user).setNickname(text)
                .catch(err => {
                    message.reply(err.message);
                });
            return;
        }
    }   

module.exports = NickNameCommand;