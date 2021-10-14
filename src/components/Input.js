import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Searchbar } from 'react-native-paper';

export default function Input({
  theme, value, onChangeText, errorText, placeholder, description,
}) {


  return (
    <Searchbar
      style={[styles.textInput, {
        backgroundColor: theme.bkg,
        borderColor: theme.text, color: theme.primaryColor
      }]}
      theme={{ colors: { text: theme.text } }}
      iconColor={theme.text}
      placeholderTextColor={`${theme.text}88`}
      selectionColor={theme.primaryColor}
      icon
      blur
      value={value}
      placeholder={placeholder}
      errorText={errorText}
      onChangeText={onChangeText}
      blurOnSubmit={true}
    />
  )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  textInput: {
    width: windowWidth * .65,
    borderRadius: 10,
    borderBottomWidth: 2,
    margin: '5%',
    elevation: 5,
  },
})
