import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler'
import { Icon, Text } from 'react-native-paper';
import { Home, AddWorkout, MyWorouts } from './components/components';

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen 
          name='Home' 
          component={Home}
          options={{
            drawerIcon: () => <Icon source={'home'} size={24}/>
          }}
        />
        <Drawer.Screen 
          name='AddWorkout' 
          component={AddWorkout}
          options={{
            drawerIcon: () => <Icon source={'home'} size={24}/>
          }}
        />
        <Drawer.Screen 
          name='MyWorkouts' 
          component={MyWorouts}
          options={{
            drawerIcon: () => <Icon source={'home'} size={24}/>
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
