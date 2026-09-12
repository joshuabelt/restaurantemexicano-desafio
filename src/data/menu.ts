import { MenuItem } from '../types';
import { validateMenuItem } from '../utils/validation';

export const MENU: MenuItem[] = [
  // Alimentos
  { id: '1', type: 'food', name: 'Tacos al Pastor', price: 15.00, image: require('../images/tacos-al-pastor.jpg') },
  { id: '2', type: 'food', name: 'Burrito de Asada', price: 6.50, image: require('../images/burrito de asada.jpg') },
  { id: '3', type: 'food', name: 'Enchiladas Verdes', price: 5.50, image: require('../images/enchiladas verdes.jpg') },
  { id: '4', type: 'food', name: 'Quesadilla con Carne', price: 4.00, image: require('../images/quesadilla con carne.jpg') },
  { id: '5', type: 'food', name: 'Pozole Rojo', price: 8.00, image: require('../images/pozole rojo.jpg') },
  { id: '6', type: 'food', name: 'Tamales Oaxaqueños', price: 2.50, image: require('../images/tamales oaxaqueños.jpg') },
  { id: '7', type: 'food', name: 'Chiles Rellenos', price: 7.00, image: require('../images/chiles rellenos.jpg') },
  { id: '8', type: 'food', name: 'Sopes', price: 3.50, image: require('../images/sopes.jpg') },
  { id: '9', type: 'food', name: 'Tostadas de Tinga', price: 3.00, image: require('../images/tostadas de tinga.jpg') },
  { id: '10', type: 'food', name: 'Guacamole', price: 4.50, image: require('../images/guacamole.jpg') },
  // Bebidas
  { id: '11', type: 'drink', name: 'Agua de Horchata', price: 2.00, image: require('../images/agua de horchata.jpg') },
  { id: '12', type: 'drink', name: 'Agua de Jamaica', price: 2.00, image: require('../images/agua de jamaica.jpg') },
  { id: '13', type: 'drink', name: 'Fresco de tamarindo', price: 6.00, image: require( '../images/fresco tamarindo.jpg')},
  { id: '14', type: 'drink', name: 'Gaseosa Sevenup', price: 3.50, image: require('../images/sevenup.jpg') },
  { id: '15', type: 'drink', name: 'Coca Cola', price: 1.80, image: require('../images/cocacola.jpg') },
];

MENU.forEach(item => {
  const validationError = validateMenuItem(item);
  if (validationError) throw new Error(`Producto inválido (${item.id}): ${validationError}`);
});