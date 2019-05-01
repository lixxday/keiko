import * as React from 'react';

interface Props {
  name: string;
  id: number;
}

class Pokemon extends React.Component<Props> {
  render(): React.ReactNode {
    const src =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
      this.props.id +
      '.png';
    return (
      <div>
        <div>{this.props.name}</div>
        <div>{this.props.id}</div>
        <img src={src} alt="Carapuce_img" />
      </div>
    );
  }
}

export default Pokemon;
