
import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function EnforcementMap() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Road Traffic Enforcement Map
      </Text>

      <Text style={styles.message}>
        Interactive native maps are available
        on Android and iOS.
      </Text>

      <Text style={styles.location}>
        Default Location: Port Moresby, PNG
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F7FA',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#163C65',
    marginBottom: 15,
    textAlign: 'center',
  },

  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },

  location: {
    fontSize: 14,
    color: '#777',
  },
});
