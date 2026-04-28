import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';

import TelaLogin from './telas/TelaLogin';
import { pegarTokenDoCelular, salvarTokenNoCelular } from './servicos/authService';

export default function App() {

  const [usuarioEstaLogado, setUsuarioEstaLogado] = useState(false);
  const [verificandoToken, setVerificandoToken] = useState(true);

  useEffect(() => {
    const verificarAcesso = async () => {
      const token = await pegarTokenDoCelular();

      if (token) {
        setUsuarioEstaLogado(true);
      }

      setVerificandoToken(false);
    };

    verificarAcesso();
  }, []);

  // Logout
  const sairDoSistema = async () => {
    await salvarTokenNoCelular('');
    setUsuarioEstaLogado(false);
  };

  if (verificandoToken) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!usuarioEstaLogado) {
    return (
      <TelaLogin aoLogarComSucesso={() => setUsuarioEstaLogado(true)} />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Bem-vindo ao Sistema Interno!</Text>
      <Text style={styles.texto}>Seu token está salvo e validado.</Text>

      <Button title="Sair do App" onPress={sairDoSistema} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  texto: {
    fontSize: 16,
    marginBottom: 10
  }
});