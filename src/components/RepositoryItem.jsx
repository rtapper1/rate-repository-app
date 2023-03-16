import { Image, StyleSheet, View } from 'react-native'

import Text from './Text'

import { formatNumber } from '../utils/helperFuncs'
import theme from '../themes'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    //marginTop: 10,
    //marginLeft: 10,
    //marginRight: 10,
    backgroundColor: 'white',
    //borderRadius: 3,
    //borderStyle: 'solid',
    //borderWidth: 2,
    padding: 15,
  },
  mainSection: {
    display: 'flex',
    flexDirection: 'row',
  },
  descriptions: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexShrink: 1,
  },
  picture: {
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
    marginVertical: 6,
    font: theme.fonts.main,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    flexShrink: 1,
    padding: 4,
    overflow: 'hidden',
    borderRadius: 5,
    borderStyle: 'solid',
  },
  statistics: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 6,
  },
  statisticItem: {
    flexDirection: 'column',
    flex: 1,
  },
  statisticValue: {
    fontWeight: 'bold',
    textAlign: 'center',
    font: theme.fonts.main,
  },
  statisticMetric: {
    textAlign: 'center',
    font: theme.fonts.main,
  },
})

const ItemStatistic = ({ type, item }) => {
  let value
  let metric
  switch (type) {
    case 'stars':
      value = item.stargazersCount
      metric = 'Stars'
      break
    case 'forks':
      value = item.forksCount
      metric = 'Forks'
      break
    case 'reviews':
      value = item.reviewCount
      metric = 'Reviews'
      break
    case 'rating':
      value = item.ratingAverage
      metric = 'Rating'
      break
    default:
      throw new Error('Unidentified statistic type')
  }
  return (
    <View style={styles.statisticItem}>
      <Text style={styles.statisticValue}>{formatNumber(value)}</Text>
      <Text style={styles.statisticMetric}>{metric}</Text>
    </View>
  )
}

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainSection}>
        <View style={{ flexDirection: 'column' }}>
          <View style={styles.picture}>
            <Image
              source={{ uri: item.ownerAvatarUrl }}
              style={{ height: 40, width: 40 }}
            />
          </View>
          <View style={{ flexGrow: 1 }}></View>
        </View>
        <View style={styles.descriptions}>
          <Text style={[{ fontWeight: 'bold' }, styles.text]}>
            {item.fullName}
          </Text>
          <Text style={styles.text}>{item.description}</Text>
          <Text style={[styles.text, styles.language]}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.statistics}>
        <ItemStatistic type="stars" item={item} />
        <ItemStatistic type="forks" item={item} />
        <ItemStatistic type="reviews" item={item} />
        <ItemStatistic type="rating" item={item} />
      </View>
    </View>
  )
}

/*
Stars: {item.stargazersCount} {`\n`}
Forks: {item.forksCount} {`\n`}
Reviews: {item.reviewCount} {`\n`}
Rating: {item.ratingAverage}
*/

export default RepositoryItem
