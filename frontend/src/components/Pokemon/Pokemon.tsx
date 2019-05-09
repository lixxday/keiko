import * as React from 'react';

interface Props {
  name: string;
  id: number;
}

class Pokemon extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div>
        <div>{this.props.name}</div>
        <div>{this.props.id}</div>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            this.props.id
          }.png`}
          alt={`Image pour ${this.props.name} non disponible`}
        />
      </div>
    );
  }
}

export default Pokemon;
