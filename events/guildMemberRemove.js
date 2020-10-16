module.exports = async (client, member) => {

    client.mysqlConnection.query(`SELECT * FROM guilds WHERE GUILD_ID = '${member.guild.id}'`, async (err, rows) => {
        if (err) throw err;
        if (rows[0] == null) return 0;

        client.functions.saida.memberLeave(member, rows)
        client.functions.count.memberCount(member, rows)

    })
}

