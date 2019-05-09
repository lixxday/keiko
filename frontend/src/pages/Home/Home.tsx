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
    const salameche = this.state.pokemons[3];

    // Probablement pas le meilleur moyen d'attendre le chargement du component
    if (salameche === undefined) {
      return <Style.Intro />;
    }

    return (
      <Style.Intro>
        <Pokemon id={salameche.id} name={salameche.name} />
        <Pokemon id={7} name="Carapuce" />
        <Pokemon id={8} name="Carabaffe" />
        <Pokemon id={9} name="Tortank" />
      </Style.Intro>
    );
  }
}

export default Home;
