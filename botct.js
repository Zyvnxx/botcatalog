const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, PermissionFlagsBits, Collection } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Konfigurasi produk (diupdate sesuai foto)
const products = {
    vidio: {
        name: 'Vidio',
        description: 'Akses Vidio Premium',
        price: '18.000 (MOBILE)\n22.000 (PRIVATE)\n23.000 (ALL DEVICE)',
        stock: 'Tersedia',
        details: 'VIDIO PREMIUM\n\n• 1 MONTH: 18.000 (MOBILE)\n• 1 MONTH: 22.000 (PRIVATE)\n• 1 MONTH: 23.000 (ALL DEVICE)\n\n(IPIU)\n• 1 DAY: 4.000\n• 3 DAY: 8.000\n• 7 DAY: 15.000\n• 1 MONTH: 30.000'
    },
    vision: {
        name: 'Vision',
        description: 'Akses Vision+ Premium',
        price: '9.000 - 27.000',
        stock: 'Tersedia',
        details: 'VISION+ PREMIUM\n\n• 7 DAY: 9.000\n• 1 MONTH: 17.000\n• 1 MONTH: 27.000 (PRIVATE)'
    },
    spotify: {
        name: 'Spotify',
        description: 'Akses Spotify Premium',
        price: '21.000 - 30.000',
        stock: 'Tersedia',
        details: 'SPOTIFY PREMIUM\n\n• 1 MONTH: 21.000\n• 2 MONTH: 30.000'
    },
    netflix: {
        name: 'Netflix',
        description: 'Akses Netflix Premium',
        price: '5.000 - 9.000',
        stock: 'Tersedia',
        details: 'NETFLIX PREMIUM\n\n• 1 DAY: 5.000\n• 1 MONTH: 7.000\n• 3 MONTH: 9.000'
    },
    canva: {
        name: 'Canva',
        description: 'Akses Canva Pro',
        price: '1.500 - 9.000',
        stock: 'Tersedia',
        details: 'CANVA PRO\n\n• 1 DAY: 1.500\n• 7 DAY: 5.000\n• 1 MONTH: 7.000\n• 3 MONTH: 9.000'
    },
    capcut: {
        name: 'CapCut',
        description: 'CapCut Pro Account',
        price: '11.000 - 27.000',
        stock: 'Tersedia',
        details: 'CAPCUT PRO\n\n• 1 MONTH: 11.000 (3 USER)\n• 1 MONTH: 27.000 (PRIVATE)'
    },
    wetv: {
        name: 'WeTV',
        description: 'Akses WeTV Premium',
        price: '8.000 - 31.000',
        stock: 'Tersedia',
        details: 'WETV PREMIUM\n\n• 1 MONTH: 8.000\n• 1 MONTH: 31.000 (PRIVATE)\n• 1 YEAR: 15.000'
    }
};

// Produk Discord Nitro & Joki (diperbarui - HAPUS JOKI VALORANT & JOKI ORBS)
const discordProducts = {
    nitro_promo_via_link: {
        name: 'Nitro Promotion 3 Month - Via Link',
        price: '25.000',
        details: 'Nitro Promotion 3 Bulan via Link\n• Bisa untuk semua user / new user\n• Tidak dicialinkan oleh admin\n• Membutuhkan VCC sendiri'
    },
    nitro_promo_via_log: {
        name: 'Nitro Promotion 3 Month - Via Log',
        price: '45.000',
        details: 'Nitro Promotion 3 Bulan via Log\n• Bisa untuk semua user / new user\n• Dicialinkan oleh admin\n• Terima beres'
    },
    joki_quest: {
        name: 'Joki Quest Discord (Orbs)',
        price: '10.000',
        details: 'OPEN JOKI QUEST DISCORD (ORBS)\n\nBenefit:\n• Terima bares\n• Bisa quest all games\n• Quest Video\n• Dapet benefit border / item\n\nProses via login'
    }
};

// Produk Server Setup & Bot Custom
const serverProducts = {
    server_setup: {
        name: 'Setup Server Discord',
        price: '50.000 - 250.000',
        details: 'Setup Server Discord\n\nExample:\n• Store\n• Community\n• Games\n• Chill Area\n• Roblox\n• Five M\n• Samp\n• ETC / DLL\n\nNote: semua di setup dengan rapih baik bot, role, channel, sudah all in customer hanya terima jadi dan free revisi selama ticket belum di tutup'
    },
    bot_custom: {
        name: 'Bot Custom Discord',
        price: '10.000 - 300.000',
        details: 'Menerima Jasa Custom Bot Discord\n\nSupport:\n• Python\n• NodeJs\n\n**Full Request Custom Bot discord**\n\nContoh:\n• Bot Store\n• Bot Community\n• Bot Ticket\n• Dan lain lain\n\nPunya ide mau buat bot apa? langsung open ticket aja semua kita bisa!'
    }
};

