import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { CatalogScreen } from '../screens/CatalogScreen';
import { CartScreen } from '../screens/CartScreen';
import { HistoryScreen } from '../screens/HistoryScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const LogoutScreen = ({ navigation }: any) => {
  useEffect(() => {
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }, [navigation]);

  return null;
};

const AppDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Drawer.Screen name="Catalog" component={CatalogScreen} options={{ title: 'Ordenar comida' }} />
      <Drawer.Screen name="Cart" component={CartScreen} options={{ title: 'Orden actual' }} />
      <Drawer.Screen name="History" component={HistoryScreen} options={{ title: 'Historial de compras' }} />
      <Drawer.Screen name="Logout" component={LogoutScreen} options={{ title: 'Cerrar sesión' }} />
    </Drawer.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AppDrawer" component={AppDrawer} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};