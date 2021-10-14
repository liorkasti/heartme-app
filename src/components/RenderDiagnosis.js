import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import { THEME } from '../utils/constants';

const RenderDiagnosis = ({ theme, diagnosis, indication }) => {

  return (
    <View style={styles.card}>
      <Text style={[styles.cardTitle, { color: theme.primaryColor }]}>{diagnosis}</Text>
      <Icon name={indication} style={[styles.inidicationIcon, { color: indication === 'emoji-happy' ? THEME.gold : '#ccc' }]} />
    </View>
  )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
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
  inidicationIcon: {
    fontSize: 120
  },
})
export default RenderDiagnosis;