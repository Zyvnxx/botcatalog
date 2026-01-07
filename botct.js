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
        price: '4.000 - 30.000',
        stock: 'Tersedia',
        details: 'NETFLIX PREMIUM\n\n• 1 DAY: 4.000\n• 3 DAY: 8.000\n• 7 DAY: 15.000\n• 1 MONTH: 30.000'
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

// Produk Discord Nitro & Joki
const discordProducts = {
    nitro_promo_via_link: {
        name: 'Nitro Promotion 3 Month - Via Link',
        price: '25.000',
        details: 'Nitro Promotion 3 Bulan via Link\n• Bisa untuk semua user / new user\n• Tidak diclaimkan oleh admin\n• Membutuhkan VCC sendiri'
    },
    nitro_promo_via_log: {
        name: 'Nitro Promotion 3 Month - Via Log',
        price: '45.000',
        details: 'Nitro Promotion 3 Bulan via Log\n• Bisa untuk semua user / new user\n• Diclaimkan oleh admin\n• Terima beres'
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

// PRODUK GAME STEAM SHARING (DIUPDATE SESUAI PERMINTAAN)
const gameProducts = {
    blackmyth_wukong: {
        name: 'Black Myth: Wukong',
        price: 'Rp 35.000',
        platform: 'Steam SHARING',
        genre: 'Action RPG',
        details: 'BLACK MYTH: WUKONG\n\n• Lifetime Access\n• Steam Family Sharing\n• Bebas Antrian\n• Support 24/7'
    },
    spiderman_miles: {
        name: 'Spider-Man: Miles Morales',
        price: 'Rp 30.000',
        platform: 'Steam SHARING',
        genre: 'Action-Adventure',
        details: 'SPIDER-MAN: MILES MORALES\n\n• Full Game\n• Lifetime Update\n• No Queue\n• Instant Access'
    },
    spiderman_2: {
        name: 'Spider-Man 2',
        price: 'Rp 35.000',
        platform: 'Steam SHARING',
        genre: 'Action-Adventure',
        details: 'SPIDER-MAN 2\n\n• Complete Edition\n• All DLC Included\n• Family Sharing\n• 24/7 Support'
    },
    fc25: {
        name: 'FC 25',
        price: 'Rp 35.000',
        platform: 'Steam SHARING',
        genre: 'Sports, Football',
        details: 'FC 25\n\n• Latest Version\n• Online Mode Available\n• Lifetime Access\n• No Waiting'
    },
    fc26: {
        name: 'FC 26',
        price: 'Rp 35.000',
        platform: 'Steam SHARING',
        genre: 'Sports, Football',
        details: 'FC 26\n\n• Latest Edition\n• Multiplayer Support\n• Family Sharing\n• Instant Delivery'
    },
    silent_hill: {
        name: 'Silent Hill',
        price: 'Rp 30.000',
        platform: 'Steam SHARING',
        genre: 'Horror, Survival',
        details: 'SILENT HILL\n\n• Remastered Edition\n• Full Horror Experience\n• Lifetime Access\n• No Queue'
    },
    cyberpunk: {
        name: 'Cyberpunk 2077',
        price: 'Rp 30.000',
        platform: 'Steam SHARING',
        genre: 'Action RPG, Cyberpunk',
        details: 'CYBERPUNK 2077\n\n• Phantom Liberty DLC Included\n• All Updates\n• Family Sharing\n• 24/7 Support'
    },
    it_takes_two: {
        name: 'It Takes Two',
        price: 'Rp 25.000',
        platform: 'Steam SHARING',
        genre: 'Adventure, Co-op',
        details: 'IT TAKES TWO\n\n• Perfect for Couples/Friends\n• Online Co-op\n• Lifetime Access\n• Instant Delivery'
    },
    f1_25: {
        name: 'F1 2025',
        price: 'Rp 35.000',
        platform: 'Steam SHARING',
        genre: 'Racing, Simulation',
        details: 'F1 2025\n\n• Latest Season\n• All Tracks & Teams\n• Multiplayer Ready\n• Family Sharing'
    },
    stray: {
        name: 'Stray',
        price: 'Rp 25.000',
        platform: 'Steam SHARING',
        genre: 'Adventure, Indie',
        details: 'STRAY\n\n• Cat Adventure Game\n• Beautiful Graphics\n• Lifetime Access\n• No Waiting'
    },
    nba_2025: {
        name: 'NBA 2025',
        price: 'Rp 35.000',
        platform: 'Steam SHARING',
        genre: 'Sports, Basketball',
        details: 'NBA 2025\n\n• Latest Roster\n• Online Multiplayer\n• Family Sharing\n• Instant Access'
    },
    nba_2026: {
        name: 'NBA 2026',
        price: 'Rp 35.000',
        platform: 'Steam SHARING',
        genre: 'Sports, Basketball',
        details: 'NBA 2026\n\n• Most Recent Edition\n• All Teams Updated\n• Lifetime Access\n• No Queue'
    },
    red_dead_2: {
        name: 'Red Dead Redemption 2',
        price: 'Rp 35.000',
        platform: 'Steam SHARING',
        genre: 'Action-Adventure, Western',
        details: 'RED DEAD REDEMPTION 2\n\n• Story Mode Only\n• Lifetime Access\n• Family Sharing\n• 24/7 Support'
    },
    five_hearts: {
        name: 'Five Hearts Under One Roof',
        price: 'Rp 30.000',
        platform: 'Steam SHARING',
        genre: 'Simulation, Dating',
        details: 'FIVE HEARTS UNDER ONE ROOF\n\n• Visual Novel\n• Multiple Endings\n• Lifetime Update\n• No Waiting'
    },
    resident_evil_4: {
        name: 'Resident Evil 4 Gold Edition',
        price: 'Rp 30.000',
        platform: 'Steam SHARING',
        genre: 'Survival Horror',
        details: 'RESIDENT EVIL 4 GOLD EDITION\n\n• Full Game + All DLC\n• Remastered Edition\n• Family Sharing\n• Instant Access'
    },
    inzoi: {
        name: 'InZOI',
        price: 'Rp 35.000',
        platform: 'Steam SHARING',
        genre: 'Life Simulation',
        details: 'INZOI\n\n• Latest Life Simulator\n• Complete Edition\n• Lifetime Access\n• Family Sharing\n• Instant Delivery'
    }
};

// === SISTEM COOLDOWN YANG DIPERBAIKI ===
class CommandCooldown {
    constructor() {
        this.cooldowns = new Collection();
        this.cooldownTime = 3000; // 3 detik untuk command
        this.ignoredInteractions = ['select_product', 'select_discord', 'select_server', 'select_decoration', 'select_game', 'back_'];
        
        setInterval(() => this.cleanup(), 60000); // Cleanup setiap 1 menit
    }
    
    // HANYA cek cooldown untuk command dengan prefix '!'
    checkCommand(message) {
        const content = message.content.toLowerCase();
        
        // Hanya proses jika dimulai dengan '!' dan bukan dari bot
        if (!content.startsWith('!') || message.author.bot) {
            return { shouldProcess: true, isCommand: false };
        }
        
        const userId = message.author.id;
        const command = content.split(' ')[0]; // Ambil command pertama
        
        // Valid commands yang diketahui
        const validCommands = ['!catalog', '!catalogdc', '!catalogsv', '!catalogdeco', '!cataloggame'];
        
        // Jika bukan command yang valid, skip cooldown
        if (!validCommands.includes(command)) {
            return { shouldProcess: true, isCommand: false };
        }
        
        const key = `${userId}_${command}`;
        const now = Date.now();
        
        // Cek jika user ada dalam cooldown
        if (this.cooldowns.has(key)) {
            const expirationTime = this.cooldowns.get(key) + this.cooldownTime;
            
            if (now < expirationTime) {
                const waitTime = Math.ceil((expirationTime - now) / 1000);
                return {
                    shouldProcess: false,
                    isCommand: true,
                    waitTime: waitTime,
                    command: command
                };
            }
        }
        
        // Set cooldown baru
        this.cooldowns.set(key, now);
        return { shouldProcess: true, isCommand: true };
    }
    
    // Interaksi UI TIDAK dikenakan cooldown
    checkInteraction(interaction) {
        const interactionId = interaction.customId;
        
        // Skip cooldown untuk interaksi UI (dropdown, button)
        for (const ignoredId of this.ignoredInteractions) {
            if (interactionId.startsWith(ignoredId)) {
                return { limited: false };
            }
        }
        
        // Untuk interaksi lain, gunakan cooldown ringan
        const userId = interaction.user.id;
        const key = `${userId}_interaction`;
        const now = Date.now();
        
        if (this.cooldowns.has(key)) {
            const expirationTime = this.cooldowns.get(key) + 2000; // 2 detik
            
            if (now < expirationTime) {
                const waitTime = Math.ceil((expirationTime - now) / 1000);
                return {
                    limited: true,
                    waitTime: waitTime
                };
            }
        }
        
        this.cooldowns.set(key, now);
        return { limited: false };
    }
    
    cleanup() {
        const now = Date.now();
        
        for (const [key, timestamp] of this.cooldowns.entries()) {
            if (now - timestamp > 300000) { // Hapus data lebih dari 5 menit
                this.cooldowns.delete(key);
            }
        }
    }
    
    resetUser(userId) {
        for (const [key] of this.cooldowns.entries()) {
            if (key.startsWith(`${userId}_`)) {
                this.cooldowns.delete(key);
            }
        }
    }
}

// Inisialisasi cooldown manager
const cooldownManager = new CommandCooldown();

// Konfigurasi channel
const ORDER_CHANNEL_ID = '1452593411734376490';
const DIRECT_LINK = 'https://discord.com/channels/1452584833766129686/1452593411734376490';
const ORDER_CHANNEL_MENTION = `<#${ORDER_CHANNEL_ID}>`;

// URL gambar untuk embed
const BANNER_IMAGE = 'https://image2url.com/r2/bucket1/gifs/1767794908164-5e4f7d1e-45f4-445d-8508-d73e8d9da4bd.gif';
const THUMBNAIL_IMAGE = 'https://image2url.com/r2/bucket1/images/1767693842203-a4f88e68-d87e-4764-8de6-a6fd644ca47d.blob';
const GAME_BANNER = 'https://image2url.com/r2/bucket1/gifs/1767794908164-5e4f7d1e-45f4-445d-8508-d73e8d9da4bd.gif';

// Fungsi untuk membuat dropdown produk streaming
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
                description: `Rp 4.000 - 30.000`,
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

// Fungsi untuk membuat dropdown Discord Nitro & Joki
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
                description: `Rp 40.000`,
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

// Fungsi untuk membuat dropdown Server Setup & Bot
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

// Fungsi untuk membuat dropdown Decoration
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

// Fungsi untuk membuat dropdown Game Steam (UPDATED)
function createGameDropdown() {
    const gameList = new StringSelectMenuBuilder()
        .setCustomId('select_game')
        .setPlaceholder('Pilih game yang ingin dibeli')
        .addOptions(
            {
                label: 'Black Myth: Wukong',
                description: 'Rp 35.000',
                value: 'blackmyth_wukong'
            },
            {
                label: 'Spider-Man: Miles Morales',
                description: 'Rp 30.000',
                value: 'spiderman_miles'
            },
            {
                label: 'Spider-Man 2',
                description: 'Rp 35.000',
                value: 'spiderman_2'
            },
            {
                label: 'FC 25',
                description: 'Rp 35.000',
                value: 'fc25'
            },
            {
                label: 'FC 26',
                description: 'Rp 35.000',
                value: 'fc26'
            },
            {
                label: 'Silent Hill',
                description: 'Rp 30.000',
                value: 'silent_hill'
            },
            {
                label: 'Cyberpunk 2077',
                description: 'Rp 30.000',
                value: 'cyberpunk'
            },
            {
                label: 'It Takes Two',
                description: 'Rp 25.000',
                value: 'it_takes_two'
            },
            {
                label: 'F1 2025',
                description: 'Rp 35.000',
                value: 'f1_25'
            },
            {
                label: 'Stray',
                description: 'Rp 25.000',
                value: 'stray'
            },
            {
                label: 'Red Dead Redemption 2',
                description: 'Rp 35.000',
                value: 'red_dead_2'
            },
            {
                label: 'Five Hearts Under One Roof',
                description: 'Rp 30.000',
                value: 'five_hearts'
            },
            {
                label: 'Resident Evil 4 Gold',
                description: 'Rp 30.000',
                value: 'resident_evil_4'
            },
            {
                label: 'InZOI',
                description: 'Rp 35.000',
                value: 'inzoi'
            }
        );

    return new ActionRowBuilder().addComponents(gameList);
}

// Fungsi untuk membuat tombol order dengan category tracking
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

// Fungsi untuk membuat tombol order khusus game
function createGameOrderButtons(productId, productName) {
    return new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Buka Channel Order')
                .setURL(DIRECT_LINK)
                .setStyle(ButtonStyle.Link),
            new ButtonBuilder()
                .setCustomId('back_game')
                .setLabel('Kembali ke Catalog Game')
                .setStyle(ButtonStyle.Secondary)
        );
}

// Fungsi untuk membuat catalog streaming embed (TANPA EMOJI)
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
            { name: 'Netflix', value: `Rp 4.000 - 30.000`, inline: true },
            { name: 'Canva', value: `Rp 1.500 - 9.000`, inline: true },
            { name: 'CapCut', value: `Rp 11.000 - 27.000`, inline: true },
            { name: 'WeTV', value: `Rp 8.000 - 31.000`, inline: true }
        )
        .setFooter({
            text: 'DISC SHOP • Gift Available • Instant Delivery',
            iconURL: THUMBNAIL_IMAGE
        })
        .setTimestamp();
}

