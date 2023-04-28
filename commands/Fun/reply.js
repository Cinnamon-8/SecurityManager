const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('reply').setDescription('replies with Hi!'),

  run: ({ interaction, client, handler }) => {
     interaction.reply('Hi have a great time!')  
  },
 
};