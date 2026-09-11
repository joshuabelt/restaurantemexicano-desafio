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
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 15 },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#666' },
  historyCard: { backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 15, elevation: 2 },
  bold: { fontWeight: 'bold', fontSize: 15 },
  itemDetail: { color: '#555', marginTop: 3 },
  totalText: { fontWeight: 'bold', fontSize: 16, textAlign: 'right', marginTop: 8, color: '#D32F2F' },
});