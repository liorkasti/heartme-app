import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, Dimensions } from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import { Text, TouchableRipple, Switch } from 'react-native-paper';

import { THEME } from './utils/constants';
import { useTheme, useThemeUpdate } from './utils/ThemeContext';
import useFetch from './utils/useFetch';
import Background from './components/Background';
import Button from './components/Button';
import Input from './components/Input';
import RenderDiagnosis from './components/RenderDiagnosis';

const App = () => {
  const [fetchBloodTestConfig, testConf, isLoading, errorMessage] = useFetch([]);
  const [testName, setTestName] = useState('');
  const [result, setResult] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [description, setDescription] = useState('');
  const [indication, setIndication] = useState('emoji-neutral');
  const [analized, setAnalized] = useState(false);
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();

  const theme = {
    bkg: darkTheme ? THEME.darkBkg : THEME.light,
    text: darkTheme ? THEME.light : THEME.dark,
    primaryColor: THEME.heart
  }

  useEffect(() => {
    fetchBloodTestConfig(userID)
    return () => {
      setAnalized(false);
      console.log('Analized', false);
    }
  }, []);

  const userID = 12345;

  const validation = () => {
    if (testName.length < 1) {
      setDescription('Please enter test name');
      setDiagnosis('');
      setAnalized(false);
    } else if (result.length < 1) {
      setDiagnosis('');
      setDescription('Please enter your test result');
      setAnalized(false);
    } else {
      const exist = testConf.filter(
        test => testName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().includes(test.name.substring(0, 3)));
      analysis(exist[0]);
    }
  }

  console.log('num validation', result.match(/^[0-9]+$/) == null);

  const analysis = (item) => {
    setAnalized(false);
    if (!item) {
      setDiagnosis(`Test was not found!`);
      setIndication('emoji-neutral');
      setDescription('')
      setAnalized(true);
    } else if (result.match(/^[0-9]+$/) == null) {
      setDiagnosis(`Invalid result!`)
      setIndication('emoji-neutral');
      setDescription('')
      setAnalized(true);
    } else if (result > item.threshold) {
      setDiagnosis(`Your ${item.name} results are Bad!`)
      setIndication('emoji-sad');
      setDescription('')
      setAnalized(true);
    } else if (result <= item.threshold) {
      setDiagnosis(`Your ${item.name} results are Good!`);
      setIndication('emoji-happy');
      setDescription('')
      setAnalized(true);
    } else {
      setDiagnosis(`Unknown result!`);
      setIndication('emoji-neutral');
      setAnalized(true);
    }

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
            description={description}
            placeholder="Test Name"
            errorText={errorMessage}
            onChangeText={setTestName}
          />
          <Input
            theme={theme}
            value={result}
            description={description}
            errorText={errorMessage}
            placeholder="Result"
            onChangeText={setResult}
          />
          <Button
            style={[styles.button, { backgroundColor: theme.primaryColor }]}
            labelStyle={{ color: '#fff' }}
            theme={{ colors: { text: theme.text } }}
            onPress={validation}
            loading={isLoading}
          >
            Submit test result
          </Button>
          {errorMessage.length > 0 &&
            <Text Text Text style={{ color: theme.primaryColor }}>{errorMessage}{'\n'}Please check your network connection.</Text>
          }
          {/* {analized &&
            <View style={styles.card}>
              <Text style={[styles.cardTitle, { color: theme.primaryColor }]}>{diagnosis}</Text>
              <Icon name={indication} style={[styles.inidicationIcon, { color: indication === 'emoji-happy' ? THEME.gold : '#ccc' }]} />
            </View>
          } */}
          {analized && <RenderDiagnosis
            theme={theme}
            diagnosis={diagnosis}
            errorText={errorMessage}
            indication={indication}
          />}
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
    height: 55,
    width: windowWidth * .65,
    borderRadius: 10,
    borderBottomWidth: 2,
    justifyContent: 'center',
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

