

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
            var sentence = ['The best love is the kind that awakens the soul; that makes us reach for more, that plants the fire in our hearts and brings peace to our minds. That’s what I hope to give you forever.', 'I look at you and see the rest of my life in front of my eyes.', 'I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.', 'You may hold my hand for a while, but you hold my heart forever.', 'Every time I see you, I fall in love all over again.', 'No matter what has happened. No matter what you’ve done. No matter what you will do. I will always love you. I swear it.', 'I want everyone to meet you. You’re my favorite person of all time.', 'Love all, trust a few, do wrong to none.']
            let user = message.mentions.users.first();
            if (user && user.id == message.author.id)
                return message.say(`${user}, ${sentence[Math.floor(Math.random()*sentence.length)]} :heart:`);
            if (user)
                return message.say(user + " :point_left: :gun:");
            return message.say(`CHAT :point_left: :gun:`);
        }
    }   

module.exports = KillChatCommand;