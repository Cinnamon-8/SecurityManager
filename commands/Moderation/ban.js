const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user from the server.')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('The user to ban')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('The reason for the ban')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('duration')
            .setDescription('The duration of the ban (in days)')),
   run: ({interaction}) => {
        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');
        const duration = interaction.options.getString('duration');

        if (!interaction.member.permissions.has(Permissions.Flags.BanMembers)) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        if (!member) {
            return interaction.reply({ content: 'Please specify a valid user.', ephemeral: true });
        }

        if (!member.bannable) {
            return interaction.reply({ content: 'I cannot ban that user. Please check my permissions and role hierarchy.', ephemeral: true });
        }

        const embed = new MessageEmbed()
            .setTitle(`You have been banned from ${interaction.guild.name}.`)
            .setDescription(`**Reason**: ${reason}`)
            .setColor('RED');

        if (duration) {
            embed.addField('Duration', `${duration} day(s)`);
        }

        try {
             member.send({ embeds: [embed] });
        } catch (error) {
            console.error(`Could not send DM to ${member.user.tag}.`);
        }

         member.ban({ reason: reason, days: parseInt(duration) || 0 });

        interaction.reply({ content: `${member.user.tag} has been banned.`, ephemeral: true });
    },
  //deleted: true,
};
