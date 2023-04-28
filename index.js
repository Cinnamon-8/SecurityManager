const { Client , GatewayIntentBits } = require ('discord.js');
const { CommandHandler } = require('djs-commander');
const path = require('path');

const client = new Client({
    intents: [
GatewayIntentBits.Guilds,    GatewayIntentBits.GuildMembers, 
GatewayIntentBits.GuildMessages,
GatewayIntentBits.GuildMessageReactions,
GatewayIntentBits.MessageContent,
    
    ],
});

new CommandHandler ({
  client,
  eventsPath: path.join(__dirname, 'events'),
  commandsPath: path.join(__dirname,'commands'),
})


client.login(process.env.DISCORD_TOKEN)