import * as React from 'react';

import { makeGetRequest } from 'services/networking/request';
import Pokemon from 'components/Pokemon';
import Style from './Home.style';

interface Props {}
interface State {
  pokemons: {
    id: number;
    name: string;
    height: number;
    weight: number;
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
    if (this.state.pokemons === []) {
      return <Style.Intro />;
    }

    return (
      <Style.Intro>
        <h1 style={{ width: '100%', textAlign: 'center' }}>Pokedex</h1>
        {this.state.pokemons.map(pokemon => {
          return (
            <Pokemon
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              height={pokemon.height}
              weight={pokemon.weight}
            />
          );
        })}
      </Style.Intro>
    );
  }
}

export default Home;
