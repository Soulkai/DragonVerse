const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const settings = require('./config/settings');
const { migrate } = require('./database/migrate');
const { parseCommand } = require('./utils/text');
const { registroCommand } = require('./commands/registro');
const { personagensCommand } = require('./commands/personagens');
const { codigoResgateCommand } = require('./commands/codigoResgate');
const { perfilCommand } = require('./commands/perfil');
const { helpCommand } = require('./commands/help');

migrate();

const client = new Client({
  authStrategy: new LocalAuth({
    clientId: 'dragonverse-rpg',
    dataPath: './.wwebjs_auth',
  }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

client.on('qr', (qr) => {
  console.log('Escaneie o QR Code abaixo com seu WhatsApp:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Bot DragonVerse conectado com sucesso!');
});

client.on('message', async (message) => {
  try {
    const command = parseCommand(message.body || '', settings.prefix);
    if (!command) return;

    switch (command.name) {
      case 'registro':
        await registroCommand(message, command);
        break;

      case 'personagens':
        await personagensCommand(message, command);
        break;

      case 'codigoresgate':
      case 'codigoresgate':
      case 'códigoresgate':
        await codigoResgateCommand(message, command);
        break;

      case 'perfil':
        await perfilCommand(message, command);
        break;

      case 'help':
      case 'ajuda':
      case 'comandos':
        await helpCommand(message, command);
        break;

      default:
        break;
    }
  } catch (error) {
    console.error('Erro ao processar mensagem:', error);
    await message.reply('Ocorreu um erro interno ao processar esse comando.');
  }
});

client.initialize();
