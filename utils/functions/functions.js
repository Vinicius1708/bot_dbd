const { MessageEmbed } = require('discord.js');

module.exports.entrada = {
    memberJoin(member, rows) {
        let logChannel = member.guild.channels.cache.find(channel => channel.id === `${rows[0].CHANNELID_WELCOME}`);
        if (logChannel) {
            let replies = [`Seja bem-vindo(a)`, `Obrigado por entrar`, `Bem-vindo(a) 🙂`];
            let result = Math.floor((Math.random() * replies.length));
            let embed = new MessageEmbed();
            embed.setDescription(`\`${member.user.tag}\` entrou no servidor. **${replies[result]}**`)
            logChannel.send(embed)
        }
    }
}

module.exports.saida = {
    memberLeave(member, rows) {
        let logChannel = member.guild.channels.cache.find(channel => channel.id === `${rows[0].CHANNELID_LEFT}`);
        if (logChannel) {
            let replies = ['Volte sempre', 'espero te ver em breve', 'Volte sempre 🙃'];
            let result = Math.floor((Math.random() * replies.length));
            let embed = new MessageEmbed();
            embed.setDescription(`\`${member.user.tag}\` saiu do servidor. **${replies[result]}**`)
            logChannel.send(embed)
        }
    }
}

module.exports.count = {
    async memberCount(member, rows) {
        if (rows[0].CHANNELID_MEMBERCOUNT > 1) {
            let guild = `${member.guild.memberCount - member.guild.members.cache.filter(m => m.user.bot).size}`.split("");
            let contadorGif = ['<a:numero0:688075336080162951>', '<a:numero1:688075335635435524>', '<a:numero2:688075338492018690>', '<a:numero3:688075338047422488>', '<a:numero4:688075337338191897>', '<a:numero5:688075338361995310>', '<a:numero6:688075339192467472>', '<a:numero7:688075338508402744>', '<a:numero8:688075337543843843>', '<a:numero9:688075338181378100>']
            countGif = '';
            for (let i = 0; i < guild.length; i++) { countGif += '' + contadorGif[guild[i]] + ''; }
            await member.guild.channels.cache.get(rows[0].CHANNELID_MEMBERCOUNT).setTopic(`<a:malakoi:478003266815262730> Atualmente temos: ${countGif} membros no servidor`)
        }
    }
}

module.exports.role = {
    roleAdd(member, rows) {
        let cargo = rows[0].CARGOID_WELCOME;
        let roleAddUserJoin;
        if (!roleAddUserJoin > cargo) return 0;
        member.roles.add(member.guild.roles.cache.find(r => r.id === cargo)).catch(e => {
            if (e.message == "Supplied parameter was neither a Role nor a Snowflake.") {
                sql = `UPDATE guilds SET CARGOID_WELCOME = '0' WHERE server = '${member.guild.id}'`;
                con.query(sql)
            }
            if (e.message == "Missing Access") return 0;
            if (e.message == "Missing Permissions ") return 0;
        })
    }
}