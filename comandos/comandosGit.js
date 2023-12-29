const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const exampleEmbed = new EmbedBuilder()
	.setColor("Gold")
	.setTitle("Comandos do Git")
	.addFields(
        { name: '\u200B', value: '\u200B' },
		{ name: '$ git init [nome-do-projeto]', value: 'Cria um novo repositório local com um nome especificado', inline: true },
		{ name: '$ git status', value: 'Revise edições e crie uma transação de commit', inline: true },
        { name: '\u200B', value: '\u200B' },
		{ name: '$ git add [arquivo]', value: 'Faz o snapshot de um arquivo na preparação para versionamento', inline: true },
		{ name: '$ git commit -m "[mensagem]"', value: 'Grava o snapshot permanentemente do arquivo no histórico de versão', inline: true },
        { name: '\u200B', value: '\u200B' },
		{ name: '$ git merge [nome-branch]', value: 'Combina o histórico da branch especificada a branch atual', inline: true },
		{ name: '$ git push [alias] [branch]', value: 'Envia todos os commits do branch local para o GitHub', inline: true },
        { name: '\u200B', value: '\u200B' },
		{ name: '$ git pull', value: 'Baixa o histórico e incorpora as mudanças', inline: true },
	)

module.exports = {
    data: new SlashCommandBuilder()
        .setName("git")
        .setDescription("Relembrar comandos do Git"),

    async execute(interaction) {
        await interaction.reply({ embeds: [exampleEmbed] })
    }
}