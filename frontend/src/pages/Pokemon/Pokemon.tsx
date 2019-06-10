import * as React from 'react';
import { useState, useEffect } from 'react';
import { makeGetRequest } from 'services/networking/request';
import { number, string } from 'prop-types';
import loaderImg from '../../loader.svg';

const Pokemon = (props: any) => {
  const [pokemonInfos, setPokemonInfos] = useState({
    id: number,
    name: string,
    weight: number,
    height: number,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  console.log(props);
  const path = props.location.pathname;

  async function getPokemonInfos() {
    const pokemonInfos = await makeGetRequest(path);
    setPokemonInfos(pokemonInfos.body);
    setLoading(false);
  }

  useEffect(() => {
    try {
      getPokemonInfos();
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  });

  return (
    <div>
      {loading && <img src={loaderImg} alt={'Loading...'} />}
      <Pokemon
        key={pokemonInfos.id}
        id={pokemonInfos.id}
        name={pokemonInfos.name}
        weight={pokemonInfos.weight}
        height={pokemonInfos.height}
      />
      {errorMessage !== ''
        ? 'An error occurder while communicating with the PokeApi: ' + errorMessage
        : ''}
    </div>
  );
};

export default Pokemon;
