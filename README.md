# Discord Music Bot

This repository contains the code for a Discord music bot built with Node.js and discord.js.

## Features

* **Music Playback:** Play music from YouTube, Spotify, and SoundCloud.
* **Command System:** User-friendly commands for controlling music playback.
* **Voice Channel Integration:** Seamless integration with Discord voice channels.
* **Playlist Support:** Create and manage playlists of your favorite songs.
* **User Permissions:** Define roles with specific music control permissions.
* **Error Handling:** Graceful error handling for unexpected situations.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/discord-music-bot.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create a `.env` file:**
   ```
   DISCORD_TOKEN=your-discord-bot-token
   ```
   Replace `your-discord-bot-token` with your actual bot token.
4. **Start the bot:**
   ```bash
   node index.js
   ```

## Commands

* `/play <song query>`: Play a song.
* `/queue`: Display the current song queue.
* `/skip`: Skip the current song.
* `/stop`: Stop music playback and clear the queue.
* `/volume <new volume level>`: Adjust the volume.
* `/loop`: Toggle song looping.
* `/help`: Display a list of available commands.
* `/ping`: Measure the bot's latency.
* `/setprefix <new prefix>`: Change the bot's prefix for a server (admin only).
* `/setdjrole <role>`: Set a DJ role for a server (admin only).

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.