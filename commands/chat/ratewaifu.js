

const commando = require('discord.js-commando');

class RateWaifuCommand extends commando.Command
    {   
        constructor(client)
        {
            super(client,
                {
                    name: 'ratewaifu',
                    group: 'chat',
                    memberName: 'ratewaifu',
                    description: 'Rates a user as a waifu out of 10.',
                    examples: ['s!ratewaifu `@mention`'],
                });
        }
        async run(message)
        {
            let user = message.mentions.users.first();
            if (!user)
                return message.reply(`please mention a valid user!`);
            var rate = Math.floor((user.id/1000) % 10) + 1;
            if (user.id == 290154978742632449)
                return message.say(`${user} is the most :heart_eyes: A M A Z I N G :heart_eyes: waifu someone could have ever asked for :heart:. I'd rate **PERFECTION/10** :kiss:  `);
            if (user.id == 109378124898136064)
                return message.say(`Is this real?\nthe bot have never done this before! \ncould this be... the greatest waifu you can get?! \nno wonder everyone loves ${user} :heartpulse: \nI'd rate her **∞/10** :blush:`);
            if (rate <= 3)
                return message.say(`${user} is kinda ugly and weird, I'd rate **${rate}/10**. :nauseated_face: `);
            if (rate > 3 && rate <=6)
                return message.say(`${user}, is quite ordinary and decent, I'd rate **${rate}/10**. :relaxed:`)
            if (rate >= 10)
                return message.say(`${user} is perfect and flawless :heart: I'd rate **${rate}/10**`);
            if (rate >= 7)
                return message.say(`${user}, is almost perfect in every single way, I'd rate **${rate}/10**. :heart:`)
        }
    }   

module.exports = RateWaifuCommand;