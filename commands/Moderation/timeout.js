const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout a user from the guild')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to timeout')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('duration')
                .setDescription('The duration of the timeout')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the timeout')
                .setRequired(true)),
   run: async ({interaction}) => {
        // Check if user has permission to timeout members
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return await interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });
        }

        // Get the user to timeout
        const user = interaction.options.getUser('user');
        
        // Get the duration of the timeout
        const duration = interaction.options.getString('duration');

        // Get the reason for the timeout
        const reason = interaction.options.getString('reason');

        // Timeout the user
        const guild = interaction.guild;
        const member = guild.members.cache.get(user.id);
        member.timeout({ reason: reason, duration: duration });

        await interaction.reply(`${user.tag} has been timed out for ${duration} due to ${reason}`);
    },
};
