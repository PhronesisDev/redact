/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
export default function Main() {
  return (
    <PaperProvider>
      <GestureHandlerRootView style={{flex:1}}>
        <App />
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
