module.exports = async (client, message, args) => {


    clientStart(client)

    async function clientStart(client) {
        await client.mysql.database(client)
        await client.user.setStatus('dnd');
        await client.user.setActivity('p!help');

        //await client.user.setActivity('Live dia 22 às 18 horas Brasília', { type: 'WATCHING' });

        return console.log(`${client.users.cache.size}, members in ${client.guilds.cache.size} guilds`)
    }
}