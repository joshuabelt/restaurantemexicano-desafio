import React from 'react';
import { SafeAreaView, Image, Text, StyleSheet } from 'react-native';
import { MENU } from '../data/menu';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.eyebrow}>SABOR MEXICANO</Text>
      <Text style={styles.title}>¡Bienvenido a nuestro restaurante!</Text>
      <Text style={styles.subtitle}>¿Qué desea ordenar?</Text>
      <Image source={MENU[0].image} style={styles.image} />
      <Text style={styles.caption}>Disfruta nuestros sabores mexicanos</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#9B2226' },
  eyebrow: { color: '#F9C74F', fontSize: 14, fontWeight: 'bold', letterSpacing: 2, marginBottom: 14 },
  title: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold', textAlign: 'center', lineHeight: 36 },
  subtitle: { color: '#FFF4D6', fontSize: 20, marginTop: 12, marginBottom: 28 },
  image: { width: '100%', height: 230, borderRadius: 16 },
  caption: { color: '#FFF4D6', fontSize: 16, fontStyle: 'italic', marginTop: 18 },
});
