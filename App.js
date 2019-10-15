import React, {useEffect, useState} from 'react'
import * as Font from 'expo-font';
// Navigation
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// Front-end framework
import { mapping, light, dark} from '@eva-design/eva';
import { ApplicationProvider, Layout, withStyles, Text} from 'react-native-ui-kitten';


import MenuView from './app/views/MenuView'
import GameView from './app/views/GameView'
import ResultView from './app/views/ResultView'


const MainNavigator = createStackNavigator({
  Menu: {screen: MenuView},
  Game: {screen: GameView},
  Result: {screen: ResultView},
},
{
  initialRouteName: 'Menu',
  headerMode: 'none',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#2E3A59',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

const Navigator = createAppContainer(MainNavigator)

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false)
  
  const loadFonts = async () => {
    await Font.loadAsync({
      'Raleway': require('./assets/fonts/Raleway-Regular.ttf')
    })
    setFontLoaded(true)
  }

  useEffect(() => {loadFonts()}, [])

  return (
    <ApplicationProvider mapping={mapping} theme={dark}>
      {fontLoaded ? <Navigator theme='dark'/> : <Layout><Text>Loading...</Text></Layout>}
    </ApplicationProvider>
  )
}
  
export default App
