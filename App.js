import { StyleSheet, View } from 'react-native';
import { Index } from './src/pages/Index';

export default function App() {
  return (
    <View style={app.app}>
      <Index />
    </View>
  );
}

const app = StyleSheet.create({
  app: {
    flex: 1
  }
})