// Fungsi untuk membuat catalog Discord embed (TANPA EMOJI)
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
            { name: 'Layanan Lainnya', value: 'DM Admin untuk custom request', inline: false }
        )
        .setFooter({
            text: 'DISC SHOP • Instant Delivery • Terima Beres',
            iconURL: THUMBNAIL_IMAGE
        })
        .setTimestamp();
}

// Fungsi untuk membuat catalog Server embed (TANPA EMOJI)
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
            { name: 'Custom Request', value: 'DM Admin untuk konsultasi gratis', inline: false }
        )
        .setFooter({
            text: 'DISC SHOP • Professional Services • Free Revisi',
            iconURL: THUMBNAIL_IMAGE
        })
        .setTimestamp();
}

// Fungsi untuk membuat catalog Decoration embed (TANPA EMOJI)
function createDecorationCatalogEmbed() {
    return new EmbedBuilder()
        .setColor('#FFD700')
        .setTitle('DISC SHOP - SERVER DECORATION SERVICES')
        .setDescription('**Jasa Decoration Server dengan Nitro & Standard**\n\n**PRICE LIST DECORATION**')
        .setImage(BANNER_IMAGE)
        .setThumbnail(THUMBNAIL_IMAGE)
        .addFields(
            { name: 'Nitro Decoration', value: 'Rp 20.000 - 65.000', inline: true },
            { name: 'Standard Decoration', value: 'Rp 28.000 - 125.000', inline: true },
            { name: 'Jujutsu Kaisen Bundle', value: 'Rp 95.000', inline: true },
            { name: 'Custom Bundle', value: 'Custom Price (Konsultasi Admin)', inline: true },
            { name: 'Includes', value: 'Border, Name Plate, Profile Effect, Custom Emoji', inline: false },
            { name: 'Konsultasi Gratis', value: 'DM Admin untuk custom request & preview', inline: false }
        )
        .setFooter({
            text: 'DISC SHOP • Creative Designs • Premium Quality',
            iconURL: THUMBNAIL_IMAGE
        })
        .setTimestamp();
}

