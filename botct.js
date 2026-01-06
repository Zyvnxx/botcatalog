const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, PermissionFlagsBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// ==================== RATE LIMITING SYSTEM AMAN ====================

const userCooldowns = new Map();
const MESSAGE_COOLDOWN = 3000;
const INTERACTION_COOLDOWN = 2000;

const dailyLimits = new Map();
const MAX_COMMANDS_PER_DAY = 50;
const RESET_TIME = 24 * 60 * 60 * 1000;

const channelLastCommand = new Map();
const CHANNEL_COOLDOWN = 2000;

const guildCommandCount = new Map();
const MAX_GUILD_COMMANDS_PER_MINUTE = 30;

// Auto-reset daily limits
function resetDailyLimits() {
    const now = Date.now();
    for (const [userId, data] of dailyLimits.entries()) {
        if (now - data.date >= RESET_TIME) {
            dailyLimits.delete(userId);
        }
    }
    setTimeout(resetDailyLimits, RESET_TIME);
}
setTimeout(resetDailyLimits, RESET_TIME);

// Cleanup function untuk memory management
setInterval(() => {
    const now = Date.now();
    
    // Cleanup user cooldowns (lebih dari 5 menit)
    for (const [userId, data] of userCooldowns.entries()) {
        if (now - data.lastCommand > 300000) {
            userCooldowns.delete(userId);
        }
    }
    
    // Cleanup channel cooldowns (lebih dari 1 menit)
    for (const [channelId, timestamp] of channelLastCommand.entries()) {
        if (now - timestamp > 60000) {
            channelLastCommand.delete(channelId);
        }
    }
    
    // Cleanup guild stats (lebih dari 2 menit)
    for (const [guildId, stats] of guildCommandCount.entries()) {
        const currentMinute = Math.floor(now / 60000);
        if (currentMinute - stats.minute > 2) {
            guildCommandCount.delete(guildId);
        }
    }
}, 60000); // Run setiap 1 menit

// Cek rate limits
function checkRateLimits(userId, guildId, channelId, isInteraction = false) {
    const now = Date.now();
    
    // 1. User Cooldown Check
    if (userCooldowns.has(userId)) {
        const userData = userCooldowns.get(userId);
        const cooldownTime = isInteraction ? INTERACTION_COOLDOWN : MESSAGE_COOLDOWN;
        
        if (now - userData.lastCommand < cooldownTime) {
            return {
                allowed: false,
                reason: 'cooldown',
                waitTime: Math.ceil((cooldownTime - (now - userData.lastCommand)) / 1000)
            };
        }
    }
    
    // 2. Daily Limit Check
    if (dailyLimits.has(userId)) {
        const userDaily = dailyLimits.get(userId);
        
        // Reset jika sudah lewat 24 jam
        if (now - userDaily.date >= RESET_TIME) {
            userDaily.count = 0;
            userDaily.date = now;
        } else if (userDaily.count >= MAX_COMMANDS_PER_DAY) {
            const timeLeft = RESET_TIME - (now - userDaily.date);
            const hoursLeft = Math.ceil(timeLeft / (60 * 60 * 1000));
            return {
                allowed: false,
                reason: 'daily_limit',
                hoursLeft: hoursLeft
            };
        }
    }
    
    // 3. Channel Cooldown Check
    if (channelLastCommand.has(channelId)) {
        const lastChannelCommand = channelLastCommand.get(channelId);
        if (now - lastChannelCommand < CHANNEL_COOLDOWN) {
            return {
                allowed: false,
                reason: 'channel_cooldown',
                waitTime: Math.ceil((CHANNEL_COOLDOWN - (now - lastChannelCommand)) / 1000)
            };
        }
    }
    
    // 4. Guild Rate Limit Check
    if (guildCommandCount.has(guildId)) {
        const guildStats = guildCommandCount.get(guildId);
        const currentMinute = Math.floor(now / 60000);
        
        if (guildStats.minute === currentMinute && guildStats.count >= MAX_GUILD_COMMANDS_PER_MINUTE) {
            const secondsLeft = 60 - Math.floor((now % 60000) / 1000);
            return {
                allowed: false,
                reason: 'guild_limit',
                waitTime: secondsLeft
            };
        }
    }
    
    return { allowed: true };
}

