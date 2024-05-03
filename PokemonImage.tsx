import React from 'react'
import { Image, StyleSheet, StyleProp, ImageStyle } from 'react-native'

type PokemonImageProps = {
  uri: string
  style?: StyleProp<ImageStyle>
}

const PokemonImage = ({ uri, style }: PokemonImageProps) => {
  return (
    <Image
      source={{
        uri,
      }}
      style={[styles.evolutionImage, style]}
    />
  )
}

export default PokemonImage

const styles = StyleSheet.create({
  evolutionImage: {
    width: 150,
    height: 150,
    borderRadius: 40,
  },
})
