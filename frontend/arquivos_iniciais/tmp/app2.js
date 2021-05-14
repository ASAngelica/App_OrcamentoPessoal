
// Classe para instanciar um obj a partir dos dados do formulario
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    // O retorno deste método valida os dados através da função cadastrarDespesa() que grava os dados (web storage)
    // atraves do método gravar da classe Bd.
    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
}

// Classe para instanciar o(s) objeto(s) da API de armazenamento na web (Web Storage) que fornece mecanismos 
// para que os navegadores possam armazenar dados através de chave/valor de uma forma mais eficiente 
// que os cookies.

class Bd {

    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id') //null
        return parseInt(proximoId) + 1
    }

    gravar(d){
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }
}

let bd = new Bd()

// instancia um objeto despesa da classe Despesa a partir dos dados do formulario e através do método
// 'gravar' da classe 'Bd' utiliza a API de armazenamento na web (Web Storage) para criar persistencia de 
// dados já que a aplicação não terá conexão com Banco de Dados algum.
function cadastrarDespesa(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    )
    // Grava os dados (WebStorage) a partir do metodo validarDados() da classe Despesa e exibe um alerta Baseado 
    // em um componente Modal do bootstrap, e o recurso Modal da biblioteca jquery.
    if(despesa.validarDados()){
        bd.gravar(despesa)
        //dialog de sucesso

        $('#textDanger').addClass('text-success')
        $('#btnModalFooter').removeClass('btn btn-danger').addClass('btn btn-success')
        document.getElementById('exampleModalLabel').textContent = 'Registro inserido com sucesso!'
        document.getElementById('modalBody').textContent = 'A Despesa foi cadastrada com sucesso!'
        document.getElementById('btnModalFooter').textContent = 'Voltar'

        $('#modalRegistraDespesa').modal('show') //jquery
    } else {
        //dialog de erro
        $('#modalRegistraDespesa').modal('show') //jquery
    }
}