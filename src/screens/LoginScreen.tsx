import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const CREDENTIALS = { user: 'admin', pass: '1234' };

export const LoginScreen = ({ navigation }: any) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = () => {
    const normalizedUser = user.trim();
    const normalizedPass = pass.trim();

    if (normalizedUser === CREDENTIALS.user && normalizedPass === CREDENTIALS.pass) {
      navigation.replace('AppDrawer');
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <SafeAreaView style={styles.centerContainer}>
      <Text style={styles.title}>🌮 Sabor Mexicano</Text>
      <TextInput style={styles.input} placeholder="Usuario" value={user} onChangeText={setUser} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Contraseña" value={pass} onChangeText={setPass} secureTextEntry />
      <Text style={styles.hint}>Acceso de prueba: admin / 1234</Text>
      <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin}>
        <Text style={styles.btnText}>Ingresar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, color: '#D32F2F' },
  input: { width: '100%', backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  hint: { color: '#666', marginBottom: 5 },
  primaryBtn: { width: '100%', backgroundColor: '#D32F2F', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});