import {PrismTheme} from 'prism-react-renderer';

const theme: PrismTheme = {
	plain: {
		color: '#F8F8F2',
		backgroundColor: '#282A36',
	},
	styles: [
		{
			types: ['comment', 'prolog', 'doctype', 'cdata'],
			style: {
				color: '#a0a1a7',
			},
		},
		{
			types: ['punctuation'],
			style: {
				color: '#EE8030',
			},
		},
		{
			types: ['selector', 'tag'],
			style: {
				color: '#C5C5E9',
			},
		},
		{
			types: [
				'property',
				'boolean',
				'number',
				'constant',
				'symbol',
				'attr-name',
				'deleted',
			],
			style: {
				color: '#E1AA76',
			},
		},
		{
			types: ['string', 'char', 'attr-value', 'builtin', 'inserted'],
			style: {
				color: '#00CCB1',
			},
		},
		{
			types: ['operator', 'entity', 'url'],
			style: {
				color: '#FEEC4C',
			},
		},
		{
			types: ['function'],
			style: {
				color: '#FD7B7B',
			},
		},
		{
			types: ['keyword', 'regex', 'important', 'variable'],
			style: {
				color: '#8481AF',
			},
		},
	],
};

export default theme;
