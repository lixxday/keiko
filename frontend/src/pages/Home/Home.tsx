import * as React from 'react';

import Pokemon from 'components/Pokemon';
import { makeGetRequest } from 'services/networking/request';
import Style from './Home.style';

interface Props {}
interface State {
  pokemons: {
    id: number;
    name: string;
    height: number;
    weight: number;
  }[];
  loading: boolean;
}

class Home extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      pokemons: [],
      loading: true,
    };
  }

  componentDidMount() {
    const pokemonList = makeGetRequest('/pokemon')
      .then(response => {
        this.setState({
          pokemons: response.body,
          loading: false,
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
        <Style.Title>Pokedex</Style.Title>
        <Style.Intro>
          {this.state.loading && (
            <img
              src={`https://trello-attachments.s3.amazonaws.com/5cade0c8d91f7b592796bff6/5cade0c8d91f7b592796c012/x/57f45500600db5a4c399a7b1dc034ef5/loader.svg`}
              alt={'Loading'}
            />
          )}
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
      </Style.Intro>
    );
  }
}

export default Home;
