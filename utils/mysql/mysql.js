exports.database = async function mysql(client) {
    client.guilds.cache.map(guild => {
        client.mysqlConnection.query(`SELECT * FROM guilds WHERE GUILD_ID = '${guild.id}'`, async (err, rows) => {
            if (err) throw err;

            client.database.mysql.guild(guild, rows) 

            if (rows.length < 1) {
                let sql;
                sql = `INSERT INTO guilds (GUILD_ID, prefix, CHANNELID_WELCOME, CHANNELID_LEFT, CHANNELID_LOGS, CARGOID_WELCOME, CHANNELID_MEMBERCOUNT, ENABLE_ANTIINVITE, ENABLE_WELCOME, ENABLE_LEFT, ENABLE_UPXP, ENABLE_LOGS) VALUES ('${guild.id}','p!', '', '', '', '', '', '0', '0', '0', '0', '0')`;
                if (err) throw err;
                await client.mysqlConnection.query(sql)
            }
        })
    })
}