// Update rate limits
function updateRateLimits(userId, guildId, channelId) {
    const now = Date.now();
    
    // Update user cooldown
    userCooldowns.set(userId, { lastCommand: now });
    
    // Update daily count
    if (!dailyLimits.has(userId)) {
        dailyLimits.set(userId, { count: 1, date: now });
    } else {
        const userDaily = dailyLimits.get(userId);
        userDaily.count++;
    }
    
    // Update channel last command
    channelLastCommand.set(channelId, now);
    
    // Update guild command count
    const currentMinute = Math.floor(now / 60000);
    if (!guildCommandCount.has(guildId)) {
        guildCommandCount.set(guildId, { count: 1, minute: currentMinute });
    } else {
        const guildStats = guildCommandCount.get(guildId);
        if (guildStats.minute !== currentMinute) {
            guildStats.count = 1;
            guildStats.minute = currentMinute;
        } else {
            guildStats.count++;
        }
    }
}

// ==================== KONFIGURASI PRODUK LEGAL ====================

// PRODUK LEGAL YANG TOS-COMPLIANT
const legalProducts = {
    server_setup: {
        name: 'Setup Server Discord',
        description: 'Jasa setup server profesional',
        price: '50.000 - 250.000',
        details: '**SETUP SERVER DISCORD PROFESIONAL**\n\nLayanan yang kami sediakan:\n• Setup roles & permissions\n• Channel organization\n• Bot configuration\n• Welcome system\n• Moderation setup\n\n✅ **100% Discord TOS Compliant**\n✅ **Legal & Safe**\n✅ **Professional Service**'
    },
    bot_development: {
        name: 'Bot Custom Development',
        description: 'Jasa pembuatan bot custom',
        price: '100.000 - 500.000',
        details: '**CUSTOM BOT DEVELOPMENT**\n\nTeknologi yang kami support:\n• Discord.js v14\n• Python (discord.py)\n• Slash Commands\n• Database Integration\n\nFitur yang bisa dibuat:\n• Moderation bot\n• Ticket system\n• Economy system\n• Music bot (legal sources only)\n\n✅ **Discord Developer Policy Compliant**'
    },
    graphic_design: {
        name: 'Graphic Design Service',
        description: 'Jasa design grafis untuk Discord',
        price: '25.000 - 150.000',
        details: '**GRAPHIC DESIGN SERVICES**\n\nDesign yang kami buat:\n• Server banner\n• Custom emojis\n• Role icons\n• Welcome images\n• Social media graphics\n\nFormat file:\n• PNG/JPEG/WebP\n• Vector (SVG)\n• Animated GIF\n\n✅ **Original Design**\n✅ **Copyright Safe**'
    },
    community_management: {
        name: 'Community Management',
        description: 'Jasa manage komunitas Discord',
        price: '75.000 - 300.000',
        details: '**COMMUNITY MANAGEMENT SERVICE**\n\nLayanan yang kami sediakan:\n• Moderation team training\n• Rule enforcement\n• Event planning\n• Member engagement\n• Growth strategy\n\n✅ **Professional Service**\n✅ **Discord Guidelines Compliant**'
    }
};

