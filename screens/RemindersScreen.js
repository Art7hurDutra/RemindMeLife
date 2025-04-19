import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function RemindersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RemindMeLife</Text>
      <Text style={styles.header}>Lembretes</Text>
      <View style={styles.reminder}>
        <Text>8:00 am - Tomar medicamentos</Text>
      </View>
      <View style={styles.reminder}>
        <Text>10:00 am - Consulta Marcada</Text>
      </View>
      <View style={styles.reminder}>
        <Text>2:00 pm - Ligar para sua filha</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Lembretes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a4f91' },
  header: { fontSize: 20, marginVertical: 20 },
  reminder: { padding: 15, backgroundColor: '#f0f0f0', borderRadius: 10, marginBottom: 10, width: '100%' },
  addButton: { backgroundColor: '#1a4f91', padding: 15, borderRadius: 10, marginTop: 20 },
  addButtonText: { color: '#fff', fontSize: 16 }
});