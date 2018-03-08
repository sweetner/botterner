

const commando = require('discord.js-commando');

class RoleColorCommand extends commando.Command
    {   
        constructor(client)
        {
            super(client,
                {
                    name: 'rolecolor',
                    aliases: ['color'],
                    group: 'admin',
                    memberName: 'rolecolor',
                    description: 'Changes the color of a role. **the role has to be mentionable**',
                    examples: ['s!rolecolor `@rolemention` `color in hex code`', 's!color `@rolemention` `color in hex code`'],
                    guildOnly: true,
                    args: [
                        {
                            key: 'role',
                            prompt: '**Please make sure the role is mentionable.**\nWhat role would you like to change the color of?',
                            type: 'role',
                        },
                        {
                            key: 'color',
                            prompt: 'Whats your desired color? \n**IN HEX**\n',
                            type: 'string',
                            validate: color => {
                                if (color.length == 7 && color.startsWith("#"))
                                    return true;
                                return 'The role color you entered is invalid.\nPlease make sure its a hex code color.\n \nPlease type again your desired color.\n';
                            }
                        }
                    ]
                });
        }

        hasPermission(message) {
            if(message.guild) 
                return (this.client.isOwner(message.author) || message.member.hasPermission('MANAGE_ROLES'));
        }


        async run(message, {role, color} )
        {
            role.setColor(color);
            message.say(`The color for the role${role}, has been changed to ${color}`);
            return;
        }
    }   

module.exports = RoleColorCommand;