// Fungsi untuk membuat catalog Game Steam embed (UPDATED)
function createGameCatalogEmbed() {
    return new EmbedBuilder()
        .setColor('#7289DA')
        .setTitle('DISC SHOP - GAME STEAM SHARING TERMURAH')
        .setDescription('**Game Steam Sharing dengan Harga Terjangkau!**\n\n**DAFTAR GAME TERLARIS**')
        .setImage(GAME_BANNER)
        .setThumbnail(THUMBNAIL_IMAGE)
        .addFields(
            { name: 'Black Myth: Wukong', value: 'Rp 35.000', inline: true },
            { name: 'Spider-Man: Miles Morales', value: 'Rp 30.000', inline: true },
            { name: 'Spider-Man 2', value: 'Rp 30.000', inline: true },
            { name: 'FC 25', value: 'Rp 37.000', inline: true },
            { name: 'FC 26', value: 'Rp 74.000', inline: true },
            { name: 'Silent Hill', value: 'Rp 30.000', inline: true },
            { name: 'Cyberpunk 2077', value: 'Rp 30.000', inline: true },
            { name: 'It Takes Two', value: 'Rp 25.000', inline: true },
            { name: 'F1 2025', value: 'Rp 35.000', inline: true },
            { name: 'Stray', value: 'Rp 25.000', inline: true },
            { name: 'NBA 2025', value: 'Rp 35.000', inline: true },
            { name: 'NBA 2026', value: 'Rp 60.000', inline: true },
            { name: 'Red Dead Redemption 2', value: 'Rp 35.000', inline: true }
        )
        .addFields(
            { name: 'Five Hearts Under One Roof', value: 'Rp 30.000', inline: true },
            { name: 'Resident Evil 4 Gold Edition', value: 'Rp 30.000', inline: true },
            { name: 'InZOI', value: 'Rp 35.000', inline: true }
        )
        .addFields(
            { 
                name: '📢 PERHATIAN! 📢', 
                value: '**NYARI GAMES YANG GA ADA DI CATALOG ? LANGSUNG CHAT ADMIN AJA ! READY ALL GAME**\n\nKami menyediakan hampir semua game di Steam! Cukup tanya admin untuk game yang kamu cari.', 
                inline: false 
            },
            { name: 'TOTAL GAME TERSEDIA', value: '15+ Game Terbaru (dan masih banyak lagi!)', inline: false },
            { name: 'KEUNGGULAN', value: '• Steam Sharing\n• Lifetime Access\n• Bebas Antrian\n• Support 24/7\n• **READY ALL GAME - TANYA ADMIN!**', inline: false },
            { name: 'CARA ORDER', value: `Kunjungi ${ORDER_CHANNEL_MENTION} dan ketik: \`!order [nama game]\`\n**ATAU langsung chat admin untuk game yang tidak ada di catalog!**`, inline: false }
        )
        .setFooter({
            text: 'DISC SHOP • Steam Sharing • Garansi Lifetime • READY ALL GAME!',
            iconURL: THUMBNAIL_IMAGE
        })
        .setTimestamp();
}

