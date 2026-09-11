import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const MainMenuScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.centerContainer}>
      <Text style={styles.title}>Menú Principal</Text>
      <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate('Catalog')}>
        <Text style={styles.btnText}>🍔 Ordenar Comida</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.btnText}>🛒 Ver Orden Actual</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate('History')}>
        <Text style={styles.btnText}>📜 Historial de Compras</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, color: '#D32F2F' },
  menuBtn: { width: '80%', backgroundColor: '#2196F3', padding: 15, borderRadius: 8, alignItems: 'center', marginVertical: 10 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});