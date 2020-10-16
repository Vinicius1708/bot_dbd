module.exports = async (client, guild, user) => {
    console.log(`Entrei no servidor '${guild.name} - (${guild.id})', membros: ${guild.memberCount}, owner: ${guild.owner.user.tag}`)

    client.mysqlConnection.query(`SELECT * FROM guilds WHERE GUILD_ID = '${guild.id}'`, async (err, rows) => {
        client.database.mysql.guild(guild, rows)

        if (err) throw err;
        let sql;
        if (rows.length < 1) {
            sql = `INSERT INTO guilds (GUILD_ID, prefix, CHANNELID_WELCOME, CHANNELID_LEFT, CHANNELID_LOGS, CARGOID_WELCOME, CHANNELID_MEMBERCOUNT, ENABLE_ANTIINVITE, ENABLE_WELCOME, ENABLE_LEFT, ENABLE_UPXP, ENABLE_LOGS) VALUES ('${guild.id}','p!', '', '', '', '', '', '0', '0', '0', '0', '0')`;
            if (err) throw err;
            await client.mysqlConnection.query(sql)
        }
    })
}