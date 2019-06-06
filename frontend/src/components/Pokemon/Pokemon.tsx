import * as React from 'react';
import Style from './Pokemon.style';

interface Props {
  name: string;
  id: number;
  height: number;
  weight: number;
}

const Pokemon = (props: Props) => (
  <Style.Pokemon>
    <div>{props.name}</div>
    <img
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        props.id
      }.png`}
      alt={`Image pour ${props.name}`}
    />
    <div>Id:{props.id}</div>
    <div>Weight:{props.weight / 10} kg</div>
    <div>Height:{props.height * 10} cm</div>
  </Style.Pokemon>
);

export default Pokemon;
