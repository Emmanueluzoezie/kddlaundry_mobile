import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import tailwind from 'twrnc';
import DrawerComponent from './components/Drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './app/store';
import { useFonts } from 'expo-font';
import client from './apollo-client';
import { ApolloProvider } from '@apollo/client';

export default function App() {
  let [fontLoaded] = useFonts({
    "Lato-Regular": require("./assets/Lato/Lato-Regular.ttf"),
    "Lato-Italic": require("./assets/Lato/Lato-Italic.ttf"),
    "Lato-Light": require("./assets/Lato/Lato-Light.ttf"),
    "Lato-Bold": require("./assets/Lato/Lato-Bold.ttf"),
    "Lato-Bolder": require("./assets/Lato/Lato-Black.ttf"),
    "Lato-BoldItalic": require("./assets/Lato/Lato-BlackItalic.ttf"),
  })

  if (!fontLoaded) {
    return undefined
  }

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <GestureHandlerRootView style={tailwind`flex-1 w-full`}>
          <DrawerComponent />
        </GestureHandlerRootView>
      </Provider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
