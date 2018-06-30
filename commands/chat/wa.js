

const commando = require('discord.js-commando');
const Discord = require('discord.js');
const wolframId = process.env.WOLFRAM_API;
const getJSON = require('get-json');

class WolframCommand extends commando.Command
    {   
        constructor(client)
        {
            super(client,
                {
                    name: 'wa',
                    group: 'chat',
                    memberName: 'wa',
                    description: 'Ask wolfram alpha anything!',
                    examples: ['this command changes often.'],
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
                if(!response.queryresult.success)
                    return message.reply(`Oops... Couldn't understand you.`)
                var image = response.queryresult.pods[0].subpods[0].img.src;
                var embed = new Discord.RichEmbed()
                    .setAuthor(`${response.queryresult.pods[0].title}`)
                    .setImage(image)
                    .setColor(0x00FFFF)
                    .setFooter('Tip: You can use the arrow reaction multiple times!')
                botMsg.edit(embed);

                botMsg.customWolfram = response;

                await botMsg.react(back);
                await botMsg.react(next);
                });
            return;
        }
    }   

module.exports = WolframCommand;




