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

client.on(Events.InteractionCreate, interacation =>{
	if(!interacation.isChatInputCommand()){
		return;
	}else{
		console.log(interacation);
	}
})




