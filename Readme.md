# DRPG Logger

Pretty logging for Discord.JS

![image](https://cdn.discordapp.com/attachments/964178424258236466/967811840904134726/unknown.png)

![image](https://cdn.discordapp.com/attachments/964178424258236466/967813884264210472/unknown.png)

## What is DRPG Logger?

DRPG Logger is an advanced console and channel logging package for bots created with Discord.JS.
With this package, you can quickly print nicely formatted logs to your console, as well as to any discord Channel.

On top of formatting the logs, any Discord User, Member, or Channel will also be displayed in the console in a nice and easy to read manner (including display name and ID).
This is done by default when a `User`, `GuildMember`, or `Channel` is supplied - which when included in a string forms a pattern such as `<@12345678912345678>`.

**NOTE**
Currently, this package only supports a single log channel. If your bot is a multi-guild bot (as most are), a log channel per guild is currently not supported.

## Install

Run `npm install drpg-logger`

## Usage

1. Import the module

```ts
import { Logger, LogLevel } from "drpg-logger";
```

2. Provide your config in the constructor and access desired functions

```ts
import { Client } from "discord.js";
import { Logger, LogLevel } from "drpg-logger";

const client = new Client({}); // However you are creating your discord Client - this is up to you

const logChannelId = process.env.LOG_CHANNEL_ID; // However you decide to provide the log channel. Suggested via environment variables.
const logger = new Logger(client, { defaultLogChannel: logChannelId, dateDisplayTimezone: "+1000" });

client.once("ready", () => {
	logger.info("Bot has started!", "Bot Running");
});

client.login(token);
```

3. Once initialized, you can use `Logger` to access all of it's static methods. 
```ts
client.on('interactionCreate', interaction => {
    Logger.debug(`${interaction.user} did some interaction in ${interaction.channel}`,"Interaction", interaction.message);
});
```

### Suggestions

-   For easy and repeated use, it is suggested that your instance of `logger` is exported, so that you can use the same instance throughout.
-   This package makes heavy use of the [colorette](https://www.npmjs.com/package/colorette) library. You can use this library with the `content` properties, to further enhance the display of your logs.

### Default Log Types

By default, a number of log types are included. All of these can be quickly used by calling `Logger.trace`, `Logger.info`, `Logger.warn` and so on.

-   `trace` (Priority `10`)
-   `debug` (Priority `20`)
-   `info` (Priority `30`)
-   `warn` (Priority `40`)
-   `error` (Priority `50`)
-   `fatal` (Priority `60`)

## Configuration

All configuration is done via the `ILoggerOptions`, which is passed in at the time of creation.

-   `defaultLogChannel` Required. The Channel that will be used for sending Log embeds.
-   `allowEmbedLevel` Optional. Defaults to `30`. Each LogType has a Priority. If a new log has _less_ than this level of priority, the Embed will not be sent.
-   `allowLogLevel` Optional. Defaults to `10`. Each LogType has a priority. If a new log has _less_ than this level of priority, the console log will not be sent.
-   `dateDisplayTimezone` Optional. Defaults to `0`. Must be procided as a UTC Offset ie `+1030` for UTC+10:30. Will change the date used for logging.
-   `dateFormat` Optional. Defaults to `YYYY-MM-DD HH:mm:ss`. Will be included in all console logs.
