import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';

export default function App() {
  const handlePress = (link) => {
    switch (link) {
      case 'pokedex':
        Linking.openURL('https://www.pokemon.com/br/pokedex/squirtle');
        break;
      case 'bulbapedia':
        Linking.openURL('https://bulbapedia.bulbagarden.net/wiki/Squirtle_(Pokémon)');
        break;
      default:
        break;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.blueView}>
        <Text style={styles.title}>Squirtle</Text>
      </View>
      <ScrollView style={styles.scrollViewContent} contentContainerStyle={styles.scrollViewContainer}>
        <View style={[styles.card]}>
          <Text style={styles.cardTitle}>Informações sobre Squirtle</Text>
          <Image
            source={{
              uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
            }}
            style={styles.cardImage}
          />
          <Text style={styles.cardDescription}>
            Squirtle é um Pokémon do tipo Água. É o Pokémon inicial da região de
            Kanto e evolui para Wartortle
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Características</Text>
          <Text style={styles.cardDescription}>
            Squirtle é conhecido por sua concha nas costas, que oferece proteção
            adicional. Ele possui ataques de água poderosos, como Water Gun e
            Hydro Pump.
          </Text>
        </View>
         <View style={styles.card}>
          <Text style={styles.cardTitle}>Curiosidades</Text>
          <Text style={styles.cardDescription2}>
            •Squirtle é um dos Pokémon mais populares e adoráveis.
          </Text>
          <Text style={styles.cardDescription2}>
            •Seu nome deriva das palavras "squirrel" (esquilo) e "turtle" (tartaruga).
          </Text>
          <Text style={styles.cardDescription2}>
            •Squirtle é frequentemente escolhido por treinadores para começar sua jornada Pokémon.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Squirtle: O Amigo Aquático</Text>
          <Text style={styles.cardDescription2}>
            Squirtle, com sua aparência simpática e sua habilidade em controlar a
            água, conquistou o coração de treinadores Pokémon ao redor do mundo.
            Sendo o inicial de água na região de Kanto, Squirtle é uma escolha
            popular para aqueles que buscam equilíbrio e versatilidade em suas
            equipes.
          </Text>
          <Text style={styles.cardDescription2}>
            Sua concha nas costas não apenas oferece proteção, mas também é um
            símbolo de resistência. Ao evoluir para Wartortle e, posteriormente,
            para Blastoise, Squirtle se transforma em uma força formidável,
            dominando ataques aquáticos que podem surpreender adversários em
            batalhas.
          </Text>
          <Text style={styles.cardDescription2}>
            Além de suas habilidades de batalha, Squirtle é conhecido por seu
            carisma. Treinadores muitas vezes descrevem a relação com seu Squirtle
            como uma amizade profunda, tornando-o não apenas um companheiro de
            lutas, mas um amigo leal ao longo de suas jornadas.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recursos Adcionais</Text>
          <TouchableOpacity onPress={() => handlePress('pokedex')}>
          <Text style={styles.cardTextLink}>•Pokédex - Squirtle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('bulbapedia')}>
          <Text style={styles.cardTextLink}>•Bulbapedia - Squirtle</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.card}>
        <Text style={styles.cardTitle}>Evoluções</Text>
        <View style={styles.imageContainer}>
        <Image
            source={{
              uri: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png',
            }}
            style={styles.imgEvolution}
          />
          <Text>1. Squirtle</Text>
          <Image
            source={{
              uri: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/008.png',
            }}
            style={styles.imgEvolution}
          />
          <Text>2. Wartortle</Text>
          <Image
            source={{
              uri: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png',
            }}
            style={styles.imgEvolution}
          />
           <Text>3. Blastoise</Text>
        </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Contato via e-mail</Text>
          <Text style={styles.footerText}>Telefone: (55) 5555-5555</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  blueView: {
    backgroundColor: '#017BFE',
    width: '100%',
    padding: 40,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollViewContent: {
    flex: 1,
    width: '100%',
  },
  scrollViewContainer: {
    paddingTop: 20, 
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  cardTitle: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    alignSelf: 'center',
  },
  cardDescription2: {
    fontSize: 14,
    alignSelf: 'left',
    marginBottom: 10,
  },
  cardTextLink: {
    fontSize: 14,
    alignSelf: 'left',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  imageContainer : {
    flexDirection: 'collum',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgEvolution : {
    width: 100,
    height: 100
  },
  footer: {
     backgroundColor: '#343A3F',
    width: '100%',
    padding: 40,  
    },
    footerText : {
      alignSelf: 'center',
      color: '#fff'
    }
});