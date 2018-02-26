

const commando = require('discord.js-commando');

class LoveCommand extends commando.Command
    {    
        constructor(client)
        {
            super(client,
                {
                    name: 'love',
                    group: 'chat',
                    memberName: 'love',
                    description: 'Loves the chat, a user or two users.',
                    examples: ['s!love', 's!love `@mention`', 's!love `@mention @mention`'],
                    args: [
                        {
                            key: 'user1',
                            prompt: 'Who would you like to love?',
                            type: 'user',
                            default: false
                        },
                        {
                            key: 'user2',
                            prompt: 'Who would you like to love?',
                            type: 'user',
                            default: false
                        }
                    ]
                });
        }
        async run(message, { user1, user2 })
        {
            var poem = ["If roses were red and violets could be blue, \nI'd take us away to a place just for two. \nYou'd see my true colors and all that I felt. \nI'd see that you could love me and nobody else.",
                        "I love you with my heart \nI love you with my soul \nI know you don't believe in me \nbut trust me for I know",
                        "A million stars up in the sky \none shines brighter I can't deny \nA love so precious a love so true \na love that comes from me to you...",
                        "I never knew about happiness, \nI didn’t think dreams came true, \nI couldn’t really believe in love, \nUntil I finally met you.",
                        "Every day with you gives me a thrill; \nAll my dreams you richly fulfill. \nI’m a fool for your charms; \nYou belong in my arms; \nLove me, please say that you will."
                        ]
            if ((user1.id == 290154978742632449 && user2.id == 109378124898136064) || (user2.id == 290154978742632449 && user1.id == 109378124898136064))
                return message.delete();
            if (user1 && user2)
                return message.say(`${user1} and ${user2} sitting in the tree\nK-i-s-s-i-n-g! :kiss:  :heart_eyes:  `);
            if (user1)
                return message.say(`${user1}, ${message.author} wanted to tell you something:\n \n`+ poem[Math.floor(Math.random()*poem.length)] + "\n \n ~:heart:~");
            return message.say(`${message.author} LOVES YOU ALL :heart: :heart:`);
        }
    }   

module.exports = LoveCommand;