// Produk Decoration
const decorationProducts = {
    decoration_nitro: {
        name: 'Decoration with Nitro',
        price: '22.000 - 65.000',
        details: '• IDR 33.000 ⪼ IDR 22.000\n• IDR 39.500 ⪼ IDR 25.000\n• IDR 52.000 ⪼ IDR 35.000\n• IDR 65.000 ⪼ IDR 42.000\n• IDR 71.000 ⪼ IDR 45.000\n• IDR 78.000 ⪼ IDR 52.000\n• IDR 91.000 ⪼ IDR 65.000'
    },
    decoration_standard: {
        name: 'Decoration Non Nitro',
        price: '28.000 - 125.000',
        details: '• IDR 39.500 ⪼ IDR 28.000\n• IDR 65.500 ⪼ IDR 40.000\n• IDR 78.000 ⪼ IDR 46.000\n• IDR 105.000 ⪼ IDR 85.000\n• IDR 125.000 ⪼ IDR 92.000\n• IDR 160.000 ⪼ IDR 125.000'
    },
    decoration_premium: {
        name: 'Bundle Jujutsu Kaisen Non Nitro',
        price: '95.000',
        details: '• BORDER\n• PROFILE EFFECT\n• NAME PLATE'
    },
    banner_design: {
        name: 'Bundle Custom Bisa Langsung Tanya Admin',
        price: 'CUSTOM PRICE',
        details: 'Custom bundle sesuai permintaan\n• Konsultasi langsung dengan admin\n• Design khusus sesuai kebutuhan\n• Harga menyesuaikan kompleksitas'
    }
};

// === SISTEM RATE LIMITING YANG SESUAI DISCORD TOS ===
class RateLimiter {
    constructor() {
        // Collection untuk menyimpan data rate limit per user
        this.commands = new Collection();
        this.interactions = new Collection();
        
        // Batas yang aman sesuai Discord TOS (jauh di bawah batas Discord)
        this.commandLimit = 3; // 3 command per 10 detik
        this.interactionLimit = 5; // 5 interaction per 10 detik
        this.windowMs = 10000; // 10 detik window
        
        // Auto cleanup setiap 30 detik
        setInterval(() => this.cleanup(), 30000);
    }
    
    // Check command rate limit
    checkCommand(userId) {
        const now = Date.now();
        const userData = this.commands.get(userId) || { timestamps: [] };
        
        // Filter timestamps yang masih dalam window
        userData.timestamps = userData.timestamps.filter(time => now - time < this.windowMs);
        
        // Check jika melebihi limit
        if (userData.timestamps.length >= this.commandLimit) {
            const oldest = userData.timestamps[0];
            const waitTime = Math.ceil((oldest + this.windowMs - now) / 1000);
            return {
                limited: true,
                waitTime: waitTime
            };
        }
        
        // Tambahkan timestamp baru
        userData.timestamps.push(now);
        this.commands.set(userId, userData);
        
        return { limited: false };
    }
    
    // Check interaction rate limit
    checkInteraction(userId) {
        const now = Date.now();
        const userData = this.interactions.get(userId) || { timestamps: [] };
        
        // Filter timestamps yang masih dalam window
        userData.timestamps = userData.timestamps.filter(time => now - time < this.windowMs);
        
        // Check jika melebihi limit
        if (userData.timestamps.length >= this.interactionLimit) {
            const oldest = userData.timestamps[0];
            const waitTime = Math.ceil((oldest + this.windowMs - now) / 1000);
            return {
                limited: true,
                waitTime: waitTime
            };
        }
        
        // Tambahkan timestamp baru
        userData.timestamps.push(now);
        this.interactions.set(userId, userData);
        
        return { limited: false };
    }
    
