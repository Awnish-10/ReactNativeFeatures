/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useMemo} from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const ws = useMemo(() => new WebSocket('ws://echo.websocket.org'), []);
  const setWebSocket = useCallback(() => {
    ws.onopen = () => {
      // Connection opened
      console.log('WebSocket connection opened');
      ws.send('Hello, server!'); // Send a message to the server
    };
    ws.onmessage = e => {
      // Receive a message from the server
      Alert.alert('message received');
      console.log('onmessage', e.data);
    };
    ws.onerror = e => {
      // An error occurred
      console.log('onerror', e.message);
    };
    ws.onclose = e => {
      // Connection closed
      console.log('onclose', e.code, e.reason);
    };
  }, [ws]);
  useEffect(() => {
    setWebSocket();
  }, [setWebSocket]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView
      style={[
        backgroundStyle,
        {flex: 1, justifyContent: 'center', alignItems: 'center'},
      ]}>
      <View>
        <Text>WebSocket Example</Text>
        <TouchableOpacity
          onPress={() => {
            ws.send('Hello, server!');
          }}>
          <Text>SEND MESSAGE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default App;
