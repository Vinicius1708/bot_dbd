const fs = require("fs");
const { readdirSync } = require('fs');
const { Collection, Client } = require("discord.js");
const client = new Client();

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

const settings = require('./config/settings.json')

client.mysql = require('./utils/mysql/mysql.js')
client.mysqlConnection = require('./utils/mysql/mysqlConnection.js')
client.CanvasTemplates = require('./utils/canvas/canvas.js')
client.database = require('./utils/mysql/mapMysql.js')
client.music = require('./utils/music_utils/music.js')
client.giveXP = require('./utils/rank/giveXP.js')
client.functions = require('./utils/functions/functions.js')


//client.dbl = require('./utils/apis/dbl.js')
client.devs = ['544219854035484693'];

client.commandsSeparated = new Collection();
client.commands = new Collection();
client.aliases = new Collection();

const load = dirs => {
    const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
    let cmd = [];

    for (const file of commands) {
        cmd.push(file);
        let props = require(`./commands/${dirs}/${file}`);
        client.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        })
        client.commandsSeparated.set(dirs, cmd.toString().replace(",", ","));
    }
}
const commandsDir = readdirSync('./commands/');
commandsDir.forEach(x => load(x));


client.login(settings.token);