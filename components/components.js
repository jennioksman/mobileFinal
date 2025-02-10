import { useNavigation } from "@react-navigation/native";
import { useState, useCallback } from "react";
import { View, TouchableOpacity } from "react-native"
import { Text, Card,  PaperProvider, TextInput, Button } from "react-native-paper"
import { Dropdown } from "react-native-paper-dropdown";
import { DatePickerModal } from "react-native-paper-dates";


export function Home(){

  const navigation = useNavigation()

    return(
      <View>
        <Text variant='headlineMedium'>Welcome</Text>
        <Card>
          <Card.Cover source={require('../assets/crossfit.jpg')} />
          <TouchableOpacity onPress={() => navigation.navigate('AddWorkout')}>
            <Text variant="headlineSmall">Add New Workout</Text>
          </TouchableOpacity>
        <Card>
          <Card.Cover source={require('../assets/run.jpg')} />
          <TouchableOpacity onPress={() => navigation.navigate('MyWorkouts')}>
            <Text variant="headlineSmall">Show My Workouts</Text>
          </TouchableOpacity>
        </Card>
        </Card>
      </View>
    )
  }

  export function AddWorkout(){

    const OPTIONS = [
      {label: 'Bicycling', value: 'bicycling'}, 
      {label:'Running', value: 'running'}, 
      {label:'Yoga', value: 'yoga'}, 
      {label:'Bodybalance', value: 'bodybalance'}, 
      {label:'Bodypump', value: 'bodypump'}, 
      {label:'Cross counry skiing', value: 'cross counry skiing'}
    ]

    const [workout, setWorkout] = useState('')
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    return(
      <PaperProvider>
        <View>
          <Dropdown
            placeholder="Select Workout"
            options={OPTIONS}
            value={workout}
            onSelect={setWorkout}
          />
          <TextInput
            mode='flat'
            label='Distance'
            placeholder='km'
            value={distance}
            onChange={setDistance}
          />
          <TextInput
            mode='flat'
            label='Duration'
            placeholder='min'
            value={duration}
            onChange={setDuration}
          />
          <Button 
          mode="contained" 
          onPress={() => console.log('Pressed')}>
            Save
          </Button>
        </View>
      </PaperProvider>
    )
  }

  export function MyWorouts(){
    return(
      <Text>My Workouts</Text>
    )
  }
  