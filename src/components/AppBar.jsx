import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import { Link } from 'react-router-native'

import Text from './Text'

import theme from '../themes'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  text: {
    backgroundColor: theme.colors.textPrimary,
    color: 'white',
    fontSize: theme.fontSizes.subheading,
    margin: 10,
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to="/signin">
          <Text style={styles.text}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  )
}

export default AppBar
