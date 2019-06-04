import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import Style from './Pokemon.style';

interface Props {
  name: string;
  id: number;
  height: number;
  weight: number;
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pokemon';
    src: url('./pokemonGB.ttf') format('truetype');
  }
`;

class Pokemon extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <Style.Pokemon>
        <GlobalStyle />
        <div>{this.props.name}</div>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            this.props.id
          }.png`}
          alt={`Image pour ${this.props.name} non disponible`}
        />
        <div>Id:{this.props.id}</div>
        <div>Height:{this.props.height} cm</div>
        <div>Weight:{this.props.weight} kg</div>
      </Style.Pokemon>
    );
  }
}

export default Pokemon;
