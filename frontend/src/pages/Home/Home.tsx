import * as React from 'react';

import Style from './Home.style';

class Home extends React.Component {
  render(): React.ReactNode {
    const pokemon = 'Carapuce';
    const pokemonId = 7;

    return (
      <Style.Intro>
        <div>Bienvenue sur ton futur pokédex !</div>
        <div>
          Tu vas pouvoir apprendre tout ce qu'il faut sur React, Redux et Symfony, et attraper des
          pokemons !
        </div>
        <div>Commence par créer ton premier pokemon: {pokemon}</div>

        <div>
          <div>{pokemon}</div>
          <div>No {pokemonId}</div>
          <img
            src={`https://raw.githubuser.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
            alt={`${pokemon} image missing`}
          />
        </div>
      </Style.Intro>
    );
  }
}

export default Home;
