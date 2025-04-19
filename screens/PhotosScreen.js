import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function PhotosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RemindMeLife</Text>
      <Text style={styles.header}>Fotos</Text>
      <View style={styles.photoGrid}>
        {[1, 2, 3, 4].map((_, index) => (
          <View key={index} style={styles.photoPlaceholder} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a4f91' },
  header: { fontSize: 20, marginVertical: 20 },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  photoPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#ccc',
    margin: 10,
    borderRadius: 10,
  }
});