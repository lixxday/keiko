import * as React from 'react';

import Pokemon from 'components/Pokemon';
import { makeGetRequest } from 'services/networking/request';
import Style from './Home.style';
import loaderImg from '../../loader.svg';

interface Props {}
interface State {
  pokemons: {
    id: number;
    name: string;
    height: number;
    weight: number;
  }[];
  loading: boolean;
  errorMessage: string;
}

class Home extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      pokemons: [],
      loading: true,
      errorMessage: '',
    };
  }

  async componentDidMount() {
    let pokemonList;
    try {
      pokemonList = await makeGetRequest('/pokemon');
      this.setState({
        pokemons: pokemonList.body,
        loading: false,
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        loading: false,
      });
    }
  }

  render(): React.ReactNode {
    return (
      <Style.Intro>
        <Style.Title>Pokedex</Style.Title>
        <Style.Pokedex>
          {this.state.loading && <img src={loaderImg} alt={'Loading...'} />}
          {this.state.pokemons.map(pokemon => {
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
          {this.state.errorMessage !== ''
            ? 'An error occurder while communicating with the PokeApi: ' + this.state.errorMessage
            : ''}
        </Style.Pokedex>
      </Style.Intro>
    );
  }
}

export default Home;
