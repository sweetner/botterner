

const commando = require('discord.js-commando');
const Discord = require('discord.js');

class ProfileCommand extends commando.Command
    {   
        constructor(client)
        {
            super(client,
                {
                    name: 'profile',
                    group: 'user',
                    memberName: 'profile',
                    description: 'Shows a profile of a user',
                    examples: ['s!profile `@mention`'],
                    args: [
                        {
                            key: 'user',
                            prompt: 'What user would you like to change the name of?',
                            type: 'user',
                            default: false
                        }]
                });
        }


        async run(message, {user} )
        {
            if (!user)
                user = message.author;
            let nickname = message.guild.member(user).nickname ? message.guild.member(user).nickname : "No nickname";
            let role = message.guild.member(user).highestRole ? message.guild.member(user).highestRole : "No role";
            let lastmsg = message.guild.member(user).lastMessage ? message.guild.member(user).lastMessage : `${user.tag} sent no messages lately`;
            var embed = new Discord.RichEmbed()
                .setTitle(`Profile of ${user.tag}`) //true means same line until one inst true,starts new line
                .setThumbnail(user.avatarURL.replace(`2048`, `64`))
                .addField("Account creation date", `${user.createdAt.toUTCString()}`, true)
                .addField("Server join date", `${message.guild.member(user).joinedAt.toUTCString()}`, false)
                .addField("Nickname", nickname, false)
                .addField("Highest role", role, true)
                .addField("Role color", message.guild.member(user).displayHexColor , true)
                .addField("Last message", lastmsg, false)
                .setColor(0x00FFFF)
                .setFooter(`Requested by ${message.author.tag}`)
            message.channel.send(embed);
            return;

        }
    }   

module.exports = ProfileCommand;