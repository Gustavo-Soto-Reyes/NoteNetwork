// Import necessary modules
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define the functional component
const Template = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, React Native!</Text>
    </View>
  );
};

// Define the component's styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

// Export the component
export default Template;
