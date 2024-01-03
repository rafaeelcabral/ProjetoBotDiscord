//Trazendo as classes da bibilioteca 'discord.js'
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

//Trazendo as informações do 'dotenv'
const dotenv = require('dotenv');
dotenv.config();
const {APPLICATION_ID, TOKEN, CLIENT_ID, GUILD_ID} = process.env;

//Criando uma instância 'cliente' da classe 'Ciente'
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//----------------------------------------------------------------------------------

//IMPORTANDO OS COMANDOS

const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "comandos");
const ArquivosDeComandos = fs.readdirSync(commandsPath);

client.commands = new Collection();

for(const file of ArquivosDeComandos){

	const filePath = path.join(commandsPath, file);
	const comandos = require(filePath);

	if("data" in comandos && "execute" in comandos){
		client.commands.set(comandos.data.name, comandos);
	}else{
		console.log(`esse caminho em ${filePath} está com "data" ou "execute" ausente`);
	}

}

//----------------------------------------------------------------------------------

//LOGIN DO BOT

client.once(Events.ClientReady, readyClient => {
	console.log(`Login realizado como ${readyClient.user.tag}`);
});

client.login(TOKEN);

//----------------------------------------------------------------------------------

//LISTENER DE INTERAÇÕES COM O BOT

client.on(Events.InteractionCreate, async interaction => {

	if(interaction.isStringSelectMenu()){
        const selected = interaction.values[0]
        if (selected == "javascript"){
            await interaction.reply("Documentação do Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript")
        } else if (selected == "python"){
            await interaction.reply("Documentação do Python: https://www.python.org")
        } else if (selected == "csharp"){
            await interaction.reply("Documentação do C#: https://learn.microsoft.com/en-us/dotnet/csharp/")
        } else if (selected == "discordjs"){
            await interaction.reply("Documentação do Discord.js: https://discordjs.guide/#before-you-begin")
        }else if ( selected == "php" ){
			await interaction.reply("Documentação do PHP: https://www.php.net/manual/pt_BR/")
		}else if ( selected == "java" ){
			await interaction.reply("Documentação do Java: https://docs.oracle.com/en/java/")
		}
    }

	if(!interaction.isCommand()){
	  return;
	}
  
	const command = client.commands.get(interaction.commandName);
	if(!command){
	  console.error("Comando não encontrado!");
	  return;
	}
  
	try{
	  await command.execute(interaction);
	}catch (error) {
	  console.error(error);
	  await interaction.reply({ content: "Erro ao executar o comando.", ephemeral: true });
	}
	
  });