    // Cleanup data lama
    cleanup() {
        const now = Date.now();
        
        // Cleanup commands
        for (const [userId, data] of this.commands.entries()) {
            data.timestamps = data.timestamps.filter(time => now - time < this.windowMs);
            if (data.timestamps.length === 0) {
                this.commands.delete(userId);
            }
        }
        
        // Cleanup interactions
        for (const [userId, data] of this.interactions.entries()) {
            data.timestamps = data.timestamps.filter(time => now - time < this.windowMs);
            if (data.timestamps.length === 0) {
                this.interactions.delete(userId);
            }
        }
    }
    
    // Reset rate limit untuk user tertentu
    resetUser(userId) {
        this.commands.delete(userId);
        this.interactions.delete(userId);
    }
}

// Inisialisasi rate limiter
const rateLimiter = new RateLimiter();

// Cooldown yang lebih aman untuk mencegah spam (10 detik)
const messageCooldowns = new Collection();
const MESSAGE_COOLDOWN = 10000; // 10 detik

// Konfigurasi channel (ganti dengan ID channel Anda)
const ORDER_CHANNEL_ID = '1457318847571820720';
const DIRECT_LINK = 'https://discord.com/channels/573092742398345223/1457318847571820720';
const ORDER_CHANNEL_MENTION = `<#${ORDER_CHANNEL_ID}>`;

// URL gambar untuk embed
const BANNER_IMAGE = 'https://image2url.com/r2/bucket1/images/1767693687798-b0a70de9-6f87-4690-ab51-890eefb93902.gif';
const THUMBNAIL_IMAGE = 'https://image2url.com/r2/bucket1/images/1767693842203-a4f88e68-d87e-4764-8de6-a6fd644ca47d.blob';

// Fungsi untuk membuat dropdown produk streaming (tanpa emoji)
function createProductDropdown() {
    const productList = new StringSelectMenuBuilder()
        .setCustomId('select_product')
        .setPlaceholder('Pilih produk yang ingin dibeli')
        .addOptions(
            {
                label: 'Vidio Premium',
                description: `Rp 18.000 - 30.000`,
                value: 'vidio'
            },
            {
                label: 'Vision+ Premium',
                description: `Rp 9.000 - 27.000`,
                value: 'vision'
            },
            {
                label: 'Spotify Premium',
                description: `Rp 21.000 - 30.000`,
                value: 'spotify'
            },
            {
                label: 'Netflix Premium',
                description: `Rp 5.000 - 9.000`,
                value: 'netflix'
            },
            {
                label: 'Canva Pro',
                description: `Rp 1.500 - 9.000`,
                value: 'canva'
            },
            {
                label: 'CapCut Pro',
                description: `Rp 11.000 - 27.000`,
                value: 'capcut'
            },
            {
                label: 'WeTV Premium',
                description: `Rp 8.000 - 31.000`,
                value: 'wetv'
            }
        );

    return new ActionRowBuilder().addComponents(productList);
}

// Fungsi untuk membuat dropdown Discord Nitro & Joki (tanpa emoji)
function createDiscordDropdown() {
    const discordList = new StringSelectMenuBuilder()
        .setCustomId('select_discord')
        .setPlaceholder('Pilih layanan Discord & Gaming')
        .addOptions(
            {
                label: 'Nitro Promo 3M - Via Link',
                description: `Rp 25.000`,
                value: 'nitro_promo_via_link'
            },
            {
                label: 'Nitro Promo 3M - Via Log',
                description: `Rp 45.000`,
                value: 'nitro_promo_via_log'
            },
            {
                label: 'Joki Quest Discord',
                description: `Rp 10.000`,
                value: 'joki_quest'
            }
        );

    return new ActionRowBuilder().addComponents(discordList);
}

// Fungsi untuk membuat dropdown Server Setup & Bot (tanpa emoji)
function createServerDropdown() {
    const serverList = new StringSelectMenuBuilder()
        .setCustomId('select_server')
        .setPlaceholder('Pilih layanan Server & Bot')
        .addOptions(
            {
                label: 'Setup Server Discord',
                description: `Rp 50.000 - 250.000`,
                value: 'server_setup'
            },
            {
                label: 'Bot Custom Discord',
                description: `Rp 10.000 - 300.000`,
                value: 'bot_custom'
            }
        );

    return new ActionRowBuilder().addComponents(serverList);
}

