const { Telegraf, Markup } = require('telegraf');

// Use your token from @BotFather
const bot = new Telegraf('8430674141:AAGLeQk7EFUS9YtGGW6nISJA3X5_ylXkvWo');

// 1. Start Command: The Entry Point
bot.start((ctx) => {
    return ctx.reply(
        `Welcome to Business Assistant, ${ctx.from.first_name}! \nI can help you learn about our services or book a consultation.🚀`,
        Markup.inlineKeyboard([
            [Markup.button.callback('Our Services', 'show_services')],
            [Markup.button.callback('About Company', 'about_us')],
            [Markup.button.callback('Book a Call', 'book_call')]
        ])
    );
});

// 2. Services Section
bot.action('show_services', (ctx) => {
    return ctx.editMessageText(
        'We provide high-quality solutions: \n- Web Development \n- Telegram Bots \n- Automation Scripts',
        Markup.inlineKeyboard([
            [Markup.button.callback('« Back', 'back_to_start')]
        ])
    );
});

// 3. About Us Section
bot.action('about_us', (ctx) => {
    return ctx.editMessageText(
        'We are a team of professionals helping businesses automate their routine since 2026.',
        Markup.inlineKeyboard([
            [Markup.button.callback('« Back', 'back_to_start')]
        ])
    );
});

// 4. Booking Logic (Simple notification for you)
bot.action('book_call', (ctx) => {
    ctx.reply('Please, type your phone number below. Our manager will contact you shortly!');
});

// 5. Back to Menu Handler
bot.action('back_to_start', (ctx) => {
    return ctx.editMessageText('How else can I help you?', 
        Markup.inlineKeyboard([
            [Markup.button.callback('Our Services', 'show_services')],
            [Markup.button.callback('About Company', 'about_us')],
            [Markup.button.callback('Book a Call', 'book_call')]
        ])
    );
});

// 6. Catching Leads (Phone numbers/messages)
bot.on('text', (ctx) => {
    const leadInfo = ctx.message.text;
    console.log(`NEW LEAD RECEIVED: ${leadInfo} from @${ctx.from.username}`);
    
    // Sending a confirmation to the user
    ctx.reply('Success! Your request has been sent to our manager.');
    
    // Optional: Send this lead to YOUR telegram ID so you don't miss it
    // bot.telegram.sendMessage('YOUR_CHAT_ID', New Lead: ${leadInfo} from @${ctx.from.username});
});

// ... тут твой старый код с кнопками ...

// 1. Вставь свой ID (те самые цифры, что ты получила)
const MY_ID = 1039826193; 

// 2. Логика обработки текста и пересылки тебе в личку
bot.on('text', async (ctx) => {
    // Этот код отправит сообщение тебе в ответ (в тот же чат)
    // Если это сработает, значит бот ЖИВОЙ
    await ctx.reply(`I saw your message: ${ctx.message.text}`);

    // А теперь пробуем отправить самому себе по ID
    try {
        await ctx.telegram.sendMessage(ctx.from.id, "Testing ID delivery...");
        console.log("ID delivery works!");
    } catch (e) {
        console.log("ID delivery failed: " + e.message);
    }
});

// ЭТА СТРОЧКА ВСЕГДА ДОЛЖНА БЫТЬ ПОСЛЕДНЕЙ
bot.launch();
console.log('Business Bot is running on Node.js...');
