import { useNavigation } from "@react-navigation/native"
import { useState, useContext } from "react"
import { View, TouchableOpacity, ScrollView } from "react-native"
import { Text, Card, PaperProvider, TextInput, Button, Modal, Portal, List } from "react-native-paper"
import { Calendar } from 'react-native-calendars'
import { DataContext } from "../contexts/DataContext"
import { TotalDurContext } from "../contexts/TotalDurContext"
import { TotalDistContext } from "../contexts/TotalDistContext"
import { FlatList } from "react-native"
import { styles, Theme } from "../styles/Style"

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
  