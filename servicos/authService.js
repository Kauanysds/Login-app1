import AsyncStorage from '@react-native-async-storage/async-storage';

export const fazerLogin = async (email, senha) => {
  try {
    const resposta = await fetch(
      "https://api.liliaborges.com.br/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: senha
        }),
      }
    );

    if (!resposta.ok) {
      throw new Error("Falha na autenticação");
    }

    const dados = await resposta.json();
    return dados.access_token;

  } catch (erro) {
    throw new Error("Erro ao fazer login");
  }
};

export const salvarTokenNoCelular = async (token) => {
  try {
    await AsyncStorage.setItem('@token', token);
  } catch (erro) {
    console.error(erro);
  }
};

export const pegarTokenDoCelular = async () => {
  try {
    const token = await AsyncStorage.getItem('@token');
    return token;
  } catch (erro) {
    console.error(erro);
    return null;
  }
};