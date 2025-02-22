import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import 'react-native-gesture-handler'
import { Icon, PaperProvider, MD3LightTheme, Text } from 'react-native-paper'
import { Home, AddWorkout, MyWorouts, MyComponent } from './components/components'
import { DataProvider, TotalDistProvider, TotalDurProvider } from './components/context'
import { styles, Theme } from './styles/Style'

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <PaperProvider theme={Theme}>
      <DataProvider>
        <TotalDistProvider>
          <TotalDurProvider>
            <NavigationContainer>
              <Drawer.Navigator
                screenOptions={{
                  headerTitleAlign: 'center',
                  headerStyle: { backgroundColor: Theme.colors.primary },
                  headerTintColor: 'white', // Otsikon väri
                  drawerActiveTintColor: Theme.colors.primary, // Aktiivisen kohdan väri
                  drawerInactiveTintColor: Theme.colors.secondary, // 
                }}
              >
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
                    drawerIcon: () => <Icon source={'plus-circle'} size={24}/>
                  }}
                />
                <Drawer.Screen 
                  name='MyWorkouts' 
                  component={MyWorouts}
                  options={{
                    drawerIcon: () => <Icon source={'yoga'} size={24}/>
                  }}
                />
              </Drawer.Navigator>
            </NavigationContainer>
          </TotalDurProvider>
        </TotalDistProvider>
      </DataProvider>
    </PaperProvider>
  );
}




