import React from 'react';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab'
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios'

const ranges = [
  {
    label: "Todos",
  },
  {
    value: 'decoracao',
    label: 'decoração',
  },
  {
    value: 'calcados',
    label: 'calçados',
  },
  {
    value: 'eletronicos',
    label: 'eletrônicos',
  },
  {
    value: 'moveis',
    label: 'móveis',
  },
];

const metodoPagamento = [
  {
    value: "card",
    label: "Cartão"
  },

  {
    value: "boleto",
    label: "boleto"
  }
]

const quantidadeParcela = [
  {
    value: "01",
    label: "01"
  },

  {
    value: "02",
    label: "02"
  },

  {
    value: "03",
    label: "03"
  },

  {
    value: "04",
    label: "04"
  },

  {
    value: "05",
    label: "05"
  },

  {
    value: "06",
    label: "06"
  },

  {
    value: "07",
    label: "07"
  },

  {
    value: "08",
    label: "08"
  },

  {
    value: "09",
    label: "09"
  },

  {
    value: "10",
    label: "10"
  },

  {
    value: "11",
    label: "11"
  },

  {
    value: "12",
    label: "12"
  },
]

const DivFlex=styled.div`
 height:70vh;
 width:100vw;
 display:flex;
 flex-direction:column;
 align-items:center;
`

const BlocoInput=styled.div`
  width:60vw;
  padding:20px
`

const TextoVendas=styled.h3`
  font-size: 1.3em;
  margin-right:540px
`

const TextoCategorias=styled.h4`
  margin-right:690px
`

const Seletor = styled(TextField)`
  flex-basis:200px;
`

const TextoFotos=styled.h4`
  margin-right:727px
`

const TextoPreco=styled.h4`
  margin-right:538px
`

const MetodosDePagamento=styled.div`
  display:flex;
  flex-direction:column;
  position:relative;
  right:316px;
`

const QuantidadeDeParcela=styled.div`
  display:flex;
  flex-direction:column;
  position:relative;
  bottom: 260px;
  right:40px
`

const DivBotao = styled.div`
  position:relative;
  left:220px;
  bottom:440px;
`
const ButtonConcluir = styled(Fab)`
  background-color: #45aaa4;
  color:white;
  font-weight: bold;
  text-transform: none;
  :hover {
    background-color: #248c85;
  }
`

class QueroVender extends React.Component{
  state={
    titulo: '',
    descricao: '',
    categoria: '',
    foto: '',
    valor: '',
    pagamento: '',
    parcelas: ''
  }

  onChangeTitulo = (event) => {
    this.setState({titulo: event.target.value});
  }

  onChangeDescricao = (event) => {
    this.setState({descricao: event.target.value});
  }

  onChangeCategoria = (event) => {
    this.setState({categoria: event.target.value});
  }

  onChangeFoto = (event) => {
    this.setState({foto: event.target.value});
  }

  onChangeValor = (event) => {
    this.setState({valor: event.target.value});
  }

  onChangePagamento = (event) => {
    this.setState({pagamento: event.target.value});
  }

  onChangeParcelas = (event) => {
    this.setState({parcelas: event.target.value});
  }

  onClickCriaProduto = () => {
    const body = {
      name: this.state.titulo,
      description: this.state.descricao,
      price: this.state.valor,
      paymentMethod: this.state.pagamento,
      category: this.state.categoria,
      photos: [this.state.foto],
      installments: this.state.parcelas
    }

    axios
      .post("https://us-central1-labenu-apis.cloudfunctions.net/fourUsedTwo/products", body)
      .then(resposta => {
        return (
          this.setState({titulo: '', descricao: '', categoria: '', foto: '', valor: '', pagamento: '', parcelas: ''}),
          alert("Cadastro realizado com sucesso!")
        )
      })
      .catch(error => {
        return (alert(`Status do erro: ${error.response.status}\nMensagem: ${error.response.data.message}`))
      })
  }

  render() {
      return(
        <DivFlex>
           <TextoVendas>Cadastro de Produto </TextoVendas>
         <BlocoInput>
          <TextField 
            label="Titulo * "
            fullWidth
            variant="outlined"
            value={this.state.titulo}
            onChange={this.onChangeTitulo}
          />
            
            <TextField
            label="Descrição *"
            fullWidth
            multiline
            rowsMax="20"
            variant="outlined"
            value={this.state.descricao}
            onChange={this.onChangeDescricao}
            />
          </BlocoInput>

          <div>
            <TextoCategorias>Categorias *</TextoCategorias>
            <Seletor
              select
              variant="outlined"
              value={this.state.categoria}
              onChange={this.onChangeCategoria}
            >
              {ranges.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Seletor>
          </div>

          <div>
             <TextoFotos>Fotos *</TextoFotos>
              <TextField
                placeholder= {'Cole a URL Da Foto'}
                variant="outlined"
                value={this.state.foto}
                onChange={this.onChangeFoto}
              />
          </div>

          <TextoPreco>
              <TextField
                placeholder={'Preço (R$)'}
                type= "number"
                variant="outlined"
                value={this.state.valor}
                onChange={this.onChangeValor}
              />
          </TextoPreco>

          <MetodosDePagamento>
           <h5>Metodo De Pagamento</h5>
           <Seletor
              select
              variant="outlined"
              value={this.state.pagamento}
              onChange={this.onChangePagamento}
            >
              {metodoPagamento.map(metodo => (
                <MenuItem key={metodo.value} value={metodo.value}>
                  {metodo.label}
                </MenuItem>
              ))}
            </Seletor>
          </MetodosDePagamento>

          <QuantidadeDeParcela>
            <h5>Quantidade De Parcelas</h5>
            <Seletor
              select
              variant="outlined"
              value={this.state.parcelas}
              onChange={this.onChangeParcelas}
            >
              {quantidadeParcela.map(quantidade => (
                <MenuItem key={quantidade.value} value={quantidade.value}>
                  {quantidade.label}
                </MenuItem>
              ))}
            </Seletor>
          </QuantidadeDeParcela>
          <DivBotao>
            <ButtonConcluir variant="extended" size="medium" onClick={this.onClickCriaProduto}>
              Concluir
            </ButtonConcluir>
          </DivBotao>
        </DivFlex>
      )
  }
}

export default QueroVender
