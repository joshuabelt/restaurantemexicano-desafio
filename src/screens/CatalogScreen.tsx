import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MENU } from '../data/menu';
import { MenuItem } from '../types';
import { useAppContext } from '../context/AppContext';

export const CatalogScreen = () => {
  const { cart, updateQuantity } = useAppContext();
  const [activeTab, setActiveTab] = useState<'food' | 'drink'>('food');

  const filteredMenu = MENU.filter(item => item.type === activeTab);

  const addProduct = (item: MenuItem, quantity: number) => {
    if (quantity >= 20) {
      Alert.alert('Límite alcanzado', 'No puedes agregar más de 20 unidades del mismo producto.');
      return;
    }

    updateQuantity(item.id, 1);
  };

  const renderItem = ({ item }: { item: MenuItem }) => {
    const qty = cart[item.id] || 0;
    return (
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.cardInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, -1)}><Text>-</Text></TouchableOpacity>
          <Text style={styles.qtyText}>{qty}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => addProduct(item, qty)}><Text>+</Text></TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, activeTab === 'food' && styles.activeTab]} onPress={() => setActiveTab('food')}>
          <Text style={activeTab === 'food' ? styles.activeTabText : styles.tabText}>Alimentos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'drink' && styles.activeTab]} onPress={() => setActiveTab('drink')}>
          <Text style={activeTab === 'drink' ? styles.activeTabText : styles.tabText}>Bebidas</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={filteredMenu} keyExtractor={item => item.id} renderItem={renderItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#9B2226', padding: 15 },
  tabs: { flexDirection: 'row', marginBottom: 15 },
  tab: { flex: 1, padding: 10, alignItems: 'center', borderBottomWidth: 2, borderColor: '#F5D6A1' },
  activeTab: { borderColor: '#F9C74F' },
  tabText: { color: '#FFE8C2', fontWeight: 'bold' },
  activeTabText: { color: '#FFFFFF', fontWeight: 'bold' },
  card: { flexDirection: 'row', backgroundColor: '#006847', padding: 10, marginBottom: 10, borderRadius: 8, alignItems: 'center', elevation: 2 },
  image: { width: 60, height: 60, borderRadius: 30 },
  cardInfo: { flex: 1, marginLeft: 15 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
  itemPrice: { color: '#F9C74F', marginTop: 5, fontWeight: 'bold' },
  controls: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { backgroundColor: '#F9C74F', width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  qtyText: { marginHorizontal: 10, fontSize: 16, color: '#FFFFFF', fontWeight: 'bold' },
});