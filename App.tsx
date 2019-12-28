import * as Font from 'expo-font';
import React from 'react';
import {
	SafeAreaView,
	StyleSheet,
	View
} from 'react-native';

import Editor from './Editor';

const styles = StyleSheet.create( {
	safeArea: {
		flex: 1,
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
} );

export default class App extends React.Component {
	state = {
		loadedSymbols: false,
	}

	componentDidMount() {
		Font.loadAsync( {
			'sfsymbols': require( './assets/SFSymbolsFallback.ttf' ),
		} ).then( () => {
			this.setState( { loadedSymbols: true } );
		} );
	}
	render() {
		if ( ! this.state.loadedSymbols ) {
			return null;
		}

		return (
			<SafeAreaView style={ styles.safeArea }>
				<View
					style={ styles.container }
				>
					<Editor />
				</View>
			</SafeAreaView>
		);
	}
}
