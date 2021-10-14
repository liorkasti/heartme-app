import React, { useState, useEffect } from 'react';
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
import RenderResult from './components/RenderResult';

const App = () => {
  const [fetchBloodTestConfig, testConf, isLoading, errorMessage] = useFetch([]);
  const [testName, setTestName] = useState('');
  const [result, setResult] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [indication, setIndication] = useState(true);
  const [propmtResult, setPropmtResult] = useState(false);

  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();

  const theme = {
    bkg: darkTheme ? THEME.darkBkg : THEME.light,
    text: darkTheme ? THEME.light : THEME.dark,
    primaryColor: THEME.heart
  }

  useEffect(() => {
    fetchBloodTestConfig(userID)
  }, []);

  const userID = 12345;

  const processResult = (item) => {
    // console.log('item: ', item);

    let testNameFinlized = testName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    if (testNameFinlized.includes(item.name.substring(0, 3)))
      if (result > item.threshold) {
        setDiagnosis(`Your ${item.name} Bad!`)
        setIndication(false);
        setPropmtResult(true);
      }
      else if (result <= item.threshold && item.threshold > 0) {
        setDiagnosis(`Your ${item.name} Good!`);
        setIndication(true);
        setPropmtResult(true);
      }
      else {
        setDiagnosis(`The Test Name ${item.name} is Undefine!`);
        setIndication(false);
        setPropmtResult(true);
      }
    setPropmtResult(true);

    // return (<RenderResult diagnosis={diagnosis} />)
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
          <Input
            theme={theme}
            value={testName}
            placeholder="Blood Test Name"
            errorText={errorMessage}
            onChangeText={setTestName}
          />
          <Input
            theme={theme}
            value={result}
            placeholder="Result"
            errorText={errorMessage}
            onChangeText={setResult}
          />
          <Button
            style={[styles.button, { backgroundColor: theme.primaryColor }]}
            labelStyle={{ color: '#fff' }}
            theme={{ colors: { text: theme.text } }}
            onPress={(userID) => {
              testConf.forEach(item => processResult(item))
            }}
            loading={isLoading}
          >
            Submit test result
          </Button>

          {propmtResult &&
            <View style={styles.card}>
              <Text style={[styles.cardTitle, { color: theme.primaryColor }]}>{diagnosis}</Text>
              <Icon name={indication ? 'emoji-happy' : 'emoji-sad'} style={[styles.inidicationIcon, { color: indication ? THEME.gold : '#ccc' }]} />
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
    flex: 1,
    width: windowWidth * .8,
    paddingTop: '5%',
    height: 'auto',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    height: 60,
    fontSize: 20,
    fontWeight: '600',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

