export interface IEmbedOptions {
	thumbnail?: string;
	image?: string;
	fields?: {
		name: string;
		value: string;
		inline?: boolean;
	}[];
	author?: {
		name: string;
		iconUrl: string;
		url?: string;
	};
}
