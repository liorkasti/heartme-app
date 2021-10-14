import React from 'react'
import { View, StyleSheet, Switch, TouchableRipple } from 'react-native'
import IconFeather from 'react-native-vector-icons/Feather';

import { THEME } from '../utils/constants';
import { useTheme, useThemeUpdate } from '../utils/ThemeContext';

const DarkSwitch = () => {
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const themeStyles = {
    backgroundColor: darkTheme ? THEME.darkBkg : THEME.light,
    color: darkTheme ? THEME.light : THEME.dark,
    primaryColor: THEME.orange
  }
  return (
    <TouchableRipple>
      <View style={styles.container}>
        <IconFeather
          name={darkTheme ? 'moon' : 'sun'}
          style={[styles.icon, { color: darkTheme ? '#fff' : THEME.orange }]}
        />
        <Switch
          value={darkTheme}
          color={themeStyles.primaryColor}
          onValueChange={toggleTheme}
        />
      </View>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  }, icon: {
    color: THEME.light,
    textAlign: 'right',
    fontSize: 20
  },
})
export default DarkSwitch;