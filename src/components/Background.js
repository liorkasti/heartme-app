import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native'

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../assets/background_dot2x.png')}
      resizeMode="repeat"
      style={styles.background}
      // resizeMode="cover"
    >
      {/* <KeyboardAvoidingView style={styles.container} behavior="padding"> */}
      {/* <ScrollView> */}
      <SafeAreaView>
        {children}
      </SafeAreaView>
      {/* </ScrollView> */}
      {/* </KeyboardAvoidingView> */}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    weight: '100%',
    // justifyContent: "center",
    // alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