client.on('ready', () => {
    console.log(`Bot ${client.user.tag} sudah online!`);
    console.log(`Cooldown system aktif dengan pengaturan yang diperbaiki`);
    console.log(`Game tambahan: Five Hearts Under One Roof, Red Dead 2, Resident Evil 4 Gold, InZOI telah ditambahkan!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    // CEK COOLDOWN HANYA UNTUK COMMAND DENGAN PREFIX '!'
    const cooldownCheck = cooldownManager.checkCommand(message);
    
    if (!cooldownCheck.shouldProcess && cooldownCheck.isCommand) {
        // Hanya kirim warning untuk command yang terkena cooldown
        try {
            const warning = await message.reply({
                content: `Mohon tunggu **${cooldownCheck.waitTime} detik** sebelum menggunakan command \`${cooldownCheck.command}\` lagi.`,
                ephemeral: true
            });
            
            // Hapus warning setelah 3 detik
            setTimeout(() => {
                warning.delete().catch(() => {});
            }, 3000);
        } catch (error) {
            // Silent fail
        }
        return;
    }
    
    // JIKA BUKAN COMMAND, LANGSUNG RETURN (TIDAK ADA COOLDOWN)
    if (!cooldownCheck.isCommand) {
        return;
    }
    
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

    // Command untuk menampilkan catalog Game Steam (FITUR BARU)
    if (message.content === '!cataloggame') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply('Hanya admin yang bisa menggunakan command ini!');
        }

        const embed = createGameCatalogEmbed();
        const dropdownRow = createGameDropdown();

        await message.channel.send({ embeds: [embed], components: [dropdownRow] });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton() && !interaction.isStringSelectMenu()) return;

    // INTERAKSI UI (DROPDOWN, BUTTON) TIDAK DIKENAKAN COOLDOWN KETAT
    const cooldownCheck = cooldownManager.checkInteraction(interaction);
    
    if (cooldownCheck.limited) {
        try {
            await interaction.reply({
                content: `Mohon tunggu ${cooldownCheck.waitTime} detik sebelum interaksi lagi.`,
                ephemeral: true
            });
        } catch (error) {
            // Silent fail
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
                { name: 'Stok', value: `${product.stock}`, inline: true },
                { name: 'Cara Order', value: `Tulis di ${ORDER_CHANNEL_MENTION}:\n\`\`\`!order ${product.name}\`\`\``, inline: false }
            )
            .setFooter({ 
                text: 'DISC SHOP • Klik tombol di bawah untuk langsung order',
                iconURL: THUMBNAIL_IMAGE
            })
            .setTimestamp();

        const buttonRow = createOrderButtons(productId, product.name, 'streaming');

        await interaction.reply({ 
            embeds: [detailEmbed], 
            components: [buttonRow],
            ephemeral: true
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
                { name: 'Cara Order', value: `Tulis di ${ORDER_CHANNEL_MENTION}:\n\`\`\`!order ${product.name}\`\`\``, inline: false }
            )
            .setFooter({ 
                text: 'DISC SHOP • Klik tombol di bawah untuk langsung order',
                iconURL: THUMBNAIL_IMAGE
            })
            .setTimestamp();

        const buttonRow = createOrderButtons(productId, product.name, 'discord');

        await interaction.reply({ 
            embeds: [detailEmbed], 
            components: [buttonRow],
            ephemeral: true
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
                { name: 'Cara Order', value: `Tulis di ${ORDER_CHANNEL_MENTION}:\n\`\`\`!order ${product.name}\`\`\``, inline: false }
            )
            .setFooter({ 
                text: 'DISC SHOP • Klik tombol di bawah untuk langsung order',
                iconURL: THUMBNAIL_IMAGE
            })
            .setTimestamp();

        const buttonRow = createOrderButtons(productId, product.name, 'server');

        await interaction.reply({ 
            embeds: [detailEmbed], 
            components: [buttonRow],
            ephemeral: true
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
                { name: 'Cara Order', value: `Tulis di ${ORDER_CHANNEL_MENTION}:\n\`\`\`!order ${product.name}\`\`\``, inline: false }
            )
            .setFooter({ 
                text: 'DISC SHOP • Klik tombol di bawah untuk langsung order',
                iconURL: THUMBNAIL_IMAGE
            })
            .setTimestamp();

        const buttonRow = createOrderButtons(productId, product.name, 'decoration');

        await interaction.reply({ 
            embeds: [detailEmbed], 
            components: [buttonRow],
            ephemeral: true
        });
    }

    // Handle Game Steam selection (FITUR BARU)
    if (interaction.customId === 'select_game') {
        const productId = interaction.values[0];
        const product = gameProducts[productId];

        const detailEmbed = new EmbedBuilder()
            .setColor('#7289DA')
            .setTitle(`${product.name}`)
            .setDescription(product.details)
            .setThumbnail(THUMBNAIL_IMAGE)
            .addFields(
                { name: 'Harga', value: `${product.price}`, inline: true },
                { name: 'Platform', value: `${product.platform}`, inline: true },
                { name: 'Genre', value: product.genre, inline: true },
                { name: 'Cara Order', value: `Tulis di ${ORDER_CHANNEL_MENTION}:\n\`\`\`!order ${product.name}\`\`\``, inline: false },
                { name: 'Garansi', value: 'Lifetime Access • Instant Delivery • Support 24/7', inline: false }
            )
            .setFooter({ 
                text: 'DISC SHOP • Steam Sharing • Garansi Lifetime • Tanya Admin untuk game lain!',
                iconURL: THUMBNAIL_IMAGE
            })
            .setTimestamp();

        const buttonRow = createGameOrderButtons(productId, product.name);

        await interaction.reply({ 
            embeds: [detailEmbed], 
            components: [buttonRow],
            ephemeral: true
        });
    }

    // Handle tombol kembali berdasarkan kategori
    if (interaction.customId.startsWith('back_')) {
        const category = interaction.customId.replace('back_', '');
        
        if (interaction.deferred || interaction.replied) {
            await interaction.editReply({ 
                content: 'Mengembalikan ke catalog...',
                embeds: [],
                components: []
            });
            
            // Kirim embed baru berdasarkan kategori
            switch(category) {
                case 'streaming':
                    const streamingEmbed = createStreamingCatalogEmbed();
                    const streamingDropdown = createProductDropdown();
                    await interaction.followUp({
                        embeds: [streamingEmbed],
                        components: [streamingDropdown],
                        ephemeral: true
                    });
                    break;
                    
                case 'discord':
                    const discordEmbed = createDiscordCatalogEmbed();
                    const discordDropdown = createDiscordDropdown();
                    await interaction.followUp({
                        embeds: [discordEmbed],
                        components: [discordDropdown],
                        ephemeral: true
                    });
                    break;
                    
                case 'server':
                    const serverEmbed = createServerCatalogEmbed();
                    const serverDropdown = createServerDropdown();
                    await interaction.followUp({
                        embeds: [serverEmbed],
                        components: [serverDropdown],
                        ephemeral: true
                    });
                    break;
                    
                case 'decoration':
                    const decorationEmbed = createDecorationCatalogEmbed();
                    const decorationDropdown = createDecorationDropdown();
                    await interaction.followUp({
                        embeds: [decorationEmbed],
                        components: [decorationDropdown],
                        ephemeral: true
                    });
                    break;
                    
                case 'game':
                    const gameEmbed = createGameCatalogEmbed();
                    const gameDropdown = createGameDropdown();
                    await interaction.followUp({
                        embeds: [gameEmbed],
                        components: [gameDropdown],
                        ephemeral: true
                    });
                    break;
                    
                default:
                    const defaultEmbed = createStreamingCatalogEmbed();
                    const defaultDropdown = createProductDropdown();
                    await interaction.followUp({
                        embeds: [defaultEmbed],
                        components: [defaultDropdown],
                        ephemeral: true
                    });
            }
        } else {
            switch(category) {
                case 'streaming':
                    const streamingEmbed = createStreamingCatalogEmbed();
                    const streamingDropdown = createProductDropdown();
                    await interaction.reply({
                        embeds: [streamingEmbed],
                        components: [streamingDropdown],
                        ephemeral: true
                    });
                    break;
                    
                case 'discord':
                    const discordEmbed = createDiscordCatalogEmbed();
                    const discordDropdown = createDiscordDropdown();
                    await interaction.reply({
                        embeds: [discordEmbed],
                        components: [discordDropdown],
                        ephemeral: true
                    });
                    break;
                    
                case 'server':
                    const serverEmbed = createServerCatalogEmbed();
                    const serverDropdown = createServerDropdown();
                    await interaction.reply({
                        embeds: [serverEmbed],
                        components: [serverDropdown],
                        ephemeral: true
                    });
                    break;
                    
                case 'decoration':
                    const decorationEmbed = createDecorationCatalogEmbed();
                    const decorationDropdown = createDecorationDropdown();
                    await interaction.reply({
                        embeds: [decorationEmbed],
                        components: [decorationDropdown],
                        ephemeral: true
                    });
                    break;
                    
                case 'game':
                    const gameEmbed = createGameCatalogEmbed();
                    const gameDropdown = createGameDropdown();
                    await interaction.reply({
                        embeds: [gameEmbed],
                        components: [gameDropdown],
                        ephemeral: true
                    });
                    break;
                    
                default:
                    const defaultEmbed = createStreamingCatalogEmbed();
                    const defaultDropdown = createProductDropdown();
                    await interaction.reply({
                        embeds: [defaultEmbed],
                        components: [defaultDropdown],
                        ephemeral: true
                    });
            }
        }
    }
});

// === WEB SERVER UNTUK KEEP ALIVE ===
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot Discord Shop is running!');
});

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Bot is running with improved cooldown system',
    timestamp: new Date().toISOString(),
    bot: client.user?.tag || 'Starting...',
    commands: ['!catalog', '!catalogdc', '!catalogsv', '!catalogdeco', '!cataloggame'],
    games_count: Object.keys(gameProducts).length
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

// Login bot
client.login(process.env.DISCORD_TOKEN);