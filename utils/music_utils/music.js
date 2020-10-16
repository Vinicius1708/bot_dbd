const queue = new Map();
const { MessageEmbed, escapeMarkdown } = require('discord.js');
const config = require('../../config/settings.json')
const ytApi = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new ytApi(config.playerSettings.googleApiToken);

exports.youtube = youtube;
exports.ytdl = ytdl;
exports.queue = queue;

exports.handleVideo = async function handleVideo(video, message, voiceChannel, playlist = false) {
    const serverQueue = queue.get(message.guild.id);

    const song = {
        id: video.id,
        title: escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`,
        tumb: video.thumbnails.default.url,
        seg: video.duration.seconds,
        min: video.duration.minutes,
        horas: video.duration.hours,
        canal: video.channel.title
    };


    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            userAuthor: [],
            message: message,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: [],
            playing: true
        };
        queue.set(message.guild.id, queueConstruct);

        queueConstruct.songs.push(song);
        queueConstruct.userAuthor.push(message.author);

        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`Não consegui entrar no canal de voz: ${error}`);
            queue.delete(message.guild.id);
            return message.channel.send(`Não consegui entrar no canal de voz: ${error}`);
        }
    } else {
        serverQueue.songs.push(song);
        serverQueue.userAuthor.push(message.author);
        console.log(serverQueue.songs);
        if (playlist) return undefined;

        else return message.channel.send(`✅ **${song.title}** foi adicionado à fila! Posição: \`${serverQueue.songs.length}\` `);
    }
    return undefined;
}


async function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    const dispatcher = await serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    await dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    dispatcher.queue = dispatcher;
    let temp = `${(song.horas < 10 ? "0" + song.horas : song.horas) + ":" + (song.min < 10 ? "0" + song.min : song.min) + ":" + (song.seg < 10 ? "0" + song.seg : song.seg)}`


    let embed = new MessageEmbed()
        .setDescription(`Tocando agora: [${song.title}](https://www.youtube.com/watch?v=${song.id})`)
    serverQueue.textChannel.send({ embed })
    serverQueue.connection.dispatcher.setVolume(30 / 100)

    /*var emLive = `${temp}`;
    var live = emLive.replace(`00:00:00`, "<:infinito:665331943147175956>");
    let embed = new MessageEmbed()
    embed.setAuthor("Tocando agora")
    embed.setDescription(`[${song.title}](https://www.youtube.com/watch?v=${song.id})`)
    embed.setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
    embed.addField(`**⏲️ Duração**:`, `${live}`, true)
    embed.addField(`**📺 Canal:**`, `\`${song.canal}\``, true)
    embed.addField(`**⏫ Posição na fila:**`, `\`${serverQueue.songs.length}\``, true)
    serverQueue.connection.dispatcher.setVolume(30 / 100)
    serverQueue.textChannel.send({ embed })*/
}