// PRODUK EDUCATION (LEGAL)
const educationProducts = {
    coding_tutorial: {
        name: 'Discord Bot Coding Tutorial',
        description: 'Private lesson buat bot Discord',
        price: '50.000 / jam',
        details: '**PRIVATE CODING TUTORIAL**\n\nYang akan dipelajari:\n• Discord.js basics\n• Command handling\n• Event system\n• Database integration\n• Deployment\n\nLevel:\n• Beginner\n• Intermediate\n• Advanced\n\n✅ **Educational Purpose**\n✅ **100% Legal**'
    },
    server_management_course: {
        name: 'Server Management Course',
        description: 'Course manage server Discord',
        price: '75.000',
        details: '**SERVER MANAGEMENT COURSE**\n\nMateri yang diajarkan:\n• Server setup best practices\n• Role hierarchy\n• Moderation tools\n• Bot configuration\n• Community building\n\nFormat:\n• Video lessons\n• PDF guides\n• Live Q&A sessions\n\n✅ **Educational Content**'
    }
};

// ==================== KONFIGURASI ====================

const ORDER_CHANNEL_ID = '1457318847571820720';
const DIRECT_LINK = 'https://discord.com/channels/573092742398345223/1457318847571820720';
const ORDER_CHANNEL_MENTION = `<#${ORDER_CHANNEL_ID}>`;

const BANNER_IMAGE = 'https://image2url.com/r2/bucket1/images/1767693687798-b0a70de9-6f87-4690-ab51-890eefb93902.gif';
const THUMBNAIL_IMAGE = 'https://image2url.com/r2/bucket1/images/1767693842203-a4f88e68-d87e-4764-8de6-a6fd644ca47d.blob';

// ==================== FUNGSI DROPDOWN ====================

function createLegalServicesDropdown() {
    const dropdown = new StringSelectMenuBuilder()
        .setCustomId('select_legal_service')
        .setPlaceholder('Pilih layanan legal yang tersedia')
        .addOptions(
            {
                label: 'Setup Server',
                description: 'Rp 50.000 - 250.000',
                value: 'server_setup'
            },
            {
                label: 'Bot Development',
                description: 'Rp 100.000 - 500.000',
                value: 'bot_development'
            },
            {
                label: 'Graphic Design',
                description: 'Rp 25.000 - 150.000',
                value: 'graphic_design'
            },
            {
                label: 'Community Management',
                description: 'Rp 75.000 - 300.000',
                value: 'community_management'
            }
        );

    return new ActionRowBuilder().addComponents(dropdown);
}

function createEducationDropdown() {
    const dropdown = new StringSelectMenuBuilder()
        .setCustomId('select_education')
        .setPlaceholder('Pilih course/tutorial')
        .addOptions(
            {
                label: 'Coding Tutorial',
                description: 'Rp 50.000 / jam',
                value: 'coding_tutorial'
            },
            {
                label: 'Server Management Course',
                description: 'Rp 75.000',
                value: 'server_management_course'
            }
        );

    return new ActionRowBuilder().addComponents(dropdown);
}

// ==================== FUNGSI TOMBOL ====================

function createServiceButtons(serviceId, serviceName, category) {
    return new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('📝 Order di Channel')
                .setURL(DIRECT_LINK)
                .setStyle(ButtonStyle.Link),
            new ButtonBuilder()
                .setCustomId(`back_${category}`)
                .setLabel('🔙 Kembali')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('tos_info')
                .setLabel('📜 TOS Info')
                .setStyle(ButtonStyle.Primary)
        );
}

// ==================== FUNGSI EMBED ====================

function createLegalServicesEmbed() {
    return new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('✅ DISC SHOP - LEGAL SERVICES')
        .setDescription('**Semua layanan 100% Discord TOS Compliant**\n\n⚠️ **DISCLAIMER:** Kami hanya menyediakan jasa legal sesuai Discord Developer Policy.')
        .setImage(BANNER_IMAGE)
        .setThumbnail(THUMBNAIL_IMAGE)
        .addFields(
            { name: 'Setup Server Discord', value: 'Rp 50.000 - 250.000', inline: true },
            { name: 'Bot Development', value: 'Rp 100.000 - 500.000', inline: true },
            { name: 'Graphic Design', value: 'Rp 25.000 - 150.000', inline: true },
            { name: 'Community Management', value: 'Rp 75.000 - 300.000', inline: true },
            { name: 'TOS Compliance', value: '✅ Semua layanan legal & safe', inline: false }
        )
        .setFooter({
            text: 'DISC SHOP • Legal Services • TOS Compliant',
            iconURL: THUMBNAIL_IMAGE
        })
        .setTimestamp();
}

