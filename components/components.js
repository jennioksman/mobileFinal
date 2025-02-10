import { useState } from "react";
import { View, TouchableOpacity } from "react-native"
import { Text, Card } from "react-native-paper"


export function Home(){

  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

    return(
      <View>
        <Text variant='headlineMedium'>Welcome</Text>
        <Card>
          <Card.Cover source={require('../assets/crossfit.jpg')} />
          <TouchableOpacity onPress={onPress}>
            <Text variant="headlineSmall">Add New Workout</Text>
        </TouchableOpacity>
        <Card>
          <Card.Cover source={require('../assets/run.jpg')} />
          <TouchableOpacity onPress={onPress}>
            <Text variant="headlineSmall">Show My Workouts</Text>
        </TouchableOpacity>
        </Card>
        </Card>
      </View>
    )
  }
  