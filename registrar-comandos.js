//Trazendo as classes da bibilioteca 'discord.js'
const {REST, Routes} = require("discord.js");

//Trazendo as informações do 'dotenv'
const dotenv = require('dotenv');
dotenv.config();
const {APPLICATION_ID, TOKEN, CLIENT_ID, GUILD_ID} = process.env;

//IMPORTANDO OS COMANDOS
const fs = require("node:fs");
const path = require("node:path");

const commandsPath = path.join(__dirname, "comandos");
const ArquivosDeComandos = fs.readdirSync(commandsPath);

const commands = [] ;

for(const file of ArquivosDeComandos){
    const command = require(`./comandos/${file}`);
    commands.push(command.data.toJSON());
}

//Instância REST
const rest = new REST({version: "10"}).setToken(TOKEN);

//Deploy
(async () => {
    try{

        console.log(`resetando ${commands.length} comandos`);

        //PUT
        const data = await rest.put(
            Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID),
            {body: commands}
        )

        console.log(`comandos registrados com sucesso`); 

    }
    catch(error){
        console.error(error);
    }    
})()

