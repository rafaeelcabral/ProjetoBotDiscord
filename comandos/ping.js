//Trazendo as classes da bibilioteca 'discord.js'
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Responde Pong!") ,

    async execute(interaction){
        await interaction.reply("pong!");    
    }
}    