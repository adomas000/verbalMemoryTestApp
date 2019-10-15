import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import { Button, withStyles, Layout } from 'react-native-ui-kitten';

function MenuView (props) {
  const {navigate} = props.navigation

  const goToGameView = () => navigate('Game')
  const goToSettingsView = () => navigate('Settings')
  
  return (
    <Layout style={{flex: 1}}>
      <Layout style={styles.container}>
        <Layout style={styles.offset}></Layout>
        <Layout style={styles.menu}>
          <Button style={styles.buttons} size='giant' onPress={goToGameView}>Play!</Button>
          <Button style={styles.buttons} size='giant' onPress={goToSettingsView}>Profile</Button>
          <Button style={styles.buttons} size='giant' onPress={goToSettingsView}>Settings</Button>
          <Button style={styles.buttons} size='giant'>Quit</Button>
        </Layout>  
        <Layout style={styles.offset}></Layout>
      </Layout>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    flex: 4
  },
  offset: {
    flex: 1
  },
  buttons: {
    marginTop: 10
  }
});

export default MenuView