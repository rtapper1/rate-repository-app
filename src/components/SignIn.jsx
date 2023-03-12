import { Formik } from 'formik'
import { View, Pressable, StyleSheet } from 'react-native'
import * as yup from 'yup'

import Text from './Text'
import FormikTextInput from './FormikTextInput'

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
    borderWidth: 0,
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

const onSubmit = (values) => {
  console.log(`Signed in with username ${values.username}`)
}

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
    <Pressable onPress={onSubmit}>
      <Text style={[styles.input, styles.button]}>Sign in</Text>
    </Pressable>
  </View>
)

const SignIn = () => {
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
