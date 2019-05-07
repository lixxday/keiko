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
  /*
  constructor(props: any) {
    super(props);
    this.state = {
      pokemons: [],
    };
  }
  */

  componentDidMount() {
    const pokemonList = makeGetRequest('/pokemon')
      .then(response => {
        console.log(response.body);
      })
      .catch(err => console.log(err.message));
  }

  render(): React.ReactNode {
    const salameche = this.state.pokemons[0];
    return (
      <Style.Intro>
        <Pokemon id={4} name="Salamèche" />
      </Style.Intro>
    );
  }
}

export default Home;
