let participantes = [ 
  {
    nome: "Gabriel",
    email: "gabs@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 19, 23),
    dateCheckIn: new Date(2024, 2, 25, 20, 20),
  },
  {
    nome: "Victor Vinicius",
    email: "victor@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dateCheckIn: null
  },
  {
    nome: "Alice",
    email: "alice@gmail.com",
    dataInscricao: new Date(2024, 2, 10, 10, 30),
    dateCheckIn: new Date(2024, 2, 10, 9, 30),
  },
  {
    nome: "Carlos",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 2, 15, 14, 45),
    dateCheckIn: new Date(2024, 2, 15, 14, 30),
  },
  {
    nome: "Maria",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 18, 11, 0),
    dateCheckIn: new Date(2024, 2, 18, 10, 30),
  },
  {
    nome: "João",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 20, 16, 15),
    dateCheckIn: new Date(2024, 2, 20, 15, 45),
  },
  {
    nome: "Juliana",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 20, 0),
    dateCheckIn: new Date(2024, 2, 22, 19, 30),
  },
  {
    nome: "Pedro",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 12, 30),
    dateCheckIn: new Date(2024, 2, 25, 12, 0),
  },
  {
    nome: "Laura",
    email: "laura@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 9, 45),
    dateCheckIn: new Date(2024, 2, 28, 9, 15),
  },
  {
    nome: "Fernando",
    email: "fernando@gmail.com",
    dataInscricao: new Date(2024, 2, 30, 18, 20),
    dateCheckIn: new Date(2024, 2, 30, 17, 50),
  },
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to
  (participante.dataInscricao)
  
  let dataCheckIn = dayjs(Date.now()).to
  (participante.dataCheckIn)

  //conficional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
    >
      Confirmar  check-in
    </button>` 
  }

  return `
  <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""

  // estrutura de repetição - loop
  for(let participante of  participantes){
    output = output + criarNovoParticipante(participante)
  }

  //substituir info do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDosFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDosFormulario.get('nome'),
    email: dadosDosFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  //verificar se o participante já existe

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
    
  )

  if (participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //limpar formulário 
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  //confirmar check-in
  const mensagemConfirmacao ='Tem certeza que deseja realizar o check-in?'
  if(confirm(mensagemConfirmacao) ==false) {
    return 
  }

  //encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  //atualizar o chek-in do participante
  participante.dataCheckIn = new Date()
  //atualizar a lista de participantes
  atualizarLista(participantes)
}  