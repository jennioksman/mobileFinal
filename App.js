import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import 'react-native-gesture-handler'
import { Icon, Text } from 'react-native-paper'
import { Home, AddWorkout, MyWorouts } from './components/components'
import { DataProvider, TotalDistProvider, TotalDurProvider } from './components/context'

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <DataProvider>
      <TotalDistProvider>
        <TotalDurProvider>
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
        </TotalDurProvider>
      </TotalDistProvider>
    </DataProvider>
  );
}




