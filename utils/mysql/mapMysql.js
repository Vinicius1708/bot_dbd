const GUILD = new Map();
exports.GUILD = GUILD;

module.exports.mysql = {
    guild(guild, rows) {
        GUILD.set(guild.id, rows)
    }
}
