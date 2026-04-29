const db = require('./db');
const personagensUniverso2 = require('../data/personagensUniverso2');
const { slugify } = require('../utils/text');

function migrate() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS universes (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      welcome_text TEXT NOT NULL,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS characters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      universe_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      slug TEXT NOT NULL,
      is_locked INTEGER NOT NULL DEFAULT 0,
      image_path TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(universe_id, slug),
      FOREIGN KEY(universe_id) REFERENCES universes(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      whatsapp_id TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL,
      display_name TEXT,
      ki_atual INTEGER NOT NULL DEFAULT 1000,
      zenies INTEGER NOT NULL DEFAULT 0,
      deposito INTEGER NOT NULL DEFAULT 0,
      cargo TEXT NOT NULL DEFAULT 'Guerreiro',
      trabalho TEXT NOT NULL DEFAULT 'Nenhum',
      salario INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS character_claims (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      player_id INTEGER NOT NULL UNIQUE,
      universe_id INTEGER NOT NULL,
      character_id INTEGER NOT NULL,
      claim_type TEXT NOT NULL DEFAULT 'player',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE,
      FOREIGN KEY(universe_id) REFERENCES universes(id) ON DELETE CASCADE,
      FOREIGN KEY(character_id) REFERENCES characters(id) ON DELETE CASCADE
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_player_character_by_universe
    ON character_claims(universe_id, character_id)
    WHERE claim_type = 'player';

    CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_supreme_character
    ON character_claims(character_id)
    WHERE claim_type = 'supremo';

    CREATE TABLE IF NOT EXISTS rescue_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL UNIQUE,
      universe_id INTEGER NOT NULL,
      character_id INTEGER NOT NULL,
      created_by TEXT NOT NULL,
      redeemed_by TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      used_at TEXT,
      FOREIGN KEY(universe_id) REFERENCES universes(id) ON DELETE CASCADE,
      FOREIGN KEY(character_id) REFERENCES characters(id) ON DELETE CASCADE
    );
  `);

  seedUniverse2();
}

function seedUniverse2() {
  const welcome = '==>> Bem-vindo ao Universo 2 DragonVerse, aqui você irá escolher seu personagem e logo em seguida será treinado para se juntar à batalha. <<==';

  db.prepare(`
    INSERT INTO universes (id, name, welcome_text)
    VALUES (?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      welcome_text = excluded.welcome_text,
      is_active = 1
  `).run(2, 'Universo 2', welcome);

  const insertCharacter = db.prepare(`
    INSERT INTO characters (universe_id, name, slug, is_locked, image_path)
    VALUES (@universe_id, @name, @slug, @is_locked, @image_path)
    ON CONFLICT(universe_id, slug) DO UPDATE SET
      name = excluded.name,
      is_locked = excluded.is_locked
  `);

  const transaction = db.transaction((characters) => {
    for (const character of characters) {
      const slug = slugify(character.name);
      insertCharacter.run({
        universe_id: 2,
        name: character.name,
        slug,
        is_locked: character.locked ? 1 : 0,
        image_path: `assets/personagens/${slug}.png`,
      });
    }
  });

  transaction(personagensUniverso2);
}

module.exports = { migrate };
