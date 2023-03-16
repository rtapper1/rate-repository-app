export const formatNumber = (number) => {
  const lookup = [
    { value: 1, abbrv: '' },
    { value: 1e3, abbrv: 'k' },
    { value: 1e6, abbrv: 'M' },
  ]
  const scale = lookup
    .slice()
    .reverse()
    .find((s) => number >= s.value) || { value: 1, abbrv: '' }
  if (scale.value === 1) {
    return `${number.toString()}`
  }
  return `${(number / scale.value).toFixed(1).toString()}${scale.abbrv}`
}
