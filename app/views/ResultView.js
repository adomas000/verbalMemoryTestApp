import React from 'react'
import {StyleSheet, View, Keyboard} from 'react-native'
import { Button, withStyles, Layout, Text } from 'react-native-ui-kitten';

function ResultView (props) {
  const {navigate} = props.navigation
  const {currScore, maxScore} = props.navigation.getParam('score', {})

  Keyboard.dismiss()
  return (
    <Layout style={{flex: 1}}>
      <Layout style={styles.container}>
        <Layout style={styles.offset}></Layout>
        <Layout style={styles.menu}>
          <Text category="h2">You answered {currScore} out of {maxScore}</Text>
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

export default ResultView