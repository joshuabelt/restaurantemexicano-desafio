import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppContext } from '../context/AppContext';

const USERS_KEY = '@registered_users';
const DEMO_USERS = [
  { user: 'ana.lopez', pass: 'ana2026' },
  { user: 'carlos.ramirez', pass: 'carlos2026' },
  { user: 'sofia.martinez', pass: 'sofia2026' },
  { user: 'diego.hernandez', pass: 'diego2026' },
];

export const LoginScreen = ({ navigation }: any) => {
  const { login } = useAppContext();
  const [users, setUsers] = useState(DEMO_USERS);
  const [isRegistering, setIsRegistering] = useState(false);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem(USERS_KEY);
        if (storedUsers) setUsers([...DEMO_USERS, ...JSON.parse(storedUsers)]);
      } catch {
        Alert.alert('Error', 'No se pudieron cargar los usuarios guardados.');
      } finally {
        setUsersLoaded(true);
      }
    };

    loadUsers();
  }, []);

  const handleLogin = () => {
    if (!usersLoaded) return Alert.alert('Espera', 'Cargando usuarios guardados.');

    const normalizedUser = user.trim();
    const normalizedPass = pass.trim();

    const isValidUser = users.some(
      credentials => credentials.user === normalizedUser && credentials.pass === normalizedPass,
    );

    if (isValidUser) {
      login(normalizedUser);
      navigation.replace('AppDrawer');
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  const handleRegister = async () => {
    const normalizedUser = user.trim().toLowerCase();
    const normalizedPass = pass.trim();

    if (!normalizedUser || !normalizedPass || !confirmPass.trim()) {
      return Alert.alert('Datos incompletos', 'Completa usuario, contraseña y confirmación.');
    }

    if (normalizedUser.length < 3) {
      return Alert.alert('Usuario inválido', 'El usuario debe tener al menos 3 caracteres.');
    }

    if (normalizedPass.length < 6) {
      return Alert.alert('Contraseña inválida', 'La contraseña debe tener al menos 6 caracteres.');
    }

    if (normalizedPass !== confirmPass.trim()) {
      return Alert.alert('Contraseñas diferentes', 'La confirmación no coincide con la contraseña.');
    }

    if (users.some(credentials => credentials.user === normalizedUser)) {
      return Alert.alert('Usuario existente', 'Ese usuario ya está registrado.');
    }

    const newUser = { user: normalizedUser, pass: normalizedPass };

    try {
      const registeredUsers = [...users.filter(credentials => !DEMO_USERS.some(demo => demo.user === credentials.user)), newUser];
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(registeredUsers));
      setUsers([...users, newUser]);
      login(normalizedUser);
      navigation.replace('AppDrawer');
    } catch {
      Alert.alert('Error', 'No se pudo guardar el nuevo usuario.');
    }
  };

  const toggleMode = () => {
    setIsRegistering(previous => !previous);
    setPass('');
    setConfirmPass('');
    setShowPass(false);
    setShowConfirmPass(false);
  };

  return (
    <SafeAreaView style={styles.centerContainer}>
      <Text style={styles.title}>🌮 Rincón Mex</Text>
      <Text style={styles.heading}>{isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}</Text>
      <TextInput style={styles.input} placeholder="Usuario" value={user} onChangeText={setUser} autoCapitalize="none" />
      <View style={styles.passwordRow}>
        <TextInput style={styles.passwordInput} placeholder="Contraseña" value={pass} onChangeText={setPass} secureTextEntry={!showPass} />
        <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPass(previous => !previous)} accessibilityLabel={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
          <Text style={styles.eye}>{showPass ? '🙈' : '👁'}</Text>
        </TouchableOpacity>
      </View>
      {isRegistering && (
        <View style={styles.passwordRow}>
          <TextInput style={styles.passwordInput} placeholder="Confirmar contraseña" value={confirmPass} onChangeText={setConfirmPass} secureTextEntry={!showConfirmPass} />
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowConfirmPass(previous => !previous)} accessibilityLabel={showConfirmPass ? 'Ocultar confirmación' : 'Mostrar confirmación'}>
            <Text style={styles.eye}>{showConfirmPass ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.primaryBtn} onPress={isRegistering ? handleRegister : handleLogin}>
        <Text style={styles.btnText}>{isRegistering ? 'Registrarme' : 'Ingresar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleMode}>
        <Text style={styles.link}>{isRegistering ? 'Ya tengo una cuenta' : 'Crear una cuenta nueva'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, color: '#D32F2F' },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#444' },
  input: { width: '100%', backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  passwordRow: { flexDirection: 'row', width: '100%', backgroundColor: 'white', borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
  passwordInput: { flex: 1, padding: 15 },
  eyeBtn: { paddingHorizontal: 15, paddingVertical: 10 },
  eye: { fontSize: 20, color: '#666' },
  primaryBtn: { width: '100%', backgroundColor: '#D32F2F', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  link: { color: '#D32F2F', fontWeight: 'bold', marginTop: 18 },
});