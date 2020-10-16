const { MessageEmbed } = require('discord.js')

module.exports = async (bot, message) => {
    if (message.author.bot) return 0;
    let dmMSF = message.content;
    if (message.channel.type === "dm") return 0;//webhook.w(bot, message); //bot.channels.cache.get('702579902423236659').send(`\`${msg.author.tag}\`: ${dmMSF}`)
    if (message.author.bot) return;

    bot.giveXP.GiveRandomXP(bot, message)

    bot.mysqlConnection.query(`SELECT * FROM guilds WHERE GUILD_ID = '${message.guild.id}'`, async (err, rows) => {
        const prefix = await rows[0].prefix;


        if (message.content.startsWith(`<@!${bot.user.id}>`) || message.content.startsWith(`<@${bot.user.id}>`)) {
            if (message.guild.region !== 'brazil') {
                message.channel.send(new MessageEmbed().setDescription(`😉 | Hello ${message.author}! My prefix of this server is \`${prefix}\`, to see what I can do, use \`${prefix}help\``).setColor('#36393F'))
            } else {
                message.channel.send(new MessageEmbed().setDescription(`😉 | Olá ${message.author}! Meu prefixo nesse servidor é \`${prefix}\`, para ver o que eu posso fazer, use \`${prefix}ajuda\``).setColor('#36393F'))
            }
        }

        let client = message.client;
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;
        let command = message.content.split(" ")[0].toLowerCase().slice(prefix.length);
        let args = message.content.split(" ").slice(1);
        let cmd;

        const channel = message.channel;
        const author = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;

        console.log(`${message.author.tag}: ${message.content}`)

        if (client.commands.has(command)) {
            cmd = client.commands.get(command);
        } else if (client.aliases.has(command)) {
            cmd = client.commands.get(client.aliases.get(command));
        }
        if (cmd) {
            if (message.channel.type === "dm" && cmd.conf.guildOnly) return message.channel.send("Este comando só pode ser usado em servidores!");
            cmd.run({ client, message, args, prefix, channel, author })
        }
    })
}