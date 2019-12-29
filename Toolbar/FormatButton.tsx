import React from 'react';

import Button from './Button';
import { EditorChildrenProps } from '../Editor';

export default function FormatButton( props: EditorChildrenProps ) {
	return (
		<Button
			fallback="¶"
			icon="􀅒"
			label="Format"
			onPress={ props.onShowFormat }
		/>
	);
}
