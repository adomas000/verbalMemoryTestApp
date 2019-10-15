import { Dimensions, Platform, PixelRatio } from 'react-native';

const windowDimensions = Dimensions.get('window')

export const SCREEN_WIDTH = windowDimensions.width
export const SCREEN_HEIGHT = windowDimensions.height

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalizeTextSize (size) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

export function getRandomWords (wordsArr, count) {
  const randomWords = []
  let wordsCount = count
  let noInfiniteLoop = 1000
  while (wordsCount > 0 && noInfiniteLoop > 0) {
    noInfiniteLoop--
    const num = Math.floor((Math.random() * wordsArr.length-1) + 0);
    if (!randomWords.includes(wordsArr[num])) {
      randomWords.push(wordsArr[num])
      wordsCount--
    }
  }
  return randomWords
}

export function getScore (words, guessedWords) {
  const wordsCopy = words.slice()
  const maxScore = words.length
  let currScore = 0

  for (const gWord of guessedWords) {
    const index = wordsCopy.indexOf(gWord)
    if (index !== -1) {
      currScore++
      wordsCopy.splice(index, 1)
    }
  }

  return {
    currScore,
    maxScore
  }
}