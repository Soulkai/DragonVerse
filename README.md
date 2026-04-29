# DragonVerse WhatsApp Bot

Bot inicial para RPG de Dragon Ball usando Node.js, whatsapp-web.js e SQLite.

## Comandos prontos

- `/Personagens 2`
- `/Registro 2 Goku`
- `/Registro 2 Bardock DBV-XXXXXX-XXXX`
- `/Perfil`
- `/codigoresgate Bardock` ou `/codigoresgate 2 Bardock` apenas para admin

## Instalação

```bash
npm install
cp .env.example .env
npm start
```

No primeiro start, escaneie o QR Code no terminal usando o WhatsApp.

## Banco de dados

O SQLite é criado automaticamente em:

```txt
data/dragonverse.sqlite
```

## Fotos dos personagens

Coloque imagens PNG nesta pasta:

```txt
assets/personagens/
```

O nome precisa ser o slug do personagem. Exemplos:

```txt
assets/personagens/goku.png
assets/personagens/android-17.png
assets/personagens/broly-dbs.png
assets/personagens/dragao-de-uma-estrela.png
```

Se a imagem não existir, o comando `/Perfil` envia apenas o texto e mostra o caminho esperado.

## Admins

Configure no `.env`:

```env
ADMIN_NUMBERS=5567999999999
```

Use número em formato internacional, sem `+`, sem espaço e sem traços.
