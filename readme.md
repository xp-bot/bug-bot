# XP BugBot

XP BugBot implements essential support features to the XP Discord server.

## Setup

### Using `docker-compose.yml`

1. Create a `docker-compose.yml` file in your project directory.
2. Add the following content to the file:

   ```yaml
   version: '3'
   services:
     xp-bugbot:
       image: ghcr.io/xp-bot/xp-bugbot:latest
       volumes:
         - ./volumes/xp-bugbot/setup.json:/app/setup.json
       environment:
         - TOKEN=<discord bot token>
         - GUILD=<discord guild ID>
         - SUPPORT_ROLE=<discord support role ID>
         - ARCHIVE_CATEGORY=<discord archive category ID>
         - TICKET_CATEGORY=<discord ticket category ID>
         - GET_HELP_FORUM_CHANNEL=<discord get help forum channel ID>
         - API_ACCESS=<your API access token>
         - ALIAS_<user ID>=<alias for user with ID <user ID>>
   ```

3. Replace the following values:

   - `<discord bot token>`: The token of the Discord bot.
   - `<discord guild ID>`: The ID of the Discord guild.
   - `<discord support role ID>`: The ID of the support role.
   - `<discord archive category ID>`: The ID of the archive category.
   - `<discord ticket category ID>`: The ID of the ticket category.
   - `<discord get help forum channel ID>`: The ID of the get help forum channel.
   - `<your API access token>`: The access token of the XP API.
   - `<alias for user with ID <user ID>>` (optional): An alias for a user with the given ID.

### Using Docker CLI

1. Open your terminal and run the following command:

   ```bash
   docker run -e TOKEN=<discord bot token> \
            -e GUILD=<discord guild ID> \
            -e SUPPORT_ROLE=<discord support role ID> \
            -e ARCHIVE_CATEGORY=<discord archive category ID> \
            -e TICKET_CATEGORY=<discord ticket category ID> \
            -e GET_HELP_FORUM_CHANNEL=<discord get help forum channel ID> \
            -e API_ACCESS=<your API access token> \
            -e ALIAS_<user ID>=<alias for user with ID <user ID>> \
            -v ./volumes/xp-bugbot/setup.json:/app/setup.json \
            ghcr.io/xp-bot/xp-bugbot:latest
   ```
