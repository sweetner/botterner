const commando = require('discord.js-commando');
const Discord = require('discord.js');
const systranID = process.env.SYSTRAN_API;  //process.env.SYSTRAN_API
const getJSON = require('get-json');
const langList = require('../../events/languages.json');

class TranslateCommand extends commando.Command
    {   
        constructor(client)
        {
            super(client,
                {
                    name: 'translate',
                    aliases: ['t'],
                    group: 'chat',
                    memberName: 'translate',
                    description: 'Translates most languages into english.',
                    examples: ['s!translate amo la leche', 's!t j\'aime le lait'],
                    args: [
                        {
                            key: 'text',
                            prompt: 'What do you wish to translate?',
                            type: 'string',
                            default: ''
                        }
                    ]
                });
        }
        async run(message, {text})
        {
            const botMsg = await message.reply('Generating... If takes too long please try again.');
            if(text == '')
            {
                botMsg.edit("Please enter a sentence to translate into english.");
                return;
            }

            var url = `https://api-platform.systran.net/translation/text/translate?input=${encodeURIComponent(text)}&source=auto&target=en&withSource=false&withAnnotations=false&backTranslation=false&encoding=utf-8&key=${systranID}`;

            getJSON(url, async function(error, response){
                console.log(error);
                console.log(response);
                if (!response || !!response.error)
                {
                    botMsg.edit("Couldn't translate. Most likely its already english.");
                    return;
                }

                var detLang;
                for(var i=0; i<langList.length; i++)
                {
                    if(langList[i].code == response.outputs[0].detectedLanguage.split("-")[0])
                    {
                        detLang = langList[i].name;
                        break;
                    }
                }

                var confidence = response.outputs[0].detectedLanguageConfidence;
                var translation = response.outputs[0].output;
                var embed = new Discord.RichEmbed()
                    .setAuthor(`Detected ${detLang} with ${confidence.toFixed(2) * 100}% confidence`)
                    .setColor('#0099ff')
                    .setFooter('Powered by SYSTRAN')
                    .addField('Translation', translation)
            botMsg.edit(embed)
            });
            return;

        }
    }   

module.exports = TranslateCommand;