import React from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
// import { TextInput as Input } from 'react-native-paper'

export default function Input({ errorText, placeholder, description, ...props }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        // selectionColor={theme.colors.primary}
        underlineColor="transparent"
        placeholder={placeholder}
        // mode="outlined"
        {...props}
      />

      {/*       {description && !errorText ?
        <Text style={styles.description}>{description}</Text> : null
      }
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
 */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    // backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: 13,
    // color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    // color: theme.colors.error,
    paddingTop: 8,
  },
})
