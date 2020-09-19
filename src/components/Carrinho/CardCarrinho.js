import React from 'react'
import styled from 'styled-components'
import Botao from '@material-ui/core/Button'
import RemoveCarrinho from '@material-ui/icons/RemoveShoppingCart'
import IconeAdiciona from '@material-ui/icons/Add';
import IconeRemove from '@material-ui/icons/Remove';

const ContainerImagem = styled.img`
    width: 100px;   
    height: 100px;
`

const ProdutoArtigo = styled.div`
    display: flex;
    margin: 0px;
    padding: 0px;
    justify-content: space-between;
`
const InfoProduto = styled.div`
    display: flex;
    flex-direction: column;

`
const DivRemoveCarrinho = styled.div`
    padding-top : 19px;
    text-align: center;
`
const DivQuantidade = styled.div`
    padding-top: 40px;
    justify-content: center;
`
const InputQuantidade = styled.input`
    width: 50px;
    text-align: center;
    font-weight: bold;
`
const DivPrecoProdutoIndividual = styled.div`
    padding-top: 20px;
    font-size: 42px;
`

class CardCarrinho extends React.Component {
  
    render() {
      return <div> 
          <ProdutoArtigo>
              <ContainerImagem src={this.props.linkImagem} alt=""  />
              <InfoProduto>
                  <h3>{this.props.nome}</h3>
                  <p>Parcelas em até {this.props.parcelas} vezes</p> 
              </InfoProduto>
              <DivRemoveCarrinho>
                  <Botao><RemoveCarrinho onClick={() => this.props.removerDoCarrinho(this.props.id)} /></Botao>
                  <p>Excluir</p>
              </DivRemoveCarrinho>
              <DivQuantidade>
                  <Botao><IconeRemove/></Botao>
                  <InputQuantidade value={this.props.quantidade}/>
                  <Botao><IconeAdiciona/></Botao>
              </DivQuantidade>
              <DivPrecoProdutoIndividual>
                  R${parseFloat(this.props.valor).toFixed(2)}
              </DivPrecoProdutoIndividual>
          </ProdutoArtigo>
      </div>
    }
}

export default CardCarrinho