// Fungsi untuk membuat dropdown Decoration (tanpa emoji)
function createDecorationDropdown() {
    const decorationList = new StringSelectMenuBuilder()
        .setCustomId('select_decoration')
        .setPlaceholder('Pilih layanan Decoration')
        .addOptions(
            {
                label: 'Decoration with Nitro',
                description: 'Rp 22.000 - 65.000',
                value: 'decoration_nitro'
            },
            {
                label: 'Decoration Non Nitro',
                description: 'Rp 28.000 - 125.000',
                value: 'decoration_standard'
            },
            {
                label: 'Bundle Jujutsu Kaisen',
                description: 'Rp 95.000',
                value: 'decoration_premium'
            },
            {
                label: 'Custom Bundle',
                description: 'Custom Price',
                value: 'banner_design'
            }
        );

    return new ActionRowBuilder().addComponents(decorationList);
}

// Fungsi untuk membuat tombol order dengan category tracking (tanpa emoji)
function createOrderButtons(productId, productName, category) {
    return new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Buka Channel Order')
                .setURL(DIRECT_LINK)
                .setStyle(ButtonStyle.Link),
            new ButtonBuilder()
                .setCustomId(`back_${category}`)
                .setLabel('Kembali ke Catalog')
                .setStyle(ButtonStyle.Secondary)
        );
}

// Fungsi untuk membuat catalog streaming embed (tanpa emoji)
function createStreamingCatalogEmbed() {
    return new EmbedBuilder()
        .setColor('#FF1493')
        .setTitle('DISC SHOP - STREAMING & APPS #1 TERMURAH')
        .setDescription('**Silahkan pilih product dibawah untuk Pembelian**\n\n**LIST PRODUCT STREAMING & APPS**')
        .setImage(BANNER_IMAGE)
        .setThumbnail(THUMBNAIL_IMAGE)
        .addFields(
            { name: 'Vidio', value: `Rp 18.000 - 30.000`, inline: true },
            { name: 'Vision+', value: `Rp 9.000 - 27.000`, inline: true },
            { name: 'Spotify', value: `Rp 21.000 - 30.000`, inline: true },
            { name: 'Netflix', value: `Rp 5.000 - 9.000`, inline: true },
            { name: 'Canva', value: `Rp 1.500 - 9.000`, inline: true },
            { name: 'CapCut', value: `Rp 11.000 - 27.000`, inline: true },
            { name: 'WeTV', value: `Rp 8.000 - 31.000`, inline: true }
        )
        .setFooter({
            text: 'DISC SHOP • Gift Available',
            iconURL: THUMBNAIL_IMAGE
        })
        .setTimestamp();
}

// Fungsi untuk membuat catalog Discord embed (tanpa emoji)
function createDiscordCatalogEmbed() {
    return new EmbedBuilder()
        .setColor('#5865F2')
        .setTitle('DISC SHOP - DISCORD & GAMING SERVICES')
        .setDescription('**Layanan Discord Nitro & Joki Gaming**\n\n**PRICE LIST DISCORD & GAMING**')
        .setImage(BANNER_IMAGE)
        .setThumbnail(THUMBNAIL_IMAGE)
        .addFields(
            { name: 'Nitro Promo 3M - Via Link', value: `Rp 25.000`, inline: true },
            { name: 'Nitro Promo 3M - Via Log', value: `Rp 45.000`, inline: true },
            { name: 'Joki Quest Discord', value: `Rp 10.000`, inline: true },
            { name: 'Layanan Lainnya', value: 'DM Admin untuk custom', inline: true }
        )
        .setFooter({
            text: 'DISC SHOP • Instant Delivery • Terima Beres',
            iconURL: THUMBNAIL_IMAGE
        })
        .setTimestamp();
}

// Fungsi untuk membuat catalog Server embed (tanpa emoji)
function createServerCatalogEmbed() {
    return new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('DISC SHOP - SERVER & BOT SERVICES')
        .setDescription('**Jasa Setup Server & Custom Bot Discord**\n\n**PRICE LIST SERVER & BOT**')
        .setImage(BANNER_IMAGE)
        .setThumbnail(THUMBNAIL_IMAGE)
        .addFields(
            { name: 'Setup Server Discord', value: `Rp 50.000 - 250.000`, inline: true },
            { name: 'Bot Custom Discord', value: `Rp 10.000 - 300.000`, inline: true },
            { name: 'Custom Request', value: 'DM Admin untuk konsultasi', inline: true }
        )
        .setFooter({
            text: 'DISC SHOP • Professional Services • Free Revisi',
            iconURL: THUMBNAIL_IMAGE
        })
        .setTimestamp();
}

