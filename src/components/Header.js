import React from 'react';
import styled from 'styled-components'
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import red from '@material-ui/core/colors/red';
import logo from '../img/4used.png'


const HeaderFlex = styled.header`
  ${props => (props.estado==='') && ({position: 'fixed'})} 
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 2px solid gainsboro;
  background-color: white;
`

const ImgLogo = styled.img`
  width: 80px;
  cursor: pointer;
`

const InputBusca = styled(Input)`
  flex-basis: 45%;
`

const Botao1 = styled(Fab)`    
  background-color: #45aaa4;
  color:white;
  font-weight: bold;
  text-transform: none;
  :hover {
    background-color: #248c85;
  }
`

const Botao2 = styled(Fab)` 
  width:100px;
  height:33px; 
  background-color: #f04d3c;
  color:white;
  font-weight: bold;
  text-transform: none;
  :hover {
    background-color: ${red[700]};
  }
`
const Botao3 = styled(Fab)`
  width:90px;
  height:33px;    
  background-color: #fbca64;
  color:white;
  font-weight: bold;
  text-transform: none;
  :hover {
    background-color: #c39725;
  }
`
const DivBotao = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
  margin: 10px;
`
class Header extends React.Component {
  onChangeBusca = (event) => {
    this.props.recebeBusca(event.target.value);
  }

  render() {
    return (
      <HeaderFlex estado={this.props.estado}>
        <ImgLogo src={logo} onClick={() => this.props.mudarSecao('')} /> 
        <InputBusca startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>}
          placeholder="Buscar"
          onChange={this.onChangeBusca}
        />
        <DivBotao>
          <Botao1 size="small" variant="extended" onClick={() => this.props.mudarSecao('cadastro')}>quero vender</Botao1>
          <Botao2 variant="extended" onClick={() => this.props.mudarSecao('carrinho')}>carrinho</Botao2>
          <Botao3 variant="extended">entrar</Botao3>
        </DivBotao>
      </HeaderFlex>
    );
  }
}

export default Header;