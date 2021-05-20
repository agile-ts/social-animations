export function defineConfig<ConfigInterface = Object>(
	config: ConfigInterface,
	defaults: Object,
	overwriteUndefinedProperties?: boolean
): ConfigInterface {
	if (overwriteUndefinedProperties === undefined)
		overwriteUndefinedProperties = true;

	if (overwriteUndefinedProperties) {
		const finalConfig = {...defaults, ...config};
		for (const key in finalConfig) {
			// @ts-ignore
			if (finalConfig[key] === undefined) finalConfig[key] = defaults[key];
		}

		return finalConfig;
	}

	return {...defaults, ...config};
}

export function normalizeArray<DataType = any>(
	items?: DataType | Array<DataType>,
	config: {createUndefinedArray?: boolean} = {}
): Array<DataType> {
	config = defineConfig(config, {
		createUndefinedArray: false, // If it should return [] or [undefined] if the passed Item is undefined
	});
	if (items == null && !config.createUndefinedArray) return [];
	return Array.isArray(items) ? items : [items as DataType];
}
