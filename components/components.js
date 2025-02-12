import { useNavigation } from "@react-navigation/native";
import { useState, useContext } from "react";
import { View, TouchableOpacity, Pressable } from "react-native"
import { Text, Card,  PaperProvider, TextInput, Button, Modal } from "react-native-paper"
import { Dropdown } from "react-native-paper-dropdown";
import { Calendar } from 'react-native-calendars'
import { Context } from "./context";
import { FlatList } from "react-native"; 
import { styles } from "../styles/Style";




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

    const { data, setData } = useContext(Context)

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

    const { data } = useContext(Context)

    const renderItem = ({ item }) => (
      <View style={styles.item}>
        <Text variant="bodyLarge">{`Date: ${item.date}, Workout: ${item.workout}, Distance: ${item.distance.toString()} km, Duration: ${item.duration.toString()} min`}</Text>
      </View>
    )

    const totalDistance = () => {
      
    }
  
    return (
      <View>
        <Text variant="headlineSmall">My Workouts</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }