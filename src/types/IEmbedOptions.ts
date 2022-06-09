export default interface IEmbedOptions {
	thumbnail?: string;
	image?: string;
	fields?: {
		name: string;
		value: string;
		inline?: boolean;
	}[];
}
