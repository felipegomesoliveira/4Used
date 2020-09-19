import React, { Component } from 'react'
import styled from 'styled-components'
import Header from './Header'
import SecaoProdutos from './SecaoProdutos'
import Carrinho  from './Carrinho/Carrinho'
import QueroVender from './QueroVender/queroVender'

const DivApp=styled.div`
  
`

export class AppContainer extends Component {
  state={
    secaoAtual: '',
    listaCarrinho: [],
    itemBuscado: ''
  }

  componentDidUpdate = () => {
    localStorage.setItem("carrinho", JSON.stringify(this.state.listaCarrinho))
  }

  componentDidMount = () => {
    const resgataCarrinho = JSON.parse(localStorage.getItem("carrinho"));
    if(resgataCarrinho !== null){
      this.setState({listaCarrinho: resgataCarrinho})
    }
  }

  adicionarAoCarrinho = (produtoParaAdicionar) => {
    let lista = [...this.state.listaCarrinho];
    let existe = this.state.listaCarrinho.findIndex((produto) => produto.id === produtoParaAdicionar.id);
    if(existe > -1){
        lista[existe].quantidade++;
    }
    else{
      produtoParaAdicionar.quantidade=1;
      lista.push(produtoParaAdicionar);
    }
    
    this.setState({listaCarrinho: lista})
  }

  removerDoCarrinho = (id) => {
    let lista = [...this.state.listaCarrinho];
    let produto = this.state.listaCarrinho.findIndex((produto) => produto.id === id);
    lista.splice(produto, 1);
    this.setState({listaCarrinho: lista})
  }

  mudarSecao = (secaoClicada) => {
    this.setState({secaoAtual: secaoClicada});
  }

  recebeBusca = (valorInput) => {
    this.setState({itemBuscado: valorInput})
  }

  render() {
    switch(this.state.secaoAtual){
      case 'cadastro':
        return (
          <DivApp>
            <Header estado={this.state.secaoAtual} mudarSecao={this.mudarSecao} recebeBusca={this.recebeBusca} />
            <QueroVender />
          </DivApp>
        )
      case 'carrinho':
        return (
          <DivApp>
            <Header estado={this.state.secaoAtual} mudarSecao={this.mudarSecao} recebeBusca={this.recebeBusca} />
            <Carrinho lista={this.state.listaCarrinho} removerDoCarrinho={this.removerDoCarrinho}/>
          </DivApp>
        )
      default:
          return (
            <DivApp>
              <Header estado={this.state.secaoAtual} mudarSecao={this.mudarSecao} recebeBusca={this.recebeBusca} />
              <SecaoProdutos adicionarAoCarrinho={this.adicionarAoCarrinho} itemBuscado={this.state.itemBuscado} />
            </DivApp>
        )
    }
  }
}