// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IClassNames {
	[className: string]: string;
}

declare module '*.scss?module' {
	const classNames: IClassNames;

	export = classNames;
}

declare module '*.css?module' {
	const classNames: IClassNames;

	export = classNames;
}
