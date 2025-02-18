import { useNavigation } from "@react-navigation/native"
import { useState, useContext, useEffect } from "react"
import { View, TouchableOpacity, Pressable, ScrollView } from "react-native"
import { Text, Card, PaperProvider, TextInput, Button, Modal, Portal, Icon, List } from "react-native-paper"
import { Dropdown } from "react-native-paper-dropdown"
import { Calendar } from 'react-native-calendars'
import { DataContext, TotalDistContext, TotalDurContext } from "./context"
import { FlatList } from "react-native"
import { styles } from "../styles/Style"




export function Home() {

  const navigation = useNavigation()

  return (
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

export function AddWorkout() {

  const { data, setData } = useContext(DataContext)
  const { setTotalDist } = useContext(TotalDistContext)
  const { setTotalDur } = useContext(TotalDurContext)


  const OPTIONS = [
    { label: 'Endurance Training', value: 'endurance' },
    { label: 'Strength Training', value: 'strength' },
    { label: 'Body Care', value: 'body' },
  ]

  const [date, setDate] = useState()
  const [workout, setWorkout] = useState('')
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [list, setList] = useState([])

  const [visible, setVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false)

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const showAlert = () => setAlertVisible(true);
  const hideAlert = () => setAlertVisible(false);

  const workoutLists = {
    endurance: ["Bicycling", "Running", "Cross Country Skiing", "Swimming"],
    strength: ["Gym", "Kettlebell", "Calisthenics"],
    body: ["Yoga", "Bodybalance", "Pilates"],
  }

  function addToList() {

    const parsedDistance = parseFloat(distance) || 0
    const parsedDuration = parseFloat(duration) || 0

    const newWorkout = {
      date: date?.dateString || '',
      workout,
      distance: parsedDistance,
      duration: parsedDuration
    }
    setData([...data, newWorkout])
    setTotalDist(prev => ({
      ...prev,
      [workout]: (prev[workout] || 0) + parsedDistance
    }))
    setTotalDur(prev => ({
      ...prev,
      [workout]: (prev[workout] || 0) + parsedDuration
    }))

  }


  return (
    <PaperProvider>
      <View>
        <Text variant="bodyLarge">Select the date:</Text>
        <Calendar onDayPress={setDate} />
        <Text variant="bodyLarge">{date ? 'Date: ' + date.dateString : ''}</Text>
        <Dropdown
          placeholder="Select Workout Type"
          options={OPTIONS}
          value={workout}
          onSelect={(value) => {
            setWorkout(value)
            setList(workoutLists[value] || [])
          }}
        />
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            {list.map((item, index) => (
              <Text key={index} variant="bodyLarge">{item}</Text>
            ))}
          </Modal>
        </Portal>
        <Button mode="contained" onPress={showModal}>
          Show
        </Button>
        <TextInput
          mode='flat'
          label='Distance'
          placeholder='km'
          value={distance}
          onChangeText={setDistance}
          keyboardType="numeric"
        />
        <TextInput
          mode='flat'
          label='Duration'
          placeholder='min'
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />
        <Button
          mode="contained"
          onPress={()=> {
            addToList()
            showAlert()
          }}>
          Save
        </Button>
        <Portal>
          <Modal visible={alertVisible} 
            onDismiss={hideAlert} 
            contentContainerStyle={containerStyle}>
            <Text variant="bodyLarge">Workout saved!</Text>
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
  )
}

export function MyWorouts() {

  const { data } = useContext(DataContext)
  const { totalDist } = useContext(TotalDistContext)
  const { totalDur } = useContext(TotalDurContext)

    const renderItem = ({ item }) => (
      <View style={styles.item}>
        <Text variant="bodyLarge">{`Date: ${item.date}`}</Text>
        <Text variant="bodyLarge">{`Workout: ${item.workout}`}</Text>
        <Text variant="bodyLarge">{`Distance: ${item.distance.toString()} km`}</Text>
        <Text variant="bodyLarge">{`Duration: ${item.duration.toString()} min`}</Text>
      </View>
    )
  
    return (
      <View>
        <Text variant="headlineSmall">My Workouts</Text>
        <View style={styles.item}>
          <Text variant="bodyLarge">{`Total Distance: ${totalDist} km`}</Text>
          <Text variant="bodyLarge">{`Total Duration: ${totalDur} min`}</Text>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }