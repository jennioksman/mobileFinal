import { StyleSheet, TouchableOpacity } from "react-native"
import { Card, configureFonts ,MD3DarkTheme,MD3LightTheme } from "react-native-paper"


export const styles = StyleSheet.create({
    container: {
      
      margin: 10 
    },
    item: {
      
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 5
    },
    item2: {
      backgroundColor: MD3LightTheme.colors.primaryContainer,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10
    },
    card: {
      flex: 1,
      marginTop: 10,
      marginBottom: 10,
      fontSize: 10,
      padding: 10,
      gap: 10
    },
    cardText: {
      backgroundColor: MD3LightTheme.colors.onBackground,
      marginHorizontal: 40,
      marginVertical: 20,
      paddingVertical: 20,
      paddingHorizontal: 60,
      color: MD3LightTheme.colors.background
    },
    headline: {
      marginVertical: 10,
      marginHorizontal: 100
    },
    subhedline:{
      padding:10,
    
    },
    add: {
      margin: 10,
      gap: 10
    },
    select: {
      borderBottomWidth: 0.5,
      paddingVertical: 17,
      paddingHorizontal: 15

    },
    button: {
      marginHorizontal: 30
    },
    modal: {
      margin: 20,
      backgroundColor: '#e8e5e8'
    },
    selectedDayBackgroundColor: {
      backgroundColor: '#e8e5e8'
    }
  })

  export const Theme = {
    ...MD3LightTheme,
    roundness: 2,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#807882',
      secondary:'#847189', 
      outline: '#c8c2ca'
    },
    fonts: {
      ...MD3LightTheme.fonts,
      headlineMedium: {
        ...MD3LightTheme.fonts.headlineMedium,
        fontFamily: 'monospace'
      },
      bobyLarge: {
        ...MD3DarkTheme.fonts.bodyLarge,
        fontFamily: 'monospace'
      }
    }
  }
