import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"
import { Text, Card, PaperProvider } from "react-native-paper"

import { styles, Theme } from "../styles/Style"

export function Home() {

    const navigation = useNavigation()
  
    return (
      <PaperProvider theme={Theme}>
        <Text variant='headlineMedium' style={styles.headlineHome}>Wellcome</Text>
        <Card style={styles.card}>
          <Card.Cover source={require('../assets/crossfit.jpg')} />
          <TouchableOpacity onPress={() => navigation.navigate('AddWorkout')}>
            <Text variant="bodyLarge" style={styles.cardText}>Add New Workout</Text>
          </TouchableOpacity>
        </Card>
        <Card style={styles.card}>
          <Card.Cover source={require('../assets/run.jpg')} />
          <TouchableOpacity onPress={() => navigation.navigate('MyWorkouts')}>
            <Text variant="bodyLarge" style={styles.cardText}>Show My Workouts</Text>
          </TouchableOpacity>
        </Card>
      </PaperProvider>
    )
  }