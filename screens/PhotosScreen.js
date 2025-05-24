
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ContactsScreen() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    carregarContatos();
  }, []);

  async function carregarContatos() {
    const dados = await AsyncStorage.getItem('contatosConfianca');
    if (dados) setContatos(JSON.parse(dados));
  }

  async function salvarContatos(novosContatos) {
    await AsyncStorage.setItem('contatosConfianca', JSON.stringify(novosContatos));
  }

  function adicionarContato() {
    if (!nome || !telefone) return;
    const novo = [...contatos, { id: Date.now().toString(), nome, telefone }];
    setContatos(novo);
    salvarContatos(novo);
    setNome('');
    setTelefone('');
  }

  function excluirContato(id) {
    const atualizado = contatos.filter(c => c.id !== id);
    setContatos(atualizado);
    salvarContatos(atualizado);
  }

  function ligarPara(numero) {
    Linking.openURL(`tel:${numero}`).catch(() =>
      Alert.alert('Erro', 'Não foi possível iniciar a ligação')
    );
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>RemindMeLife</Text>
      <Text style={estilos.header}>Contatos de Confiança</Text>
      <TextInput
        style={estilos.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={estilos.input}
        placeholder="Telefone"
        keyboardType="phone-pad"
        value={telefone}
        onChangeText={setTelefone}
      />
      <Button title="Adicionar Contato" onPress={adicionarContato} />

      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => ligarPara(item.telefone)} style={estilos.item}>
            <Text style={estilos.nome}>{item.nome} - {item.telefone}</Text>
            <TouchableOpacity onPress={() => excluirContato(item.id)}>
              <Text style={estilos.excluir}>Excluir</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#1a4f91', textAlign: 'center' },
  header: { fontSize: 18, marginVertical: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nome: {
    fontSize: 16,
  },
  excluir: {
    color: 'red',
    fontWeight: 'bold',
  }
});
