import * as React from 'react';

import { makeGetRequest } from 'services/networking/request';
import Pokemon from 'components/Pokemon';
import Style from './Home.style';

interface Props {}
interface State {
  pokemons: {
    id: number;
    name: string;
  }[];
}

class Home extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      pokemons: [],
    };
  }

  componentDidMount() {
    const pokemonList = makeGetRequest('/pokemon')
      .then(response => {
        this.setState({
          pokemons: response.body,
        });
        return response.body;
      })
      .catch(err => console.log(err.message));
  }

  render(): React.ReactNode {
    const rawPokemonList = this.state.pokemons;
    const myPokemonList = rawPokemonList.map(pokemon => {
      return <Pokemon key={pokemon.id} id={pokemon.id} name={pokemon.name} />;
    });

    if (myPokemonList === undefined) {
      return <Style.Intro />;
    }

    return <Style.Intro>{myPokemonList}</Style.Intro>;
  }
}

export default Home;
