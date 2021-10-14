import React from 'react'
import { ImageBackground, StyleSheet, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, Dimensions } from 'react-native'

const Background = ({ children }) => {
  return (
    <ImageBackground
      source={require('../assets/background_dot2x.png')}
      resizeMode="repeat"
      style={styles.container}
      resizeMode="repeat"
    >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
        <ScrollView>
          <SafeAreaView>
            {children}
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground >
  )
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    weight: windowWidth,
    height: windowHeight
  }
})
export default Background;