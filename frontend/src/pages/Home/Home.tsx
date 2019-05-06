import * as React from 'react';

import Pokemon from 'components/Pokemon';
import Style from './Home.style';

class Home extends React.Component {
  render(): React.ReactNode {
    return (
      <Style.Intro>
        <Pokemon id={7} name="Carapuce" />
        <Pokemon id={8} name="Carabafe" />
        <Pokemon id={9} name="Tortank" />
      </Style.Intro>
    );
  }
}

export default Home;
