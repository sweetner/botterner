const Discord = require('discord.js');

var reactionTask = function(messageReaction, user) {
    if (user.bot) return;

    let message = messageReaction.message;
    let response = message.customWolfram;

    if (!response) return;
    if (user.id != response.user.id) return;

    switch (messageReaction._emoji.name) {
        case '▶':
            response.vIndex ++;
            break;
        case '◀':
            response.vIndex --;
            break;
        default:
            return;
    }
    if (response.vIndex > response.queryresult.pods.length -1) 
        response.vIndex = 0;
    if (response.vIndex < 0) 
        response.vIndex = response.queryresult.pods.length -1;
    var image = response.queryresult.pods[response.vIndex].subpods[0].img.src;
    var embed = new Discord.RichEmbed()
        .setAuthor(`${response.queryresult.pods[response.vIndex].title}`)
        .setImage(image)
        .setColor('#E456FF')
        .setFooter('Tip: You can use the arrow reaction multiple times!')
    message.edit(embed);
}


client.on("messageReactionAdd", (messageReaction, user) => reactionTask(messageReaction, user));
client.on("messageReactionRemove", (messageReaction, user) => reactionTask(messageReaction, user));