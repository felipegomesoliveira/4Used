import React from 'react';
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';

const ContainerProduto = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`

const Imagem = styled.img`
    max-width: 100%;
    max-height: 150px;
`

const IconeCarrinho = styled(AddShoppingCart)`
    z-index: -1;
`

//componente que retorna cada produto individualmente, chamado na SecaoProdutos.js passando props
class CardProduto extends React.Component {
    render(){
        const valor=Number(this.props.valor), parcelas=Number(this.props.parcelas)
        const valorParcela=valor/parcelas;
        return <ContainerProduto>
            <Imagem src={this.props.linkImagem} />
            {this.props.pagamento==='card' 
                ? <p>R${valor.toFixed(2)} em {this.props.parcelas}x de R${valorParcela.toFixed(2)} no cartão</p>
                : <p>R${valor.toFixed(2)} à vista</p>
            }
            <IconButton onClick={() => this.props.passarCarrinho(this.props.id)}>
                <IconeCarrinho />
            </IconButton>
            <h3>{this.props.nome}</h3>
            <p>{this.props.descricao}</p>
        </ContainerProduto>
    }
}

export default CardProduto;