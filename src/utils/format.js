function money(value = 0) {
  return Number(value || 0).toLocaleString('pt-BR');
}

function profileCaption(profile) {
  return [
    '┏━━━━━━━━━━━━━┓',
    '        Perfil DragonVerse',
    '┗━━━━━━━━━━━━━┛',
    '',
    `👤 *Personagem:* ${profile.character_name || 'Nenhum'}`,
    `🌌 *Universo:* ${profile.universe_id || 'Nenhum'}`,
    `🔥 *Ki Atual:* ${money(profile.ki_atual)}`,
    `💰 *Zenies:* ${money(profile.zenies)}`,
    `🏦 *Depósito:* ${money(profile.deposito)}`,
    `🎖️ *Cargo:* ${profile.cargo || 'Guerreiro'}`,
    `🛠️ *Trabalho:* ${profile.trabalho || 'Nenhum'}`,
    `💵 *Salário:* ${money(profile.salario)}`,
  ].join('\n');
}

module.exports = { money, profileCaption };
