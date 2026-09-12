import React from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MENU } from '../data/menu';
import { Order } from '../types';
import { useAppContext } from '../context/AppContext';
import { validateMenuItem, validateQuantity } from '../utils/validation';

export const CartScreen = ({ navigation }: any) => {
  const { cart, clearCart, saveOrder } = useAppContext();

  const cartItems = Object.keys(cart).map(id => {
    const product = MENU.find(m => m.id === id)!;
    return { product, quantity: cart[id], subtotal: cart[id] * product.price };
  });

  const subtotalGeneral = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
  const iva = subtotalGeneral * 0.13;
  const totalFinal = subtotalGeneral + iva;

  const handleConfirm = () => {
    if (cartItems.length === 0) return Alert.alert('Carrito vacío', 'Agrega productos primero.');

    const invalidProduct = cartItems.find(item => validateMenuItem(item.product));
    if (invalidProduct) {
      return Alert.alert('Producto inválido', validateMenuItem(invalidProduct.product) || 'Revisa los datos del producto.');
    }

    const invalidQuantity = cartItems.find(item => validateQuantity(item.quantity));
    if (invalidQuantity) {
      return Alert.alert('Cantidad inválida', validateQuantity(invalidQuantity.quantity) || 'La cantidad debe ser un entero mayor que 0.');
    }

    Alert.alert(
      'Confirmar orden',
      `¿Confirmar orden por $${totalFinal.toFixed(2)}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            const newOrder: Order = {
              id: Date.now().toString(),
              date: new Date().toLocaleString(),
              items: cartItems,
              subtotal: subtotalGeneral,
              iva,
              total: totalFinal,
            };

            try {
              await saveOrder(newOrder);
              clearCart();
              Alert.alert('¡Éxito!', 'Orden confirmada y guardada.');
              navigation.goBack();
            } catch {
              Alert.alert('Error', 'No se pudo guardar la orden. Intenta nuevamente.');
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.product.id}
        ListEmptyComponent={<Text style={styles.emptyText}>Tu orden está vacía</Text>}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={{ flex: 2 }}>{item.product.name} (x{item.quantity})</Text>
            <Text style={{ flex: 1, textAlign: 'right' }}>${item.subtotal.toFixed(2)}</Text>
          </View>
        )}
      />
      <View style={styles.totalsContainer}>
        <View style={styles.totalRow}><Text>Subtotal:</Text><Text>${subtotalGeneral.toFixed(2)}</Text></View>
        <View style={styles.totalRow}><Text>IVA (13%):</Text><Text>${iva.toFixed(2)}</Text></View>
        <View style={[styles.totalRow, styles.finalRow]}><Text style={styles.bold}>Total Final:</Text><Text style={styles.bold}>${totalFinal.toFixed(2)}</Text></View>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleConfirm}>
          <Text style={styles.btnText}>Confirmar Orden</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 15 },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#666' },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' },
  totalsContainer: { backgroundColor: 'white', padding: 20, borderRadius: 8, elevation: 3, marginTop: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
  finalRow: { borderTopWidth: 1, borderColor: '#eee', paddingTop: 10 },
  bold: { fontWeight: 'bold', fontSize: 16 },
  primaryBtn: { backgroundColor: '#D32F2F', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});