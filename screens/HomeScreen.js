import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RemindMeLife</Text>
      <Text style={styles.greeting}>Bom dia</Text>
      <Image
        source={require('../assets/avatar.png')}
        style={styles.avatar}
      />
      <Text style={styles.subtitle}>Como eu posso te ajudar?</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Reminders')}>
        <Text style={styles.buttonText}>🕒 Lembretes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Contacts')}>
        <Text style={styles.buttonText}>👤 Contatos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Photos')}>
        <Text style={styles.buttonText}>🖼️ Fotos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a4f91' },
  greeting: { fontSize: 20, marginTop: 10 },
  avatar: { width: 80, height: 80, margin: 20 },
  subtitle: { fontSize: 16, marginBottom: 20 },
  button: { backgroundColor: '#f0f0f0', padding: 15, borderRadius: 10, width: '80%', marginVertical: 8 },
  buttonText: { fontSize: 16 }
});