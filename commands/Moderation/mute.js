const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute a user for a specified duration')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to mute')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('duration')
                .setDescription('The duration of the mute (e.g. 1h, 30m)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the mute')
                .setRequired(false)),
    run : async ({interaction}) => {
        const member = interaction.options.getMember('user');
        const duration = interaction.options.getString('duration');
        const reason = interaction.options.getString('reason') || 'No reason provided.';

        if (!member) {
            return interaction.reply({ content: 'User not found.', ephemeral: true });
        }

        if (!interaction.member.permissions.has(Permissions.MUTE_MEMBERS)) {
            return interaction.reply({ content: 'You do not have permission to mute users.', ephemeral: true });
        }

        if (!member.manageable) {
            return interaction.reply({ content: 'I cannot mute that user.', ephemeral: true });
        }

        const mutedRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');

        if (!mutedRole) {
            return interaction.reply({ content: 'The Muted role does not exist.', ephemeral: true });
        }

        try {
            await member.roles.add(mutedRole, `Muted for ${duration}. Reason: ${reason}`);
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'There was an error muting the user.', ephemeral: true });
        }

        setTimeout(async () => {
            try {
                await member.roles.remove(mutedRole, `Unmuted after ${duration}.`);
            } catch (error) {
                console.error(error);
            }
        }, ms(duration));

        return interaction.reply({ content: `${member} has been muted for ${duration}. Reason: ${reason}`, ephemeral: true });
    },
  //deleted : true,
};
