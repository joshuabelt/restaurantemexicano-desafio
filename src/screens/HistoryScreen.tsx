import React from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';
import { useAppContext } from '../context/AppContext';

export const HistoryScreen = () => {
  const { history } = useAppContext();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay compras registradas</Text>}
        renderItem={({ item }) => (
          <View style={styles.historyCard}>
            <Text style={styles.bold}>Fecha: {item.date}</Text>
            {item.items.map((i, index) => (
              <Text key={index} style={styles.itemDetail}>- {i.quantity}x {i.product.name}</Text>
            ))}
            <Text style={styles.totalText}>Total Pagado: ${item.total.toFixed(2)}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#9B2226', padding: 15 },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#FFF4D6' },
  historyCard: { backgroundColor: '#006847', padding: 15, borderRadius: 8, marginBottom: 15, elevation: 2 },
  bold: { fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' },
  itemDetail: { color: '#E7F5E9', marginTop: 3 },
  totalText: { fontWeight: 'bold', fontSize: 16, textAlign: 'right', marginTop: 8, color: '#F9C74F' },
});