const { CommandoClient } = require('discord.js-commando');
const path = require('path');

client = new CommandoClient({
    commandPrefix: 's!',
    unknownCommandResponse: false,
    owner: ['109378124898136064'],
    disableEveryone: true
});

client.login(process.env.BOT_TOKEN); //process.env.BOT_TOKEN

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['random', 'Random'],
        ['chat', 'Chat'],
        ['user', 'User'],
        ['admin', 'Admin'],
        ['owner', 'Owner']
        //['leagueoflegends', 'League Of Legends']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

require('./events/wolframalpha.js');

client.on('ready', () => {
    console.log('Logged in!');
    client.user.setGame(`${client.commandPrefix}help ; ${client.guilds.size} servers`);
});




