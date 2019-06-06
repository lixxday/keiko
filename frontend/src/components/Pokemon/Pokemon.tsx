import * as React from 'react';
import { useState } from 'react';
import Style from './Pokemon.style';
import rotateImg from '../../turn-ico.svg';

interface Props {
  name: string;
  id: number;
  height: number;
  weight: number;
}

const Pokemon = (props: Props) => {
  const [rotate, setRotate] = useState(false);
  return (
    <Style.Pokemon>
      <div>{props.name}</div>
      <Style.RotateImg src={rotateImg} onClick={() => setRotate(!rotate)} />
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          rotate ? `back/` + props.id : props.id
        }.png`}
        alt={`Image pour ${props.name}`}
      />

      <div>Id:{props.id}</div>
      <div>Weight:{props.weight / 10} kg</div>
      <div>Height:{props.height * 10} cm</div>
    </Style.Pokemon>
  );
};

export default Pokemon;
