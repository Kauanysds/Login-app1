import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';

import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { fazerLogin, salvarTokenNoCelular } from '../servicos/authService';

export default function TelaLogin() {

  const [email, setEmail] = useState('adm@adm.com');
  const [senha, setSenha] = useState('senha123');
  const [carregando, setCarregando] = useState(false);

  const entrar = async () => {
    if (!email || !senha) {
      Alert.alert("Ops", "Preencha todos os campos!");
      return;
    }

    setCarregando(true);

    try {
      const token = await fazerLogin(email, senha);
      await salvarTokenNoCelular(token);

      Alert.alert("Sucesso", "Login realizado!");
      aoLogarComSucesso();
    } catch (erro) {
      Alert.alert("Erro", "Email ou senha inválidos");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>

      
      <Ionicons name="person-circle" size={100} color="#f880bc" style={{alignSelf: 'center'}} />

      
      <Text style={styles.titulo}>Login</Text>
      <Text style={styles.subtitulo}>Entre com suas credenciais</Text>

      
      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={20} color="#aa6f8f" />
        <TextInput
          placeholder="Seu e-mail"
          placeholderTextColor="#aa6f8f"
          style={styles.input}
          onChangeText={setEmail}
        />
      </View>
      
        <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={20} color="#aa6f8f" />
        <TextInput
          placeholder="Sua senha"
          placeholderTextColor="#aa6f8f"
          style={styles.input}
          secureTextEntry
          onChangeText={setSenha}
        />
      </View>

     
      <Text style={styles.esqueci}>Esqueci minha senha</Text>

      
      {carregando ? (
        <ActivityIndicator size="large" color="#f880bc" />
      ) : (
        <TouchableOpacity style={styles.botao} onPress={entrar}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>
      )}

      
      <Text style={styles.ou}>ou</Text>

      
      <TouchableOpacity style={styles.google}>
        <Text>Continuar com Google</Text>
      </TouchableOpacity>

      
      <Text style={styles.cadastro}>
        Não tem uma conta? <Text style={{ color: '#f880bc' }}>Cadastre-se</Text>
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4ec',
    justifyContent: 'center',
    padding: 25,
  },

  titulo: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 10,
    color: '#f880bc',
    fontWeight: 'bold',
  },

  subtitulo: {
    textAlign: 'center',
    color: '#aa6f8f',
    marginBottom: 20,
  },

inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff0f5',
  borderWidth: 1,
  borderColor: '#ffb6c1',
  borderRadius: 12,
  paddingHorizontal: 10,
  marginBottom: 15,
  width: '70%',     
  alignSelf: 'center' 
},

  input: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 10,
    color: '#333',
  },

  esqueci: {
    textAlign: 'center',
    color: '#f880bc',
    marginBottom: 15,
  },

botao: {
  backgroundColor: '#ffcae4',
  padding: 15,
  borderRadius: 15,
  marginTop: 10,
  elevation: 5,
  alignItems: 'center',
  width: '70%',    
  alignSelf: 'center'
},

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  ou: {
    textAlign: 'center',
    marginVertical: 15,
    color: '#aa6f8f',
  },

google: {
  backgroundColor: '#fff',
  padding: 15,
  borderRadius: 12,
  alignItems: 'center',
  width: '70%',
  alignSelf: 'center'
},

  cadastro: {
    textAlign: 'center',
    marginTop: 20,
  },
});