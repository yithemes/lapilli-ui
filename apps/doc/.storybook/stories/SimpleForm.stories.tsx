import type { Meta, StoryObj } from '@storybook/react-webpack5';

import SimpleForm from './introduction/SimpleForm';

const meta: Meta<typeof SimpleForm> = {
	title: 'Introduction/Simple Form Example',
	component: SimpleForm,
	parameters: {
		previewTabs: {
			'storybook/docs/panel': {
				hidden: true,
			},
			canvas: {
				title: 'Example',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof SimpleForm>;

export const Example: Story = {};
