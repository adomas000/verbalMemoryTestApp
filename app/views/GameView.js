import React, {useState, useEffect, useRef} from 'react'
import {StyleSheet, View, SafeAreaView, Animated, Text, StatusBar, Keyboard} from 'react-native'
import { Button, withStyles, Layout, Input} from 'react-native-ui-kitten';
import * as Progress from 'react-native-progress';

import {getRandomWords, normalizeTextSize, getScore, SCREEN_WIDTH} from './../helpers'

import FadeIn from './../components/FadeIn'

import nouns from './../../assets/nouns.json'

export default function GameView (props) {
  const {navigate} = props.navigation

  const textInputRef = useRef(null)

  const [wordCount] = useState(1)
  const [words] = useState(getRandomWords(nouns, wordCount))
  const [guessedWords, setGuessedWords] = useState([])

  const [showWords, setShowWordsValue] = useState(true) 

  const [text, setText] = useState('Try to memorize the following words')
  const [inputValue, setInputValue] = useState('')
  const [wordShowCount, setWordShowCount] = useState(0)
  const [progress, setProgress] = useState(0)

  const [fadeInDuration, setFadeInDuration] = useState(2000)
  const [fadeOutDuration, setFadeOutDuration] = useState(1000)
  const [visibleDuration, setVisibleDuration] = useState(2000)

  /**
   * setGuessedWords handler
   */
  useEffect(() => {
    if (guessedWords.length) {
      setProgress(guessedWords.length/ wordCount)
      if (guessedWords.length >= wordCount) {
        gameEnd()
      } else {
        textInputRef.current.focus()
        setInputValue('')
      }
    }
  }, [guessedWords])

  const showNextWord = () => {
    if (!wordShowCount) {
      setFadeInDuration(750)
      setFadeOutDuration(750)
      setVisibleDuration(1500)
    }

    if (wordShowCount < wordCount) {
      setProgress((wordShowCount+1)/(wordCount))
      setText(words[wordShowCount])
      setWordShowCount(wordShowCount+1)
    } else {
      // Time to let user write words
      setShowWordsValue(false)
      setProgress(0)
    }
  }

  const inputHandler = (e) => {
    const value = e.nativeEvent.text.trim()
    setGuessedWords([...guessedWords, value])
  }

  const gameEnd = () => {
    const score = getScore(words, guessedWords)
    Keyboard.dismiss()
    navigate('Result', {score})
  }

  const inputChangeHandler = (text) => setInputValue(text)

  return (
    <Layout style={{flex: 1}}>
      <Layout style={{marginTop: StatusBar.currentHeight}}>
        <Progress.Bar borderWidth={0} progress={progress} width={SCREEN_WIDTH} borderRadius={0}></Progress.Bar>
      </Layout>
      <Layout style={styles.container}>
      
      {
        showWords ?
        // Displaying words 1 by 1
        <FadeIn 
          animationFinished={showNextWord} 
          count={wordShowCount}
          fadeInDuration={fadeInDuration}
          fadeOutDuration={fadeOutDuration}
          visibleDuration={visibleDuration}
        >
          <Text style={styles.middleText}>{text}</Text>
        </FadeIn> 
        : 
        // Showing input element
        <Layout style={{flexDirection:'row'}}>
          <Layout style={{flex: 1}}></Layout>
            <Layout style={{flex: 5}}>
              <Input size="large" ref={textInputRef} autoFocus={true} onChangeText={inputChangeHandler} onEndEditing={inputHandler} placeholder="What was it again? (one word)"></Input>
              <Button disabled={inputValue.length > 0} onPress={gameEnd} style={{marginTop:20}} size='large'>That's all I remember...</Button>
            </Layout>
          <Layout style={{flex: 1}}></Layout>
        </Layout>
      }
      </Layout>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleText: {
    textAlign: 'center',
    fontFamily: 'Raleway',
    color: 'white',
    fontSize: normalizeTextSize(36),
  }
});