// Fungsi untuk membuat catalog Decoration embed (tanpa emoji)
function createDecorationCatalogEmbed() {
    return new EmbedBuilder()
        .setColor('#FFD700')
        .setTitle('DISC SHOP - SERVER DECORATION SERVICES')
        .setDescription('**Jasa Decoration Server dengan Nitro & Standard**\n\n**PRICE LIST DECORATION**')
        .setImage(BANNER_IMAGE)
        .setThumbnail(THUMBNAIL_IMAGE)
        .addFields(
            { name: 'Decoration with Nitro', value: 'Rp 22.000 - 65.000', inline: true },
            { name: 'Decoration Non Nitro', value: 'Rp 28.000 - 125.000', inline: true },
            { name: 'Bundle Jujutsu Kaisen', value: 'Rp 95.000', inline: true },
            { name: 'Custom Bundle', value: 'Custom Price (Tanya Admin)', inline: true },
            { name: 'Includes', value: 'Border, Name Plate, Profile Effect', inline: false },
            { name: 'Konsultasi', value: 'DM Admin untuk custom request', inline: false }
        )
        .setFooter({
            text: 'DISC SHOP • Creative Designs • Premium Quality',
            iconURL: THUMBNAIL_IMAGE
        })
        .setTimestamp();
}

client.on('ready', () => {
    console.log(`✅ Bot ${client.user.tag} sudah online!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    // === PERBAIKAN: Sistem rate limiting untuk commands ===
    const userId = message.author.id;
    
    // Check message cooldown untuk mencegah spam
    if (messageCooldowns.has(userId)) {
        const expirationTime = messageCooldowns.get(userId) + MESSAGE_COOLDOWN;
        if (Date.now() < expirationTime) {
            // Hanya kirim warning jika bukan admin
            if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
                const timeLeft = Math.ceil((expirationTime - Date.now()) / 1000);
                if (timeLeft > 0) {
                    try {
                        const warning = await message.reply({
                            content: `⏳ Mohon tunggu ${timeLeft} detik sebelum menggunakan command lagi.`,
                            ephemeral: true
                        });
                        setTimeout(() => warning.delete().catch(() => {}), 3000);
                    } catch (error) {
                        // Silent fail untuk menghindari error loop
                    }
                }
            }
            return;
        }
    }
    
    // Check rate limit untuk commands
    const commandLimitCheck = rateLimiter.checkCommand(userId);
    if (commandLimitCheck.limited && !message.member.permissions.has(PermissionFlagsBits.Administrator)) {
        try {
            const warning = await message.reply({
                content: `⏳ Terlalu banyak permintaan! Mohon tunggu ${commandLimitCheck.waitTime} detik.`,
                ephemeral: true
            });
            setTimeout(() => warning.delete().catch(() => {}), 3000);
        } catch (error) {
            // Silent fail
        }
        return;
    }
    
    // Set cooldown untuk message berikutnya
    messageCooldowns.set(userId, Date.now());
    
    // Command untuk menampilkan catalog streaming utama
    if (message.content === '!catalog') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply('Hanya admin yang bisa menggunakan command ini!');
        }

        const embed = createStreamingCatalogEmbed();
        const dropdownRow = createProductDropdown();

        await message.channel.send({ embeds: [embed], components: [dropdownRow] });
    }

    // Command untuk menampilkan catalog Discord Nitro & Joki
    if (message.content === '!catalogdc') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply('Hanya admin yang bisa menggunakan command ini!');
        }

        const embed = createDiscordCatalogEmbed();
        const dropdownRow = createDiscordDropdown();

        await message.channel.send({ embeds: [embed], components: [dropdownRow] });
    }

    // Command untuk menampilkan catalog Server Setup & Bot Custom
    if (message.content === '!catalogsv') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply('Hanya admin yang bisa menggunakan command ini!');
        }

        const embed = createServerCatalogEmbed();
        const dropdownRow = createServerDropdown();

        await message.channel.send({ embeds: [embed], components: [dropdownRow] });
    }

    // Command untuk menampilkan catalog Decoration
    if (message.content === '!catalogdeco') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply('Hanya admin yang bisa menggunakan command ini!');
        }

        const embed = createDecorationCatalogEmbed();
        const dropdownRow = createDecorationDropdown();

        await message.channel.send({ embeds: [embed], components: [dropdownRow] });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton() && !interaction.isStringSelectMenu()) return;

    // === PERBAIKAN: Sistem rate limiting untuk interactions ===
    const userId = interaction.user.id;
    
    // Check rate limit untuk interactions
    const interactionLimitCheck = rateLimiter.checkInteraction(userId);
    if (interactionLimitCheck.limited) {
        try {
            await interaction.reply({
                content: `⏳ Terlalu banyak interaksi! Mohon tunggu ${interactionLimitCheck.waitTime} detik.`,
                ephemeral: true
            });
        } catch (error) {
            // Silent fail untuk interaction yang sudah di-reply
        }
        return;
    }

    // Handle product selection streaming
    if (interaction.customId === 'select_product') {
        const productId = interaction.values[0];
        const product = products[productId];

        const detailEmbed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle(`${product.name}`)
            .setDescription(product.details)
            .setImage(BANNER_IMAGE)
            .setThumbnail(THUMBNAIL_IMAGE)
            .addFields(
                { name: 'Harga', value: `Rp ${product.price}`, inline: true },
                { name: 'Stok', value: product.stock, inline: true },
                { name: 'Cara Order', value: `Tulis di ${ORDER_CHANNEL_MENTION}:\n\`!order ${product.name}\``, inline: false }
            )
            .setFooter({ 
                text: 'DISC SHOP • Klik tombol di bawah untuk langsung order',
                iconURL: THUMBNAIL_IMAGE
            })
            .setTimestamp();

        const buttonRow = createOrderButtons(productId, product.name, 'streaming');

        await interaction.update({ 
            content: '', 
            embeds: [detailEmbed], 
            components: [buttonRow] 
        });
    }

    // Handle Discord Nitro & Joki selection
    if (interaction.customId === 'select_discord') {
        const productId = interaction.values[0];
        const product = discordProducts[productId];

        const detailEmbed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle(`${product.name}`)
            .setDescription(product.details)
            .setThumbnail(THUMBNAIL_IMAGE)
            .addFields(
                { name: 'Harga', value: `Rp ${product.price}`, inline: true },
                { name: 'Cara Order', value: `Tulis di ${ORDER_CHANNEL_MENTION}:\n\`!order ${product.name}\``, inline: false }
            )
            .setFooter({ 
                text: 'DISC SHOP • Klik tombol di bawah untuk langsung order',
                iconURL: THUMBNAIL_IMAGE
            })
            .setTimestamp();

        const buttonRow = createOrderButtons(productId, product.name, 'discord');

        await interaction.update({ 
            content: '', 
            embeds: [detailEmbed], 
            components: [buttonRow] 
        });
    }

    // Handle Server Setup & Bot selection
    if (interaction.customId === 'select_server') {
        const productId = interaction.values[0];
        const product = serverProducts[productId];

        const detailEmbed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle(`${product.name}`)
            .setDescription(product.details)
            .setThumbnail(THUMBNAIL_IMAGE)
            .addFields(
                { name: 'Harga', value: `Rp ${product.price}`, inline: true },
                { name: 'Cara Order', value: `Tulis di ${ORDER_CHANNEL_MENTION}:\n\`!order ${product.name}\``, inline: false }
            )
            .setFooter({ 
                text: 'DISC SHOP • Klik tombol di bawah untuk langsung order',
                iconURL: THUMBNAIL_IMAGE
            })
            .setTimestamp();

        const buttonRow = createOrderButtons(productId, product.name, 'server');

        await interaction.update({ 
            content: '', 
            embeds: [detailEmbed], 
            components: [buttonRow] 
        });
    }

    // Handle Decoration selection
    if (interaction.customId === 'select_decoration') {
        const productId = interaction.values[0];
        const product = decorationProducts[productId];

        const detailEmbed = new EmbedBuilder()
            .setColor('#FFD700')
            .setTitle(`${product.name}`)
            .setDescription(product.details)
            .setThumbnail(THUMBNAIL_IMAGE)
            .addFields(
                { name: 'Harga', value: `Rp ${product.price}`, inline: true },
                { name: 'Cara Order', value: `Tulis di ${ORDER_CHANNEL_MENTION}:\n\`!order ${product.name}\``, inline: false }
            )
            .setFooter({ 
                text: 'DISC SHOP • Klik tombol di bawah untuk langsung order',
                iconURL: THUMBNAIL_IMAGE
            })
            .setTimestamp();

        const buttonRow = createOrderButtons(productId, product.name, 'decoration');

        await interaction.update({ 
            content: '', 
            embeds: [detailEmbed], 
            components: [buttonRow] 
        });
    }

    // Handle tombol kembali berdasarkan kategori
    if (interaction.customId.startsWith('back_')) {
        const category = interaction.customId.replace('back_', '');
        
        switch(category) {
            case 'streaming':
                const streamingEmbed = createStreamingCatalogEmbed();
                const streamingDropdown = createProductDropdown();
                await interaction.update({
                    content: '',
                    embeds: [streamingEmbed],
                    components: [streamingDropdown]
                });
                break;
                
            case 'discord':
                const discordEmbed = createDiscordCatalogEmbed();
                const discordDropdown = createDiscordDropdown();
                await interaction.update({
                    content: '',
                    embeds: [discordEmbed],
                    components: [discordDropdown]
                });
                break;
                
            case 'server':
                const serverEmbed = createServerCatalogEmbed();
                const serverDropdown = createServerDropdown();
                await interaction.update({
                    content: '',
                    embeds: [serverEmbed],
                    components: [serverDropdown]
                });
                break;
                
            case 'decoration':
                const decorationEmbed = createDecorationCatalogEmbed();
                const decorationDropdown = createDecorationDropdown();
                await interaction.update({
                    content: '',
                    embeds: [decorationEmbed],
                    components: [decorationDropdown]
                });
                break;
                
            default:
                // Default ke streaming catalog
                const defaultEmbed = createStreamingCatalogEmbed();
                const defaultDropdown = createProductDropdown();
                await interaction.update({
                    content: '',
                    embeds: [defaultEmbed],
                    components: [defaultDropdown]
                });
        }
    }

    // Handle tombol Order Sekarang
    if (interaction.customId.startsWith('order_now_')) {
        const productId = interaction.customId.replace('order_now_', '');
        const product = products[productId] || 
                       discordProducts[productId] || 
                       serverProducts[productId] || 
                       decorationProducts[productId];

        if (!product) {
            return interaction.reply({
                content: 'Produk tidak ditemukan. Silahkan hubungi admin.',
                ephemeral: true
            });
        }

        const orderMessage = `**ORDER ${product.name.toUpperCase()}**\n\n` +
                           `**Silahkan order di:** ${ORDER_CHANNEL_MENTION}\n` +
                           `**Atau klik link:** ${DIRECT_LINK}\n\n` +
                           `**Detail Produk:**\n` +
                           `• Nama: ${product.name}\n` +
                           `• Harga: Rp ${product.price}\n` +
                           `• Stok: ${product.stock || 'Tersedia'}\n\n` +
                           `**Format Order:**\n` +
                           `\`!order ${product.name}\`\n\n` +
                           `**Proses Order:**\n` +
                           `1. Kunjungi channel order di atas\n` +
                           `2. Ketik format order\n` +
                           `3. Admin akan menghubungi Anda\n` +
                           `4. Lakukan pembayaran\n` +
                           `5. Dapatkan produk Anda!`;

        await interaction.reply({
            content: orderMessage,
            ephemeral: true
        });
    }

    // Handle contact admin
    if (interaction.customId === 'contact_admin') {
        const contactEmbed = new EmbedBuilder()
            .setColor('#0099FF')
            .setTitle('Hubungi Admin')
            .setDescription('Silahkan hubungi admin kami untuk melanjutkan pembelian:')
            .setThumbnail(THUMBNAIL_IMAGE)
            .addFields(
                { name: 'Discord', value: 'Buka ticket atau DM admin' },
                { name: 'Format Order', value: `!order [nama produk]\n!joki [game] [jumlah]\n!setup [paket]\n!bot [paket]\n!deco [paket]\n\n**Channel Order:** ${ORDER_CHANNEL_MENTION}` }
            )
            .setFooter({ 
                text: 'Response time: < 5 menit • 24/7 Support',
                iconURL: THUMBNAIL_IMAGE
            })
            .setTimestamp();

        await interaction.reply({ 
            embeds: [contactEmbed], 
            ephemeral: true 
        });
    }
});

// === WEB SERVER UNTUK KEEP ALIVE ===
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot Discord is running!');
});

// Health check endpoint untuk Render
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Bot is running',
    timestamp: new Date().toISOString(),
    rateLimiter: {
      activeUsers: rateLimiter.commands.size + rateLimiter.interactions.size
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

// Login bot dengan environment variable untuk keamanan
client.login(process.env.DISCORD_TOKEN);