export interface ILogType {
	priority: number;
	title?: string;
	embedColor?: string;
	logChannel?: string;
	logTag?: string;
	method?: "trace" | "debug" | "info" | "warn" | "error" | "log";
	emoji?: string;
	thumbnail?:string
}
