import * as React from 'react';

import Pokemon from 'components/Pokemon';
import { makeGetRequest } from 'services/networking/request';
import Style from './Home.style';
import loaderImg from '../../loader.svg';
import { useState, useEffect } from 'react';

interface State {
  pokemons: Array<{
    id: number;
    name: string;
    height: number;
    weight: number;
  }>;
  loading: boolean;
  errorMessage: string;
}

const Home = () => {
  const [pokemons, setPokemons] = useState(
    new Array<{
      id: number;
      name: string;
      height: number;
      weight: number;
    }>(),
  );
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  async function populatePokedex() {
    const pokemonList = await makeGetRequest('/pokemon');
    setPokemons(pokemonList.body);
    setLoading(false);
  }

  useEffect(() => {
    try {
      populatePokedex();
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  });

  return (
    <Style.Intro>
      <Style.Title>Pokedex</Style.Title>
      <Style.Pokedex>
        {loading && <img src={loaderImg} alt={'Loading...'} />}
        {pokemons.map(pokemon => {
          return (
            <Pokemon
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              weight={pokemon.weight}
              height={pokemon.height}
            />
          );
        })}
        {errorMessage !== ''
          ? 'An error occurder while communicating with the PokeApi: ' + errorMessage
          : ''}
      </Style.Pokedex>
    </Style.Intro>
  );
};

export default Home;
