import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { MainMenuScreen } from '../screens/MainMenuScreen';
import { CatalogScreen } from '../screens/CatalogScreen';
import { CartScreen } from '../screens/CartScreen';
import { HistoryScreen } from '../screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainMenu" component={MainMenuScreen} options={{ title: 'Menú Principal', headerBackVisible: false }} />
        <Stack.Screen name="Catalog" component={CatalogScreen} options={{ title: 'Catálogo de Menú' }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Resumen de Orden' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Historial de Compras' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};