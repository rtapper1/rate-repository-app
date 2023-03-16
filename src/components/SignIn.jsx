import { Formik } from 'formik'
import { View, Pressable, StyleSheet } from 'react-native'
import * as yup from 'yup'
import { useApolloClient } from '@apollo/client'
import { useNavigate } from 'react-router-native'

import Text from './Text'
import FormikTextInput from './FormikTextInput'
import useSignIn from '../hooks/useSignIn'
import { useAuthStorage } from '../hooks/useAuthStorage'

import theme from '../themes'

const initialValues = {
  username: '',
  password: '',
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  input: {
    borderColor: theme.colors.textSecondary,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    margin: 10,
    marginBottom: 5,
    font: theme.fonts.main,
  },
  button: {
    backgroundColor: theme.colors.primary,
  },
  buttonPressed: {
    backgroundColor: 'darkblue',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    font: theme.fonts.main,
  },
})

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required!'),
  password: yup.string().required('Password is required!'),
})

const SignInForm = ({ onSubmit }) => (
  <View style={styles.container}>
    <FormikTextInput
      name="username"
      placeholder="Username"
      style={styles.input}
    />
    <FormikTextInput
      name="password"
      placeholder="Password"
      style={styles.input}
      secureTextEntry
    />
    <Pressable
      onPress={onSubmit}
      style={({ pressed }) =>
        pressed
          ? [styles.input, styles.button, styles.buttonPressed]
          : [styles.input, styles.button]
      }
    >
      <Text style={styles.buttonText}>Sign in</Text>
    </Pressable>
  </View>
)

const SignIn = () => {
  const [signIn] = useSignIn()
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const nav = useNavigate()

  const onSubmit = async (values, { resetForm }) => {
    const { username, password } = values

    try {
      const { data } = await signIn({ username, password })
      if (data.authenticate) {
        authStorage.setAccessToken(data.authenticate.accessToken)
        apolloClient.resetStore()
        nav('/')
      }
      resetForm()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn
