import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'

const Button = ({ mode, style, theme, ...props }) => {
  return (
    <PaperButton
      style={[
        styles.button,
        style
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    overflow:
      Platform.OS === 'android' && Platform.Version >= 21
        ? 'hidden'
        : 'visible',
    elevation: 5,
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
  }
})

export default Button;