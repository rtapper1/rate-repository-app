import { TextInput as TextInputNative } from 'react-native'

//const styles = StyleSheet.create({})

const TextInput = ({ style, ...props }) => {
  const textInputStyle = [style]

  return <TextInputNative style={textInputStyle} {...props} />
}

export default TextInput
