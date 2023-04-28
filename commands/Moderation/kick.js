const { SlashCommandBuilder } = require('@discordjs/builders');
const {PermissionsBitField} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user from the server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to kick')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the kick')
                .setRequired(true)
        ),
   run: async({ interaction }) => {
        const userToKick = interaction.options.getUser('user');
        const memberToKick = interaction.guild.members.cache.get(userToKick.id);
        const reason = interaction.options.getString('reason');
  
       
    
    
       if (interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
         
if (memberToKick) {
            await memberToKick.kick(reason);
            return interaction.reply(`${userToKick.tag} has been kicked from the server. Reason: ${reason}`);
        } else {
            return interaction.reply('That user is not a member of this server.');
       }
          
       }
     else {
       return interaction.reply({ content: 'You do not have permission to kick users.', ephemeral: true });
     }
       
   
    },



  //deleted : true,


};
