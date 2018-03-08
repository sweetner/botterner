const commando = require('discord.js-commando');

class EightBallCommand extends commando.Command
    {   
        constructor(client)
        {
            super(client,
                {
                    name: '8ball',
                    group: 'random',
                    memberName: '8ball',
                    description: 'Ask 8ball a question, and it will answer it with great powers.',
                    examples: ['s!8ball Will I pass my next driving test?', 's!8ball will I find the love of my life by next week?'],
                    args: [
                        {
                            key: 'text',
                            prompt: 'What question would you like to ask 8ball?',
                            type: 'string',
                            validate: text => {
                                if (text.length > 2) return true;
                                return 'Please insert a question to ask 8ball.';
                            }
                        }
                    ]
                });
        }
        async run(message, {text})
        {
            var answer = ["I'm not quite certain",
                          "Better not tell you now...",
                          "You may rely on it",
                          "Cannot predict now",
                          "Very doubtful",
                          "Most likely",
                          "Don't count on it",
                          "My sources say no",
                          "Yes",
                          "No"]
            var rand = Math.floor(Math.random()*answer.length);
            message.reply(answer[rand]);
            return;
        }
    }   

module.exports = EightBallCommand;