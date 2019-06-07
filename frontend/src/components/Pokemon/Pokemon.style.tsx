import styled from 'styled-components';

export default {
  Pokemon: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    border: 5px double black;
    padding: 5px 0 10px 0;
    margin: 10px;
    width: 250px;
    font-family: 'Pokemon';
    font-size: 15px;
  `,
  RotateImg: styled.img`
    position: absolute;
    top: 0;
    right: 0;
  `,
};
