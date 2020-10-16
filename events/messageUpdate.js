const { MessageEmbed } = require('discord.js');

module.exports = async (bot, message, newMsg) => {

    if (message.content == newMsg.content) return;
    if (message.channel.type === "dm") return;

    bot.mysqlConnection.query(`SELECT * FROM guilds WHERE GUILD_ID = '${message.guild.id}'`, async (err, rows) => {
        if (err) throw err;
        if (rows[0] == null) return 0;

        let msg = message.content;
        msg = msg.replace(/`/g, "").substr(0, 900)
        let newmsg = newMsg.content;
        newmsg = newmsg.replace(/`/g, "").substr(0, 900)

        let canal = message.guild.channels.cache.get(rows[0].CHANNELID_LOGS)
        if (canal) {
            let embed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({ format: 'png', dynamic: true, size: 2048 }))
                .setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
                .setColor("#ffff00")
                .setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
                .setDescription(`:bust_in_silhouette: Usuário: ${message.author}\n\n:speech_balloon: Mensagem antiga: \n\`\`\`${msg}\`\`\`\n:speech_balloon: Mensagem nova:\n\`\`\`${newmsg}\`\`\`\n<:canal:568488048686268419> Canal: ${message.channel}`)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
                .setTimestamp()
            if (newMsg.author.bot) return 0;
            canal.send(embed)
        }
        const prefix = rows[0].prefix;
        let client = newMsg.client;
        if (newMsg.author.bot) return;
        if (!newMsg.content.startsWith(prefix)) return;


        let command = newMsg.content.split(" ")[0].toLowerCase().slice(prefix.length);
        let args = newMsg.content.split(" ").slice(1);
        
        const channel = message.channel;
        const author = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;

        let cmd;
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