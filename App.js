import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'
import { Icon, PaperProvider } from 'react-native-paper'
import { Home } from './components/Home'
import { AddWorkout } from './components/AddWorkout'
import { MyWorkouts } from './components/MyWorkouts'
import { DataProvider } from "./contexts/DataContext"
import { TotalDurProvider } from "./contexts/TotalDurContext"
import { TotalDistProvider} from "./contexts/TotalDistContext"
import { Theme } from './styles/Style'

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
                  headerTintColor: 'white', 
                  drawerActiveTintColor: Theme.colors.primary, 
                  drawerInactiveTintColor: Theme.colors.secondary 
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
                  component={MyWorkouts}
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
  )
}




