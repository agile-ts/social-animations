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
			types: ['atrule', 'keyword', 'regex', 'important', 'variable'],
			style: {
				color: '#8481AF',
			},
		},

		// {
		// 	types: ['prolog', 'constant', 'builtin'],
		// 	style: {
		// 		color: '#e1aa76',
		// 	},
		// },
		// {
		// 	types: ['inserted', 'function'],
		// 	style: {
		// 		color: 'rgb(80, 250, 123)',
		// 	},
		// },
		// {
		// 	types: ['deleted'],
		// 	style: {
		// 		color: 'rgb(255, 85, 85)',
		// 	},
		// },
		// {
		// 	types: ['changed'],
		// 	style: {
		// 		color: 'rgb(255, 184, 108)',
		// 	},
		// },
		// {
		// 	types: ['punctuation', 'symbol'],
		// 	style: {
		// 		color: '#EE8030',
		// 	},
		// },
		// {
		// 	types: ['string', 'char', 'tag', 'selector'],
		// 	style: {
		// 		color: '#00CCB1',
		// 	},
		// },
		// {
		// 	types: ['keyword', 'variable', 'regex', 'important'],
		// 	style: {
		// 		color: '#8481AF',
		// 		fontStyle: 'italic',
		// 	},
		// },
		// {
		// 	types: ['comment'],
		// 	style: {
		// 		color: '#00CCB1',
		// 	},
		// },
		// {
		// 	types: ['attr-name'],
		// 	style: {
		// 		color: '#e1aa76',
		// 	},
		// },
	],
};

export default theme;
