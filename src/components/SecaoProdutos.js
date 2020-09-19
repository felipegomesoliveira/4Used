import React from 'react';
import styled from 'styled-components'
import axios from 'axios'
import CardProduto from './CardProduto'


const DivApp = styled.div`
  text-align: center;
  padding: 90px 50px;
`

const ContainerProdutos = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(${props => props.linhas}, 1fr);
    gap: 10px;
    column-gap: 10px;
    justify-content: center;
`

const DivFiltros = styled.div`
    display: flex;
    margin: 10px;
`

const Legenda = styled.label`
    margin: 0 5px;
`

class SecaoProdutos extends React.Component {
    state={
        listaDeProdutos: [],
        categoria: '',
        inputValorMinimo: '',
        inputValorMaximo: '',
        ordena: ''
    }

    componentDidMount = () => {
        this.pegaListaDeProdutos();
    }

    pesquisaPorNome = (lista) => {
        lista = lista.filter(produto =>{
            if(produto.name.toLowerCase().includes(this.props.itemBuscado.toLowerCase())){
                return true
            }
        })
        return lista;
    }

    listaCategorias = (lista) => {
        let listaDeCategorias = [];
        lista.forEach(produto =>{
            listaDeCategorias.push(produto.category);
        })
        listaDeCategorias = [...new Set(listaDeCategorias)];
        return listaDeCategorias;
    }

    onChangeCategoria = (event) => {
        this.setState({categoria: event.target.value})
    }

    categorizaProdutos = (lista) => {
        if(this.state.categoria){
            lista = lista.filter(item =>{
                if(item.category === this.state.categoria){
                    return item
                }
            })
        }
        return lista;
    }

    onChangeValorMinimo = (event) => {
        if(event.target.value>=0){
            this.setState({inputValorMinimo: event.target.value})
        }
    }

    onChangeValorMaximo = (event) => {
        if(event.target.value>=0){
            this.setState({inputValorMaximo: event.target.value})
        }
    }

    filtraPorValor = (lista) => {
        let valorMinimo = this.state.inputValorMinimo;
        let valorMaximo = this.state.inputValorMaximo;
        if(valorMinimo===""){
            valorMinimo=-Infinity;
        }
        if(valorMaximo===""){
            valorMaximo=Infinity;
        }

        lista = lista.filter(produto =>{
            return produto.price >= valorMinimo && produto.price <= valorMaximo
        })

        return lista;
    }

    onChangeOrdena = (event) => {
        this.setState({ordena: event.target.value})
    }

    ordenaProdutos = (a, b) => {
        switch(this.state.ordena){
            case 'nome':
                return a.name - b.name
            case 'precoCrescente':
                return a.price - b.price
            case 'precoDecrescente':
                return b.price-a.price
            case 'categoria':
                return a.category-b.category
        }
    }

    limparFiltros = () =>{
        this.setState({categoria: '', inputValorMinimo: '', inputValorMaximo: '', ordena: ''})
    }

    pegaListaDeProdutos = () =>{
        axios
            .get("https://us-central1-labenu-apis.cloudfunctions.net/fourUsedTwo/products")
            .then(resposta =>{
                return(this.setState({listaDeProdutos: resposta.data.products}))
            })
            .catch(error => {
                console.log(error);
            })
    }

    produtoParaCarrinho = (id) =>{
        const produtoParaAdicionar = this.state.listaDeProdutos.find(produto => produto.id === id)
        this.props.adicionarAoCarrinho(produtoParaAdicionar)
    }
    
    render(){
        let lista = [...this.state.listaDeProdutos];
        const  listaDeCategorias = this.listaCategorias(lista);
        lista = this.pesquisaPorNome(lista)
        lista = this.categorizaProdutos(lista);
        lista = this.filtraPorValor(lista);
        lista = lista.sort(this.ordenaProdutos)

        return (
            <DivApp>
                <DivFiltros>
                    <b>Filtros</b>
                    <Legenda for="categorias">Categorias: </Legenda>
                    <select value={this.state.filtraPorCategoria} onChange={this.onChangeCategoria} name="categorias">
                        <option></option>
                        {listaDeCategorias.map((categoria, index) => {
                            return <option key={index} value={categoria}>{categoria}</option>
                        })}
                    </select>
                    <Legenda for="minimo">Valor mínimo: </Legenda>
                    <input type="number" name="minimo" value={this.state.inputValorMinimo} onChange={this.onChangeValorMinimo} />
                    <Legenda for="maximo">Valor máximo: </Legenda>
                    <input type="number" name="maximo" value={this.state.inputValorMaximo} onChange={this.onChangeValorMaximo} />
                    <Legenda for="ordena">Ordenar por: </Legenda>
                    <select value={this.state.ordena} onChange={this.onChangeOrdena} name="ordena">
                        <option value=""></option>
                        <option value="nome">nome</option>
                        <option value="precoCrescente">Preço crescente</option>
                        <option value="precoDecrescente">Preço decrescente</option>
                        <option value="categoria">Categoria</option>
                    </select>
                    <button onClick={this.limparFiltros}>Limpar filtros</button>
                </DivFiltros>
                <ContainerProdutos linhas={Math.ceil(lista.length/5)}>
                    {lista.map(produto => {
                            return <CardProduto 
                                key={produto.id}
                                id={produto.id}
                                valor={produto.price}
                                linkImagem={produto.photos[0]} 
                                nome={produto.name}
                                parcelas={produto.installments}
                                pagamento={produto.paymentMethod}
                                descricao={produto.description}
                                passarCarrinho={this.produtoParaCarrinho}
                            />
                    })}
                </ContainerProdutos>
            </DivApp>
        );
    }
}

export default SecaoProdutos;