async function helpCommand(message) {
  await message.reply([
    '🐉 *Comandos DragonVerse*',
    '',
    '*/Personagens 2* — Mostra personagens livres, ocupados e bloqueados.',
    '*/Registro 2 Goku* — Registra seu personagem.',
    '*/Registro 2 Bardock CÓDIGO* — Registra personagem bloqueado com código.',
    '*/Perfil* — Mostra seu perfil.',
    '*/codigoresgate Bardock* — Admin gera código para personagem bloqueado.',
  ].join('\n'));
}

module.exports = { helpCommand };
