import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ContactsScreen() {
  const contacts = ['Roberto', 'Anna', 'David', 'Patricia'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RemindMeLife</Text>
      <Text style={styles.header}>Contatos</Text>
      {contacts.map((contact, index) => (
        <View key={index} style={styles.contact}>
          <Text>👤 {contact}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a4f91' },
  header: { fontSize: 20, marginVertical: 20 },
  contact: { padding: 15, backgroundColor: '#f0f0f0', borderRadius: 10, marginBottom: 10, width: '100%' }
});