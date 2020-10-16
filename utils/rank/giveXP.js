module.exports = {
    GiveRandomXP(bot, message) {

        var giveXP = Math.floor(Math.random() * 5);

        bot.mysqlConnection.query(`SELECT * FROM users WHERE USER_ID = '${message.author.id}' AND USER_GUILD = '${message.guild.id}';`, async (err, rows) => {
            if (rows[0] == null || rows[0] == undefined) {
                bot.mysqlConnection.query(`INSERT INTO users (USER_ID, USER_XP, USER_LEVEL, USER_GUILD, USER_BACKGROUND, USER_FUNDO) VALUES ('${message.author.id}', '0', '0', '${message.guild.id}', '', '');`);
            } else {
                var level = rows[0]["USER_LEVEL"];
                giveXP += rows[0]["USER_XP"];
                if (giveXP > level * 650) {
                    giveXP -= level * 650;
                    level += 1;
                }
                bot.mysqlConnection.query(`UPDATE users SET USER_XP = ${giveXP}, USER_LEVEL = ${level} WHERE USER_ID = '${message.author.id}' AND USER_GUILD = '${message.guild.id}';`);
            }
        })
    }
}

