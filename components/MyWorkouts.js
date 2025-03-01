import {  useContext } from "react"
import { View, ScrollView } from "react-native"
import { Text, PaperProvider } from "react-native-paper"
import { DataContext } from "../contexts/DataContext"
import { TotalDurContext } from "../contexts/TotalDurContext"
import { TotalDistContext } from "../contexts/TotalDistContext"
import { styles, Theme } from "../styles/Style"


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