import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { Searchbar, } from 'react-native-paper';

const Input = ({ theme, value, onChangeText, errorText, placeholder, description }) => {

  return (
    <View style={styles.container}>
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
      {value.length == 0 &&
        <Text style={{ color: theme.primaryColor, marginTop: -20, }}>{description}</Text>
      }
    </View>
  )
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },
  textInput: {
    width: windowWidth * .65,
    borderRadius: 10,
    borderBottomWidth: 2,
    margin: '5%',
    elevation: 5,
  },
})
export default Input;