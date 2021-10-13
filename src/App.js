import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import { ActivityIndicator, Text, TouchableRipple, Switch, Searchbar } from 'react-native-paper';

import { THEME } from './utils/constants';
import { useTheme, useThemeUpdate } from './utils/ThemeContext';
import useFetch from './utils/useFetch';
import Background from './components/Background';
import Button from './components/Button';
import Input from './components/Input';

const App = () => {
  const [fetchBloodTestConfig, testConf, isLoading, errorMessage] = useFetch([]);
  const [testName, setTestName] = useState('');
  const [result, setResult] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [inidication, setInidication] = useState(true);
  const [propmtResult, setPropmtResult] = useState(false);

  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();

  const theme = {
    bkg: darkTheme ? THEME.darkBkg : THEME.light,
    text: darkTheme ? THEME.light : THEME.dark,
    primaryColor: THEME.heart
  }

  const userID = 12345;

  const renderResult = async (item) => {

    let testNameFinlized = await testName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    if (testNameFinlized.includes(item.name.substring(0, 3)))
      if (result > item.threshold) {
        setDiagnosis(`Your ${item.name} Bad!`)
        setIndication(false);
      }
      else if (result <= item.threshold && item.threshold > 0) {
        setDiagnosis(`Your ${item.name} Good!`);
        setInidication(true)
      }
      else {
        setDiagnosis(`The Test Name ${item.name} is Undefine!`);
        setIndication(false);
      }
    setPropmtResult(true);
  }

  return (
    <View style={[styles.background, { backgroundColor: theme.bkg }]}>
      <Background>
        <StatusBar backgroundColor={theme.primaryColor} animated={true} hidden={false} />
        <TouchableRipple onValueChange={toggleTheme}>
          <View style={styles.switchContainer}>
            <IconFeather
              name={darkTheme ? 'moon' : 'sun'}
              style={[styles.icon, { color: darkTheme ? '#fff' : theme.primaryColor }]}
            />
            <Switch
              value={darkTheme}
              color={theme.primaryColor}
              onValueChange={toggleTheme}
            />
          </View>
        </TouchableRipple>

        <View style={styles.container}>
          <Text style={[styles.title, { color: theme.primaryColor }]}>Am I OK?</Text>
          <Searchbar
            style={[styles.textInput, {
              backgroundColor: theme.bkg,
              borderColor: theme.text, color: theme.primaryColor
            }]}
            icon
            // clearIcon
            // inputStyle={{ fontSize: 16 }}
            theme={{ colors: { text: theme.text } }}
            selectionColor={theme.primaryColor}
            iconColor={theme.text}
            placeholderTextColor={`${theme.text}88`}
            value={testName}
            placeholder="Test Name"
            errorText={errorMessage}
            onChangeText={setTestName}
            blurOnSubmit={true}
          />
          <Searchbar
            style={[styles.textInput, {
              backgroundColor: theme.bkg,
              borderColor: theme.text, color: theme.primaryColor
            }]}
            icon
            // clearIcon
            // inputStyle={{ fontSize: 16 }}
            theme={{ colors: { text: theme.text } }}
            iconColor={theme.text}
            placeholderTextColor={`${theme.text}88`}
            selectionColor={theme.primaryColor}
            blur
            value={result}
            placeholder="Result"
            errorText={errorMessage}
            onChangeText={setResult}
            blurOnSubmit={true}
          />
          <Button
            style={[styles.button, { backgroundColor: theme.primaryColor }]}
            labelStyle={{ color: '#fff' }}
            theme={{ colors: { text: theme.text } }}
            onPress={(userID) => { fetchBloodTestConfig(userID) }}
            loading={isLoading}
          >
            Submit test result
          </Button>

          {testConf && testConf.forEach(item => renderResult(item))}
          {propmtResult &&
            <View style={styles.card}>
              {inidication ?
                <>
                  <Text style={[styles.cardTitle, { color: theme.primaryColor }]}>{diagnosis}</Text>
                  <Icon name='emoji-happy' style={[styles.inidicationIcon, { color: THEME.gold }]} />
                </>
                :
                <>
                  <Text style={[styles.cardTitle, { color: THEME.primaryColor }]}>{diagnosis}</Text>
                  <Icon name='emoji-sad' style={[styles.inidicationIcon]} />
                </>
              }
            </View>
          }

        </View >
      </Background >
    </View >
  );
};
export default App;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: windowWidth,
  },
  container: {
    alignItems: 'center',
  },
  icon: {
    color: THEME.light,
    textAlign: 'right',
    fontSize: 20
  },
  inidicationIcon: {
    fontSize: 120
  },
  switchContainer: {
    flexDirection: 'row-reverse',
    padding: '2%',
    fontWeight: '300',
    alignItems: 'center',    
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    margin: '5%',
  },
  textInput: {
    width: windowWidth * .65,
    borderRadius: 10,
    borderBottomWidth: 2,
    margin: '5%',
    elevation: 5,
  },
  button: {
    width: windowWidth * .65,
    borderRadius: 10,
    borderBottomWidth: 2,
    margin: '5%',
    elevation: 5,
  },
  userDetailsContainer: {
    flexDirection: 'row',
    width: windowWidth * .65,
    marginTop: '5%',
    justifyContent: 'space-between',
  },
  card: {
    width: windowWidth * .8,
    alignItems: 'center',
    alignContent: 'center',
  },
  cardTitle: {
    width: windowWidth * .75,
    height: 'auto',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: '600',
    justifyContent: 'center',
  },
});

