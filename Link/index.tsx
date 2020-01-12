import React from 'react';
import {
	LayoutAnimation,
	StyleProp,
	StyleSheet,
	Switch,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	ViewStyle,
} from 'react-native';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';

import { EditorStatus } from '../types';

const HEIGHT_DIALOG = 220;

const styles = StyleSheet.create( {
	backdrop: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,

		backgroundColor: '#00000011',
	},
	accessoryView: {
		backgroundColor: '#f2f2f7',

		shadowColor: '#8e8e93',
		shadowOffset: {
			width: 0,
			height: -10,
		},
		shadowOpacity: 0.2,
		shadowRadius: 10,
	},
	container: {
		height: HEIGHT_DIALOG,
		paddingLeft: 20,
		paddingRight: 20,
	},
	topRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	closer: {
		marginLeft: 10,
		alignSelf: 'stretch',
		alignItems: 'center',
		flexDirection: 'row',
	},

	fieldRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	fieldLabel: {
		fontSize: 16,
		marginRight: 10,
		width: 'auto',
	},
	textInput: {
		flex: 1,
		fontSize: 16,
		height: 30,
		textAlign: 'right',
	},
	switchWrap: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},
	remove: {
		height: 30,
	},
	removeText: {
		fontSize: 13,
		textAlign: 'center',
		color: '#ff3b30',
	},
} );

interface ToolbarProps {
	status: EditorStatus;
	style?: StyleProp<ViewStyle> | null;
	visible: boolean;
	onCommand: ( ...args: Array<string | boolean | null> ) => void;
	onDismiss: () => void;
	onFormat: ( type: string ) => void;
}

const Row = ( { children, style }) => (
	<View style={ [ styles.fieldRow, style ] }>
		{ children }
	</View>
);

const Label = ( { title } ) => (
	<View style={ styles.fieldLabel }>
		<Text>{ title }</Text>
	</View>
);

export default class Link extends React.Component<ToolbarProps> {
	state = {
		url: '',
		text: '',
		newTab: false,
	}

	componentDidUpdate() {
		LayoutAnimation.configureNext(
			LayoutAnimation.create(
				250,
				LayoutAnimation.Types.keyboard,
				LayoutAnimation.Properties.scaleXY,
			)
		);
	}

	onCancel = () => {
		this.props.onDismiss();
	}

	onSave = () => {
		if ( ! this.state.url ) {
			return;
		}

		const value = {
			href: this.state.url,
			target: this.state.newTab ? '_blank' : null,
		};
		this.props.onCommand( 'mceInsertLink', false, value );
	}

	onToggleNewTab = ( value: boolean ) => {
		this.setState( {
			newTab: value,
		}, () => {
			// If we have a URL, also trigger save.
			this.onSave();
		} );
	}

	onRemoveLink = () => {
		this.props.onCommand( 'unlink' );
		this.props.onDismiss();
	}

	render() {
		const { style, onCommand, onDismiss, onFormat } = this.props;

		return (
			<>
				<TouchableWithoutFeedback
					onPress={ this.onCancel }
				>
					<View
						style={ styles.backdrop }
					/>
				</TouchableWithoutFeedback>

				<KeyboardAccessoryView
					avoidKeyboard
					hideBorder
					inSafeAreaView
					style={ styles.accessoryView }
				>
					<View style={ styles.container }>
						<Row>
							<Label title="URL" />
							<TextInput
								autoFocus
								autoCapitalize="none"
								autoCorrect={ false }
								keyboardType="url"
								placeholder="example.com"
								style={ styles.textInput }
								textContentType="URL"
								value={ this.state.url }
								onChangeText={ url => this.setState( { url } ) }
								onSubmitEditing={ this.onSave }
							/>
						</Row>
						<Row>
							<Label title="Link text" />
							<TextInput
								placeholder="Link text"
								style={ styles.textInput }
								value={ this.state.text }
								onChangeText={ text => this.setState( { text } ) }
								onSubmitEditing={ this.onSave }
							/>
						</Row>
						<Row>
							<Label title="Open in new tab" />
							<View style={ styles.switchWrap }>
								<Switch
									value={ this.state.newTab }
									onValueChange={ this.onToggleNewTab }
								/>
							</View>
						</Row>
						<TouchableOpacity
							onPress={ this.onRemoveLink }
						>
							<View style={ styles.remove }>
								<Text style={ styles.removeText }>
									Remove link
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</KeyboardAccessoryView>
			</>
		);
	}
}
