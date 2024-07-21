# fast feet

## Regras da aplicação
- A aplicação deve ter dois tipos de usuário, entregador e/ou admin V
- Deve ser possível realizar login com CPF e Senha V
- Deve ser possível realizar o CRUD dos entregadores v
- Deve ser possível realizar o CRUD das encomendas v
- Deve ser possível realizar o CRUD dos destinatários v
- Deve ser possível marcar uma encomenda como aguardando (Disponível para retirada) v
- Deve ser possível retirar uma encomenda v
- Deve ser possível marcar uma encomenda como entregue v
- Deve ser possível marcar uma encomenda como devolvida v
- Deve ser possível listar as encomendas com endereços de entrega próximo ao local do - entregador v
- Deve ser possível alterar a senha de um usuário v
- Deve ser possível listar as entregas de um usuário v
- Deve ser possível notificar o destinatário a cada alteração no status da encomenda v

## Regras de negócio
- Somente usuário do tipo admin pode realizar operações de CRUD nas encomendas v
- Somente usuário do tipo admin pode realizar operações de CRUD dos entregadores v
- Somente usuário do tipo admin pode realizar operações de CRUD dos destinatários v
- Para marcar uma encomenda como entregue é obrigatório o envio de uma foto v
- Somente o entregador que retirou a encomenda pode marcar ela como entregue v
- Somente o admin pode alterar a senha de um usuário
- Não deve ser possível um entregador listar as encomendas de outro entregador v


## Conceitos que pode praticar
- DDD, Domain Events, Clean Architecture
- Autenticação e Autorização (RBAC)
- Testes unitários e e2e
- Integração com serviços externos

## entities
lendo as regras de negocio eu identifico como entities
- usuarios
    * entregador (possivel admin)
    * admin 
Destinatario não é citado como usuario, porem talvez a encomenda gere um id que qualquer pessoa (sem login) mas que possua esse id possa acessar onde esta a encomenda, assim como é nos correios
Como as regras falam em entregador e/ou admin indica que o entregador pode ser admin
- entities de função
    * encomenda
    * attachment da encomenda
    * destinatario


entregador
    id
    nome
    localização
    email
    cpf
    senha
    role (admin / user)
    status (ativo ou inativo (folga, ferias, etc))
    telefone (contato rapido, em uma aplicação real provavelmente seria necessario)
    createdAt
    updatedAt

admin
    id
    nome
    email
    cpf
    senha
    role (sempre admin)
    status
    createdAt
    updatedAt

encomenda
    id (vai ser usado no rastreamento)
    titulo 
    endereço (o endereço vai ser o mesmo do destinatario linkado a essa encomenda)
    destinatarioID 
    entregadorID (linkar a encomenda à um entregador por id) cada encomenda tem apenas um
    status (talvez um enum com aguardando retirada, entregue, devolvida talvez outros) 
    attachment (onde vai estar a foto)
    createdAt
    updatedAt

attachment da encomenda
    id
    url
    type
    createdAt
    updatedAt

destinatario
    id
    nome 
    email (enviar notificações para esse email)
    endereço
    createdAt
    updatedAt

    logentry
     id           
  packageItemId 
  previousState
  newState      
  changedBy   
  changedAt 



