import { useNavigation } from "@react-navigation/native";
import { useState, useCallback } from "react";
import { View, TouchableOpacity, Pressable } from "react-native"
import { Text, Card,  PaperProvider, TextInput, Button, Modal } from "react-native-paper"
import { Dropdown } from "react-native-paper-dropdown";
import { Calendar } from 'react-native-calendars'



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

    const [date, setDate] = useState()
    const [workout, setWorkout] = useState('')
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    const [data, setData] = useState([])

    function addToList(){
      
      const newWorkout = {
        date: date?.dateString || '',
        workout,
        distance: parseFloat(distance) || 0, // Ensure distance is a number
        duration: parseFloat(duration) || 0  // Ensure duration is a number
      };
      console.log(`Distance: ${distance}, Duration: ${duration}`); // Debug: log the distance and duration values
      setData([...data, newWorkout]);
    }

    return(
      <PaperProvider>
        <View>
          <Text variant="bodyLarge">Pick the date:</Text>
          <Calendar onDayPress={setDate}/>
          <Text variant="bodyLarge">{date ? 'Date: ' + date.dateString : ''}</Text>
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
            onChangeText={setDistance}
          />
          <TextInput
            mode='flat'
            label='Duration'
            placeholder='min'
            value={duration}
            onChangeText={setDuration}
          />
          <Button 
            mode="contained" 
            onPress={addToList}>
            Save
          </Button>
          {data.map((item, index) => (
          <Text key={index}>
            {`Date: ${item.date}, Workout: ${item.workout}, Distance: ${item.distance.toString()} km, Duration: ${item.duration.toString()} min`}
          </Text>
        ))}
        </View>
      </PaperProvider>
    )
  }

  export function MyWorouts(){
    return(
      <Text>My Workouts</Text>
    )
  }
  