const { MessageEmbed } = require('discord.js');

module.exports = async (client, message) => {

    try {

        client.mysqlConnection.query(`SELECT * FROM guilds WHERE GUILD_ID = '${message.guild.id}'`, async (err, rows) => {
            if (err) throw err;
            if (rows[0] == null) return 0;

            let logChannel = message.guild.channels.cache.find(channel => channel.id === `${rows[0].CHANNELID_LOGS}`);
            if (logChannel) {

                if (!message.content.length > null) return 0;

                let avatar = message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 })
                let msg = message.content;
                msg = msg.replace(/`/g, "").substr(0, 1000)

                let embed = new MessageEmbed()
                    .setAuthor(`${message.guild.name}`, message.guild.iconURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setThumbnail(avatar)
                    .setColor("#ffff00")
                    .setTitle(`Mensagem apagada`)
                    .addField(":busts_in_silhouette: Usuário:", `${message.author}`)
                    .addField(":speech_balloon: Mensagem deletada:", `\`\`\`${msg}\`\`\``)
                    .addField("<:canal:568488048686268419> Canal:", `${message.channel}`)
                    .setTimestamp(new Date())
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
                if (message.author.bot) return 0;
                logChannel.send(embed)
            }
        })
    } catch (e) {
        console.log(`[LOG]: "messageDelete" ${e.name}: ${e.message}`)
    }
}