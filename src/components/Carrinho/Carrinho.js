import React from 'react'
import CardCarrinho from './CardCarrinho'
import styled from 'styled-components'

const CardContent = styled.div`
    display: block;
`
const DivApp = styled.div`
  margin: 0 20%;
`
const TituloCarrinho = styled.div`
    text-align: center;
    margin: 3% 0;
`
const TotalDoCarrinho =  styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`
const TotalDoValor = styled.p`
    font-size: 60px;
`
class Carrinho extends React.Component {
    pegaTotal = () => {
        let valorTotal = 0
  
        for (let produto of this.props.lista){
            valorTotal += produto.price * produto.quantidade 
        }

        return valorTotal
    }
    render() {       
        const lista = this.props.lista

        return (
        <DivApp>    
            <CardContent>
                <TituloCarrinho>
                    <h2>Meu Carrinho</h2>
                </TituloCarrinho>
                {lista.map((produto) =>{
                    return <CardCarrinho 
                        key={produto.id}
                        id={produto.id}
                        valor={produto.price}
                        linkImagem={produto.photos[0]} 
                        nome={produto.name}
                        parcelas={produto.installments}
                        pagamento={produto.paymentMethod}
                        descricao={produto.description}
                        quantidade={produto.quantidade}
                        removerDoCarrinho={this.props.removerDoCarrinho}
                    />
                })}                
            </CardContent>
            <TotalDoCarrinho>
                <TotalDoValor>Total: R${this.pegaTotal().toFixed(2)}</TotalDoValor>
            </TotalDoCarrinho>
        </DivApp>    
         )
    }
}

export default Carrinho