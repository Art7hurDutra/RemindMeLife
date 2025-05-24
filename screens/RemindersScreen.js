
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RemindersScreen() {
  const [lembretes, setLembretes] = useState([]);
  const [texto, setTexto] = useState('');
  const [hora, setHora] = useState('');

  useEffect(() => {
    carregarLembretes();
  }, []);

  async function carregarLembretes() {
    const dados = await AsyncStorage.getItem('lembretes');
    if (dados) setLembretes(JSON.parse(dados));
  }

  async function salvarLembretes(novos) {
    await AsyncStorage.setItem('lembretes', JSON.stringify(novos));
  }

  function adicionarLembrete() {
    if (!texto || !hora) return;
    const novo = [...lembretes, { id: Date.now().toString(), texto, hora }];
    setLembretes(novo);
    salvarLembretes(novo);
    setTexto('');
    setHora('');
  }

  function excluirLembrete(id) {
    const novo = lembretes.filter((l) => l.id !== id);
    setLembretes(novo);
    salvarLembretes(novo);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RemindMeLife</Text>
      <Text style={styles.header}>Lembretes</Text>

      <TextInput
        style={styles.input}
        placeholder="Texto do lembrete"
        value={texto}
        onChangeText={setTexto}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora (ex: 08:00)"
        value={hora}
        onChangeText={setHora}
      />
      <Button title="Adicionar Lembrete" onPress={adicionarLembrete} />

      <FlatList
        data={lembretes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reminder}>
            <Text>{item.hora} - {item.texto}</Text>
            <TouchableOpacity onPress={() => excluirLembrete(item.id)}>
              <Text style={styles.excluir}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a4f91' },
  header: { fontSize: 20, marginVertical: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  reminder: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  excluir: {
    color: 'red',
    fontWeight: 'bold',
  }
});
