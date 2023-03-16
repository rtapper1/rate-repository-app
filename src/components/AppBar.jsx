import { View, StyleSheet, ScrollView, Pressable } from 'react-native'
import Constants from 'expo-constants'
import { Link } from 'react-router-native'
import { useQuery, useApolloClient } from '@apollo/client'

import Text from './Text'
import theme from '../themes'
import { GET_USER } from '../graphql/queries'
import { useAuthStorage } from '../hooks/useAuthStorage'

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
  const { data } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
  })
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const handleLogout = () => {
    authStorage.removeAccessToken()
    apolloClient.resetStore()
  }

  const username = data.me ? data.me.username : undefined
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {username ? (
          <Pressable onPress={handleLogout}>
            <Text style={styles.text}>Sign out</Text>
          </Pressable>
        ) : (
          <Link to="/signin">
            <Text style={styles.text}>Sign in</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
