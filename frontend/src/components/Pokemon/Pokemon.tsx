import * as React from 'react';
import Style from './Pokemon.style';

interface Props {
  name: string;
  id: number;
  height: number;
  weight: number;
}

class Pokemon extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <Style.Pokemon>
        <div>{this.props.name}</div>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            this.props.id
          }.png`}
          alt={`Image pour ${this.props.name} non disponible`}
        />
        <div>Id:{this.props.id}</div>
        <div>Weight:{this.props.weight / 10} kg</div>
        <div>Height:{this.props.height * 10} cm</div>
      </Style.Pokemon>
    );
  }
}

export default Pokemon;
