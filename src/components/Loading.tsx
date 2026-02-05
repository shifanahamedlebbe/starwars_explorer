import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loading: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator size={'large'} />
  </View>
);

export default Loading;

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center' },
});