function createEducationEmbed() {
    return new EmbedBuilder()
        .setColor('#0099FF')
        .setTitle('📚 DISC SHOP - EDUCATION SERVICES')
        .setDescription('**Layanan edukasi untuk belajar Discord management & bot development**')
        .setImage(BANNER_IMAGE)
        .setThumbnail(THUMBNAIL_IMAGE)
        .addFields(
            { name: 'Coding Tutorial', value: 'Rp 50.000 / jam', inline: true },
            { name: 'Server Management Course', value: 'Rp 75.000', inline: true },
            { name: 'Format', value: 'Video + PDF + Live Session', inline: false },
            { name: 'Legal Status', value: '✅ Educational Content - 100% Legal', inline: false }
        )
        .setFooter({
            text: 'DISC SHOP • Educational Content • Learn & Grow',
            iconURL: THUMBNAIL_IMAGE
        })
        .setTimestamp();
}

function createTOSEmbed() {
    return new EmbedBuilder()
        .setColor('#FFA500')
        .setTitle('📜 DISCORD TOS COMPLIANCE STATEMENT')
        .setDescription('**Kami berkomitmen untuk selalu mengikuti Discord Terms of Service**')
        .addFields(
            { 
                name: '✅ Legal Services Provided', 
                value: '• Server Setup & Management\n• Bot Development\n• Graphic Design\n• Educational Content\n• Community Management' 
            },
            { 
                name: '❌ Services NOT Provided', 
                value: '• Account sharing\n• Stolen accounts\n• Credit card fraud\n• Automated farming\n• TOS-violating activities' 
            },
            { 
                name: '🔒 Our Commitment', 
                value: '1. 100% Discord TOS Compliant\n2. No illegal activities\n3. No account sharing\n4. Original content only\n5. Educational purposes where applicable' 
            },
            { 
                name: '📞 Contact for Questions', 
                value: 'Jika ada pertanyaan tentang compliance, silahkan hubungi admin.' 
            }
        )
        .setFooter({
            text: 'DISC SHOP • Committed to Discord TOS • Safe & Legal Services',
            iconURL: THUMBNAIL_IMAGE
        })
        .setTimestamp();
}

// ==================== EVENT HANDLERS ====================

