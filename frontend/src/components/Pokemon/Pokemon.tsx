import * as React from 'react';

interface Props {
  name: string;
  id: number;
}

class Pokemon extends React.Component<Props> {
  render(): React.ReactNode {
    const pokemonId = this.props.id;
    return (
      <div>
        <div>{this.props.name}</div>
        <div>{this.props.id}</div>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
          alt="Image non disponible"
        />
      </div>
    );
  }
}

export default Pokemon;
