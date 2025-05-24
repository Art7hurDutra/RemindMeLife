
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PhotosScreen() {
  const [fotos, setFotos] = useState([]);
  const [legendaAtual, setLegendaAtual] = useState('');

  useEffect(() => {
    carregarFotos();
  }, []);

  async function carregarFotos() {
    const dados = await AsyncStorage.getItem('fotosComLegenda');
    if (dados) setFotos(JSON.parse(dados));
  }

  async function salvarFotos(novas) {
    await AsyncStorage.setItem('fotosComLegenda', JSON.stringify(novas));
  }

  async function escolherFoto() {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissao.granted) {
      Alert.alert('Permissão negada', 'Você precisa permitir acesso à galeria.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!resultado.canceled) {
      const nova = {
        id: Date.now().toString(),
        uri: resultado.assets[0].uri,
        legenda: legendaAtual,
      };
      const atualizadas = [...fotos, nova];
      setFotos(atualizadas);
      salvarFotos(atualizadas);
      setLegendaAtual('');
    }
  }

  function excluirFoto(id) {
    const atualizadas = fotos.filter(f => f.id !== id);
    setFotos(atualizadas);
    salvarFotos(atualizadas);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RemindMeLife</Text>
      <Text style={styles.header}>Fotos com Legenda</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite uma legenda para a foto"
        value={legendaAtual}
        onChangeText={setLegendaAtual}
      />
      <TouchableOpacity style={styles.addButton} onPress={escolherFoto}>
        <Text style={styles.addButtonText}>+ Adicionar Foto</Text>
      </TouchableOpacity>

      <FlatList
        data={fotos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.fotoItem}>
            <Image source={{ uri: item.uri }} style={styles.foto} />
            <Text style={styles.legenda}>{item.legenda}</Text>
            <TouchableOpacity onPress={() => excluirFoto(item.id)}>
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
  addButton: {
    backgroundColor: '#1a4f91',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fotoItem: {
    marginBottom: 20,
    alignItems: 'center',
  },
  foto: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  legenda: {
    marginTop: 5,
    fontStyle: 'italic',
  },
  excluir: {
    marginTop: 5,
    color: 'red',
    fontWeight: 'bold',
  },
});