client.on('ready', () => {
    console.log(`✅ Bot ${client.user.tag} sudah online dengan rate limiting aman!`);
    console.log(`📊 Rate Limit Settings:`);
    console.log(`   • User Cooldown: ${MESSAGE_COOLDOWN/1000}s (message), ${INTERACTION_COOLDOWN/1000}s (interaction)`);
    console.log(`   • Daily Limit: ${MAX_COMMANDS_PER_DAY} commands/user/day`);
    console.log(`   • Guild Limit: ${MAX_GUILD_COMMANDS_PER_MINUTE} commands/guild/minute`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    
    // Cek rate limits
    const rateCheck = checkRateLimits(
        message.author.id,
        message.guild.id,
        message.channel.id,
        false
    );
    
    if (!rateCheck.allowed) {
        let response = '';
        
        switch (rateCheck.reason) {
            case 'cooldown':
                response = `⏳ Mohon tunggu **${rateCheck.waitTime} detik** sebelum menggunakan command lagi.`;
                break;
            case 'daily_limit':
                response = `📊 Anda telah mencapai **batas harian** (${MAX_COMMANDS_PER_DAY} commands). Coba lagi dalam **${rateCheck.hoursLeft} jam**.`;
                break;
            case 'channel_cooldown':
                response = `⏳ Channel ini sedang sibuk. Tunggu **${rateCheck.waitTime} detik**.`;
                break;
            case 'guild_limit':
                response = `⏳ Server mencapai batas command per menit. Tunggu **${rateCheck.waitTime} detik**.`;
                break;
        }
        
        const warning = await message.reply({
            content: response,
            flags: 64 // EPHEMERAL FLAG
        }).catch(console.error);
        
        if (warning && !warning.ephemeral) {
            setTimeout(() => warning.delete().catch(console.error), 5000);
        }
        return;
    }
    
    // Update rate limits SEBELUM process command
    updateRateLimits(message.author.id, message.guild.id, message.channel.id);
    
    // Command: !legalservices
    if (message.content === '!legalservices') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply({
                content: '❌ Hanya admin yang bisa menggunakan command ini!',
                flags: 64
            }).then(msg => setTimeout(() => msg.delete().catch(console.error), 5000));
        }
        
        const embed = createLegalServicesEmbed();
        const dropdown = createLegalServicesDropdown();
        
        await message.delete().catch(console.error);
        await message.channel.send({ embeds: [embed], components: [dropdown] });
        return;
    }
    
    // Command: !education
    if (message.content === '!education') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply({
                content: '❌ Hanya admin yang bisa menggunakan command ini!',
                flags: 64
            }).then(msg => setTimeout(() => msg.delete().catch(console.error), 5000));
        }
        
        const embed = createEducationEmbed();
        const dropdown = createEducationDropdown();
        
        await message.delete().catch(console.error);
        await message.channel.send({ embeds: [embed], components: [dropdown] });
        return;
    }
    
    // Command: !tos
    if (message.content === '!tos') {
        const embed = createTOSEmbed();
        await message.channel.send({ embeds: [embed] });
        return;
    }
    
    // Command: !ratelimitinfo
    if (message.content === '!ratelimitinfo') {
        const embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('⚡ Rate Limit Information')
            .setDescription('**Pengaturan rate limiting untuk menjaga server tetap stabil:**')
            .addFields(
                { name: 'User Cooldown', value: `• Message: ${MESSAGE_COOLDOWN/1000}s\n• Interaction: ${INTERACTION_COOLDOWN/1000}s`, inline: true },
                { name: 'Daily Limit', value: `${MAX_COMMANDS_PER_DAY} commands/user`, inline: true },
                { name: 'Guild Limit', value: `${MAX_GUILD_COMMANDS_PER_MINUTE}/minute`, inline: true },
                { name: 'Channel Cooldown', value: `${CHANNEL_COOLDOWN/1000}s`, inline: true },
                { name: 'Tujuan', value: 'Mencegah spam & menjaga performa bot', inline: false }
            )
            .setFooter({ text: 'DISC SHOP • Stable & Secure' });
        
        await message.channel.send({ embeds: [embed] });
        return;
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton() && !interaction.isStringSelectMenu()) return;
    
    // Cek rate limits untuk interaction
    const rateCheck = checkRateLimits(
        interaction.user.id,
        interaction.guild?.id || 'dm',
        interaction.channel?.id || 'dm',
        true
    );
    
    if (!rateCheck.allowed) {
        let response = '';
        
        switch (rateCheck.reason) {
            case 'cooldown':
                response = `⏳ Mohon tunggu **${rateCheck.waitTime} detik** sebelum berinteraksi lagi.`;
                break;
            case 'daily_limit':
                response = `📊 Anda telah mencapai **batas harian**. Coba lagi besok!`;
                break;
            default:
                response = '⏳ Terlalu banyak requests. Mohon tunggu sebentar.';
        }
        
        return interaction.reply({
            content: response,
            ephemeral: true
        }).catch(console.error);
    }
    
    // Update rate limits
    if (interaction.guild && interaction.channel) {
        updateRateLimits(interaction.user.id, interaction.guild.id, interaction.channel.id);
    }
    
    // Handle dropdown selection
    if (interaction.customId === 'select_legal_service') {
        const serviceId = interaction.values[0];
        const service = legalProducts[serviceId];
        
        if (!service) {
            return interaction.reply({
                content: '❌ Layanan tidak ditemukan.',
                ephemeral: true
            });
        }
        
        const detailEmbed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle(`✅ ${service.name}`)
            .setDescription(service.details)
            .addFields(
                { name: 'Harga', value: `**Rp ${service.price}**`, inline: true },
                { name: 'TOS Status', value: '✅ **100% Compliant**', inline: true },
                { name: 'Cara Order', value: `Tulis di ${ORDER_CHANNEL_MENTION}:\n\`!order ${service.name}\``, inline: false }
            )
            .setFooter({
                text: 'DISC SHOP • Legal & Safe • TOS Compliant',
                iconURL: THUMBNAIL_IMAGE
            })
            .setTimestamp();
        
        const buttons = createServiceButtons(serviceId, service.name, 'legal');
        
        await interaction.update({
            content: '',
            embeds: [detailEmbed],
            components: [buttons]
        });
    }
    
    // Handle education dropdown
    if (interaction.customId === 'select_education') {
        const courseId = interaction.values[0];
        const course = educationProducts[courseId];
        
        if (!course) {
            return interaction.reply({
                content: '❌ Course tidak ditemukan.',
                ephemeral: true
            });
        }
        
        const detailEmbed = new EmbedBuilder()
            .setColor('#0099FF')
            .setTitle(`📚 ${course.name}`)
            .setDescription(course.details)
            .addFields(
                { name: 'Harga', value: `**Rp ${course.price}**`, inline: true },
                { name: 'Kategori', value: '📖 **Educational Content**', inline: true },
                { name: 'Cara Order', value: `Tulis di ${ORDER_CHANNEL_MENTION}:\n\`!course ${course.name}\``, inline: false }
            )
            .setFooter({
                text: 'DISC SHOP • Educational • Learn & Grow',
                iconURL: THUMBNAIL_IMAGE
            })
            .setTimestamp();
        
        const buttons = createServiceButtons(courseId, course.name, 'education');
        
        await interaction.update({
            content: '',
            embeds: [detailEmbed],
            components: [buttons]
        });
    }
    
    // Handle back buttons
    if (interaction.customId.startsWith('back_')) {
        const category = interaction.customId.replace('back_', '');
        
        switch(category) {
            case 'legal':
                const legalEmbed = createLegalServicesEmbed();
                const legalDropdown = createLegalServicesDropdown();
                await interaction.update({
                    content: '',
                    embeds: [legalEmbed],
                    components: [legalDropdown]
                });
                break;
                
            case 'education':
                const educationEmbed = createEducationEmbed();
                const educationDropdown = createEducationDropdown();
                await interaction.update({
                    content: '',
                    embeds: [educationEmbed],
                    components: [educationDropdown]
                });
                break;
                
            default:
                await interaction.update({
                    content: 'Kembali ke menu utama...',
                    components: []
                });
        }
    }
    
    // Handle TOS info button
    if (interaction.customId === 'tos_info') {
        const tosEmbed = createTOSEmbed();
        
        await interaction.reply({
            embeds: [tosEmbed],
            ephemeral: true
        });
    }
});

// ==================== WEB SERVER UNTUK RENDER ====================

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    const stats = {
        status: 'online',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        rateLimits: {
            activeUsers: userCooldowns.size,
            dailyActive: dailyLimits.size,
            activeGuilds: guildCommandCount.size
        }
    };
    
    res.json(stats);
});

app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        clientReady: client.isReady()
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🌐 Health check server running on port ${PORT}`);
});

// ==================== LOGIN BOT ====================

client.login(process.env.DISCORD_TOKEN);

// ==================== ERROR HANDLING ====================

process.on('unhandledRejection', (error) => {
    console.error('Unhandled Promise Rejection:', error);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

client.on('error', (error) => {
    console.error('Discord Client Error:', error);
});

client.on('warn', (warning) => {
    console.warn('Discord Client Warning:', warning);
});