import { StyleSheet } from 'react-native'
import { useField } from 'formik'

import TextInput from './TextInput'
import Text from './Text'

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    marginLeft: 10,
    color: 'red',
  },
})

const FormikTextInput = ({ name, style, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const showError = meta.touched && meta.error
  if (showError) {
    if (Array.isArray(style)) {
      style.push({
        borderColor: 'red',
      })
    } else {
      style = [
        style,
        {
          borderColor: 'red',
        },
      ]
    }
  }
  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={style}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  )
}

export default FormikTextInput
