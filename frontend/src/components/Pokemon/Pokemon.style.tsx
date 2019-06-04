import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pokemon';
    src: 'PokemonGB.ttf';
  }
`;
export default {
  Pokemon: styled.div`
    display: inline-block;
    font-family: 'Pokemon';
    text-align: center;
    border: 5px double black;
    padding: 5px 0 10px 0;
    margin: 10px;
    width: 250px;
    font-family: 'Pokemon';
    font-size: 15px;
  `,
};
