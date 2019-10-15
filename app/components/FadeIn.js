import React, {useEffect, useState} from 'react'
import {Animated} from 'react-native'

export default function FadeIn (props) {
  const [fadeAnim] = useState(new Animated.Value(0))
  
  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: props.fadeInDuration || 2000,
        }
      ),
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: props.visibleDuration || 2000,
        }
      ),
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: props.fadeOutDuration || 2000,
        }
      )
    ]).start(() => {
      props.animationFinished()
    })
  }, [props.count])

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
}