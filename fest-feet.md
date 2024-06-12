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
    role (admin user)
    status (ativo ou inativo (folga, ferias, etc))
    telefone (contato rapido, em uma aplicação real provavelmente seria necessario)

admin
    id
    nome
    email
    cpf
    senha
    role (sempre admin)
    status

encomenda
    id (vai ser usado no rastreamento)
    titulo 
    endereço (o endereço vai ser o mesmo do destinatario linkado a essa encomenda)
    destinatarioID (linkar a encomenda a um destinatario por id) cada encomenda tem apenas um
    entregadorID (linkar a encomenda à um entregador por id) cada encomenda tem apenas um
    status (talvez um enum com aguardando retirada, entregue, devolvida talvez outros) alteração no status deve gerar notificação
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
    endereço esse endereço vai ser usado para todas as encomendas linkadas a esse destinatario


funcionalidades à fazer

() na infra talvez fazer cache para a localidade com uma atualização de alguns minutos ou sempre que o usuario der refresh
() fazer teste do fake cpf
() é importante criar um initialAdmin por script para que ele possa criar o primeiro real admin e apos isso o primeiro admin real possa invalidar o initialAdmin o id do initial admin deve ser 01 de forma a facilitar o impedimento que ele seja reativado.



Observações:
- na minha visão não é necessario nem util possibilitar delete para as entidades, porque sendo um negocio que permite rastreamento acho interessante manter as informações sobre as entidades permanecidas de forma que mesmo apos encerrar um ciclo de vida de alguma entidade ela ainda possa ser rastreada para casos de auditoria ou outros. os status das entidades vão contornar o delete com o uso de status terminais, como lost, delivered, e dismissed para o courier.
- como todas operaçoes de crud so podem ser feitas por um admin nos temos o problema de como criar o primeiro admin se a verificaçao de isAdmin é uma validaçao necessaria para a criaçao do admin? como sulução eu pensei na criação por script de um admin inicial que com um login padrão e esse admin seria usado para criar o primeiro admin real e logo apos ser desativado (marcado como inativo, deletado ou permanentemente inativo, a ver o que fazer). a partir desse momento o admin criado pode criar novos admins(e outros usuarios) passando todas as informações, esses novos usuarios criados são aconselhados a modificar sua senha apos o primeiro login.
- eu sei que nos testes dos useCase a parte de autorização do inactive e do not admin é basicamente a mesma porque ela volta o mesmo erro, sem nenhuma diferença no resultado. porem eu optei por criar dois metodos diferentes no mock para esse mesmo erro, e fazer dois testes diferentes usando cada um dos metodos, apenas para refletir melhor os possiveis erros reais e a implementação do authorizationService real.
- acho que não tem muita necessidade de fazer um useCase para setar a localidade de um courier, uma vez que nos vamos apenas usar a localidade dele para ver quais são as entregas proximas dele. então acho que no useCase de listar entregas proximas de um courier a gente pode setar a localidade do courier e comparar com as de suas entregas
- pelas regras me parece que o attachment vai ser usado apenas para uma foto no momento que o packageItem seja marcado como entregue. isso não me parece que deveria ser passivel de edição com isso não me parece que os attachments dos packageItems podem se modificar excluindo assim a necessidade de uma watchedList. alem disso o attachment so entra em jogo no momento que o pacote é marcado como entregue e não na criação do pacote. então ele so aparece no ultimo momento do ciclo de vida do pacote, logo antes dele se fechar. porem para treinar os conceitos que envolvem a alteração de anexos eu criei a ideia de que o recipient vai poder adicionar anexos com a foto do package quando ele abrir a encomenda e tambem ate modificar e adicionar mais fotos depois. com isso temos um motivo para alterar a lista de attachments. eu tambem adicionei uma propriedade que impede que a foto do courier ou seja a primeira foto seja removida.

INFRA fazer um endpoint para lidar com o link de requisição de mudança de senha e pedir a senha para enviar para o useCase




somente o admin pode alterar a senha do usuario. eu fiz um fluxo mais complexo onde o proprio usuario alterava a senha dele. talvez adicionar a isso algo que no password change seja so o admin porem no request envie notificação para o admin e ai ele pode mudar a senha. não sei. ou deixar como exta de forma que esta mais complexo.

## ver a questéao que o endereço no packageitem esta solto e não é uma referencia ao endereço do recipient tanto no domain quanto no infra. na verdade revisar toda a criação de package item para ver essa questão do recipient tanto no endereço quanto no iD talvez quando se cria o package se cria um novo recipient e por isso se coloca o endereço. talvez ver que no fluxo para criar uma encomenda em algum moento antes o usuario iria registrar o recipient e assim ter um id do recipient. nesse caso ele poderia ao registrar a encomenta fazer uma pequisa no banco de recipients para o mesmo id assim pegar o endereço desse id e usar ele. talvez apenas no controller fazer uma condicional de que se não for passado um endereço a gente pega o mesmo endereço do recipient. porem nesse caso acho que não seria bom fazer a conexão entre as tabelas e sim deixar os dados duplicados porque caso o endereço seja diferente não vai funcionar a relação o que poderia levar a erro.


