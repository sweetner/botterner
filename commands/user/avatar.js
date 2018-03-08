const commando = require('discord.js-commando');
const Discord = require('discord.js');

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
                });
        }
        async run(message)
        {
            let user = message.mentions.users.first() ? message.mentions.users.first() : message.author ;
            let image = user.avatarURL;
            let color = message.guild.member(user).displayHexColor == '#000000' ? '#5a63b6' : message.guild.member(user).displayHexColor ;
            var embed = new Discord.RichEmbed()
                .setTitle(`Avatar of ${user.tag}`)
                .setImage(image)
                .setColor(color)
            message.channel.send(embed);
            
        }
    }   

module.exports = AvatarCommand;