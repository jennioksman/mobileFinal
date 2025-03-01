import { useNavigation } from "@react-navigation/native"
import { useState, useContext } from "react"
import { View, TouchableOpacity, ScrollView } from "react-native"
import { Text, Card, PaperProvider, TextInput, Button, Modal, Portal, List } from "react-native-paper"
import { Calendar } from 'react-native-calendars'
import { DataContext, TotalDistContext, TotalDurContext } from "./context"
import { FlatList } from "react-native"
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

export function AddWorkout() {

  const { data, setData } = useContext(DataContext)
  const { setTotalDist } = useContext(TotalDistContext)
  const { setTotalDur } = useContext(TotalDurContext)

  const navigation = useNavigation()

  const OPTIONS = [
    { label: 'Bicycling', value: 'Bicycling' },
    { label: 'Running', value: 'Running' },
    { label: 'Cross Country Skiing', value: 'Cross Country Skiing' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Gym', value: 'Gym' },
    { label: 'Kettlebell', value: 'Kettlebell' },
    { label: 'Cross fit', value: 'Cross fit' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Bodybalance', value: 'Bodybalance' },
    { label: 'Pilates', value: 'Pilates' },
    { label: 'Bodypump', value: 'Bodypump' },
    { label: 'Bodytotal', value: 'Bodytotal' },
    { label: 'Dance me up', value: 'Dance me up' },
    { label: 'Walking', value: 'Walking' },
    { label: 'Indoor cycling', value: 'Indoor cycling' },
    { label: 'Fitball', value: 'Fitball' },
    { label: 'Down hill skiing', value: 'Down hill skiing' },
    { label: 'Snowboarding', value: 'Snowboarding' }
  ]

  const orderedOptions = OPTIONS.sort((a, b) => a.label.localeCompare(b.label))

  const [date, setDate] = useState()
  const [workout, setWorkout] = useState('')
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')


  const [visible, setVisible] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)


  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)


  const showAlert = () => setAlertVisible(true)
  const hideAlert = () => setAlertVisible(false)

  const handleDayPress = (day) => {
    setDate(day.dateString)
  }

  function addToList() {

    const parsedDistance = parseFloat(distance) || 0
    const parsedDuration = parseFloat(duration) || 0

    const newWorkout = {
      date: date,
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
    <PaperProvider theme={Theme} >
      <ScrollView >
        <View style={styles.add}>
          <Text style={styles.subhedline} variant="bodyLarge">Select the date:</Text>
          <Calendar
            onDayPress={handleDayPress}
            markingType="custom"
            markedDates={{
              [date]: { selected: true, selectedColor: Theme.colors.outline }
            }}
          />
          <Portal>
            <Modal visible={visible} onDismiss={hideModal} style={styles.modal}>
              <FlatList
                data={orderedOptions}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <List.Item
                    title={item.label}
                    onPress={() => {
                      setWorkout(item.value);
                      hideModal();
                    }}
                  />
                )}
              />
            </Modal>
          </Portal>
          <TouchableOpacity onPress={showModal}>
            <Text
              variant="bodyLarge"
              style={[styles.select, { backgroundColor: Theme.colors.surfaceVariant }]}>
              {workout ? `Workout:  ${workout}` : `Select Workout`}
            </Text>
          </TouchableOpacity>
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
            style={styles.button}
            mode="contained"
            onPress={() => {
              addToList()
              showAlert()
              setDate('')
              setWorkout('')
              setDistance('')
              setDuration('')
            }}>
            Save
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => navigation.navigate('MyWorkouts')}>
            Go to My Workouts
          </Button>
          <Portal>
            <Modal
              visible={alertVisible}
              onDismiss={hideAlert}
              contentContainerStyle={styles.alertModal}>
              <Text variant="bodyLarge">Workout saved!</Text>
            </Modal>
          </Portal>
        </View>
      </ScrollView>
    </PaperProvider>
  )
}

export function MyWorkouts() {

  const { data } = useContext(DataContext)
  const { totalDist } = useContext(TotalDistContext)
  const { totalDur } = useContext(TotalDurContext)

  const hasWorkouts = Object.keys({ ...totalDist, ...totalDur }).length > 0

  return (
    <PaperProvider theme={Theme}>
      {hasWorkouts && (
        <View style={[styles.item, { backgroundColor: Theme.colors.outline }]}>
          <Text variant="bodyLarge">You have been</Text>
          {Object.keys({ ...totalDist, ...totalDur }).map((workout) => {
            const dist = totalDist[workout] || 0
            const dur = totalDur[workout] || 0
            return (
              <Text key={workout} variant="bodyLarge">
                {`${workout}: ${dist} km, ${dur} min`}
              </Text>
            )
          })
          }
          <Text variant="bodyLarge">in total!</Text>
        </View>
      )}
      <ScrollView>
        {data.map((item, index) => (
          <View key={index} style={[styles.item2, { backgroundColor: Theme.colors.surfaceVariant }]}>
            <Text variant="bodyLarge">{`Date: ${item.date}`}</Text>
            <Text variant="bodyLarge">{`Workout: ${item.workout}`}</Text>
            <Text variant="bodyLarge">{`Distance: ${item.distance.toString()} km`}</Text>
            <Text variant="bodyLarge">{`Duration: ${item.duration.toString()} min`}</Text>
          </View>
        ))}
      </ScrollView>
    </PaperProvider>
  )
}