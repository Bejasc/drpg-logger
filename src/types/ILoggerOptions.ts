export default interface ILoggerOptions {
	/**Required. The Channel that will be used for sending Log embeds.*/
	defaultLogChannel: string;
	/**Optional. Defaults to `30`. Each LogType has a Priority. If a new log has _less_ than this level of priority, the Embed will not be sent.*/
	allowEmbedLevel?: number;
	/**Optional. Defaults to `10`. Each LogType has a priority. If a new log has _less_ than this level of priority, the console log will not be sent.*/
	allowLogLevel?: number;
	/**ptional. Defaults to `0`. Must be procided as a UTC Offset ie `+1030` for UTC+10:30. Will change the date used for logging.*/
	dateDisplayTimezone?: string;
	/**Optional. Defaults to `YYYY-MM-DD HH:mm:ss`. Will be included in all console logs.*/
	dateFormat?: string;
	/**Optional. Defaults to `true`. Whether or not the 'Powered by DRPG' footer will show on Logger.respond */
	includeFooterOnRespond?:boolean
}
