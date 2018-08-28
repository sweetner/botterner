

const commando = require('discord.js-commando');
const Discord = require('discord.js');
const wolframId = process.env.WOLFRAM_API; //process.env.WOLFRAM_API
const getJSON = require('get-json');

class WolframCommand extends commando.Command
    {   
        constructor(client)
        {
            super(client,
                {
                    name: 'wolframalpha',
                    aliases: ['wa'],
                    group: 'chat',
                    memberName: 'wolframalpha',
                    description: 'Ask wolfram alpha anything! **(You can also use s!wa)**',
                    examples: [`s!wa green's theorem`, `s!wolframalpha green's theorem`],
                    args: [
                        {
                            key: 'text',
                            prompt: 'What\'s your question?',
                            type: 'string',
                            default: ''
                        }
                    ]
                });
        }



        async run(message, {text})
        {
            const next = "▶";
            const back = "◀";
            const botMsg = await message.reply('Generating...');
            if(text == '')
            {
                botMsg.edit("Please enter a question!");
                return;
            }
            var url = `http://api.wolframalpha.com/v2/query?input=${encodeURIComponent(text)}&appid=${wolframId}&output=json`;


            getJSON(url, async function(error, response){
                response.vIndex = 0;
                console.log(response.queryresult);
                if(!response.queryresult.success)
                    return message.reply(`Oops... Couldn't understand you.`)
                var image = response.queryresult.pods[0].subpods[0].img.src;
                var embed = new Discord.RichEmbed()
                    .setAuthor(`${response.queryresult.pods[0].title}`)
                    .setImage(image)
                    .setColor(0x00FFFF)
                    .setFooter('Tip: You can use the arrow reaction multiple times!')
                botMsg.edit(embed);
                response.user = message.author;
                botMsg.customWolfram = response;

                await botMsg.react(back);
                await botMsg.react(next);
                });
            return;
        }
    }   

module.exports = WolframCommand;




