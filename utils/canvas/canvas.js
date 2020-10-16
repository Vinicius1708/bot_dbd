
let Canvas = {}

try {
    Canvas = require('canvas')
} catch (e) { }

const { createCanvas, registerFont, loadImage, Context2d, Image } = Canvas
const GIFEncoder = require('gifencoder')

module.exports = class CanvasTemplates {
    static async perfil({ author, client }) {
        const width = 960;
        const height = 422;
        const margin = 0;
        const padding = 35;
        const avRadius = 115;
        const barRadius = 35;

        const defaultBgColor = '#090a0b';
        const color = '#36FFFF';

        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#202225';
        ctx.fillRect(margin, margin, width - (margin * 2), height - (margin * 2));

        const avatarLoad = author.displayAvatarURL({ format: 'png', size: 2048 });
        const avatar = await loadImage(avatarLoad);

        const avX = (height / 3 + 15);
        fillRectWithImage(avatar, avX, height / 3 + 15, avRadius);

        ctx.lineWidth = 3;

        /*ctx.strokeStyle = '#36FFFF';
        ctx.beginPath();
        ctx.arc(avX, height / 3 + 15, avRadius + (ctx.lineWidth / 2) - 1, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();*/

        const name = author.username
        ctx.font = 'extra bold 47px Inconsolata';


        //let emojis = ['720429845708013648', '744952016698343436', '744954051048767518', '744962044163522711', '744962351903670283', '744957453610909857', '744958792227094608', '665331943147175956', '744962530795061289']

        let emojis = ['720429845708013648', '744952016698343436', '744957453610909857']

        for (let i = 0; i < emojis.length; i++) {
            const loadEmoji = await client.emojis.cache.get(emojis[i]).url
            let img = await loadImage(loadEmoji)

            const poxZ = height - 45
            const poxX = width - (height * i / 7) - 45

            fillRectWithImage(img, poxX, poxZ, avRadius - 90);

        }
        const nameX = (margin * 2) + padding + (avRadius * 2) / 8;
        const nameW = ctx.measureText(name).width;

        const barY = ((height - (margin + padding)) - (barRadius / 2));

        const nameY = barY - (barRadius / 2) - 15 + 50;

        ctx.fillStyle = 'white';
        ctx.fillText(name, nameX, nameY);

        const smallerTextColor = '#676a6e';

        ctx.font = '45px Arial';
        ctx.fillStyle = smallerTextColor;
        ctx.fillText('#' + author.discriminator, (nameX + nameW) + 5, nameY);

        function fillRectWithImage(img, x, y, r) {
            const canvas2 = createCanvas(r * 2, r * 2);
            const ctx2 = canvas2.getContext('2d');

            ctx2.drawImage(img, 0, 0, r * 2, r * 2);
            ctx2.globalCompositeOperation = 'destination-in';

            ctx2.arc(r, r, r, 0, 2 * Math.PI);
            ctx2.fill();
            ctx.drawImage(canvas2, x - r, y - r);
        }
        return canvas.toBuffer()
    }
    static async triggered(buffer) {
        const WIDTH = 256
        const HEIGHT = 310
        const FRAME = 50;

        const encoder = new GIFEncoder(WIDTH, HEIGHT)
        encoder.start()
        encoder.setRepeat(0)
        encoder.setDelay(FRAME)

        const canvas = createCanvas(WIDTH, HEIGHT)
        const ctx = canvas.getContext('2d')

        const avatarImage = await loadImage(buffer);
        const triggeredLabel = await loadImage('./utils/img/png/triggered_label.png');

        const BUFFER_RANDOM_MAX = 20
        const LABEL_RANDOM_MAX = 10
        const random = (max) => Math.floor(Math.random() * max) - max
        for (let i = 0; i < 8; i++) {
            ctx.clearRect(0, 0, WIDTH, HEIGHT)
            ctx.drawImage(avatarImage, random(BUFFER_RANDOM_MAX), random(BUFFER_RANDOM_MAX), WIDTH + BUFFER_RANDOM_MAX, HEIGHT - 54 + BUFFER_RANDOM_MAX)
            ctx.fillStyle = '#FF000033'
            ctx.fillRect(0, 0, WIDTH, HEIGHT)
            ctx.drawImage(triggeredLabel, random(LABEL_RANDOM_MAX), HEIGHT - 54 + random(LABEL_RANDOM_MAX), 256 + LABEL_RANDOM_MAX, 54 + LABEL_RANDOM_MAX)
            encoder.addFrame(ctx)
        }

        encoder.finish()
        return encoder.out.getData()
    }
}   