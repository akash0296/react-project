/**
 * This is custom config file for react-styleguidist,
 * to capture DOM elements and UI Component Documentations.
 * This config file needs to be specified while intializing the styleguide.
 */

const path = require('path')
const cwd = path.join(__dirname, '..')

module.exports = {
	title: 'Project Styleguide',
	pagePerSection: true,
	styleguideComponents: {
		Wrapper: path.join(cwd, 'src/components/StyleGuideWrapper'),
	},
	skipComponentsWithoutExample: true,
	styleguideDir: path.join(cwd, 'styleguide'),
	ignore: ['**/*.example.tsx', '**/*.example.ts'],
	sections: [
		{
			name: 'Introduction',
			content: path.join(cwd, 'docs/introduction.md'),
		},
		{
			name: 'Documentation',
			sections: [
				{
					name: 'Installation & Config',
					content: path.join(cwd, 'docs/installation.md'),
				},
				{
					name: 'Live Demo',
					external: true,
					href: 'http://example.com',
				},
			],
		},
		{
			name: 'UI Elements',
			content: path.join(cwd, 'docs/elements.md'),
			components: path.join(cwd, 'src/elements/**/*.tsx'),
		},
		{
			name: 'UI Components',
			content: path.join(cwd, 'docs/components.md'),
			components: path.join(cwd, 'src/components/**/*.tsx'),
		},
	],
	propsParser: require('react-docgen-typescript').withDefaultConfig({
		propFilter: { skipPropsWithoutDoc: true },
	}).parse,
}
