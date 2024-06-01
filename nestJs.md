vamos começar a usar o nestJs e aprender sovbre ele e so la na frente que iremos acoplar ele com o que criamos no forum.

# nest Js
é uma feramente framework. ele é um framework opinado, ou seja ele traz muita opinição sbre como voce vai construir as coisas dentero dele. ele te da muitas receitas de como fazera as coisas
então quando usar o nest e quando usar o fastify? quando precisamos dessa opinião ao nosso lado a gente usa o nest. por exemplo quando o time esta sem lideraça perdemos menos tempo com decisao e vamos direto a mao na massa
ele não tem estrutura de pastas preestabelecida e ele acaba deixando liberdade para a gente tomar decisoes na parte de arquitetura, enauqnto ele traz preferencias na parte de ferramentas
a gente pode instalar ele globalmente ou se não quiser a gente da um gitclone no repotisotio que tem na documentaçéao e instala
https://docs.nestjs.com/
instalando global a gente vai ter no terminal a cli do nest instazlada q vqi permitir a gente fazer comandos do nest então nos vamos instalar isso
npm i -g @nestjs/cli
o nest pode com esses comands criar arqivos em uma estrutura pronta pra vc como por exemplo um controler. mas a gente vai fazer eles a mao 
vamos criar o nosso projeto em uma pasta nova. sparado do forum
 testevite nest new nest-clean
⚡  We will scaffold your app in a few seconds..

? Which package manager would you ❤️  to use? npm
CREATE nest-clean/.eslintrc.js (663 bytes)
CREATE nest-clean/.prettierrc (51 bytes)
CREATE nest-clean/README.md (3340 bytes)
CREATE nest-clean/nest-cli.json (171 bytes)
CREATE nest-clean/package.json (1950 bytes)
CREATE nest-clean/tsconfig.build.json (97 bytes)
CREATE nest-clean/tsconfig.json (546 bytes)
CREATE nest-clean/src/app.controller.ts (274 bytes)
CREATE nest-clean/src/app.module.ts (249 bytes)
CREATE nest-clean/src/app.service.ts (142 bytes)
CREATE nest-clean/src/main.ts (208 bytes)
CREATE nest-clean/src/app.controller.spec.ts (617 bytes)
CREATE nest-clean/test/jest-e2e.json (183 bytes)
CREATE nest-clean/test/app.e2e-spec.ts (630 bytes)

✔ Installation in progress... ☕

🚀  Successfully created project nest-clean
👉  Get started with the following commands:

$ cd nest-clean
$ npm run start


                          Thanks for installing Nest 🙏
                 Please consider donating to our open collective
                        to help us maintain this package.


               🍷  Donate: https://opencollective.com/nest

➜  testevite cd nest-clean
➜  nest-clean git:(master) ✗
assim tem como fazer a instalação eu escolhi npm porque o pnpm deu um erro, mas a rockeseat fez com o pnpm que é mais rapido.
agora a gente entra na pasta que a gente criou e vai dar uma limpada nela pq ele ja cria uma estrtutura.
apagamos o readme
apagamos o prettier e o eslint
apagamos tudo que esta na pasta teste
na pasta src a gente retira o arquivo.spec.ts pa ele é um teste
agora vamos no package json e removemos tosos os scripts de testes pa eles séao jtest e a gente vai usar o vitest
vamos tambem remover todas as configuraçéoes do jest
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
  nas dev dependencies a gente tira os
   "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
     "supertest": "^6.3.3",
     "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "jest": "^29.5.0",
    "prettier": "^3.0.0",
     "@types/supertest": "^6.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.42.0",
      "@types/jest": "^29.5.2",

o packagejson fica assim:
{
  "name": "nest-clean",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix"   
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/node": "^20.3.1",
    "source-map-support": "^0.5.21",  
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
  }

}

apos isso tudo a gente volta pro terminal e roda um npm i para ele instalar agora as dependencias como estao 
e depois de instalar a gente roda o npm run start:dev
para garantir que esteja funcionando e ele deve mostrar esse log;
[1:42:45 PM] Starting compilation in watch mode...


[1:47:55 PM] Found 0 errors. Watching for file changes.

[Nest] 1246  - 01/13/2024, 1:50:01 PM     LOG [NestFactory] Starting Nest application...
[Nest] 1246  - 01/13/2024, 1:50:01 PM    WARN [ModuleTokenFactory] The module "InternalCoreModule" is taking 11.28ms to serialize, this may be caused by larger objects statically assigned to the module. More details: https://github.com/nestjs/nest/issues/12738 +25ms
[Nest] 1246  - 01/13/2024, 1:50:01 PM     LOG [InstanceLoader] AppModule dependencies initialized +47ms
[Nest] 1246  - 01/13/2024, 1:50:03 PM     LOG [RoutesResolver] AppController {/}: +1570ms
[Nest] 1246  - 01/13/2024, 1:50:03 PM     LOG [RouterExplorer] Mapped {/, GET} route +9ms
[Nest] 1246  - 01/13/2024, 1:50:03 PM     LOG [NestApplication] Nest application successfully started +8ms

agora o nest ja vemcom um helloword então se a gente abrir um outro terminal e rodar uma chamada htttp para a portq que ele esta rodando que é por padréao a 3000 como a gente pode ver no main então se a gente abrir o navvegador e der um http://localhost:3000 ele vai mostrar hellowordl
para evitar conflito de portas bvamos colocar para a porta 3333 
# estrutura basica do nest
o nest vem no src com tres arquivos alem do main: o service o module e o controler
controller: é uma porta de entrada para nossa aplicação. geralmente uma porta de entrada via HTTP. entéao uando um cliente faz uma requisição http o primeiro arquivo que ouve essa requisição é um controller. todo controller no nest é identificado com um decoratror @controller()
isso é uma caracteristica dierente do nest o uso de decorators. o nest faz muito uso de decorators
os decorators são uma função que adiciona comportamento em algo pode ser uma classe um metodo, propriedade, qualquer coisa.
uma representaão basica dele é ver ele como uma função que recebe algo como paramtro e devolve esse algo modificado
então no caso do controler quando a gente clocar o @controller() e cima da classe que esta la a gente esta passando essa classe como parametro
então usando o decorator controler a gente esta dizendo que a classde abaixo vai conter metodos que são rotas
e as rotas são identificadas com outros decorators; no caso nos temos o @get()
como a gente não passou nenhum parametro no get ele entende que é a rota root no nosso caso a que a gente definiu no main 3333
tanto os metodos(decorator get) quando o decorator controller podem receber parametros. nos metodo a gente define a rota para aquele metodo por exemplo um /hello e no controller a gente define como parametro para todos os metodos que estão dentro dele como por exeplo ele vem no padrão / mas se a gente botar /api so chamar o 3333 néao funciona mais tem que chamar 3333/api e se quiser chamar o metodo que esta como hello la dentro vai ter que ser  3333/api/hello
e nos temos todos os decoators para todos os metodos disponiveis no nest/comum é so importar.
no caso o nosso controler ele ja esta sendo injetado com uma dependencia:
 constructor(private readonly appService: AppService) {} 
 o que mostra que no nest desde o inicio a gente ja esta usando o conceito de inversão de dependencia
  ou seja o app controler não esta instanciando o appservice, el não faz new appService. ele esta recebendo o appservice como uma propriedade na verdade uma parametro no construtor que vira uma propriedade por causa do privetq que a gente coloca na frente ai depois a dente pode usar o app service nas funçéoes do controler.

  app.module = a raiz do nosso projeto porque é ele que é usqdo no nest factory create. o modulo é um arquivo que junta tudo, todos os controlers, conexçoes com bando de dados e etc.
  todo modulo é uma classe vazia (ele pode ter coisas dentro dele mas geralmente não vai ter)
  o module é uma classe que tem o decorator module. e  ele recebe primariamente duas coisas o controlers e o providers (a gente pode tirar o import por enquanto) o controllers mostra quais controllers a gente recebe nesse modulo e como o controller esta recebendo uma dependencia a gente declara em providers todas as dependencias que o controllers possam receber
  ai o nest vai perceber que o controller esta precisando de uma dependencia desse tipo e vai procurar dentro do modulo se tem alguma dependencia que bate com esse nome; ai ele olha no import, ve que tem e passa ela para la ele faz a injeção de dependencia totalmente automatizada. porem para a injeção acontecer o app.service precisa obrigatoriamente estar com o decorator injetable
  ou seja a gente diz que o app service é injetavel que ele tem coisas que possam servir a outras classes e por isso podemos injetar ela.
  no fim todo que não é controller provavelmente é um provider. por exemplo um repositorio do banco de dados, é um provider, caso de uso, etc. tudo que não recebe requisição http é provider, tudo que a gente vai precisar injetar em outras classes é provider.
  a gente tem um outro conceito que é o import export mas vamos ir mas a fundo nele depois. mas ele basicamente serve para separar as coisas, se a gente ta com a aplicação muito grande e queremos separar por partes fazendo um efeito cascata a gente usa isso.
  # eslint  prittier
  camos configurar o eslint e o prettier no projeto
  vamos instalar com a configuração da rocketseat
  npm i eslint @rocketseat/eslint-config -D
  e vamos na raiz do projeto criar um arquivo chamado .eslintrc.json e nele a gente coloca esse codigo:
  {
    "extends": "@rocketseat/eslint-config/node"
}
agora so de salvar essearquivo ele deve começar a apontar alguns erros
a gente pode dar o npm run lint para dar fix em tudo.
alem disso no controller fica um erro por causa do construtor vazio e em projetos typescript com injeção de dependencia pode acontecer frequante de ter construtor vazio então bamos voltar la no arquivo do extends do eslint e vamos subescrever essa regra fica assim:
{
    "extends": "@rocketseat/eslint-config/node",
    "rules": {
        "no-useless-constructor":"off"
    }
}
vamos tambem criar um arquivo .eslintignore porque nas pastas dist e nodemodules tem varios codigos compilados que podem dar erro então para não ficar pesando isso a gente vai ignorar eles

# docker compose
vamos usar banco de dados postgres e vamos para isso usar o docker
vamos criar um arquivo chamado docker-compose.yml na raiz do projeto
e a gente ai fazendo ele com cuidado com a identação
usamos a versão do docker compose 3.8
e nos servios a gente da o primeiuro com nome de postrgres mas podemos dar qualquer nome o containername a gente coloca para le não gerar aleatorio
e na porta a gente direciona a porta 5432 do postgres para a 5432 do nosso localhost
e na image a gente usa a image oficial do postgres porem para produção tamvez seja melhor usar a do bitnami que tem mais proteção
agora vamos definir variaveis ambiente começando pela postgre_user que é qual usuario que é o usuario
a postgrespassword para definir um password
o postgresdb que é o nome do banco de dados
e por ultimo um volumes que é o que perlite que a gente persista uma pasta do container em nossa maquina local ou seja a gente mantemos dados do container em nossa maquina para se um dia perdemos o container a gente possa recriar ele com base nos dados
a gente vai criar uma pasta data na raiz do projeto e vamos dizer que a pasta data/pb vai ser mapeada para dentro do caminho data/postgres la do docker para fazer isso a gente da essa linha
- ./data/pg:/data/postgres
e ai dentro das variavbeis ambiente a gente pode definir uma pgDATA para dizer em qual pasta vai ser armazenada os dados do postgres e ai a gente usa essa /data/postgres assim tudo que for salvo a vai ser sincronizado com nossa pasta local
agora com isso pronto a gente no terminal roda
docker-compose up -D
o arquivo que o rocketseat mandou fazer foi esse:
version: '3.8'

services:
  postgres:
    container_name: nest-clean-pg
    image: postgres
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: docker
      POSTGRES_DB: nest-clean
      PGDATA: /data/postgres
    volumes:
      - ./data/pg:/data/postgres

      mas ele não estava funcionando ai eu vi com o chatgpt e ele fez esse:
      version: '3.8'

services:
  postgres:
    container_name: nest-clean-pg
    image: postgres
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: docker
      POSTGRES_DB: nest-clean
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:


talvez se a gente tentar colocar ele para rodar usando o sudo antes do comando ele não funcione. ai se a gente fizer apenas o docker-compose up -d sem usar o sudo antes ele funciona e tambem passa a aparecer no docker desktop
e esse funcionou.
porem agora aquela peristencia vai ficar no proprio docker como explicado aqui:
Quando você define um volume no Docker, especialmente um volume gerenciado pelo Docker como no seu caso, os dados armazenados dentro desse volume são persistentes. Isso significa que, mesmo se você remover o container, os dados dentro do volume permanecerão intactos e disponíveis para serem usados novamente quando você criar um novo container com o mesmo volume.

No entanto, esses dados não estão armazenados em um diretório visível ou acessível diretamente em sua máquina local como estavam quando você mapeava para ./data/pg. Eles estão, em vez disso, armazenados em um local gerenciado pelo Docker, geralmente em /var/lib/docker/volumes/ no seu sistema host.

Se você deseja ter um backup físico desses dados em um local específico do seu sistema host (como você estava tentando fazer com ./data/pg), você pode seguir estas etapas:

Backup Manual: Você pode fazer backup dos dados do volume manualmente. Isso geralmente envolve copiar os dados do volume Docker para outro local em seu sistema host. Você pode encontrar o local exato dos dados do volume com docker volume inspect <nome_do_volume> e, em seguida, copiar esses dados para o local desejado.

Mapear para um Diretório Local: Se você prefere que os dados estejam sempre sincronizados em um diretório específico do seu host (como era o caso com ./data/pg), você pode voltar para a configuração anterior de mapeamento de volume, mas terá que garantir que as permissões do diretório no host sejam compatíveis com as necessidades do container.

Automatizar Backups: Para uma solução mais robusta, você pode configurar um processo de backup automático que periodicamente copia os dados do volume Docker para um local seguro.

Lembre-se, a escolha entre usar volumes gerenciados pelo Docker e mapear diretórios locais depende das suas necessidades específicas de persistência de dados e backup. Se a persistência de dados é a única preocupação (e não o backup), os volumes gerenciados pelo Docker são geralmente a melhor opção devido à facilidade de uso e à menor probabilidade de problemas de permissão.
 em outras palavras da forma que u fiz:
 esses dados fica armazenados no meu proprio hd, porem de uma forma que eu não conseguiria acessar apenas o programa docker teria como usar eles para recriar o container com todos os dados que foram persistidos ao longo da vida desse container

 vamos ter que lembrar de rodar o doker quando a gente for fazer requisção.

 mas com isso nos temos nosso banco de dados confugurado.
 
 # setup do prisma
 vamos configurar e usar o prisma nesse projeto
 vamos instalar ele como dependencia de desenvolvimento
 npm i prisma -D 
 isso instala a cli do prisma para rodar as migrations e tudo mais
 e vamos instalar tambem o client do prisla
 npm i @prisma/client
 e essa como dependencia normal e não como dependencia de desenvolvimento.
 com essas duas dependencias instaladas a gente pode rodar um npm ou npx ver qual funciona
 npx prisma init
 assim el vai criar a pasta prisma com o schema .prism dentro dele
 para ver a sintaxe certinha temo que estar com a extenção do prisma instalada, se néao nao vai ter a sintax highlight
 e ele vai criar tambem um arquivo .env
 ai a gente vai logo la no gitignore e comoca o .env dentro dele
 e vamos colocar tambem a pasta data do docker para ela não ser adicionada no github
 

como não tem muito o que configurar vamos ja começar a criar o nosso primeiro schema.

vamos la no prisma/shema.prisma
e vamos adicionar o model User
ele vai ter um id que vai ser a chave primaria e vai ser por default um uuid
ele vai ter um nome
um email que vai ser unico e vai ter uma senha
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id String @id @default(uuid())
  name String
  email String @unique
  password String
}

porem a gente vai adicionar um map para essa tabela para renomear ela como user com letra minuscula assim a gente pode seguir o padrao de todas as tabelas começarem com letra minuscula e er um _ entre as palavras para isso a model user vai ficar assim ai ela via ficar no plural e com letra minuscula
model User {
  id String @id @default(uuid())
  name String
  email String @unique
  password String

  @@map("users")
}

agora que essa tabela esta feita nos vamos criar mais uma
que é o model de question
mais na frente a gente vai trazer as outras mas por enquanto vamos ter so o usuario e a pergunta

ela vai ter tambem um id como a outra um title um slug que vai ser unico  um contente um created at que vai ser datetaime com o default para now e com um map para escrever ele em snakecase
updatedAt com tambem um DateTime mas como opcional porque quando criar a pergunta ela não vai ter datade updatedAt e a gente coloca a flag do prisma  @updatedAt que vai atualizar automaticamente quando uma pergunta for atualizada ele vai atualizar automaticamente. colocamos o map tambem peo mesmo motivo para updated_at
e fazemos o map da tabela para questions e vamos fazer um relacionamento author User e com a estenção do prisma se a gente salvar ele cria o relacionamento para a gente então fica assim antes de salvar

model Question {
  id String @id @default(uuid())
  title String
  slug String @unique
  content String
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  author User

  @@map("questions")
}

apos salvar
model Question {
  id        String   @id @default(uuid())
  title     String
  slug      String   @unique
  content   String
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  author User   @relation(fields: [userId], references: [id])
  userId String

  @@map("questions")
}
ele faz essa ateração automatica
ele criou um campo UserId dentro dele que a gente vai renomear para authorId e trocamos tambem na relação o fields para authorId e fazemos o map dele tambem para ser snakecase

model Question {
  id        String   @id @default(uuid())
  title     String
  slug      String   @unique
  content   String
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  authorId  String   @map("author_id")

  author User @relation(fields: [authorId], references: [id])

  @@map("questions")
}

e no user ele tambem criou o question
model User {
  id       String     @id @default(uuid())
  name     String
  email    String     @unique
  password String
  Question Question[]

  @@map("users")
}

e  a gente vai mudar par questions no plural e com minusucula fica tudo assim
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       String     @id @default(uuid())
  name     String
  email    String     @unique
  password String
  questions Question[]

  @@map("users")
}

model Question {
  id        String   @id @default(uuid())
  title     String
  slug      String   @unique
  content   String
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  authorId  String   @map("author_id")

  author User @relation(fields: [authorId], references: [id])

  @@map("questions")
}

agora podemos rodar as migrations mas antes temos que rodar o nosso banco de dados então vamos no docker e inicialisamos ele
depois de inicializar a gente vai no terminal e rodamos
npx prisma migrate dev
deu erro porque a gente não trocou as variaveis no .env vamos no arquivo .env e mudamos as coisas e e agente troca o johndoe pelo nome que a gente usou quando a gente fez o banco de dados e o ramdompassowrd pelo password que a gente a gente poderia tambem colocar o nome do banco nest-clean 
 fez fica assim:


DATABASE_URL="postgresql://postgres:docker@localhost:5432/nest-clean?schema=public"

agora a gente roda de novo o npx prisma migrate dev vai pedir um nome para  a migration a gente diz createusersandquestions
e agora com o npx prisma studio a gente ja pode ver nossa tabela.
funcionou

## criando serviço do prisma
vamos configurar o service do prisma para que os controlers da aplicação possam acessar a conexão com o prisma em outros frameworks a gente criaria o arquivo prisma e criaria o prismaClient. mas dentro do nest como ele ja trabalha com a parte de inversção de dependencia vai ser um pouco diferente
a gente vai criar no src uma pasta chamada prisma
e dentro dela um arquivo chamado prisma.service.ts e como tudo que não é controller é um service a gete vai fazer uma classe para esse prisma service dentro desse aqruivo dessa forma:
export class PrismaService {
    
}
e todo servico que vai precisar ser inhetado em algum outro lugar da aplicação vai precisar ter o decorator injetable
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaService {
    
}
assim a gente permite que ele seja usado em outras partes da aplicação.
agora a gene vai la no nosso appmodules e eclara ele
  providers: [AppService, PrismaService],

  importando ele do lugar que a gente criou
  agora todo o metodo que a gente colocar no nosso prismaService a gente pode pegar ela em outros controlers porque o nest vai injetar automaticamente
  então agora dentro do prismaService a gente percisa fazer a conexão com o banco de dados e tem dois jeitos para isso.
  a gente pode criar um construtor
  passando para a classe um public client: PrismaClient e importando isso de @prisma/client
  e ai no construtor a gente fae um this.client = new PrismaClient()

  e agora a gente pode ir no controller e fazer um @post("/hello") {
    store(): string
    return this.prisma.client ( e qgora a gente ja vai ter acesso ao client aqui) e podenmos dar um .user.findMany()
  }
  
  se a gente dar um post agora nessa rota vai retornar um array vazio porque não tem usuario no banco de dados mas se a gente criar um usuario com o prisma studio e dar o post nessa rota ele vai achar. então essa é uma forma de criar. MAS TEM UMA FORMA MAIS SIMPLES 
  e assim que vamos fazer.
  a gente vai na nossa classe prismaService e faz ela extender a prismaCleint
  e agora não precisamos mais do public e podemos no constructor so chamar um super que ai ele vai chamar o constructor do prismaClient fica assim 
  import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super()
  }
}

e agora a gente não precisa mais usar o client la na nossa rota a gente pode usar direto this.prisma.user.findByMany() porque como ele ja esta estendendo o prismaClient ele ja é o client em si. o controller fica assim:
import { Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('/hello')
  async store() {
    return await this.prisma.user.findMany()
  }
}

mas podemos melhorar isso. o super esta chamando o construtor do prismaClient então tudo que passamos para ele são os paramentros que podemos enviar direto para o prismaCleinte então podemos fazer um objeto e passar um log: ['query] 
assim ele vai fazer um log nas query sql mas no nosso caso a gente so vai colocar o log em warn e em erro .
import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log: ['warn', 'error'],
    })
  }
}

com isso a nossa conexão esta finalizada. mas outra coisa que é legal de fazer é que dentro dos services do nest a gente pode implementar algimas interfaces  e tem uma que se chama onoduleInit e outra que se chama OnModuleDestroy e essas interfaces a gente pode pedir para o vscode implementar ai fica assim:
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['warn', 'error'],
    })
  }

  onModuleInit() {
    throw new Error('Method not implemented.')
  }

  onModuleDestroy() {
    throw new Error('Method not implemented.')
  }
}
esses dois metodos são metodos que o nest chaa automaticamente quando o modulo que usa esse servico nesse caso o prisma service for ou instanciado no caso do init ou destruido no caso do destroy. isso acontece caso a nossa aplicação de um crash a gente quer que a conexão com o database feche então a gente vai configurar esses metodos
vamos dar dentro desses metodos um return this.conect ou return this.disconect fica assim:
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['warn', 'error'],
    })
  }

  onModuleInit() {
    return this.$connect()
  }

  onModuleDestroy() {
    return this.$disconnect()
  }
}


é importante implementar os dois porque pode dar um problema e a gente fazer o disconenct mas depois de concertar esse erro a aplicação vai subir de novo com o autorestart e ai ela vai ter que conectar

## controller de criação de conta
agora nos podemos começar a construir nossa aplicação do zero. para iniciar essa fase vamos logo apagar o nosso app controller e o nosso app service que a gente não estara usando.
e agora vamos começar a construir
vamos criar uma pasta no src chamada controllers e uma pratica legal é que para cada rota a gente tenha um arquivo de controller diferente.
teoricamente ul controller pode abrigar varias rotas, porem podem acontecer problemas de uma nova rota a gente não saber em qual controller usar, e pode se perder onde esta cada rota.
então a gente vai criar uma rota para cada coisa. 
vamos então criar uma rota para criação de conta
create-account.controller.ts
o .controller.ts é padr padrão do nest e agora ele funciona como uma extenção mas não precisa realmente usar o .controller a gente pode fazer so .ts
dentro do arquivo a gente exporta a classe createaccount-controller
ele vai usar o @controller
e a gente pode botar logo o prefixo da rota accounts assim todas as rotas ai dentro vão usar esse prefixo
ai dentro vai ter umunico metodo porque vamos ter um controlle por rota
esse metodo vai ser o handle e ela vai receber o @Post e como a gente ja define o /acounts no controler a gente não precisa definir tambem no post mas sea gente quisesse a gente podia definir a rota no @Post e não no @Cotroller fica assim:
import { Controller, Post } from '@nestjs/common'

@Controller('/accounts')
export class CreateAccountController {
  @Post()
  async handle() {}
}

agora vamos fazer o metodo handle. esse controller vai chamar o banco de dados então vamos dar um contructor antes do handle nesse constructor a gente mete um private Prisma : que vai ser do tipo PrismaService e a gente importa isso e na handle a gente faz uma cont name para ser jhon doe
uma const para email e uma para password e vamos colocar123456
agora para ciar o usuario a gente faz um await this.prisma.user.create({}) dentro do objeto a gente coloca data: {} e dentro do objeto de data a gente passa as informações
fica assim:
import { Controller, Post } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle() {
    const name = 'Jhon Doe'
    const email = 'jhon@doe.com'
    const password = '123456'

    await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
  }
}

agora vamos para o app modules e retiramos os arquivos que deletamos e detro de controllers a gente passa o createAccountController
sempre que a gente cria algo assim e com o app rodando o nosso log ai mostrar todas as rotas que estão e como elas funcionam e tudo mais. para evistar isso que no futuro vai ficar enrome a gente pode ir no arquivo main.ts
e no nestFactoryCreate a gente passa logger colo false
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false })
  await app.listen(3333)
}
bootstrap()

mas isso pode ser mais pra frente, por enquanto não vamos botar.

agora que a rota esta feita e o controller cadastrado se a gente rodar o banco de dados e chamar essa rota com o post ele vai criar e vai retornar 201 porque por ser rota post isso ja vem configurado. porem a gente pode mudar essa resposta de 201 usando outro decorator que é o httpCode(201) por exemplo que é o codigo que ja vem mas dessa forma a gente força que o codigo de sucesso dessa rota seja sempre o 201.
assim:
  @Post()
  @HttpCode(201)
  async handle() {
    const name = 'Jhon Doe'
    const email = 'jhon@doe.com'
    const password = '123456'

como a gente determinou que o email é unico se a gente chamar essa rota de novo vai dar erro nesse caso um 500 internal server error pq ele não consegue criar o usuario porque o email ja existe
e como a gente não fez nenhuma tratativa de erro ainda ele vem assim no padrão.
mas nossa criação esta em hardcode e a gente quer permitir que um usuario mande as coisas que ele quer para criar o usuario. como fazer isso. em um express por exemplo a gente pegaria o request e response das rotas e criaria isso. mas no nest não é assim. a gente vai usar decorator
uma requisição pode ter parametros, headers, body etc. muita coisa vem em uma requisição e a gente não quer pegar tudo. nesse caso a gente quer apenas o body que é onde vai vir o name email e password
então para isso dentro dos argumentos da handle a gente coloca @Body() body:any isso significa que a gente esta pegando o que vem no body da requisição e esta salvando em uma variavel chamada body que tem como tipo any
sabendo que esse @Body é importado do nest commum
se a gente der um conole.log nesse body e comentar o resto da função e rodar o post o body a gente vai ver no console.log que ele veio vazio porque a gente néao enviou nada. se a gente fizer um novo envio passando {name:iuri} no json a gente vai ver que dentro do body vai vir isso.
então para capturar isso a gente pode fazer uma desestruturação e pegar de dentro do body o name, email e password dessa forma
const {name, email, password} = body
e descomentamos a parte do codigo de criação de usuario.
import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: any) {
    const { name, email, password } = body

    await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
  }
}

com isso a gente consegue ja criar o usuario usando a requisição

agora que ja conseguimos criar o usuario a gente pode verificar antes de fazer a criçéao qe o email néao esta ducplicado para poder fazer uma tratatica de erro/ mas antes disso vamos corrigir um erro do nest que é no tsConfig.json o a gente tem que adicionar um campo para stric pq o padrão dele não vem como true a gente adiciona a linha do stric e modifica a do stricnullcheks para true fica assim:"strict": true,
    "strictNullChecks": true,
    logo depois do skipLibCheck
    com isso a tipagem do nosso typescript vai verificar mais coisas. porque por exemplo ao fazermos um findunique a gente pode não encontrar um usuario. e nesse caso vai voltar nullo e ai o typescript antes não avisaria. e agora com essa nova regra ele avisa.

    agora voltamos para o controller
const userWithSameEmail = this.prisma.user.findUnique({ where: { email } })
com essa linha a gente verifica se tem um email no banco de dados que é igual ao email que a gente recebeu.
agora a gente faz o if para se ele econtrar
pq se ele não encontrar ele vai direto para a criação de usuario
no nosso if a gente coloca um throw new porem o nest tem varios tipos de exeption se a gente colocar expeption e dar un cntrl espaço a gente tem varias. a http expection que é para coisas http generica, mas tem outras, como forbiden, conflit, badrequest etc no nosso caso a gente vai usar a conflit que ja é o codigo 409 ( a gente pode ver deixando o mouse em cima dela.) e a gentepode passar uma msg passando uma string pra ela. o controller fica assim e agora podemos rodar o docker e ele com o nest:start e testar ele com o imsonmina
testei e funconou.
# hash de senha
vamos agora fazer o hash da senha para isso
vamos instalar o bcryptJs
npm i bcryptjs
e como ele não é desenvolvido com o typescript a gente precisa tambem intstalat o types dele npm i @types/bcrptjs -D
com isso instalado a gente vai para a pagina do controller de create acount e importamos o hash de dentro do bcryptjs
e depois do condicional do user com mesmo email a gente faz uma const para hashedPassowrdf para a agente fazer o hash do password
e ai como a hash é uma função assincrona a gente tem que fazer o await, e passamos para o hash o password e a gente pode passar um salt(que éuma string que é usada para gerar o hash) u a gente pode gerar o numero de rounds da senha, isso de rounds é mais comum. quanto mais alto mais forte a senha, porem mais lento 8 é um bom numero e padrão.
então nos vamos fazer assim, passando so o round de 8 fica assim:
const hashedPassword = await hash(password, 8)
e agora para o password na criação do usuario a gente passa o hashedpassword
e agora a senha ja esta sendo salva como hash. fica assim:
import {
  ConflictException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { hash } from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: any) {
    const { name, email, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: { email },
    })

    if (userWithSameEmail) {
      throw new ConflictException('e-mail already exists.')
    }

    const hashedPassword = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
  }
}

## pipe de validaçéao de dados
vamos instalar o zod que é a biblioteca que vamos usar para validação de dados.
npm i zod
agora la no arquivo de create account a gente vai importar o z de dentro do zod e vamos criar um schemma
entéao antes de explortar a classe a gente faz o const createAccountBodySchemma = e ela via ser um z.oject e a gente fala o que ela recebe entéao ela vai receber um nome um email e uma password todos vão ser string e o email a gente adiciona que vai ser email

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

e agora o legal com o zod é que a gentez pode inferir uma tipagem então abaixo disso a gente pode criar o type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema >
ou seja a gente faz a const e a gente passa essa const como a tipagem. agora no lugar do any que era o tipo do body a gente pode usar essa tipagem
esse trecho fica assim:
import { z } from 'zod'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateAccountBodySchema) {

    porem porenquanto a gente so ta tipando e não esta validando. 
    para validar o que a gente pode fazer é que para pegar o name email e password do body a gente pode colocar esse body dentro de um parse do nosso esquema
        const { name, email, password } = createAccountBodySchema.parse(body)
        com isso ja valida porem a gente não trata os possiveis erros, por exemplo se a gente colocar algo que não é email no lugar de email. ele vai dar um internal server error
  
  tem varias formas de lidar com essa tratativa de erro. a gente poderia fazer um safeparse e um if para o caso de não ser sucesso, poderia fazer um try catch, etc. mas como vamos precisar usar isso em todas as rotas a gente pode fazer uma tratativa mais global que vai poder ser reaproveitada depos.
  então na documentação do nest a gente pode achar algo para a construção de pipes. que são interceptadores, como middleware, uma tubulação que vai reenaminhar o fluxo caso aconteça algo, um erro. eles tem uma sintaxe um pouco diferente de um midleware mas servem o mesmo proposito.
  vamos fazer pipe para validation
  a gente vai no src criar uma pasta chamada pipes e dentro dela um arquivo chamado zod-validation-pipe.ts
a base do arquivo é essa
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common'
import { ZodObject } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value)
    } catch (error) {
      throw new BadRequestException('Validation failed.')
    }
    return value
  }
}

a gente troca o zobObject por zodSchema para não precisar passar o <any> essa classe que a gente tem vai ter um construtor então a gente precisa passar para ela um schema
a gente pode tirar o metadata tambem
e ai eme tem o metodo transforme que a gente usa por causa do pipe transtofme que é o unico tipo de coisa que o pipe vai fazer que é receber o valor pelo pipe e transformar isso em outra coisa no caso vai ser um parse que caso falhe ele vai mandar uma bad request exception
e no value a gente coloca unknonw fica assim mas logo a gente vai melhorar um pouco isso:
import { BadRequestException, PipeTransform } from '@nestjs/common'
import { ZodSchema } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      this.schema.parse(value)
    } catch (error) {
      throw new BadRequestException('Validation failed.')
    }
    return value
  }
}

agora a gente vai no nosso controller e logo depois do @Post a gente vai fazer @usePipes e passar para ele o nez zodValidation piope que fizemos e passamos para ele o schema que criamos e poremos tirar o parse do body que a gente fazia antes porque quem vai faer o parse é  body:
 @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @HttpCode(201)
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body

    dessa forma se a gente mandar algo que néao valide ele ja retorna cpma  messagem
    de validation error que a gente fez
    agora amos voltar para o nosso pipe para melhorar ele. na parte do erro a gente vai fazer um if error for instanci de zod error a gente vai dar throw new BadRequest expection mas a gente pode mandar para ele um objeto entéao dentro vaos tar um error.format() assim ele vai formatar o erro de uma maneira mais facil de ler, e tambem vamos mandar message 'validationErroré e o status code 400
     transform(value: unknown) {
    try {
      this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed.',
          statusCode: 400,
          errors: error.format(),
        })
      }
      throw new BadRequestException('Validation failed.')
    }

    assim no error format a gente recebe o tipo de erro que é invalid email e a gente pode sar isso. se passar por não ser um instance of zod Error ele vai vair no validation failed normal.
    a gente pode instalar uma biblioteca para ajudar azod-validation-error
    vamos instalar npm i zod-validation-error
    e ela deixa nossos error ainda mais legiveis
    então a gente vai chamar o fromZodError dessa biblioteca e comocar no errors e o erro dentro do fromZodError assim
    errors: fromZodError(error),
    com isso a gente vai ter no log dentro de error o details que vai nos dar o codigo que vai ser invalid string a mensgame que é a invalid email  o path que é email e o validation que é o email ou seja em qual validação falhou. clarro que isso para o caso de a gente ter feito um teste que tenha falhado porque a gente não colocou um email possivel.
    agora o nosso pipe esta feito e sempre que a gente precisar de uma validação a gente vai usao @UsePipies
    a o nosso pipe fica assim:
    import { BadRequestException, PipeTransform } from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'
import { fromZodError } from 'zod-validation-error'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed.',
          statusCode: 400,
          errors: fromZodError(error),
        })
      }
      throw new BadRequestException('Validation failed.')
    }
    return value
  }
}

# est client extention
a gente vai instalar a extenção rest client essa extenção fica armazenada no projeto enão se oitra pessoa pegar ele tambem vai ter acesso
a gente vai no vscode e instala essa extenção
para colocar ela no projeto a gente cria um arquivo na raiz do projeto que a gente pode dar o nome que quiser nesse caso vai ser client.http
e nesse arquivo vamos escrever as nossas requisições
vamos no caso colocar a nossa unica que temos porenauqnto que é a de criação de usuario
a gente coloca o tipo de requisição POST  e o endereço
embaixo a gente coloca o tipo do conteudo application/json 
e abaixo disso a gente manda um objeto com o body da requisiàao
POST http://localhost:3333/accounts
Content-Type: application/json

{
    "name": "Iuri Reis",
    "email": "iuri@reis.com",
    "password": "123456"
}

agora aparece la um send request e se a gente tiver com a aplicação rodando a gente pode mandar esse sendrequest
porem da para melhorar isso porque usando o rest client a gente pode fazer algumas variaveis como o @baseUrl e a gente define ela como o localhost aue estamos usando
e agoraem cada requisição ao inves de chamar o nome inteiro a gente vai chamar so o baserl e se a gente tivr elas com ### tres hashtags
gente tem que separar elas com ### tres hashtags

e a gente tambem pode colocar nome nas requisições usando # @name fica assim:
@baseUrl = http://localhost:3333

# @name create_account
POST {{baseUrl}}/accounts
Content-Type: application/json

{
    "name": "Iuri Reis",
    "email": "iuri@reis.com",
    "password": "123456"
}

###

# @name autenticate
POST {{baseUrl}}/sessions
Content-Type: application/json

{
    "email": "iuri@reis.com",
    "password": "123456"
}


com isso a gente fez o esqueletp de nossas requisições. a sessions ainda não existe. e tambem se a gente ficar mandado a create vai dar erro porque o email ja existe. mas pelo menos o rest client jporem estava tendo um erro que eu vi que algumas pessoas na internet tambem estavam tendo se a gente deixar como localhost. por qlgum motivo temos que trocar o localhost por [::1] e dessa forma ele funciona então fica assim:
@baseUrl = http://[::1]:3333

# @name create_account
POST {{baseUrl}}/accounts
Content-Type: application/json

{
    "name": "Iuri Reis",
    "email": "iuri@rei7.com",
    "password": "123456"
}

###

# @name autenticate
POST {{baseUrl}}/sessions
Content-Type: application/json

{
    "email": "iuri@reis.com",
    "password": "123456"
}

## cofigurar env
geralmente a gente pega as env usano o process.env mas isso não permite toda e qualquer manipulação no nest a gente vai usar o zod junto com o process env para poder validar e transformar as variaveis ambientes
vamos usar um modulo do nest para poder fazer isso que é o nest config isso é a recomendação do proprio nest ent éaio valois instalar isso
npm i @nestjs/config
dentro de src a gente cria um arquivo chamado env.ts
neal vamos exportar uma const chamada envScmeha sendo um z.object e vamos declarar todas nossas variaveis ambiente nessa classe a gente começa tendo so a databaseURL
import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
})
vamos colocar tamber uma para port e ai qa gente tem que usar o vcoerce para ela transormal em numero. ela vai ser tambem opcional e ter default de 3333
agora vamos exoportar o type env que  = z.infer<envSchema>
assim ele vai pegar o type das variaveis q a gente informar
import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3333),
})

export type Env = z.infer<typeof envSchema>


agora a gente tem que ir no appmodule e importar o ConfigModule de nest:config
import { ConfigModule } from '@nestjs/config'
agora no module a gente da um imports e nele um array no qual a gente passa o configmodule
teemos tambem que passar forroot()
o forroot significa que nesse modulo a gente pode passar configuração
e ai dentro do forroot a gente vai passar o esquema de validação não vamos passar o validaionschemma porque para o nest ele néao esta usando o zod e sim o joi então para ontornar isso a gente vai usaro o validate
para o validate a gente passa o env e usamos uma função para ele validar se é true ou false então passamos uma arrow e o envSchema.parse(env) 
e depois passamos uma outra opção que é isglobal como true
assim a gente pode separar a nossa aplicação em varios modulos menores e kuntar eles todos sem problemas e sem configurar as variaveis em todos eles. com o true ele pode ser acessado em todos modulos da aplicação. fica assim:
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}


agora para usar a gente vai usar o configService que vai serusado como o prismaService com inversão de dependencia e elas sendo injetadas automaticamente.
ou seja a gente joga ele nos construcotrs das classes
no prisma não precisamos pq ele pega automaticamente mas va:os usar no main,
so que para o main é um pouco diferente
a gente tem logo depois de definir o app colocamos uma linhq aue a gente copia da propria documentação do nest que é assim
const configService = app.get(ConfigService)
importamos o configService
o app.get pega uma dependencia da nossa aplicação
a gente poderia por exemplo passar o prismaService e teriamos acesso ao prismaService nele
agora com o configService a gete pode pegar a portq qeu é fazerndo uma const para port sendo igual a configService.get('e o nome da variavel ambiente aqui no caso PORT')
 const port = configService.get('PORT')
 e agora no listen a gente passa a port
 porem se a gente passar o mouse em port a gente ve que a tipagem esta como any.
 ele não ta conseguindo fazer a inferencia porque o configService esta com um tipo unknown e boolean o unknown é o tipo das variaveis ambeientes e a gente precisa passar isso para ele a gente pode fazer de varias formas uma é dar :ConfigService<env> e importar isso e ai ja funcionaria
 a gente pode tambem no fim da linha do configserv passar um as ConfigService<env> mas nesse caso a gente esta forçando a tipagem dele o que nãoé tão bom e a outra forma seria passar no get um < e aqui a gente passa a tipagem>
 vamos usar essa mas ela funciona da mesma forma que a primeira
   const configService = app.get<ConfigService<Env>>(ConfigService)

   porem apesar de ele fazer a inferencia no get e ele ja sugerir o port e as variaveis que a gente tem la, se a gente passar o mouse no port continua como any. para fazer a inferencia la tambem a gente tem que passar o infer:true dentro de um objeto como segundo argumnto do get
   assim:
     const port = configService.get('PORT', { infer: true })
     porem ai no listen vai dar erro porque le diz que pode ser undefined. e é porque a gente diz que ele pode ser opcional no env. porem caso ele seja opcional a gente da um default então ele nunca vai ser undefined. aparece o undefind entéao porque por padrão para o nest todas as variaveis ambiente podem ser undefined
     porque alguem pode copiar isso e não passar as variaveis ambientes e tudo. entéao a gente precisa avisar para o nest que a gente fez a validação das variaveis ambientes. para isso tem no ConfigService um segundo paramentro chamado wasValidated que como padrão é falso. e se a gente passar isso para true o erro para. então tudo fica assim e não tem erro:
     import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get<ConfigService<Env, true>>(ConfigService)
  const port = configService.get('PORT', { infer: true })

  await app.listen(port)
}
bootstrap()

## configurar jwt e autentication
vamos criar uma pasta chamada auth para colocar tudo que é de autenticação dentro dela. e ai dentro dessa pasta a gente pode fazer varios arquivos como um auth.module.ts
a gente faz nela uma classe para authmodule e usa o decorator module nela
import { Module } from '@nestjs/common'

@Module({})
export class authModule {}

passando para ele um objeto vazio por enquanto
e agora dentro do app.module.ts a gente pode iportar o authmodule assim:
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { authModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    authModule,
  ],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}


o legal disso é que agora tudo que a gente definir na classe authModule vai funcionar em todo o app porqiue ele esta dentro dos imports
e o nest automaticamente coloca ele para funcionar na aplicação inteira.
agora a gente para comecar a construir o nosso auth.module vamos ter que instalar antes o nestjs passport e o nestjs jwt. para isso a gente vai dar o comando no terminal
npm i @nestjs/passport @nestjs/jwt

o passport é uma biblioteca bem famosa para autentificação ele automatica fluxos de autenteificação que são comuns em aplicação web como o jwt tradicional e tal. como tokens que exipram tokens que néao expiram e etc
com isso instalado a gente vai no decorator do module do authmodule e importamos o passport e o jwt porem o jwt a gente precisa configurar então damos um ponto nele e ja tem o register e passamos esse metodo e ai a gente pode passar varias coisas como secret algoritmo e etc; a gente quer usar as nossas env aqui porque a gente quer que a nossas chaves sejam armazenadas nas nossas envs

para isso a gente vai na nosso arquivo env e colocar um JWT_SECRET = 'define qlguma chave aqui'
e no nosso env.ts a gente vai definir ela para validaàéao por enquanto como uma string
import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3333),
  JWT_SECRET: z.string(),
})

export type Env = z.infer<typeof envSchema>


porem agora voltando no nosso auth.module se a gente colocar o secret nas configs do jwt a gente ainda não consegue acessar o configservice para pegar as variaveis ambiente
porque o config service é uma classe
então no nest para resolver isso a gente e usar nas configuraçéoes de um modulo dados de algum serviço. para isso a gente tem a registerAsync no lugar da register
JwtModule.registerAsync({

  })],
  com o registerAsync a gente tem dentro do objeto outras opções temos o inject que é para a gente passar uma lista de serviços que a gente quer que sejam injetados enquanto estéaos registrando esse modulo então a gente passa o inject: [configService]
  ai a gente pode criar uma função usando o useFactory que ja vem automatico a gente define ela como async e dentro do useFactory a gente diz que recebe config; configservice e passamos o generic detipo env e , true
  e ai de dentro dessa função a gente vai retornar as nossas configurações
  mas agora dentro dessa funçõa a gente ja tem acesso as env
  para pegar ele a gente colocar uma const secret e passa para ela 
   const secret = config.get('JWT_SECRET', { infer: true })
   a gente pega ela pelo config.get e a gente precisa passar o infer true
   ai no return da função a gente retorna o secret, mas nos podemos retornar varias outras configurações tambem se a gente quiser
   é legar entender que no jwt existem varios algoritmos como esse qu a partir de um secret faz o nosso jwt
   porem esse não é o modelo mais seguro. porque imagina que a gente criou um backend principal da aplicaçõa que é onde o usuario faz autentificação. nesse momento ele gera um jwt. imagina que em algum momento a gente tenha um segundo backend na aplicaçõa. e algumas rotas desse segundo backend a gente precise garantir que o ususario esteja logado para ter acesso a essas rotas
   para garantir esse login a gente vai precisar validar o token que foi regado no primeiro servico do primeiro backend e ai o secret para gerar esse jwt esta dentro desse primeiro serviço. para a gente validar no segundo backend a gente teria talvez ue replicar o secret em dois backends é um pouco inseguro porque o segundo serviço não quer gerar novos tokens, ele so quer validar. e ainda assim ele teria o secret nele.
   para contornar isso a gente usa o algoritmo rs256
   nesse caso ele é melhor porque nosso secret não vai ser so uma chave secret. ele vai ser uma chave privada e uma chave publica.
   a chave privada pode ser usada para criação de novos tokens. e o public apenas para validação sem permitir criar nosvos
   assim a chave publica vai poder estar presente em todos os servicços que possam validar o usuario.
   a chave publica não tem problema de vazar porque com ela não da para criar novos tokens.
   vamos fazer esse fluxo de autentificação na nossa aplicação. mas antes disso vou colocar como os arquivos estão agora.
   import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Env } from 'src/env'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      async useFactory(config: ConfigService<Env, true>) {
        const secret = config.get('JWT_SECRET', { infer: true })

        return {
          secret,
        }
      },
    }),
  ],
})
export class authModule {}

import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { authModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    authModule,
  ],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}

vamos agora então criar a chae publica e a chave privada do noso app. porem elas precisam seguir umcerto padrão e se a gente for la no site do jwt e olhar o  rs256 vai ter algumas possibilidades então a gente precisa gerar essas chaves então a gente pode pedir no google ou no chatgpt um generate private e public key on rsa256 for windows
ai o chat vai ensinar a fazer usando o openssl
ele da um comando para usarmos no terminal e geramos isso na raiz do nosso projeto
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048

colei isso e ele rodou 
vai aparecer um novo arquivo no nossa raiz chalado private_key.pey e vai ter um formato que começa com begin private key e termina com end private key
gora apartir da chave privada a gente vai gerar uma chave publica. a gente pode gerar varias chaves publicas para gerar a chave publica a gente usa o segundo comando que a 
openssl rsa -pubout -in private_key.pem -out public_key.pem

ai ele gera um arquivo public_key.pem é uma chave bem menor
e agora o que a gente vai fazeré converter o conteudo desse arquivo para base64 porque se não fica uma chave enorme com varias quebras de linha
vamos pedir pro gpt convert file content to base64
o chat ensina a fazer de varias formas uma delas usando o proprio o proprio base64 para não ter a quebra de linhas vamos colocaro -w 0 no inicio
no caso a gente colocar o camoninho do file
fica
base64 -w 0 private_key.pem > private_key_base64.txt

vamos fazer igual com a publickey
base64 -w 0 public_key.pem > public_key_base64.txt

agora vamos copiar essas chaves geradas e vamos colar no nosso env.
sob o nome correto de public e private key
JWT_PRIVATE_KEY
JWT_PUBLIC_KEY

com isso feito ja podemos deletar os arquivos do base64. e mais tarde vamos tambem deletar os .pem
é muito importante deletar os base64 porque ele não é um processo de hashing então a partir dele da pra pegar de volta a chave.
mas agora vamos la no nosso env.ts e vamos validar as keys
import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3333),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
})

export type Env = z.infer<typeof envSchema>

agora a gente pode ir no nosso authModule e ter pegar a public e private
porem no nosso return como ela esta em base64 a gente não pode simplismente passar essa string a gente tem que fazer um processo de decode então vamos dar um buffer from e passar a key e depois o tipo de encode que é o base64 o buffer é uma forma do node de ir lendo arquivo. a gente podia dar uma representação em texto se a gente colocasse um .toString no fim mas como as keys aceitam buffer não vamos precisar disso 
 publicKey: Buffer.from(publicKey, 'base64'),
 e precidamos tambem passar o singoptions com o algoritmo rs256 para ele saber em qual tiopo estamos escrevendo essas keys   return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
    
      com isso a gente ja esta pronto para fazer a nossa autentificação.
      para isso então ainda nesse mesmo arquivo
nos vamos para logo abaixo do inject
e vamos passar a opção global como true
isso é para quea gente que esta usado a jwtmodule dentro do authmodule mas a gente quer usar a geração de token por dentro de um controller a gente precisa que seja global. então vamos colocar esse true e o authmodule fica assim:
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Env } from 'src/env'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      async useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
        const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),
  ],
})
export class authModule {}

agora vamos criar um arquiv de autentication-controller.ts
dentro da pasta de controlers
vamos copiar o createaccountcontroler e colar nesse novo autanticatin-conttoller
e apagamos varias coisas e comentamos outras, apenas para a gente testar se estamos conseguindo gerar um token
fica assim:
import { Controller, Post } from '@nestjs/common'

import { PrismaService } from 'src/prisma/prisma.service'

// const createAccountBodySchema = z.object({
//  name: z.string(),
//   email: z.string().email(),
//   password: z.string(),
// })

//  type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/sessions')
export class AutenticateController {
  constructor(private prisma: PrismaService) {}

  @Post()
  //  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  // @HttpCode(201)
  async handle() {}
}

e agora vamos alterar um pouco isso. no constructor ao invez do prisma vamos pegar o jwt: JWTService que vem do nestJWT
agora dentro do handle a gente faz o const token = this.jwt.sign({e qaui a gente passa um payload como um sub:user-id}) esse userId por enauqntro é ficticio.
e repois a gente da um return token
import { Controller, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from 'src/prisma/prisma.service'

// const createAccountBodySchema = z.object({
//  name: z.string(),
//   email: z.string().email(),
//   password: z.string(),
// })

//  type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/sessions')
export class AutenticateController {
  constructor(private jwt: JwtService) {}

  @Post()
  //  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  // @HttpCode(201)
  async handle() {
    const token = this.jwt.sign({
      sub: 'user-id',
    })
    return token
  }
}

vamos agora no appmodule e passar o nosso controler
 controllers: [CreateAccountController, AutenticateController],
 e não podemos esquecer de importar ele.
 agora com isso feito a gene pode rodar o database e o app e a gente vai no client.http e manda a requisição para o sessions e ele devolve para a gente um token. ou seja o token esta sendo gerado.
 a gente pode pegar esse token e jogar la no site do jwt para descriptar ele e ver se bate a nossa sub.

 # controller de autenticação
vamos tirar as partes comentadas no nosso conreller de autentication e importar o zod
 e a gente muda o nome para autenticatebodyschema 
 a gente importa o zod validation pipe e tudo mais o httpcode a gente pode tirar porque ele ja vai lançar o basico que é o 201.
 agora a função handle vai receber o @body que é do tipo AutenticateBodySchema
   async handle(@Body() body: AutenticateBodySchema) {
    agora dentro do handle a gente pega de dentro do body o email e a senha e fazemos o processo de validação
mas precisamos do prisma então no constructor em qualquer ordem a gente tem que jogar ele com um private prisma : PrismaService
constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  agora a gente faz a const user ser igual a await this.prisma.user.findUnique e ai a gente procura onde o email é igual o email para saber se o usuario existe
   const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

agore ra a gente faz a condicional para caso a gente não ache a gente restornar o erro de usuario não encontrado com uma mensagem essa exception ja vai com o codigo 401 automatico.
  if (!user) {
      throw new UnauthorizedException('user credentials do not match')
    }

agora se o usuario existir a gente tem que verificar se a senha dele bate então vamos fazer a const isPasswordValid para isso a gente usa o await com o metodo compare que vem de dentro do bctypt e a gente passa a senha do usuario e em segundo argumento a senha que esta salva no banco de dados
const isPasswordValid = await compare(password, user.password)
podemos fazer um novo erro para se a senha não for valida usando o mesmo unautorized epection
  if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match')
    }

e ai depois disso tudo a gente faz o token que ja estava sendo feito, vamos so renomare ele para acess token e no sub a gente coloca o id do usuario e no return a gente devolve dentro de um objeto e apenas para ficar padr éao para o fronend a gente retorna ele com underline 
  const acessToken = this.jwt.sign({
      sub: user.id,
    })
    return {
      acess_token: acessToken,
    }

    agora se a gente testar isso com um usuario que tenha  senha em hash ele ja consegue validar temos tambem que tirar o name do validationSchema
    a pagina fica assim:
    import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { compare } from 'bcryptjs'

const autenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AutenticateBodySchema = z.infer<typeof autenticateBodySchema>

@Controller('/sessions')
export class AutenticateController {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(autenticateBodySchema))
  async handle(@Body() body: AutenticateBodySchema) {
    const { email, password } = body

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new UnauthorizedException('User credentials do not match')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match')
    }

    const acessToken = this.jwt.sign({
      sub: user.id,
    })
    return {
      acess_token: acessToken,
    }
  }
}


 # protegendo rotas com guard
 vamos criar rotas que so vao poder ser acessadas se o usuario estiver autenticado
vamos criar um novo controller create-question-controller.ts
a gente copia o autenticate e joga no create question
e a gente tira tudo que tem nela para ela ficar o mais vazio possivel. fica assim:
import { Controller, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Controller('/questions')
export class CreateQuestionController {
  constructor(private jwt: JwtService) {}

  @Post()
  async handle() {}
}

ja mudando o endereço para questions e o nome da clsse

agora vamos la no nosso clien.http e fazemos uma solicitação para isso por enquanto sem o usuario assim:
# @name create-question
POST {{baseUrl}}/questions
Content-Type: application/json

vamos no app module e cadastramos o controller
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    authModule,
  ],
  controllers: [
    CreateAccountController,
    AutenticateController,
    CreateQuestionController,
  ],
  providers: [PrismaService],
})
export class AppModule {}

porem a gente quer que essa rota so seja acessivel se o user estiver autenticado ou seja se ele enviar um token.
então a gente precisa em primeiro lugar configurar a strategy para isso a gente cria um novo arquivo dentro da pasta auth chamado jtw.strategy.ts
porque o passport que iremos usar possi varias estategias que séao formas de autenticar o usuario. uma delas é a jwt. então nesse arquivo a gente vai criar a estrategia jwt de autenticação
a gente vai instalar o passport-jwt e sua tipagem
npm i passport-jwt
npm i @types/passport-jwt -D

e ai no arquivo jwt.strategy a gente vai exportar a classe JwtStrategy que vaio extender PassportStrategy (que vamos importar) e passando para ele o strategy que tambem vamos importar
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'

export class JwtStrategy extends PassportStrategy(Strategy) {}

agora dentro da classe a gente vai passar o constructor e a gente vai precisar usar env então a gente vai passar para o constructor o config sendo configService<Env>, true e pegamos a publickey usando o config get
   constructor(config: ConfigService<Env, true>){
        const publicKey = config.get('JWT_PUBLIC_KEY', {infer: true})
    }

    a gente usa a public pa para validar a gente consegue apenas com a public a private é apenas para gerar novos tokens
    então não precisamos da private

apos isso a gente chama o super que vai chamar o constructor da classe passportStrategy e a gente vai passar para ele alguns parametros
o primeiro vai ser o jwtFromRequest e ele vai receber segundo a propria documentação do nest a definição de ExtractJWT que vamos importar e dele a gente da um . e pegafromAuthheaderandbarertoken
per({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }
    a gente poderia pegar o token de varios lugares, como do body ou outros; mas nesse caso a gente pega do header que éo mais comum
    a segunda config q iremos passar é a secretOrKey que vai ser a publicKey porem como ela esta em base64 a gente faz o processo do buffer
       secretOrKey: Buffer.from(publicKey, 'base64'),

       e por ultimo vamos passar o algoritm
       e para ele a gente tem que passar um array com dentro o rs256
       o total fica assim:
       import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Env } from 'src/env'

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['rs256'],
    })
  }
}

agora que o constructor esta configurado a gente vai fora dele criar um metodo chamado validate esse metodo vai ser opcional e o foco dele é validar que o token enviado seja realmente feito pela nossa chave
e que ele possua as informações dentro do payload necessarias para que a nossa aplicação funcione
entéao vamos fazer antes disso um const tokenSchema = para validar as informações por enquanto nos so temos um sub entéao é isso que vai ter la e ela é uma string que é um uuide tabem fazermo o nosso type para inferir o type desse esauema de validação
então antes da classe a gente coloca isso:
const tokenSchema = z.object({
  sub: z.string().uuid(),
})
const tokenSchema = z.object({
  sub: z.string().uuid(),
})

type TokenSchema = z.infer<typeof tokenSchema>

e agora a gente faz o nosso async validate a gente passa o payload como tokenSchema e dentro da função a gente retorna o tokenSchema.parse passando o payload. ai se o payload não tiver o id do usuario ele vai dar erro
como essa classe vai ser um provider a gente precisa colocar nela o decorator @injectable se não ela não vai ser injetada
o strategy total fica assm:
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Env } from 'src/env'
import { z } from 'zod'

const tokenSchema = z.object({
  sub: z.string().uuid(),
})

type TokenSchema = z.infer<typeof tokenSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    })
  }

  async validate(payload: TokenSchema) {
    return tokenSchema.parse(payload)
  }
}


agora para a gente garantir que uma rota seja protegia a gente vai no controller que queremos proteger o createQuestion e vamos logo antes da classe passar o decorator @UseGuardse e passamos o guard que é AuthGuard que importamos do nest passport e passamos coo parametro a strategy que é a jwt

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {
  esse jwt que a gente passa quer dizer que nos queremos usar a estrategia passportJWT que a gente usa no nosso arquivo de strategy.
  porem faltou cadastrar o strategy que a gente criou no module, então por enquanto o nest nem sabe que ele existe.
  entéao a gentevai la no autModule e depois de todos os imports a gente passa providers e para ele um array com o JwtStrategy
  import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Env } from 'src/env'
import { JwtStrategy } from './jtw.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      async useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
        const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),
  ],
  providers: [JwtStrategy],
})
export class authModule {}

com tudo isso em mãos a gente pode voltar para o createQuestionController que por enquanto esta assim, a gente adicionou um ok so para a função handle não ficar dando erro:
import { Controller, Post, UseGuards } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {
  constructor(private jwt: JwtService) {}

  @Post()
  async handle() {
    return "ok"
  }
}

agora a gente vai la no clientHTTP e se a gente passar autorization bearer e o numero do token ele ja funciona.
porem a gente não vai ficar a cada vez copiando o numero do token para cada rota (por enquanto so tem uma) então uma coisa que angete pode fazer é la em cima na pagina @AuthToken = e aqui copiar  numero do token e ai na passagem a gente vai passar o authToken para todas as authorizations e ai vai funcionar tambem./
ficaria assim mas sem o numero do token copiado porque eu ainda não fiz a requisição
@baseUrl = http://[::1]:3333
@AuthToken = token

# @name create_account
POST {{baseUrl}}/accounts
Content-Type: application/json

{
    "name": "Iuri Reis",
    "email": "iuri@rei7.com",
    "password": "123456"
}

###

# @name autenticate
POST {{baseUrl}}/sessions
Content-Type: application/json

{
    "email": "iuri@reis.com",
    "password": "123456"
}

###

# @name create-question
POST {{baseUrl}}/questions
Content-Type: application/json
Authorization: Bearer {{AuthToken}}

so que mais legal do que isso seria ao invez de passar o numero do token e ter que passar um novo sempre que ele exprizasse a gente pode usar o formato de variavel ou seja {{}} quando a gente vai definir o token e ai dentro a gente pode pegar varias coisas cada requisição que a gente fez tem um nome então a gente pode ir e pegar algo de dentro da nossa requisição de autenticate, então a gente pega da resposta dessa requisição. o body e do body o acess_token
@AuthToken = {{{{autenticate.response.acess_token}}}}
e ele fica dizendo que a autenticate ainda não foi enviada.entéao quando a gente fizer uma requisição de autenticate ele ja salva automaticamente o access_token nessa vatiavel authToken e usa e assim podemos deixar pre prenchido em todos os lugares que a gente precisa. lembrar de sempre separar as requisições com ###
fica assim:
@baseUrl = http://[::1]:3333
@AuthToken = {{{{autenticate.response.acess_token}}}}

# @name create_account
POST {{baseUrl}}/accounts
Content-Type: application/json

{
    "name": "Iuri Reis",
    "email": "iuri@rei7.com",
    "password": "123456"
}

###

# @name autenticate
POST {{baseUrl}}/sessions
Content-Type: application/json

{
    "email": "iuri@reis.com",
    "password": "123456"
}

###

# @name create-question
POST {{baseUrl}}/questions
Content-Type: application/json
Authorization: Bearer {{AuthToken}}

e ai ja funciona porem podemos ainda melhorar talvez todo o esquema criando um novo arquvo no auth chamado jwt-auth.guard.ts e nele criar uma classe JwtAuthGuard que vai extender o authguard passando o parametro Jwt e ela nem precisa ter nenhuma implementação
e agora na nossa createquestion a gente pode passar para o decoratos simplismente essa classe no lugar de como a gente fazia antes. é meio inutil mas é legal para ver como funciona o uso de classes
a jwtauthguard fica assim:
import { AuthGuard } from '@nestjs/passport'

export class JwtAuthGuard extends AuthGuard('jwt') {}


a create question fica assim:
import { Controller, Post, UseGuards } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private jwt: JwtService) {}

  @Post()
  async handle() {
    return 'ok'
  }
}


eu tive alguns erros nesses para validar. mas eu ja corrigi (acho que em todos os colados aqui) os erros eram que no arquivo de http client eu não estava separando as requisições com ### e tambem quando eu definia o algorithm no strategy eu tinha colocado o rs em minusculo. tem que colocar em maisuculo. tambem no authModule a gente estava exportando semo Auth em maisuclo eu acho que isso não estava dando erro mas mesmo assim eu mudei isso no arquivo e tambem no modules que recebe ele.
## decorator de autenticidade
agora que a gente ja valida que o usuario foi autenticado a gente vai precisar agora é buscar os dados do usuario atravez do token no controller no caso no createquestion
uma das coisas que a gente pode fazer é na função handle passar para ela um decorator, a gente tem varios decorators que a gente pode usar para diversos motivos nas funções a gente pode passar o body, o params, entre outros no nosso caso a gente vai usar o @Request para pegar o request (podemos usar tambem o @Req ambos são iguais) o tipo que vamos usar para isso a gente pode usar o tipo Request que a gente vai pegar do express e como vamos usar o tipo Request do express que é o mesmo nome do Request do decarator a gente usa apenas Req para o decorator para não dar erro.
e ai dentro do request a gente pode pegar os dados do usuario usando o request.user como a gente fez nesse console.log.
eu coloquei o type na importação do request do express porque a rockesteat tambem colocou mas néao seiu se é mesmo necessario , pelo visto o type faz o codigo ficar mais rapido porque o typescript vai detectar que não vai precisar de todo o request e apenas de usar ele como um tipo.
import { Controller, Post, Req, UseGuards } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type { Request } from 'express'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private jwt: JwtService) {}

  @Post()
  async handle(@Req() request: Request) {
    console.log(request.user)
    return 'ok'
  }
}

se  a gente rodar o codigo agora. vai aparecer no console.log o sub que é o id do usuario. ou seja a gente ja consegue pegar o id do usuario e com isso se a gente precisar de mas coisa a gente pega ele no banco de dados.
porem para melhorar isso e não precisar importar a tipagem do express nem nada, a gente pode criar um decorator especial apenas para pegar os dados do usuario.
na pasta auth a gente vai criar um arquivo chamado current-user-decorator.ts e nele a gente faz uma const CurrentUser com letra maiuscua porque como ele é um decorator ele vai ser usado assim @CurrentUser
e essa const vai ser igual aalgo que vem do nest que é o creatParamDecorator a gente usa o param porque estamos criando um decorator para um parametro e não para uma classe
e para isso a gente vai colocar dentro dele uma função que recebe em primeiro parametro da função os parametros que nos queremos enviar para o decorator então se a gente colocar @CurrentUser('oque a gente colocar aqui como o sub para pegar o id') o que a gente passar como parametro na chamada do decorator a gente pode pegar como parametro no primeiro parametro da arrowfunciton que vai estar dentro dessa criação de decorator. como no nosso caso não vai ter nada a gente passa um _:never para dizer que nunca vai ter nada
o segundo parametro ja é um que vai acontecer sempre que é o context e ele vai ser o execute context que é o contexto de nossa requisição entéao a gente consegue pegar a classe que esse decorator foi chamado, o metodo, os argumentos e etc. fica asism
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {},
)

e agora com esse context a gente pode pegar usando o switchtoHTTP a requisição então fazermos uma const request = context.switchToHttp().getRequest() e dai a gente ja tem o user. se a gente fizer depois return request.user
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return request.user
  },
)

so que o user ainda esta como any. então podemos mehorar isso
a gente pode colocar o request.user as TokenSchema que foi o que a gente criou de type la no strategy. mas para isso a gente te que ir no arquivo de strategy e exportar esse type

export type TokenSchema = z.infer<typeof tokenSchema>

porem para ficar mais semantico vamos trocar os nomes para tokenPayloadSchema e no type apenas UserPayload a pagina de strategy fica assim:

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Env } from 'src/env'
import { z } from 'zod'

const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
})

export type UserPayload = z.infer<typeof tokenPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    })
  }

  async validate(payload: UserPayload) {
    return tokenPayloadSchema.parse(payload)
  }
}

e la no decorator que estamos criando vamos usar tambem o userPayload
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserPayload } from './jtw.strategy'

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return request.user as UserPayload
  },
)


e agora ao invez de usar @Req na nossa createQuestionController a gente pode usar o @CurrentUser e podemos pegar o user com o tipo TokenPayload de la fica assim:
  async handle(@CurrentUser() user: UserPayload) {

    agora temos alguns erros na formataçéao da função prque estamos usando request, mas agora a gente pode usar diretamente o user sem precisar do request.user
    a pagina fica assim:
    import { Controller, Post, UseGuards } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { UserPayload } from 'src/auth/jtw.strategy'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private jwt: JwtService) {}

  @Post()
  async handle(@CurrentUser() user: UserPayload) {
    console.log(user)
    return 'ok'
  }
}

e agora se a gente der a requisição vai mostrar o id do usuario e ja ta tipado se a gente der um user. ele ja da a opçéao de user.sub


e agora a gente pode usar ele o nosso decorator e podemos ter acesso ao id do usuarion dentro dos controlers.
enviei a requisiçao e funcionoiu assim o console log
{ sub: 'bbcbf8f5-da19-44bc-8e71-458977e63994' }
ta funcionando

# controller de criaçao de pergunta finalizacao
vamos copiar a parte de validaçao que a gente tinha feito no zod para a create account e vamos colar nele mudando o nome de create account schema para  create question body schema importamos o zod e para criar uma pergunta vamos mudar o esquema de validação vamos pegar apenas o titulo e o conteudo

import { z } from 'zod'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

e agora ndentro da classe a gente pega o body com o decorator e passamos o CreateQuestionBodySchema como type dentro dos parametros da post handle
 @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body() body: CreateQuestionBodySchema,
  ) {
    e ate o momento a gente passaria o UsePipes e o nosso validationPipe entre o @post e o async handle
    mas tem uma outra forma de fazer isso que é a seguinte
    dentro do @Body(aqui) a gente pode passar o new ZodValidationPipes( e qaui passar nosso scheme)
    ficaria assim:
      @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(new ZodValidationPipe(createQuestionBodySchema))
    body: CreateQuestionBodySchema,
  ) {
    para não quevrar em duas linhas a gente pode fazer uma const emcima para ser bodyValidationPipe = new ValidationPipe(createQuestionBodySchema) e a gente passaria ela para o body. fica assim a pagina
import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { UserPayload } from 'src/auth/jtw.strategy'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { z } from 'zod'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private jwt: JwtService) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
  ) {
    console.log(user)
    return 'ok'
  }
}

agora no lugar do console.log a gente vai fazer uma const para desestruturar do body o title  o content
a gente coloca o prisma no nosso cosntructor usando o prismaService 
e agora a gente pega o await this.prisma.questions.create() e passamos para o create um objeto e dentro dele um data que vai ter o title e content e o slug que é obrigatorio tambem
vamos tambem logo abaido da const que pega o title e content fazer uma const userId = user.sub
assim temos acesso a userId
e ai a gente passa no author id o user id
para o slug a gente vai pedir ao chatgpt para fazer uma função para a gente que converta uma string em um slug tirando os acentos ele da isso
function convertToSlug(text: string): string {
    // Normalize the string to remove accents and other diacritics
    const normalizedText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Convert the string into slug format: lowercase, hyphens instead of spaces, remove non-alphanumeric characters
    return normalizedText
        .toLowerCase() // Convert to lowercase
        .trim() // Remove leading and trailing spaces
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-'); // Replace multiple hyphens with a single hyphen
}


vamos copiar isso na nossa pagina tirando os comentarios e transformando em metodo ou seja tirando o funcion ai fica sendo um metodo e vamos colocar ele como privado e ai a gente pode usar esse metodo para converter o title to slug mas isso vai ser so por enquanto. mais para frente vamos dar outro jeito
o regex que ele criou não estava tão bom então apos melhorar um pouco ficou assim:
import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { UserPayload } from 'src/auth/jtw.strategy'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
  ) {
    const { title, content } = body
    const userId = user.sub
    const slug = this.convertToSlug(title)

    await this.prisma.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug,
      },
    })
  
  }

  private convertToSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
  }
}
ai ja temos a pagina toda inclusive com o uso do slug correto
porem o slug é unico ent#oa temos que tomar cuidado porque se a gente cadastrar duas perguntas com o mesmo titulo por enquanto ele vai usar o mesmo slug e vai dar erro note tamem que tiramos o return porque como é uma criação não tem muito porque ele dar um return. com isso pronto vamos no client.http para testar vamos enviar um body na reuisição de criação de pergunta. a pagina client.http fica asim:
@baseUrl = http://[::1]:3333
@AuthToken = {{autenticate.response.body.acess_token}}

# @name create_account
POST {{baseUrl}}/accounts
Content-Type: application/json

{
    "name": "Iuri Reis",
    "email": "iuri@rei7.com",
    "password": "123456"
}

###

# @name autenticate
POST {{baseUrl}}/sessions
Content-Type: application/json

{
    "email": "iuri@rei.com",
    "password": "123456"
}

###

# @name create-question
POST {{baseUrl}}/questions
Content-Type: application/json
Authorization: Bearer {{AuthToken}}

{
    "title": "Nova Pergunta",
    "content": "essa é a nova pergunta"
}

se a gente der um send request ele devlve 201 significa que criou.

# rota de listage de perguntas
vamos criar um novo arquivo na pasta de controller chamado fetch-recent-questions.controller.ts
e vamos colar nele o codigo do createquestion e vamos mudar umas coisas, vams tirar logo o codigo de transformação para o slug
mudamos o medoto para get podemos tirar o currentUser e podemos tirar toda a logica tambem. fica assim
import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle() {}
}
 e vamos la no app.module e passamos o FetchRecentQuestionsController la tambem.

agora voltamos ara o controller e a logica vai ser. vamos criar uma const para questions e el vai ser o await this.prisma.question.findMany assim ele vai pegar varios e dentro disso a gente passa o orderBy e a gente passa para o orderby o createdAt e pede para vir em ordem decrescente (la ja tem o enum de crescente e decrescente ) fica assim:
import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle() {
    const questions = await this.prisma.question.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return { questions }
  }
}

com isso salvo a gente vai la no client.http para criar uma nova requisição
e
a requisição a gente quer que a gente possa enviar a paginação usando o ?page=2 ou 1 no nosso caso a gente vai enviar 1 para néao dar erro. e claro que aqui a gente vai definir que o query vai ter nome de page
para 

# @name fetch-recent-questions
GET {{baseUrl}}/questions?page=1
Content-Type: application/json
Authorization: Bearer {{AuthToken}}

para a gente definir isso a gente volta la no nosso fetch recent questions
dentro dos parametros do handle a gente passa o decorator @Querry('aqui botamos o nome que quermos definir no caso page)  depois passamos page:nummber para saber que é numero.
  async handle(@Query('page') page: string) {
o page sempre vai vir como string a menos que a gente faça alguma validação por isso deixamos string nele.
porem o query pode receber um pipe para fazer validação então vamos criar antes de tudo uma const queryValidationPipe = ZodValidationPipe() e esse zodvalidationpipe vai receber um schema 
então vamos criar um schema vai começar como um z.string porque todo queryparametro é string, depois a gente diz que é opcional e que o default é 1 e depois a gent transfrma para numero. mas ai a gente quer quer nunca de um numero negativo e para isso a gente z um pipe para ele ja dizer que tudo que a gente passou foi validado. e ai a gente faz uma nova validação dentro do pipe apartir da trasnformação do numero então vai ser Z.number e o min 1
fica assim

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

com isso a gente ja poderia passar o page como number mas a gente pode fazer o type inferindo assim
type PageParamsTypeSchema = z.infer<typeof pageQueryParamsSchema>
e agora passamos esse type para o page

@Get()
  async handle(@Query('page', queryValidationPipe) page: PageParamsTypeSchema) {
agora fazemos uma const chamada perPage para definir quantos registros queremos mostrar por pagina e dizemos que & 1
agora vamos definir a paginação a gente vai dentro do objeto do findMany
e define take: perPage para dizer que vamos retornar 1 item 
 e damos um skip page -1 * perPage para dizer que ele vai pular do numero definido no perPage para ir para a proxima pagina.
 a pagina fica assim porem da um erro na requisição porque ele diz que falta o skip
 import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageParamsTypeSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageParamsTypeSchema) {
    const perPage = 1
    const questions = await this.prisma.question.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: { createdAt: 'desc' },
    })
    return { questions }
  }
}


o erro era por conta da nossa calidação do zod, que não é apenasuma validaçéao nesse caso. a gente faz uma transformação
e ai no nosso zodValidationParse a gente faz so a validação e não a transformação tambem. para fazer a transformação tambem a gente precisa ir no arquivo zodValidationPipe e retornar o valor ou seja esse try no arquivo do zod validation pipe

  transform(value: unknown) {
    try {
      this.schema.parse(value)
    } catch (error) {

      precisa ser return this.schema.parse(value)
ou seja o qrtuivo de fetchrecentquestion esta certo mas a gente tinha que alterar isso no zodValidation. e ai podemos tirar o return value do fim porque ele fica unreachable.
ai o arquivo de zod validation fica assim e ai deve rodar a paginaçéao
import { BadRequestException, PipeTransform } from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'
import { fromZodError } from 'zod-validation-error'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed.',
          statusCode: 400,
          errors: fromZodError(error),
        })
      }
      throw new BadRequestException('Validation failed.')
    }
  }
}

agora se a gente criar duas ou tres questoes e a gente fizer a requisição assim
# @name fetch-recent-questions
GET {{baseUrl}}/questions?page=1
Content-Type: application/json
Authorization: Bearer {{AuthToken}}ou até sem passaro page ele deve mostrar a questao mais recente
e se a gente passar page 2  ou 3 ele deve mostrar uma outra questão.
esta fiuncionando.

## configurar test usando vitest
o nest por padrão usa o jest mas a gente pode configurar para ser o vitest
por padrão o nest compila todo o codigo do typescript para o javascript pela cli do typescript mas isso é um processo bem lento
se a gente quier mudar isso a propria dcumentação do nest recomenda mudar para o swc e é isso que a gente vai fazer
vamos começar instaladno algumas ferramentas
npm i vitest unplugin-swc @swc/core @vitest/coverage-v8 -D
agora nos vamos criar um arquivo na raiz chamado vitest.config.ts
e a gente joga nele esse codigo:
import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    root: './',
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})

agora nos bamos instalar um pacote que chama 
npm i vite-tsconfig-paths -D
com isso a gente pode ir no nosso tsconfig e definir os caminhos dos testes
então abrimos o arquivo tsConfig.json e neme a gente passa o paths assim:
"paths": {
      "@/*":["./src/*"]
    }
assim ele redireciona o que é @/ para ./src/

ai agora com o tsconfigPaths a gete pode usar essa configuração agora nos arquivos do vitest então vamos la no arquiov de vitest.config e importamos o tsconfig tepaths
e a gete passa ele nos plugins assim:

import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    globals: true,
    root: './',
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})

como geralmente os testes end to end e os testes unitarios tem configurações diferentes a gente vai criar um arquivo de config para ele  então vamos na raiz do projeto e criamos um arquivo chamado vitest.config.e2e.ts
nesse aruivo a gente copaia o outro porem dentro de test a gente passa um include para esse qrquivo de configuração do vitest pegar todos com a terminação e2e-spec
import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})

por enquanto é isso depois a gente vai especificar melhor.
agora podemos ir fazer os nossos scripts
"test" : "vitest run",
    "test:watch" : "vitest",
    "test:cov": "vitest run --coverage",
    "test:e2e": "vitest run --config ./vitest.config.e2e.ts",
    "test:debug": "vitest run --inspect-brk --inspect --logHeapUsage --threads=false"
vamos de volta no tsconfig .json para passar o test e etc como global para a gente não precisar importar
e tambem mudamos o target do letra maiuscula para moinuscula para os testes funcionar
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strict": true,
    "strictNullChecks": true,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "paths": {
      "@/*":["./src/*"]
    },
    "types": ["vitest/globals"]

  }
}


    agora vamos na pasta de controlers para criar o nosso primeiro teste
    create-account-controller.e2e-spec.ts
se a gente criar um teste basico so para ver se a config esta funcionando assim no arquivo e2e
test('1+1', () => {
  expect(1 + 1).toBe(2)
})
e rodar o npm run test:e2e ele passa então a config fucnionou

# banco de dados isolado nos testes
teste end to end precisa ser o mais proximo possivel do ambiente real da aplicação então o ideal é usar o minimo de mocks possivel.
então ao testar uma rota é legal a gente bater no banco de dados.
pra isso o ideal é usarmos um banco de dados paralelo para não sujar o nosso banco de dados e não ter problema de repetição.
da para fazer de varias formas vamos fazer de uma facil e que provavelmente vai ser compativel com novas atualizações.
vamos no arquivo vitest.config.e2e.ts para configurar isso apenas para os testes e2e
dentro da chave de test a gente vai passar um setupFiles
que é um array e para esse array a vai passar './test/setup-e2e.ts'
import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    setupFiles: ['./test/setup-e2e.ts'],
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})

e vamos criar esse aruqivo na pasta de test. esse aruqivo vai ser agora chamado antes de cada arquivo de teste
para testar se esta funcionando a gente pode colocar um console.log la dentro e rodar os testes e2e

agora para confgurar esse arquivo. como ele não é parte do projeto do nest e sim apenas um arquivo do vitest ele néao vai ser capaz de pegar as nossas variaveis ambiente pelo config. e etc. então para esse caso especifico nos vamos instalar o dotenv
npm i dotenv -D

ai agora no arquivo a gente importa o dotenv/config
para poder fazer a conexção com o banco de dados e depois pegamos logo o prisma
const prisma = new PrismaClient()

e agora nos podemos usar o before e afterall que são globais então nao precisa importar.
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

beforeAll(async () => {})

afterAll(async () => {})


nos vamos agora criar uma função chamada generateUniqueDatabaseURL que vai receber um schemaId que é uma string e dentro dessa função vamos criar uma exceção para se não for encontrado no env uma databaseURL usando um if
if (!process.env.DATABASE_URL) {
  throw new Error('Please provide a DATABASE_URL environment variable')
}
isso porque nos queremos usar a variavel de conexção que o usuario ja tem mas mudarmos o schema no final porque no postgress a gente pode mudar o schema pra criar subdicição no mesmo banco de dados. depois a gente vai pegar a url do process env e agora a gente faz um searchparams nessa url e faz um set para mudar o que vem no schema por schemaId que a gente recebe na fucnção e depois damos um retorno na url fazendo ela virar string de novo com o toString()
function generateUniqueDatabaseURL(schemaId : string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

ou seja com isso a gente substitui uma parte da string da url que define o schema com o schemaId que a gnete jogar nessa função que pode ser por exemplo um uuid
agora o que a gente faz é no beforeAll a gente da um const databaseUrl = e joga nela a finção passando um ramdom que vei do node:crypto e para testar q gente da um consoleLog nela e ver se esta funcionando:
beforeAll(async () => {
  const databaseUrl = generateUniqueDatabaseURL(randomUUID())
  console.log(databaseUrl)
})
agora que sabemos que funciona podemos tirar o console.log e no lugar dele a gente sobescreve dentro do process.env a nossa DATABASE_URL 
  process.env.DATABAS_URL = databaseUrl
  como isso esta rodando antes do teste uando o teste for executar ele vai pegar essa url de coneção que a gente criou e não a tradicional e depois disso a gente tem que rodar as migrations pqvai ser um database novo então a gente usa o comando execSync()
  passando o comando das migrations mas usando o deploy e não o dev porque o deploy so vai ler as migrations sem ver se tem um schema ou algo assim:
  execSync('npm prisma migration deploy')

  agora ao rodar o teste ele cria um novo banco para isso.

  agora apos de todos os testes a gente vai deletar esse banco que a gente criou.
  então a gente vai no afterAll e da um await prisma para pegar a conexão que a gente fez quando instanciamos o prisma e damos um executeRawUnsafe pq como vamos deletar um banco que é algo perigoso ele tem essa verificação e sabe que vai ser algo não seguro.
  e a gente da como comando o DROP SCHEMA IF EXISTS "${aqui comlocamos o nome do banco}" a gente coloca o if exists apenas como verificação para ele não tentar deletar algo se ele ja não existir mais.
  e passamos o id do schema. porem como a gente não sabe qual é o id ao invez de gerar ele dentro da chamada da função a gente coloca ele fora como um schemaId= radomUUID() e ai a chente passa o schema id
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
    e a opção cascade para que ele delete tudo que depende desse schema.
    ai depois a gente da um prisma disconect
    fica assim:
    import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'

const prisma = new PrismaClient()

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}
const schemaId = randomUUID()
beforeAll(async () => {
  const databaseUrl = generateUniqueDatabaseURL(schemaId)
  process.env.DATABASE_URL = databaseUrl

  execSync('npx prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  prisma.$disconnect()
})

detalhe que a gente usa o before all ou seja a ente cria o banco de dados antes de rodar todos os testes de um atrquivo e néao um beforeeach que criaria um novo a cada teste so que isso gastaria muito mais tempo para realizar os testes. entéao a gente tem que tomar cuidado com isso de que no arquivo total de testes esta usando o mesmo banco de dados. e a gente tem que criar nossos testes pensando nisso.

## criar os testes
vamos criar o teste primeiro do create account controller vamos no arquivo e fazemos um describe para colocar o nome
vamos instalar o supertest
npm i supertest -D
e os types dele
npm i @types/supertest -D
e vamos fazer o nosso teste colocando o nome
e o test vai ser asyncrono
describe('Create account tests (e2e)', () => {
  test('[POST]/account', async () => {
    
  } )
})

porem antes do test a gente tem que fazer um beoreAll que ja é padrão e podemos achar na documentação do nest
import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

describe('Create account tests (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  test('[POST]/account', async () => {})
})

com isso o que a gente faz para conseguir testar a aplicação a gente precisa subir a aplicação mas não usando um npm run start pq ai ele rodaria na porta 3333 e ficaria tambem ruim para rodar os testes em paralelo
por isso a gente usa o createTestingModule que é uma forma de rodar ela sem rodar ela de verdade. a gente salva o app dentro dessa variavel e agora a gente pode fazer requisições usando o request do supertest e passamos para ele app.getHTTPserver
 await request(app.getHttpServer())

 agora a gente pode fazer requisições nisso ai como por exemplo no nosso caso vamos fazer uma post para accounts e enviar os dados que queremos e ai colocamos isso como sendo uma const response para poder usar ela no expect para ver se o statuscode dela é 201 a pagina fica assim:
 import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create account tests (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  test('[POST]/account', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
  })
})

agora ja temos um teste criado. e como temos um ambiente isolado de testes que no fim do arquivo vai deletar o banco de dados a gente pode rodar esse teste varias vezes que não vai ter problema porque não vai ter email duplicado.

mas para deixar o teste mais refinado e como é o end2end a gente pode fazer alguma operação para verificar se o usuario foi mesmo salvo no banco e dados. e podemos fazer isso usando o primsa. a gente pode importa o prisma pelo prismaClient e tal. porem podemos e vai ser mais simples usar a vantagem que o nosso appmodule ele usa o prismaService a gente pode pegar o prismaServide de dentro do app por dentro dos testes.
la embaixo do let a gente faz um prisma: prismaService apenas para que ele fique visivel dentro dos testes
a gente vai fazer  dentro do beforall depois do app o prisma = moduleRef.get(prismaService)
e agora a gente ja pode usar o prisma dentro do nosso teste
describe('Create account tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })


agora a gente faz depois do nosso expect do test uma const para user sendo ela prisma.users.findUniwue onde o email é o email que a gente passou. e ai a gente pode fazer um expect disso para que seja truthy 
o truhtu sgnifica que se ele n;éao achar ele retorna undefined ou nulo e não realmente false entéao o trhthy so ve se é um valor valido ou seja néão nulo ou undefined e isso ja valida suficiente para nos.
a pagina fica assim:
import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create account tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST]/account', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)

    const userOnDatabase = prisma.user.findUnique({
      where: {
        email: 'jhon@doe.com',
      },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})

com database rodando ela funciona.

e agora vamos fazer o arquivo de teste de autenticare entéao criamos o arquivo
autenticate-controller.e2e-spec.tsx e copiamos o nosso teste de create account nele

agora nele a gente vai mudar pouca coisa.
aa gente muda o describe para autenticate a gente muda o post para sessions
a gente tira o name do response pq para autenticar a gente so manda email e senha
e a gente cria um usuario no banco antes de autenticar porque ele precisa ser criado para ser autenticado então antes de mandar a const response a gente faz um await prisma.user.create({
  data: e mandamos o nome email e password so que criando u o ussario assim a gente precisa mandar a senha ja hasheada então no password a gente faz um await hash que a gente pega do bcrypt e passa para ele a senha 123456  os rounds que são 8

})

agora a gente pode apagar a parte do userOnDatabase. a gente faz a const reponse tirando o name. e o expect tamem vai ser statuscode 201 e tambem podemos fazer um segundo expect para que dentro do body tenha o accesToken então a gente faz um expect response.body seja igual a gente coloca um objeto e dentro dele tendo um acces_token que seja xpect any(string ) assim:
expect(response.body).toEqual({
        access_token: expect.any(String)
    })
  })

  a pagina completa fica assim:
  import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { string } from 'zod'

describe('Autenticate tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST]/sessions', async () => {
    await prisma.user.create({
      data: {
        name: 'Jhon Doe',
        email: 'jhon@doe.com',
        password: await hash('123456', 8),
      },
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'jhon@doe.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})

com isso ja criamos os testes de criação de conta e de autenticação.

## testes e2e perguntas
vamos agora criar os testes de perguntas
vamos criar o create-question.controller.e2e-spec.ts
vamos colar nele o teste de create account
mudamos o describe para vreate question. o post é em /questions para criar a question a gente precisa mandar o titulo e o conteudo
porem para criar a pergunta a gente precisa estar autenticado e para estar autenticado o usuario precisa existir então vamos pegar a parte de criação do usuario que tem no autenticate e colar la salvando ele em uma const user
vamos la onde a gente tem os lets e colocar uma let jwt que vai ser o jwtService
describe('Create questions tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  e fazemos o moduleRef.get(jwtService) igual fazemos no prisma
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

porque é isso que vai gerar o token para nos
então a gente vai depois da criação do usuario fazer uma const token e vamos passar para ela o jwtsing com o sub do userId
fica assim a criação de usuario e do token:
 test('[POST]/questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Jhon Doe',
        email: 'jhon@doe.com',
        password: await hash('123456', 8),
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    se a gente quiser a gente podetirar o hash da senha. mas eu prefiro deixar.
    agora que a gente tem o token. na hora que a gente for criar a pergunta a gente pode colocar um .set para ele mandar algo no header passamos uma string de Authorization para ele entender que é um header de autoriação passamos outa de bearer para ele saber que é esse tipo de autorização  e mandamos o accessToken assim a gente consegue criar a pergunta sem passar pela chamada de autentificação tradicional no banco de dados. pq a gente gera um token no proprio teste.
    a criação da pergunta fica assim:
    
    const response = await request(app.getHttpServer())
      .post('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Question',
        content: 'This is the question',
      })

agora a gente espera que a resposta disso seja 201 
e tambem vamos fazer uma verificação para ver se a pergunta esta no database./ a gente muda o nome da const e tambem de findunique para find first porque podem ter outras perguntas com o mesmo titulo.
  expect(response.statusCode).toBe(201)

    const QuestionOnDatabase = prisma.question.findFirst({
      where: {
        title: 'Question',
      },
    })

    expect(QuestionOnDatabase).toBeTruthy()
  })

  a pagina fica assim:
  import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Create questions tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST]/questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Jhon Doe',
        email: 'jhon@doe.com',
        password: await hash('123456', 8),
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .post('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Question',
        content: 'This is the question',
      })

    expect(response.statusCode).toBe(201)

    const QuestionOnDatabase = prisma.question.findFirst({
      where: {
        title: 'Question',
      },
    })

    expect(QuestionOnDatabase).toBeTruthy()
  })
})


agora vamos fazer o ultimo teste para pegar as questéoes recentes
fetch-recent-questions.controller.e2e-spec.ts
colmos o teste de create question nele
# importante
no controller de fetch questions a gente vai colocar 20 novamente para ele paginar or 20 fia assim:

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageParamsTypeSchema) {
    const perPage = 20
    const questions = await this.prisma.question.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: { createdAt: 'desc' },
    })
    return { questions }
  }
  agora de volta ao teste
mudamos o titulo. mudamos para get no titulo do teste. porem para testar se a gente tem as perguntas a gente precisa criar algumas perguntas enão antes de fazer a busca a gente vai criar alguma com await prisma.question.createMany({
  data: [] a gente passa um array e dentro dele a gente cria umas quatro questoes passando o title slug content e author sendo o user.id do user que a gente acabou de criar.
})
 await prisma.question.createMany({
      data: [
        {
          title: 'Question 01',
          content: 'This is the question',
          slug: 'question-01',
          authorId: user.id,
        },
        {
          title: 'Question 02',
          content: 'This is the question',
          slug: 'question-02',
          authorId: user.id,
        },
        {
          title: 'Question 03',
          content: 'This is the question',
          slug: 'question-03',
          authorId: user.id,
        },
        {
          title: 'Question 04',
          content: 'This is the question',
          slug: 'question-04',
          authorId: user.id,
        },
      ],
    })
    nesse caso a gente não precisa autenticar porque nos estamos criando direto no banco de dados e não fazendo a requisição e post é a requisição que pede a autorização.
  
  agora nos vamos fazer o nosso const response que vai ser a procura de varias questoes recentes. a gente da um get no /questions passamos o token de autenticação.
  const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

  a gente espera que o statusCode seja 200
    expect(response.statusCode).toBe(200)
  vamos tirar a parte de verificação do bancode dados com o findFirst porque a gente ja esta verificando no banco de dados nesse teste.
  e vamos ter um espect para ver se o corpo da resposta seja igual a um objeto constendo quesions que é um array e dentro desse array a gente faz um expect seja retornado um objectContaining (ai ele ja verifica o primeiro objeto do array) e dentro desse contain a gente coloca titulo question01 vazemos um expect para o segundo, terceiro, quarto. 
  
    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: 'Question 01' }),
        expect.objectContaining({ title: 'Question 02' }),
        expect.objectContaining({ title: 'Question 03' }),
        expect.objectContaining({ title: 'Question 04' }),
      ],
    })
  })

  a pagina completa fica assim:
  import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Fetch recent questions -tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[get]/questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Jhon Doe',
        email: 'jhon@doe.com',
        password: await hash('123456', 8),
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    await prisma.question.createMany({
      data: [
        {
          title: 'Question 01',
          content: 'This is the question',
          slug: 'question-01',
          authorId: user.id,
        },
        {
          title: 'Question 02',
          content: 'This is the question',
          slug: 'question-02',
          authorId: user.id,
        },
        {
          title: 'Question 03',
          content: 'This is the question',
          slug: 'question-03',
          authorId: user.id,
        },
        {
          title: 'Question 04',
          content: 'This is the question',
          slug: 'question-04',
          authorId: user.id,
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: 'Question 01' }),
        expect.objectContaining({ title: 'Question 02' }),
        expect.objectContaining({ title: 'Question 03' }),
        expect.objectContaining({ title: 'Question 04' }),
      ],
    })
  })
})

com iso nos finalizamos esses testes end2end.

# arquitetura de camadas
no nosso caso tudo vai nascer de uma requisição http
assim que o usuario faz uma requisição http ela vai bater nos nossos controllers
o controler vai enviar essa requisição para um useCase
o caso de uso vai enviar uma ou mais chamadas(intereções) com entidades de nossa aplicação
porem esse fluxo não é bem uma linha reta. nos nossos casos de uso é comum tambem fazermos operações no nosso banco de dados. ou seja a gete chegou com a nossa requisição no caso de uso. mas as vezes desse caso de uso a gente volta para uma camada mais externa para buscar dados do repositorio que por sua vez vai bater no nosso ainda mais externo banco de dados. o prisma esta na camada mais externa de nossa aplicação.
então depois de todo esse fluxo de busca de informações a gene tem uma volta para devolver uma resposta para o usuario.
o controller vai chamar um uttro elemento que fica em sua mesma camada que é um presenter.
o presenter é uma parte de nossa aplcaição que vai adaptar a forma que a resposta é enviada para o usuario.
e ai o presenter devolve para o usuario a resposta do controler
para deixar mais claro o presenter.
imagina que vamos listar  usuarios
a gente envia na requisição alguns dados como o get e de onde vamos pegar esse get se queremos um ou varios usuarios etc que vao passar pelo controler o controller faz iterações com as entidades e repositorios, criptografias e ets. depois detudo isso que ele fez ele vai ter um output das operações que ele realizou.
ai ele tem a resposta com a lista de usuarios. como nos vamos apresentar isso para o usuario. a gente não pode mostrar como eles estão salvos, porque ai entregaria tudo para o usuario como a senha, o id etc. então a gente vai selecionar o qe a gente mostra para o usuario e entregar para ele apenas o que precisamos entregar.
apartir de agoa a gente vai dividir cada uma dessas camadas para que seja um processo mais visivel de onde esta cada coisa.
# copiando a camada de dominio para esse projeto
no outro projeto a gente criou a camada de dominio. 
vamos abir o outro projeto. e vamos pegar a pasta core e a pasta domain e copiar ela dentro do src desse nosso projeto atual.
pegamos tambem no projeto antigo dentro da pasta teste as pastas utils factory e repository e colamos em nossa pasta teste.
ainda vamos eventualmente instalar umas dependencias como o faker js e o dayjs que a gente estava usando no outro projeto mas ainda não instalou nesse.
mas isso a gente vai fazer mais tarde.
para garantir que nada esta dando erro a gente vai rodar a build mas de uma forma noemit com o comando
npx tsc --noEmit
esse comando faz um typechekin ou seja ele ve se tem algum erro de typescript mas sem fazer a compilação.

ao rodar isso encontramos erros no dayjs e o fakerjs que ele não encontra
vamosentão instalar o faker
npm i -D @faker-js/faker
e vamos instalar tambem a dayjs como uma dependencia normal porque ela tembam vai ser usada em produção.
npm i dayjs
agora rodamos de novo o tsc
para ver se ainda tem problema
ele não deu erro. 
agora vamos rodar o lint fix olhando o script no npm run lint --fix
e vamos ver os erros que ele nõa consegue resolver sowinho.
um dos erros que esta acontecendo é não usar um objeto em branco como um type. no typescript ele não entende que isso é um retorno vazio. então no caso do delete question a gente vai trocar isso por null
e no return tambem. o nosso delete question fica assim:
import { Either, left, right } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import { UnauthorizedError } from '../../../../core/errors/errors/unauthorized'

interface DeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  null
>

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new UnauthorizedError())
    }
    await this.questionsRepository.delete(question)

    return right(null)
  }
}

é importante olar porque a gente tinha desabilitado essa linha no eslint.
vamos olhar arquivos um por um e modificar isso. basicamente em todos os delete.
tem uns warning s pq estamos usando any. a gente pode mudar para unknown ou deixar o any mesmo.
aindatemos o erro de do not use new for side effects.
isso acontece pq a gente esta usando o new para disparar o constructopara ouvir um evento e não exatambemte para pegar as propriedades dele. isso não é um erro muito grave então vamos mudar isso na regras do lint.
{
    "extends": "@rocketseat/eslint-config/node",
    "rules": {
        "no-useless-constructor":"off",
        "no-new": "off"
    }
}

com isso so sobra os erros de unused coisas que foram declaradas o que não é erro e sim warning e não é muito grave.
agora a gente roda o lint de novo para ver se esuaecemos  algo. se mostrar apenas o warn de declarado mas não usado esta ok e ai a gente passa a testar de novo com o npx tsc -noEmit para ver se não quebramos algo. e se funcionar a gente roda os testes unitarios
npm run test
e ver se a gente não quebrou algo. se tudo passar significa que tudo funcionou bem.
funciounou.

## criando a camada de infraestrutura
a camada de infraestrutura vai ficar responsavel pelas duas camadas mas externas da aplicação. os controllers repostitorios e etc.
a gentge vai em src fazer uma pasta chamada infra e vamos mover para essa pasta tudo que é expecifico dessa camada ou seja especifico do framework (nest) ou banco de dados ou tudo que é da camada mais externa coisas que a gente não pode testar unitariamente
vamos mover então para a pasta infra :
app.module
env
main
a pasta prisma
a pasta auth
a pasta controllers
e  pasta pipe

agora que esta tudo la nos vamos separar ainda um pouco melhor.
o pipe por exemplo é usado para fazer validação nos controllers então eles são coisas que andam juntas porem o prisma e os controllers ja não tem tanta relação
ou seja uma coisa é de banco de dados e outra é de http. então vamos criar uma pasta dentro de infra chamada http e tudo que for http a gente vai colocar nela.
ou seja. http tem controllers e pipes
a parte de autenticação tambem no nosso caso esta bem relacionada a http. porem a gente pode talvez usar autenticação mais na frente para outras coisas que não sejam relacionadas a http. então por isso porenquanto a gente vai deixar ela fora do http.
importante. a forma que a gente organiza as pastas na nossa aplicação não determina realmente se a gente esta usando uma clean architecture ou não. essa é so a forma que a gente se organiza melhor junto com o noso time.
agora que esta arrumado vamos verificar se tem alguma importação que quebrou.
em tdos os testes dos controllers temos que atualizar a importação do app.mpduels
no app module a gente atualiza a importaçéao do auth.module
e na pasta auth no jwt strategy e no authmodules a gente atualiza o env.

com isso a gente precisa atualizar um script no package json
o nest start hoje usa o main . e se a gente for no nest-cli.json ele esta assim:
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}

a gente pode mudar nesse arquivo para ele entender o novo endereço do main
depois de sourceRoot a gente abre um entryfile e a gente coloca ele como sendo infra/main
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "entryFile": "infra/main",
  "compilerOptions": {
    "deleteOutDir": true
  }
}


se a gente rodar o banco de dados e dar npm run start:dev agora vamos ver se ele roda corretamente.
o ideal é a gente tambem rodar nossos testes end2end para garantir que esta fucnionando.
se tudo funcionar a gente vai aproveitar para separar os nossos modulos. porque hoj esta tudo no app.module.ts
então vamos dentro da pasta http e vamos criar o http.module.ts
nele vamos exportar uma classe HttpModule
colocamos o decorator de module nele e tudo que for relacionado ao http a gente vai trazer para ele. ele fica assim antes de trazermos as coisas para dentro dele
import { Module } from '@nestjs/common'

@Module({})
export class HttpModule {}

agora vamos la no app.module.
vamos pegar por exemplo o arrayde controllers que esta la no app.module e fazemos todas as importaçõs
e agora dentro do app.module a gente importa o httpModule
porem a gente precisa no http modume tambem declarar o prisma porque se não os controllers não vao achar ele porque ele não é global então apos delarar os controllers a gente passa o provider e dentro dele a gente passa o PrismaService
e agora podemos tirar o prismaService do app.module uma vez que ele ja esta onde ele vai ser usado que é o http mdule.
asim fica o httpmodule:
import { Module } from '@nestjs/common'
import { AutenticateController } from './controllers/autentication-controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [
    CreateAccountController,
    AutenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}

e assim fica o app.MODULE:
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { HttpModule } from './http/http.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
  ],
})
export class AppModule {}

rodamos todos os nossos testes para verificar se nada quebrou

# imolementando repsitorios do primsa
pasta domain dentro de aplication a gente tem os repositorios.
esses são repositorios de interface(contratos) que falam os metodos que temos e quais parametros e respostas espearadas para esses repositorios. e a unica implementação que temos para esses repositorios até então soa os inmemory repositorio de teste que temos. mas agora que queremos fazer a app funcionar de ponta a ponta vamos precisar mplementar esses repositorios na parte do prisma;
então dentro da pasta de prisma a gente vai criar uma pasta chamada repositories e vamos implementar cada um desses repositorios.
porem antes disso vamos la em infra e vams criar uma pasta chamada database
essa parsta é para termos nossas coisas de banco de dados alinhada, porque por enquanto estamos usando primsa; mas na frente a gente pode talvez mudar isso.
vamos mover o primma para dentro de database e tudo que é de database a gente vai colocar na pasta database. vamos então criar um database.module.ts
fica assim:
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Module({
  providers: [PrismaService],
})
export class DatabaseModule {}

agora no httpModule a gente não precisa mais passar diretamente o provider PrismaService. a gente vai passar o databaseModule
a gente pode importar o databaSeModule.
porem se a gente tentar rodar a app so imprtando o databaseModule vai dar erro porque dentro do database mesmo tendo declarado o prisma service a gente esta dizendo que o prisma service precisa estar disponivvel dentro deste modulo e não necessariamente nos modulos que importam ele.
para que ele fique disponivel para quem importar esse modulo a gente tem que usar a propriedade exports então fica assim:
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}

e o http module assim:
import { Module } from '@nestjs/common'
import { AutenticateController } from './controllers/autentication-controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/prisma/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AutenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
})
export class HttpModule {}

agora vamos para dentro de prisma na pasta repositories
vamos criar os:
 prisma-questions-repository.ts
 prisma-answers-repository.ts
 prisma-question-comments-repostory.ts
 prisma-question-attachments-repository.ts
 prisma-answer-comments-repository.ts
 prisma-answer-attachments-repository.ts

e o que a gente vai fazer com eles. assi como nos inmemory a gente vai simplismente criar classes que implementam o repositorio da camada de dominio
lembrando que é importante que camadas mais externas podem depender de camadas internas. o contrario que não pode acontecer. e nesse caso a gente ta de uma camada de fora importando uma de dentro.
e agora que a gente faz a implementação a gente tem que implementar os metodos. e por enquanto vamos deixar o throw new error nos metodos
a umtima coisa que temos que lembrar é que o repositorio do prisma vai ser usado para a parte de injeção de dependencia então temos que colocar o decorato injetacble
tuso que vai ser inviado para o construtor de uma outra classe como é o caso aqui nos precisamos usar o injectable
então vamos fazer isso em todos os repositorios. cada arquivo vai ficar assim: repare o nome das classes para colocar nos arquivos certos.
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswerAttachmentRepository implements AnswerAttachmentsRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    throw new Error('Method not implemented.')
  }

  deleteManyByAnswerId(answerId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}


import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  findById(id: string): Promise<QuestionComment | null> {
    throw new Error('Method not implemented.')
  }

  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]> {
    throw new Error('Method not implemented.')
  }

  create(questionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(questionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  findById(id: string): Promise<AnswerComment | null> {
    throw new Error('Method not implemented.')
  }

  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]> {
    throw new Error('Method not implemented.')
  }

  create(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  findById(id: string): Promise<Answer | null> {
    throw new Error('Method not implemented.')
  }

  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]> {
    throw new Error('Method not implemented.')
  }

  create(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.')
  }
}


import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    throw new Error('Method not implemented.')
  }

  deleteManyByQuestionId(questionId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Questions } from '@/domain/forum/enterprise/entities/questions'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  findById(id: string): Promise<Questions | null> {
    throw new Error('Method not implemented.')
  }

  findBySlug(slug: string): Promise<Questions | null> {
    throw new Error('Method not implemented.')
  }

  findManyRecent(params: PaginationParams): Promise<Questions[]> {
    throw new Error('Method not implemented.')
  }

  create(question: Questions): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(question: Questions): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(question: Questions): Promise<void> {
    throw new Error('Method not implemented.')
  }
}


assim se não me engano foram todos
ainda esta faltando os repositorios da parte de notificação. porenquanto a gente não vai fazer.
lembrando que como todos esses repositorios vão ser injetados dentro do nosso databaseModules a gente vai passar no provider cada um desses repostoriso que criamos.
@Module({
  providers: [
    PrismaService,
    PrismaAnswerAttachmentRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionsRepository,
  ],

  porem se a gente deixar esses repositorios apenas na parte de providers eles vção estar visiveis apenas no databasmodules. para que eles funcionem em quem importar o databasemdoules a gente precisa colocar eles tambem no export da mesma forma que fizemos com o prismaService.
  o databaseModule fica assim:
  import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaAnswerAttachmentRepository } from './repositories/prisma-answer-attachments-repository'
import { PrismaAnswersRepository } from './repositories/prisma-answers-repository'
import { PrismaAnswerCommentsRepository } from './repositories/prisma-answer-comments-repository'
import { PrismaQuestionAttachmentsRepository } from './repositories/prisma-question-attachments-repository'
import { PrismaQuestionCommentsRepository } from './repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepository } from './repositories/prisma-questions-repository'

@Module({
  providers: [
    PrismaService,
    PrismaAnswerAttachmentRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionsRepository,
  ],
  exports: [
    PrismaService,
    PrismaAnswerAttachmentRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionsRepository,
  ],
})
export class DatabaseModule {}

vamos agora começar a implemenntar os metodos vamos começar com o prisma questions repository e metodo de findById
onde a gente vaio buscar uma question de dentro do banco de dados a travez de seu id e retornar ela. então a gente vai fazer uma cont pra question. aionar o prisma então vamos ter que colocar esse contructor em todos os repositorios
constructor(private prisma: PrismaService) {}
e agora a gente pode usar o prisma questions.findUnique e pegar pelo id. porem se a gente retornar essa question não vai funcionar. porque a question prometida esta no formato da question da entidade que não necessariamente é o formato do banco de dados. então uma coisa que é muito comum acontecer é a gente ter a mesma entidade representada de formas diferentes em diferentes camadas.
nesses casos é muito comum a gente fazer uso de algo quea gente chama de forma generica de mappers

## mappers
vamos dentro da pstar database/prisma criar uma nova pasta chamada mappers.
os mappers são classes responsaveis por converter uma entidade no formato de uma camada para o formato de uma outra camada.
nessa pasta vamos criar o prisma-question-mapper.ts
e ele vai ser uma classe e dentro dela vai ter um metodo static porque não vamos precisar instanciar essa classe. esse metodo vai se chamar toDomain() em outras palavras a gente vai pegar uma question do prisma e transformar ela em uma question do domain. a gente vai receber a question do prisma e chamar ela de raw e vamos tipar ela pegando o a Question do prisma/client  e renomear para PrismaQuestio,n so para a gente não confundir ela.
e agora a gente quer devolver uma question do domain então  gente promete uma Question
import { Questions } from '@/domain/forum/enterprise/entities/questions';
import { Question as PrismaQuestion } from '@prisma/client'

export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion): Questions {}
}


agora dentro desse metodo q gente so vai trocar um pelo outro então vamos fazer um return Questions.create ou seja vamos criar uma referencia para uma question ja existente. a gente pode fazer isso passando o nosso id pelas regras do nosso dominion. então no nosso segundo parametrp do create vamos logo passar o id raw.id
 return Questions.create({}, raw.id)
 porem ter um problema na nossa entity question ela fala que o id tem que ser do tipo uniqueEntityId
 e o nosso id do banco de dados é um string então q gente tem que tirar ele. fazer um newUniqueEntityId(raw.id)
   return Questions.create({}, new UniqueEntityId(raw.id))
   agora dentro do objeto nos vamos preencher cada um dos camos que a gente precisa preencher.
   no caso do bestAnswer a gente não criou ele no nosso schema da tabela questions do prisma então vamos ter que fazer depois. por enaqunto vamos colocar como undefined.
   no caso do slug ele é do tipo Slug então a gente vai ter que chamar esse Slug dar um create ou um createFrom text que são diferentes o create from text vai receber um texto e converter em um slug o create é para quando a gente quer criar um slug a parter de um slug ja existente. que é o nosso caso agora. entéao vamos dar slug.create(raw.slug)
   acho que tem um erro aqui que a gente não salvou o updatedAt como opcional no banco de dados do prisma. eu vou fazer como se ele fosse opcional e depois quando formos alterar o bestanswer vou tambem alterar isso no nosso schema do prisma/.
   então vamos la na entity questio e colocamos o camo como undefined de opcional mas dizemos que ele pode tambem ser nulo.
   export interface QuestionProps {
  authorId: UniqueEntityId
  bestAnswerId?: UniqueEntityId
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date | null
  attachment: QuestionAttachmentList
}

com isso a gente tem tres pssiveis valores para o updatedAt. ele pode ser uma data caso seja preenchido. ele pode ser undefined caso a questão esteja sendo criada e passado como não existente ainda. ou ele pode ser vazio caso a questão ja exista.
o nosso prisma question mapper fica asism:
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Questions } from '@/domain/forum/enterprise/entities/questions'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { Question as PrismaQuestion } from '@prisma/client'

export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion): Questions {
    return Questions.create(
      {
        title: raw.title,
        content: raw.content,
        authorId: new UniqueEntityId(raw.authorId),
        bestAnswerId: undefined,
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }
}

agora a gente pode ir no nosso prisma-question-repository e retornar usando o mapper assim lembrando de colocar o async await e tambem de colocar que se a questão não existir é para retornar null. o repositorio por enquanto fica assim:
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Questions } from '@/domain/forum/enterprise/entities/questions'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<Questions | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    })

    if (!question) {
      return null
    }
    return PrismaQuestionMapper.toDomain(question)
  }

  findBySlug(slug: string): Promise<Questions | null> {
    throw new Error('Method not implemented.')
  }

  findManyRecent(params: PaginationParams): Promise<Questions[]> {
    throw new Error('Method not implemented.')
  }

  create(question: Questions): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(question: Questions): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(question: Questions): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

e assim aprendemos sobre mappers.

## criando schema do prisma


temos que lembrar de colocar depois o opcional natabela do prisma para o updatedAt.


vamos na pasta root/prisma e acessamos o arquivo schema.prisma
colocamos como opcional o updateAt no questiont
model Question {
  id        String   @id @default(uuid())
  title     String
  slug      String   @unique
  content   String
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime? @updatedAt @map("updated_at")

  tambem no users a gente adiciona um role e para isso a gente vai criar fora da tabela um enum para dizer se é professor ou aluno
  enum UserRole
   enum UserRole {
  STUDENT
  INSTRUCTOR
}

ai no role a gente fala que o tipo é UserRole e o default dele é student
model User {
  id        String     @id @default(uuid())
  name      String
  email     String     @unique
  password  String
  role      UserRole   @default(STUDENT)
  questions Question[]

  @@map("users")
}


agora a gente vai fazer a tablea de answer para poder criar o campo best answerId no questions
fica assim:
model Answer {
  id        String    @id @default(uuid()) 
  content   String
  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime? @updatedAt @map("updated_at")
  authorId  String    @map("author_id")

  author User @relation(fields: [authorId], references: [id])

  @@map("answers")
}

e ao salvar no user deve aparecer o relacionamento com o answer
agente so muda o nome de ANswer para answer assim:
answers    Answer[]

agora vamos no question e criamos um relacionamento bestAnswer passano para ele o answer? com a interrogação para mostrar que é opcional
  bestAnswer Answer? se a gente salvar isso ele cria todos esses campos para nos:
  bestAnswer Answer? @relation(fields: [answerId], references: [id])
  answerId   String?
  e tambem o relacionamento na tabela de answer
porem a ge,nte troca o field de answerId para bestAnswerId
e usamos o map para best_answer_id
  author     User    @relation(fields: [authorId], references: [id])
  bestAnswer Answer? @relation(fields: [bestAnswerId], references: [id])
  bestAnswerId String? @map("best_answer_id")

  e agora a gente coloca esse  bestAnswerId String? @map("best_answer_id") para cima junto com os outros acmpos para ficar separado dos relacionamentos
  FICA ASSIM
  
model Question {
  id           String    @id @default(uuid())
  title        String
  slug         String    @unique
  content      String
  createdAt    DateTime  @default(now()) @map("created_at")
  updatedAt    DateTime? @updatedAt @map("updated_at")
  authorId     String    @map("author_id")
  bestAnswerId String?   @map("best_answer_id")

  author     User    @relation(fields: [authorId], references: [id])
  bestAnswer Answer? @relation(fields: [bestAnswerId], references: [id])

  @@map("questions")
}

e no answer que criou o relacionamento automatico a gente vai trocar o nome para bestQuestionOn e ele vai ser opcional
  bestAnswerOn Question?

  porem ai ele vai dar um erro no nosso bestAnswer que esta na tabela question
  esse erro é porque ele pede para o bestAnswerId ser unique isso porque o unique adiciona um indice no bestAnserId e tambem é uma forma do prisma garantir que uma answer so pode ser a melhor resposta de uma unica question.
  ta faltando tambum uma outra coisa. uma question pode ter varias answer. então vamos criar esse relacionamento:
   answers Answer[]
   e isso vai criar um erro no bestAnswer porque temos dois relacionamentos com a mesma tabela o prisma se perde um pouco então temos que dar nomes para os relacionamentos então no bestAnswer dentro de relation a gente coloca logo no inicio "" e damos um nome para o relaiconamento.
   e la na tabela de answer onde tem o bestAnswer on a gente tambem tem que colocar o relation e dar o nome. agora se salvar ele não se perde mais e ele cria o restante sowinho.
   a gente so vai jogar o questionId de la do answer para a parte de campos e não de relações. e a gente tira ele de opcional e faz um mapa para escrever question_id e tambem tiramos do ralacional ele sendo opcional e colocamops com minusuculo.
   o best answer é opcional mas o question não. toda a resposta tem que estar atrelada a uma pergunta.
   por enquto a pagina fica assim:
   // This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  STUDENT
  INSTRUCTOR
}

model User {
  id        String     @id @default(uuid())
  name      String
  email     String     @unique
  password  String
  role      UserRole   @default(STUDENT)
  questions Question[]
  answers   Answer[]

  @@map("users")
}

model Question {
  id           String    @id @default(uuid())
  title        String
  slug         String    @unique
  content      String
  createdAt    DateTime  @default(now()) @map("created_at")
  updatedAt    DateTime? @updatedAt @map("updated_at")
  authorId     String    @map("author_id")
  bestAnswerId String?   @unique @map("best_answer_id")

  author     User    @relation(fields: [authorId], references: [id])
  bestAnswer Answer? @relation("bestAnswer", fields: [bestAnswerId], references: [id])

  answers Answer[]

  @@map("questions")
}

model Answer {
  id         String    @id @default(uuid())
  content    String
  createdAt  DateTime  @default(now()) @map("created_at")
  updatedAt  DateTime? @updatedAt @map("updated_at")
  authorId   String    @map("author_id")
  questionId String    @map("question_id")

  author       User      @relation(fields: [authorId], references: [id])
  bestAnswerOn Question? @relation("bestAnswer")
  question     Question  @relation(fields: [questionId], references: [id])

  @@map("answers")
}

e por enauqnto é so. mais tarde vamos fazer a parte de comentarios e anexos.

agora que as tabelas estão feitar a gente vai rodar o migration lembrar de colocar o banco de dados pra rodar
npm prisma migrate dev
e o nome da migration vai ser create answers and users role

agora ele ja rodou as migrations no meu banco de dados. e se eu voltar la no nosso mappers a gente pode dar algo no bestAnswer a gente antes tem que dar um restart no vs para ele ler as novas alterações do prisma. é so ir la na barra re pesquisa e escrever restar e eescolher o debug restar. ai a gente pode dar o raw.bestAnswerId
porem ai ainda vai ter um erro.
igual do updatedAt porque ele é opcional ou um unique entiti id e ai a gente tem que ir no entity dele e dizer que ele tambem pode ser nulo.
export interface QuestionProps {
  authorId: UniqueEntityId
  bestAnswerId?: UniqueEntityId | null
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date | null
  attachment: QuestionAttachmentList
}

so que ai vai dar um erro no retun do bestAnswerId dentro da entity question
e para resolver isso a gente tem que ir no set bestanswer e dizer que ele tambem pode ser nulo

  set bestAnswerId(bestAnswerId: UniqueEntityId | undefined | null) {
    if (bestAnswerId && bestAnswerId !== this.props.bestAnswerId) {
      this.addDomainEvent(new QuestionBestAnswerChosenEvent(this, bestAnswerId))
    }
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  ai para de dar erro e a pagina de questions ja esta boa.

  agora voltamos para o map e fazemos a logica para se o bestAnswerId existir ele vai ser um new uniqueEntityId(raw.bestAnswer) se não elev vai ser nulo
        bestAnswerId: raw.bestAnswerId
          ? new UniqueEntityId(raw.bestAnswerId)
          : null,

  agora esta tudo certo e a gente pode continuar a implementar os repositorios.

  vamos fazer o slug que é muito parecido com o outro so mudamos de id para slug
    async findBySlug(slug: string): Promise<Questions | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
    })
    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  
  vamos agora implementar o findManyRecent que ee quer listar as 20 recententes ordenandas pelo createdAt
  a gente transforma em async
  nos vamos pegar a page dedentro do paramst({page}: PaginationParams):
  e usamos o question para ser o findMany
  ai dentro do findMany a gente começa usando o orderBy a gente joga o createdAt : 'desc" para pegar de ordem decrescente com os mais recentes primeiro.
  e para a paginação a gente usa o take: 20 para pegar 20 e quantos a gente vai pular ai a gente faz o page -1 * 20
     const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })
  

  agora para retonar como sendo varias questions a gente pode fazer com a manha de mapear a questions e fica assim
return questions.map((question) => {
      return PrismaQuestionMapper.toDomain(question)
    })

    e a gente pode simplicifar isso passando apenas o toDomain que é uma função e o questions.map precisa de uma função ele funciona tambem fica assim
    
    return questions.map(PrismaQuestionMapper.toDomain)

    fica assim o metodo todo
    
  async findManyRecent({ page }: PaginationParams): Promise<Questions[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions.map(PrismaQuestionMapper.toDomain)
  }

  agora vamos para o proximo metodo save. a gente criou o mapper para converter uma question do formato do prisma para o formato da entidade a nive de dominio. porem agora a gente precisa do formato contrario. se a gente fizer apenas o create o prisma nao entende alguns campos como o uniqueEntityId e etc.
  então a gente tem duas altenativas. a gente pode passar o create e passar data e cada campo separadamente e passando os values como question.slug.value.
  entéao para não fazer isso nos vamos la no mapper e alem do metodo static toDomain a gente vai criar o toPrisma esse metodo vai receber uma question do dominio e precisa devolver uma prismaQuestion
    static toPrisma(question: Questions): PrismaQuestion {}
    porem a prismaquestion tem varios campos que não necessariamente são necessarios para criar no banco de dados. então para melhorar isso a gente vai importatr o Prisma e de dentro dele vai ter o QuestionUnchecked 
    static toPrisma(question: Questions): Prisma.QuestionUncheckedCreateInput {}
    assim ele muda umas coisas como o id não ser ibrigatorio e outras coisas.
    e agora a gente da um retorno e vai enchendo os campos para os ids a gente usa o metodo toString pq eles são salvos como uniqueEntityId
    id: question.id.toString(),
      authorId: question.authorId.toString(),
      bestAnswerId: question.bestAnswerId?.toString(),
    para o slug como ele é um valueObject a gente tem que pegar so o valor para vir uma string
    fica assim:
      static toPrisma(question: Questions): Prisma.QuestionUncheckedCreateInput {
    return {
      id: question.id.toString(),
      authorId: question.authorId.toString(),
      bestAnswerId: question.bestAnswerId?.toString(),
      title: question.title,
      content: question.content,
      slug: question.slug.value,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt, 
    }
  }

  agora podemos voltar no repositorio e passamos esse metodo do mapper para fazer fica assim:
   
  async save(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.update({
      where: { id: data.id },
      data,
    })
  }

  o create é parecido so que muda o update pelo create e não precisa do whereId: data.id
  fica assim

   async create(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.create({
      data,
    })
  }

  e agora o delete
  a gente faz parecido e ele faz um meodo delete no where id: data.id
    async delete(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.delete({ where: { id: data.id } })
  }

com isso o repositorio ficou pronto:
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Questions } from '@/domain/forum/enterprise/entities/questions'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<Questions | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    })

    if (!question) {
      return null
    }
    return PrismaQuestionMapper.toDomain(question)
  }

  async findBySlug(slug: string): Promise<Questions | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
    })
    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findManyRecent({ page }: PaginationParams): Promise<Questions[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions.map(PrismaQuestionMapper.toDomain)
  }

  async create(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.create({
      data,
    })
  }

  async delete(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.delete({ where: { id: data.id } })
  }

  async save(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.update({
      where: { id: data.id },
      data,
    })
  }
}

antes de continuar implementando outros repositorios vamos testar o fluxo tentando usar o caso de uso do createQeustion la no nosso controller do createQuestion
atualmente o nosso createQeustion no http esta dependendo diretametne do prisma
export class CreateQuestionController {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  inclusuive podeos tirar esse jwt que não usamos.
  e tambem atualizar a importação para pegar o database:
  import { PrismaService } from '@/infra/database/prisma/prisma.service'

  mas então o fluxo certo seria que o controller usasse o caso de uso e esse caso de uso que chamasse o prisma.
  então se a gente trocar essa dependencia pela dependencia do caso de uso createQeustion com o tipo CreateQuestionUseCase que vamos importarla d caso de uso
  constructor(private createQuestion: CreateQuestionUseCase) {}

  e agora la dentro a gente pode dispençar o metodo converToSlug
  e ao inves de chamar o prisma a gente pode vir diretamente chamadno o useCase e passar para ele o attachmentId como um array vazio e o authorId como o userId e o title e content a gente passa tambem fica assim:
   @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
  ) {
    const { title, content } = body
    const userId = user.sub

    await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentIds: [],
    })
  }
}

com isso a gente ja esta usando o caso de uso da camada de dominio nos nossos controllers
so que s e a gente tentar usar assim não vai funcionar porque o nest toda classe que for injetada precisa obrigatoriamente o injectable o prisma tinha injectable e o caso de uso não tem por que ele esta na camada de dominio. ele não pode estar atrelado ao sistema nest então nos temos duas alternaticas
a mais facil porem que fere mais os principios do ddd que é colocar o injecable no caso de uso. isso so pode ser aceitaval porque apesar de ser um decorator e vir de uma camada de fora do dominio ele não vai modificar de forma alguma o codigo que temos na camada de dominio (e provavelmente se a gente não usar o nest não iria quebrar seria apenas uma linha de codigo morta) as vezes pode valer a pena se a vantahem da simplicidade for grande para a inconveniencia de uma sujada peauena na cleanarchitecture. porque a outra solução seria
criar uma representação desse cao de uso dentro de nossa camada infra tambem teriamos um nest-create-qeustion-useCase e criariamos uma classe que extenderia a createQeustionUseCase do dominio. ela não teria qualquer tipo de implementação
apenas um contrutor e nele repetir o que temos no caso de uso qyue é o construtor do caso de uso. depois um super para chamar o contrutor da classe pai e mandariamos para ele o nosso repositorio
e o injectable estaria nessa classe.
e ai no nosso controller a gente usaria esse nest-create-question-useècase
por um lado não sujaria o ddd e clean architecture mas por outro criaria toda uma sessão de repetição. ai teriamos que avaliar qual é o melhor caminho
então seria um tradeOff que vale a pena. a gente não precisa ter medo de as vezes quebrar as regras se isso for nos dar vantagem.
então vamos no nosso createQuestionUseCase e colocar o injectable. ele fica assim;
import { Either, right } from '@/core/either'
import { Questions } from '../../enterprise/entities/questions'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { QuestionsRepository } from '../repositories/questions-repository'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list'
import { Injectable } from '@nestjs/common'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  attachmentIds: string[]
}
type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Questions
  }
>

@Injectable()
export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Questions.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })
    const attachment = attachmentIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      })
    })

    question.attachment = new QuestionAttachmentList(attachment)

    await this.questionsRepository.create(question)

    return right({ question })
  }
}

agora precisamos ir la no nosso http module e colocar o createQeustionUseCase nos providers fica assim:
import { Module } from '@nestjs/common'
import { AutenticateController } from './controllers/autentication-controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/prisma/database.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AutenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [CreateQuestionUseCase],
})
export class HttpModule {}

porem se a gente tentar rodar o rpograma assim tambem vamos ter erro.
ele vai dizer que o nest não consegue resolver as dependencias de createQuestionUseCase isso porque o createQeustin depende do questionsrepository
porem o questionsRepository ele é uma interface e não uma classe (diferente das outras injeçoes de dependencia que a gente tinha feito antes) 
e a interface é epsecifica do typescript ela não existe no js e quando a gente for compilar ela deve ser eliminada e como a injeção acontece quando a aplicação esta sendo executada. no nest a aplicação vai ser sempre executada com javascript e não com typescript
então a recomenação do nest é que ao invez de a gente usar interfaces a gente use classes abstratas então so vamos trocar o repositorio de interface para classe abstrata e na frente de cada um dos metodos a gente coloca abstract. agora o repoitorio ficou assim:
import { PaginationParams } from '@/core/repositories/pagination-params'
import { Questions } from '../../enterprise/entities/questions'

export abstract class QuestionsRepository {
  abstract findById(id: string): Promise<Questions | null>
  abstract findBySlug(slug: string): Promise<Questions | null>
  abstract findManyRecent(params: PaginationParams): Promise<Questions[]>
  abstract create(question: Questions): Promise<void>
  abstract delete(question: Questions): Promise<void>
  abstract save(question: Questions): Promise<void>
}

agora temos que ir no nosso database.module e ao inves de enviar os providers como nos estamos enviando. no lugar do prisma question repository a gente vai botar um objeto e nele a gente coloca provide e passamos o nome da nossa classe abstrata e depois um useclass e  PrismaQuestionsRepository e nos exports precisamos tambem trocar de prismaquestionsReporistory para questionsRepository
fica assim:

import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaAnswerAttachmentRepository } from './repositories/prisma-answer-attachments-repository'
import { PrismaAnswersRepository } from './repositories/prisma-answers-repository'
import { PrismaAnswerCommentsRepository } from './repositories/prisma-answer-comments-repository'
import { PrismaQuestionAttachmentsRepository } from './repositories/prisma-question-attachments-repository'
import { PrismaQuestionCommentsRepository } from './repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepository } from './repositories/prisma-questions-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'

@Module({
  providers: [
    PrismaService,
    PrismaAnswerAttachmentRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaQuestionCommentsRepository,
    { provide: QuestionsRepository, useClass: PrismaQuestionsRepository },
  ],
  exports: [
    PrismaService,
    PrismaAnswerAttachmentRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaQuestionCommentsRepository,
    QuestionsRepository,
  ],
})
export class DatabaseModule {}


o que nos estamos falando para ele é toda vez que se soliciatar uma arquivo que esteja com dependencia na questionsRepository use a classe PrismaQuestionRepository


e para info o nosso controller de createuqestion depois de todas alterações ficou assim:
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jtw.strategy'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { z } from 'zod'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
  ) {
    const { title, content } = body
    const userId = user.sub

    await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentIds: [],
    })
  }
}

e tabme temos que colocar o database nessa linha em todos os controllers
import { PrismaService } from '@/infra/database/prisma/prisma.service'

se a gente rodar a aplicação e o database agora e tentar criar uma questão ele deve funcionar e ele vai estar usando o fluxo da clean architecture de uma chamada http sendo pega pelo controler que vai validar os dados que então vai chamar o caso de uso o caso de uso vai fazer uso de algumas entidades e tambem vai chamar o repositorio e esse questionRepository vai ser injetado no lugar dele usando a injeção de dependencia do nest o prismaquestionrepository
que é quem vai fazer o processo de criar uma question dentro do banco de dados. e para fazeressa criação ele usou o mapper para fazer a converção de uma entidade de dominio para uma entidade de persistencia. depois disso o controller devolveu a resposta no caso 201 created
esta funcionando porem eu tive que atualizar o authToken no client.http porque estava escrito errado fica assim:
@baseUrl = http://[::1]:3333
@AuthToken = {{autenticate.response.body.access_token}}

# @name create_account
POST {{baseUrl}}/accounts
Content-Type: application/json

{
    "name": "Iuri Reis",
    "email": "iuri@rei7.com",
    "password": "123456"
}

###

# @name autenticate
POST {{baseUrl}}/sessions
Content-Type: application/json

{
    "email": "iuri@rei7.com",
    "password": "123456"
}

###

# @name create-question
POST {{baseUrl}}/questions
Content-Type: application/json
Authorization: Bearer {{AuthToken}}

{
    "title": "Nova Pergunta7",
    "content": "essa é a nova pergunta"
}

###

# @name fetch-recent-questions
GET {{baseUrl}}/questions?page=3
Content-Type: application/json
Authorization: Bearer {{AuthToken}}


# listando perguntas recentes

vamos fazer o mesmo fluxo que fizemos para create question mas para a parte de listagem das perguntas
vamos no infra/controller fetch recent question a gente vai remover o prisma e vai usar o listRecentQuestionUseCase aqui a gente esta usando fetch mas no domain usamos list. vamos deixar assim.
e ai a questions vai ser o execute desse useCase passando a paginanque vem dos parametros e não precisamos mais de perPage tiramos o prisma service e fica assim:
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { ListRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/list-recent-questions'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageParamsTypeSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private listRecentQuestions: ListRecentQuestionsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageParamsTypeSchema) {
    const questions = await this.listRecentQuestions.execute({
      page,
    })
    return { questions }
  }
}


agora no caso de uso a gente tem que colocar o injectable
import { Either, right } from '@/core/either'
import { Questions } from '../../enterprise/entities/questions'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Injectable } from '@nestjs/common'

interface ListRecentQuestionsUseCaseRequest {
  page: number
}
type ListRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Questions[]
  }
>

@Injectable()
export class ListRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: ListRecentQuestionsUseCaseRequest): Promise<ListRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return right({ questions })
  }
}

e no http module a gente passa o listRecenteQuestions no providers assim:
@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AutenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [CreateQuestionUseCase, ListRecentQuestionsUseCase],
})

a gente não precisa criar logo outro reporisotio porque esse metodo esta no repositorio dos questions que a gente ja fez.

porem da forma que o controller ta, ele vai receber um array com varias questions no formato da ntidade da camada de dominio. que não é o formato que a gente quer enviar para o nosso frontEnd. por isso que agora nos vamos usar um novo elemento da cleanArchitecture que é o presenter. para ajustar esses dados de forma que eles sejam melhor apresentados.
## presenter
no nosso caso o presenter é especifico da camada http então vamos na pasta http e criamos ma pasta chamada presenter
e dentro dela um arquivo chamado question-presenter.ts mas se a gente tivesse varias portas de saida de dados ai a gente colocaria o http no titulo para lembrar
vai ser uma classe chamada Questionpresenter que vai ter um unico metodo statico chaado toHTTP() e ele vai receber uma question que vem do dominio (cuidado para não importar do prisma) e vamos retornar o formato que queremos enviar para o frontEnd.
então fica assim antes de começarmos a preencher
import { Questions } from '@/domain/forum/enterprise/entities/questions'

export class QuestionPresenter {
  static toHTTP(question: Questions) {
    return {}
  }
}
agora vamos colocar as coisas que vamos retornar. o id, title, slug, bestanswerId, createdat e updated at
   return {
      id: question.id.toString(),
      title: question.title,
      slug: question.slug.value,
      bestAnswerId: question.bestAnswerId?.toString(),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
    a gente podeira colocar mais campos, mas o ideal é não passar informação desnecessaria. a pagina fica assim:
    import { Questions } from '@/domain/forum/enterprise/entities/questions'

export class QuestionPresenter {
  static toHTTP(question: Questions) {
    return {
      id: question.id.toString(),
      title: question.title,
      slug: question.slug.value,
      bestAnswerId: question.bestAnswerId?.toString(),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}

    agora no fetchRecentQuestion no return  a gente pode passar o questions e a gente pode pasar o map como sendo esse metodo toHttp do presenter
    porem da erro porque o questions pode ser um left ou right e ai então a gente pega o value dele que pode ser ou o questions[] ou null. a gente vai pegar então na verdade o result e vai fazer uma verificação desse result. então ao inves de ser uma const question a gente vai chamar a const de result e por enquanto apenas verificanco se for left a gente da um erro
    if (result.isLeft()) {
      throw new Error()
    }
    agoraa gente pega a questions atravez de result.value.questions porque dentro do value a gente tem um questions. assim ele vai ser obrigatoriamente o questions e não mais a possibilidade de ser left e logo nulo;
    const questions = result.value.questions

     com isso a gente pode fazer o nosso map assim:
     
    return { questions: questions.map(QuestionPresenter.toHTTP) }
  }

agora se a gente fizer uma listagem de perguntas elas vão vir em um formato muito mais agraavel.
a gente pode adicionar ampos mar por exemplo a gente néao colocou o content porque essa listagem de mostrar 20 geralmente vai mostrar so os titulos não precisamos mostrar o conteudo. então é comum a gente ter um presenter para cada ocasião. vamos ter um que vai mostrar o conteudo e outro que não.
por enqaunto a gente vai usar so isso. existe uma forma de pedir quais camopos a gente quer usando um graphql(acho que é esse o nome) que ele vai pedir exatambente quais campos queremos. mas em uma estrutura http tradicional a gente não pede.

# gateways de criptografia
na nossa parte de domain a gente não criou nenhum caso de uso para autenticação ou gestão de usuario. nos temos por exemplo a entidade de students e coisas assim mas não temos os casos de uso para autenticação e cadastros.
no nosso schema do prisma a gente ja tem uma tabela de user e ela tem role e nome email e password então  vamos la na nossa entidade student e colocamos nas props nome email e password e fazer metodos get para cada um deles. por enquanto não vai ter metodo set para eles.
fica assim:
import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'

interface StudentProps {
  name: string
  email: string
  password: string
}

export class Student extends Entity<StudentProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  static create(props: StudentProps, id?: UniqueEntityId) {
    const student = new Student(props, id)
    return student
  }
}

e agora a gente vai la nos reporistories do domain aplication repositories e vamos criar um novo repositorio students-repository.ts
a gente ja vai fazer ele na pegada de class abstract nesse repositorio por enquanto so vao ter os metodos create e o findByEmail.
fica assim:
import { Student } from '../../enterprise/entities/student'

export abstract class QuestionsRepository {
  abstract findByEmail(email: string): Promise<Student | null>
  abstract create(student: Student): Promise<void>
}

e agora que a gente ja esta com o student e o repositorio dele criado a gente ja pode começar a pensar no caso de uso para fazer login na aplicação.
e se a gente for nos nosssos controllers a gente tem o autenticate e o create account. e eles usam o hash de senha para criar ou para comparar. e alem disso na autenticação a gete tem a criação do token.
é omportante então a gente entender que a criptografia, é saudavel estar na camada mais externa da aplicação.
ou seja, no nosso caso de uso, tudo que ele precisar fazer que precise de criptografia ele chame algo que esteja na camada de infra para fazer.
porem o caso de uso, para se manter limpo ele não chama diretamente as coisas nas camadas infra, por isso por exemplo que usamos os repositorios eles são como gateways
e nesse caso a gente a gentetambem vai pcisar de um gateway para gerenciar a comunicação entre os casos de uso e as funçoes de criptografia.
o que nos vamos fazer então é la na camada de domain  aplication a gente cria a pasta cryptography
e dentro dele a gente vai ter um arquivo chamado encriptor.ts que vai ser o gateway para a parte de geração de tokens jwt. e ele vai ter contratos
então vamos fazer tambem uma export abstract class e dentro dela um unco metodo chamado encript que vai receber um payload que é o que queremos incluir dentro do token e ele vai ser do tipo Record<string, unknown> ou seja um objeto que a chave é uma string e o valor de cada propriedade é desconhecido e ele vai devolver um token qu é uma string fica assim:
export abstract class Encrypter {
  abstract encrypt(payload: Record<string, unknown>): Promise<string>
}


agora a gente vai na mesma pasta criar o arquivo hasher.ts para criar o contrato da parte de hasher.
e nele vamos ter dois metodos o primeiro vai ser o hash que vai ser o que vai realizar o hasher que vai converter a senha de um plain text para um hash
  abstract hash(plain: string): Promise<string>
  e o outro metodo que vai comparar o plain com um hash ja gerado e vai devolver o booleano.
    abstract compare(plain: string, hash: string): Promise<boolean>
    fica assim:
    export abstract class Hasher {
  abstract hash(plain: string): Promise<string>
  abstract compare(plain: string, hash: string): Promise<boolean>
}


e agora a gente ja tem os nossos contratos caso qualquer caso de uso precise de criptografia.
porem se a gente lembrar do solid o i dele vem de interface segregation
e lembrando que essas classes abstratas que a gente criou deveriam ser interfaces elas so estão sendo classes abstratas por problema no nest não acietar as interfaces na hora do deploy. 
então a interface segregation diz que nos temos que ter um contrato para cada coisa coisa que algo faz por exemplo uma xerox teria que ter um contrato para copiadora um contrato para imprimir e um contrato para scanear e se ela faz os tres a gente implementa os tres contratos entéao no nosso caso a gente pode separar para ter o hash generator e o hash compare então a gente divide esse arquivo em dois o hash-generator.ts e o hash-comparer.ts eles são assim
export abstract class HashComparer {
  abstract compare(plain: string, hash: string): Promise<boolean>
}

export abstract class HashGenerator {
  abstract hash(plain: string): Promise<string>
}


isso pode não ajudar mutio na parte do hash, mas em alguns casos pode ajudar então é sempre bom ir pensando nisso de interface segregation.
agora que isso esta criado nos podemos ir para os uso de caso.

## caso de uso de autentificação e cadastro
vamos criar os casos de uso de autenticação e cadastro.
vamos la nos nossos useCases e vamos criar um arquivo chamado register-student.ts
a gente faz as interface de request e resposta 
interface RegisterStudentUseCaseRequest {
  name: string
  email: string
  password: string
}
type RegisterStudentUseCaseResponse = Either<
  null,
  {
    student: Student
  }
>
fazemos a export class para ser registerStudent e ela ser injectabele. no constructor da classe a gente usa o studentRepository

atencção caso a classe studentrepository não esteja criada ir la em repository e criar um arquivo chamado student-repository.ts e dentro dele colar isso:
import { Student } from '../../enterprise/entities/student'

export abstract class StudentsRepository {
  abstract findByEmail(email: string): Promise<Student | null>
  abstract create(student: Student): Promise<void>
}

eu acho que a gente tinha crido mas esquecido de mudar o nome para Student estava como crateQuestion.

porem o constructor precisa tambem do gateway então vamos pegar tamvem como private o hashGenerator
@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private studentRepository: StudentsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  agora dentro do execute a gente pega o name, email e password e vamos fazer o processo para validar a criação. primeiro vamos procurar se não tem um estudante com o mesmo email:
    const studentwithSameEmail = await this.studentRepository.findByEmail(email)
    
    se ele existir vamos disparar um erro. e para não ser um erro generico a gente vai dentro da pasta de useCases e criamos uma pasta errors
    e criamos nele o student-already-exists-error.ts
    e nela a gente faz a classe que vai extender a classe de erro do js mas vai tambem implementar  useCaseErrors que a gente criou e ai a gente faz um cosntructor e passa a massagem no super de estudante ja existe fica assim:
    import { UseCaseErrors } from '@/core/errors/use-case-errors'

export class StudentAlreadyExistsError extends Error implements UseCaseErrors {
  constructor() {
    super('student with same e-mail adress already exists')
  }
}

porem a gente pode receber parametros nos erros e ai a gente pode colocar para receber um identifier sendo uma string e usar isso na nossa super para que se não for o email e sim outra coisa que ja exista a gente poder passar. e ai vai sermpre funcionar

import { UseCaseErrors } from '@/core/errors/use-case-errors'

export class StudentAlreadyExistsError extends Error implements UseCaseErrors {
  constructor(identifier: string) {
    super(`student "${identifier}" already exists`)
  }
}

 ai vai ficar por exemplo student iuri@reis.com ja existe
 ou se a gente trocar pode ficar por exemplo student iuriReisserName ja existe
 agora no caso de uso a gente precisa falar que ele pode retornar esse erro la no ether fica assim;
 type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistsError,
  {
    student: Student
  }
>

e a gente pode fazer a condicional para se o usuario ja existir isando o left
 if (studentwithSameEmail) {
      return left(new StudentAlreadyExistsError(email))
    }

    se passar disso a gente vai gerar o hash da senha usando o hash generator passando o password 
       const hashedPassword = await this.hashGenerator.hash(password)

       e agora podemos criar e salvar o usuario
       criar 
          const student = Student.create({
      name,
      email,
      password: hashedPassword,
    })

    salvar
       await this.studentRepository.create(student)
  eno final a gente retorna rigth devolvendo o tudent Criado
a pagina fica assim:
import { Either, right, left } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Student } from '../../enterprise/entities/student'
import { StudentsRepository } from '../repositories/students-repository'
import { HashGenerator } from '../cryptography/hash-generator'
import { StudentAlreadyExistsError } from './errors/student-already-exists-error'

interface RegisterStudentUseCaseRequest {
  name: string
  email: string
  password: string
}
type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistsError,
  {
    student: Student
  }
>

@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private studentRepository: StudentsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const studentwithSameEmail = await this.studentRepository.findByEmail(email)

    if (studentwithSameEmail) {
      return left(new StudentAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.studentRepository.create(student)

    return right({ student })
  }
}

vamos copiar isso e criar um arquivo autenticate-student.ts nos useCase e colar isso . mudamos todos os registerStudent por Autenticate Student
e vamos mudar as coisas. nesse caso não recebemos nome, apenas email e senha
não vai ter o erro de ja existe então por enquanto a gente deixa nulo ou devolve um access-token
interface AutenticateStudentUseCaseRequest {
  email: string
  password: string
}
type AutenticateStudentUseCaseResponse = Either<
  null,
  {
    access_token: string
  }
>
agora no constructor a gente não usa mais o hashGenerator e sim o hashCompare e tambem vamos usar o encripter para gerar o accesstoken

@Injectable()
export class AutenticateStudentUseCase {
  constructor(
    private studentRepository: StudentsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}
agora dentro do execute a primeira coisa que a gente faz é buscar o student do mesmo jeitoq a gent estava buscando e ai vamos dar um erro caso a gente não encontre esse estudante
nos vamos la na pasta useCases de erro denovo para criar um erro caso a gentenão encontre o estudante com o email que foi passado o erro do wrong credentials
copiamos e colamos o outro error
n esse caso não vai precisar de identifier
e ai a gente passa algo no super como Credentials are not valid.
fica assim:
import { UseCaseErrors } from '@/core/errors/use-case-errors'

export class WrongCredentialsError extends Error implements UseCaseErrors {
  constructor() {
    super(`Credentials are not valid.`)
  }
}

com isso salvo a gente pode dizer no either que pode voltar esse erro 
type AutenticateStudentUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>
e a autenticação para ver se o studante existe fica assim:
   const student = await this.studentRepository.findByEmail(email)

    if (!student) {
      return left(new WrongCredentialsError())
    }

    agora temos que comparar o hash para ver se ele esta correto



    const isPasswordValid = await this.hashComparer.compare(
      password,
      student.password,
    )

se der erro a gente repete o erro.

e agora vamos criar o token usando o encripter
e a gente passa o payload para ele com o studentId usando o toString pa ele é um unique entity id

    const accessToken = await this.encrypter.encrypt({ sub: student.id.toString() })

    e depois de tudo a gente retornar right passando o acessToken
    a pagina fica assim:
    import { Either, right, left } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { StudentsRepository } from '../repositories/students-repository'
import { HashComparer } from '../cryptography/hash-comparer'
import { Encrypter } from '../cryptography/encrypter'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AutenticateStudentUseCaseRequest {
  email: string
  password: string
}
type AutenticateStudentUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AutenticateStudentUseCase {
  constructor(
    private studentRepository: StudentsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AutenticateStudentUseCaseRequest): Promise<AutenticateStudentUseCaseResponse> {
    const student = await this.studentRepository.findByEmail(email)

    if (!student) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      student.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: student.id.toString(),
    })

    return right({ accessToken })
  }
}

## stubs de criptogrfia
stub é uma classe para o contexto de testes que vai implementar os contratos de forma ficticia, apenas para os testes. o conceito é parecido com o que fizemos nos in memory repositories
então dentro da pasta test a gente vai criar uma pasta cryptography e vams começar com o arquivo fake-hasher.ts
a gente vai exportar a classe akeHAsher que vai implementar o HashGenerator e o HashComparer, nõa tem problema implmentar duas coisas.
import { HashComparer } from "@/domain/forum/application/cryptography/hash-comparer";
import { HashGenerator } from "@/domain/forum/application/cryptography/hash-generator";

export class FakeHasher implements HashComparer, HashGenerator {
    
}

agora dentro dela vamos dar o implmenet all unimplemented interfaces e ai ele ja cria os dois metodos para a gente adaptar
import { HashComparer } from "@/domain/forum/application/cryptography/hash-comparer";
import { HashGenerator } from "@/domain/forum/application/cryptography/hash-generator";

export class FakeHasher implements HashComparer, HashGenerator {
    compare(plain: string, hash: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    hash(plain: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

}
vamos colocar async na frente dos dois metodos. e como é para ser ficticio a gente não vai usar o bcrypt nem nada neles.
então vamos fazer uma função de hash ficticia. a gente vai pegar o testo que o usuario esta enviando e vamoc concatenar no fim dele a string "-hashed" assim vai virar por exemplo 123456-hashed e a gente vai pelo menos saber que mudou.
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }
e no compare a gente vai pegar o plain que o usuario esta enviando concatenado com o hashed for igual a passworda gente retorna (em outras palavras vai ser true se não vai ser falso.)
  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
   a pagina fica assim:
   import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'

export class FakeHasher implements HashComparer, HashGenerator {
  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }

  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }
}

agora vamos criar o fake-encrypter.ts
fazemos a classe da mesma forma so que para o encripter
import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'

export class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {}
}

e agora temos que fazer o metodo.
e ai a gente pega o payload e transforma em um string usando o json stringfy
import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'

export class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }
}

a gente não precisa criar um acessToken nem nada disso;, é so para facilitar o testes unitarios então a gente manda um string qualquer e ja ta bom.
# testes de cadastro e autenticação
agora que temos os stub vamos fazer os testes de cadastro e autenticação unitarios
vamos em domain/forum:aplication/usecases e criamos o register-student.spec.ts
vamos copiar o createquestion.spec.ts nele para ter uma estrutura.
vamos mudar os nomes para register student
a gente muda o sut para o registerStudentUseCase
e esse useCase tem duas dependencias e uma delas não esta criada no inmemoryRepository qye é o student repository então vamos la criar ela
vamos copiar o qusetion repository deixamos so o metodo create e findById que vamos trocar para findByEmail
mudamos todos os question por student e ajustamos o metodo email; podemos tirar o constructor. fica assim:
import { DomainEvents } from '@/core/event/domain-events'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { Student } from '@/domain/forum/enterprise/entities/student'

export class InMemoryStudentsRepository implements StudentsRepository {
  public items: Student[] = []

  async create(student: Student) {
    this.items.push(student)

    DomainEvents.dispatchEventsForAggregate(student.id)
  }

  async findByEmail(email: string) {
    const student = this.items.find((item) => item.email === email)
    if (!student) {
      return null
    }
    return student
  }
}

agora com isso a gente pode voltar para nsso teste e chamar as nossas referencias na no let
let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let sut: RegisterStudentUseCase

com as importações

e instanciamos as duas dependencias

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let sut: RegisterStudentUseCase

describe('register student test', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakeHasher)
  })

  agora vamos fazer o nosso teste
  a gente faz um usuario com coisas ficticias
   test('if can register student', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      password: '123456',
    })
    e agora os expects primeiro o sucesso ou eja idRight to be true
    e a gente espera tambem que o valor do result seja  mesmo que esta salvo la no index 0 do inMemorystudentRepository
    
  test('if can register student', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.items[0],
    })
  })
  vamos testar tambem se o passoword fia hasheado
  o teste é igual mas o expect é para ver se o usuario que esta la no repositorio se a senha dele fica com o hashed
    test('if password becomes hashed', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryStudentsRepository.items[0].password).toEqual('123456-hashed')
  })

  ou a gente pode tambem usar o fakeHasher que fizemos a instancia e passamos a nossa senha 123456 assim ele vai hashear e a gente verifica se o que esta salvo la no repositorio é igual a o que hasheaos

  
  test('if password becomes hashed', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryStudentsRepository.items[0].password).toEqual(hashedPassword)
  })
})

o teste todo fica assim:
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachment-repository'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { RegisterStudentUseCase } from './register-student'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let sut: RegisterStudentUseCase

describe('register student test', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakeHasher)
  })

  test('if can register student', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.items[0],
    })
  })

  test('if password becomes hashed', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryStudentsRepository.items[0].password).toEqual(hashedPassword)
  })
})


a gente copia ele e cola em um novo arquivo que vamos criar autenticate-student.spec.ts
a gente faz as instanciações lebrando de trazer o fakeEncripter 
let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AutenticateStudentUseCase

describe('autenticate student test', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AutenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  agora a gente vai começar os tentes 
  para testar se é possivel autenticar um usuario antes de autenticar a gente precisa criar o usuario.
  então para isso a gente tem as factoryes vamos então criar uma la nas factorioes para make-student.ts
  mas antes temos que ir na entity student e exportar as props
  export interface StudentProps {
  name: string
  email: string
  password: string
}

e agora a gente pode usar o Student.create e a gente passa o nome o email e o password usando o faker e da override nas outras fica assim:
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import {
  Student,
  StudentProps,
} from '@/domain/forum/enterprise/entities/student'

export function makeStudent(
  override: Partial<StudentProps> = {},
  id?: UniqueEntityId,
) {
  const student = Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return student
}

agora a gente no teste faz o student usando o factory e passando na senha com o fakeHasher e passando tambem o email porque como vamos uar eles para logar a gente não quer que seja aleatorio criado pelo facotry

  const student = makeStudent({
      email: 'jhon@doe.com',
      password: await fakeHasher.hash('123456'),
    })

    depois de gerar o student a gente salva ele no repositorio podemos usar o create ou o itens .push ambos funcionam;

     inMemoryStudentsRepository.create(student)

     agora fazemos o login com o email e senha

        const result = await sut.execute({
      email: 'jhon@doe.com',
      password: '123456',
    })

esperamos que o retorno seja isRight
e a gente espera tambem qe o result.value seja o assectoken que seja qualequer string
test('if can autenticate a student', async () => {
    const student = makeStudent({
      email: 'jhon@doe.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryStudentsRepository.create(student)

    const result = await sut.execute({
      email: 'jhon@doe.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  e so tem esse teste para autenticar. a gentepoderia ciar um regex para validar o jwt mas não vamos fazer isso porque é desnecessario.
  a pagina toda fica assim:
  import { AutenticateStudentUseCase } from './autenticate-student'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'

import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { makeStudent } from 'test/factories/make-student'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AutenticateStudentUseCase

describe('autenticate student test', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AutenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  test('if can autenticate a student', async () => {
    const student = makeStudent({
      email: 'jhon@doe.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryStudentsRepository.create(student)

    const result = await sut.execute({
      email: 'jhon@doe.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})


# implementação de criptografia
para fazer a implementação real da parte de criptografia vamos em infra criar uma pasta cryptography
nela vamos criar um modulo cryptography.module.ts
por enquanto ele fica assim:
import { Module } from '@nestjs/common'

@Module({})
export class CryptographyModule {}


agora vamos criar outro arquivo nessa pagina chamado bcrypt-hasher.ts essa vai ser ja a implementação real por isso o nome dele vai o bcrypt e vamos criar tambem o arquivo jwt-encrypter.ts
o encripter a gente coloca pra implementar o encrypter e para ele ser injectable
import { Encrypter } from "@/domain/forum/application/cryptography/encrypter";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtEncrypter implements Encrypter{
    encrypt(payload: Record<string, unknown>): Promise<string> {
        throw new Error("Method not implemented.");
    }
    
}
e para gerar um jwt no nest a gente precisa do jwt service que vem la do auth module.
então a gente vai fazer um constructor para isso mesmo ela tendo dependencia em um outro modulo isso não tem problema nehum.
e agora no nosso metodo a gente da um return this.jwtService.singasync porqeu estamos usando promisse e ai a gente passa o payoad  como estamos usando o singasync a gente nem precisa colocar o async na função e ai o encrypter fica assim:
import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private jwtService: JwtService) {}
  encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.signAsync(payload)
  }
}


agora vamos para o hasher.
ele vai implementar anto o hashgenerator quanto o hashcomparer
import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { Injectable } from '@nestjs/common'

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    throw new Error('Method not implemented.')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}

dentro deles a gente retorna a propri função de hash e de compare do bcrypt temos qjue tomar cuidaod para importar do bacrypt
agora para o hash a gente passa o return a função de hash e passamos para ela o plain que a gente recebe e tambem o numero de rounds que é 8. mas a gente pode fazer uma configuração de antes das funções criar um private HASH_SALT_LENGTH = 8 e ai a gente passa essa hashsaltlength no local do numero de rounds assim fica configurado que sempre é 8
@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGHT = 8
  async hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGHT)
  }

  agora para o metodo de compare e passamos para ele o plain e o hash
  a pagfina fica assim:
  import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcryptjs'

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGHT = 8
  async hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGHT)
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}


agora a gente pode ir no modulo de criptografia
e dentro do modules vamos colocar os providers e vamos fazer um pouco como fizemos nos repositrios quan do a gente for implementar uma interface a gente envia um objeto e nesse objeto a gente coloca provide: e passamos quamé a classe abstrata Encrypter e a gente da virgula UseClass e passamos qual classe queremos implementar que no caso é a JWTencripter
providers: [{ provide: Encrypter, useClass: JwtEncrypter }],
ou seja cada vez que houver uma classe que uso os contratos de encrypter (que é uma interface mas esta como classe abstrata) a gente vai usar a classe JWTencypter
e a gente vai fazer igual com o hash comparer
e no fim a gente da um export encrypter hashcomparer e hashgenerator assim todos os modulos que importarem esse modulo vao ter acesso a essas classes fica assim
import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { Module } from '@nestjs/common'
import { JwtEncrypter } from './jwt-encrypter'
import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { BcryptHasher } from './bcrypt-hasher'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}

agora a gente pode refatorar os nossos controlers para usarem os nossos casos de uso que criamos.

vamos no nosso autenticate.controller na pasta http
e vamos modificar ele para que ele funcione com os novos useCases e não bata mas diretamente no prisma ou no jwt
no constructor dele a gente apaga as referencias ao prisma e ao jwt e faz um private autenticateStudent do tipo autenticatesutendusecase
@Controller('/sessions')
export class AutenticateController {
  constructor(private autenticateStudent: AutenticateStudentUseCase) {}

  e vamos logo nonosso http module para passar esse useCase nos providers e vamos passar logo o register tambem fica assim:
  import { Module } from '@nestjs/common'
import { AutenticateController } from './controllers/autentication-controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/prisma/database.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { ListRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/list-recent-questions'
import { AutenticateStudentUseCase } from '@/domain/forum/application/use-cases/autenticate-student'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AutenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [
    CreateQuestionUseCase,
    ListRecentQuestionsUseCase,
    AutenticateStudentUseCase,
    RegisterStudentUseCase,
  ],
})
export class HttpModule {}

agora no nosso controller a gente recebe o email e a senha e a gente apaga todo o resto o controller fica assim antes de a gente começar a implementar nosso useCase nele
import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { AutenticateStudentUseCase } from '@/domain/forum/application/use-cases/autenticate-student'

const autenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AutenticateBodySchema = z.infer<typeof autenticateBodySchema>

@Controller('/sessions')
export class AutenticateController {
  constructor(private autenticateStudent: AutenticateStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(autenticateBodySchema))
  async handle(@Body() body: AutenticateBodySchema) {
    const { email, password } = body
  }
}


ai a gente faz uma const result para ser o execute do useCase onde nos passamos o email e senha  const result = await this.autenticateStudent.execute({
      email,
      password,
    })
    e agora fazemos que se o resultado der erroou seja se ele for left a gente vai por enquanto so jogar um novo erro sem se preocupar muito em personalizar esse erro agora. e se der sucesso a gente pega o accesstoken de dentro do result.value e retorna ele fica asism a pagina:
    import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { AutenticateStudentUseCase } from '@/domain/forum/application/use-cases/autenticate-student'

const autenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AutenticateBodySchema = z.infer<typeof autenticateBodySchema>

@Controller('/sessions')
export class AutenticateController {
  constructor(private autenticateStudent: AutenticateStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(autenticateBodySchema))
  async handle(@Body() body: AutenticateBodySchema) {
    const { email, password } = body

    const result = await this.autenticateStudent.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      throw new Error()
    }

    const { accessToken } = result.value

     return {
      access_token: accessToken,
    }
  }
}

agora para que funcione a gete precisa ir la no database module e passar o studentRepository para ele e temos que fazer o prismaStudentsRepository então vamos fazer isso pasta database/prisma/repositories e criamos o arquivo prisma-students-repository.ts 
porem precisamos fazer o mapper ainda
fica assim 
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { Student } from '@/domain/forum/enterprise/entities/student'
import { PrismaStudentsMapper } from '../mappers/prisma-students-mapper'

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!student) {
      return null
    }
    return PrismaStudentsMapper.toDomain(student)
  }

  async create(student: Student): Promise<void> {
    const data = PrismaStudentsMapper.toPrisma(student)

    await this.prisma.user.create({
      data,
    })
  }
}

e o mapper a gente faz um na pasta mapper e ele fica assim
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Student } from '@/domain/forum/enterprise/entities/student'
import { User as PrismaUser, Prisma } from '@prisma/client'

export class PrismaStudentsMapper {
  static toDomain(raw: PrismaUser): Student {
    return Student.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(student: Student): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      password: student.password,
    }
  }
}

agora podemos ir para o database.module e colocar ele no prvider e tammbem no export para que ele possa ser implementado em quem usar a classe fica assim:
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaAnswerAttachmentRepository } from './repositories/prisma-answer-attachments-repository'
import { PrismaAnswersRepository } from './repositories/prisma-answers-repository'
import { PrismaAnswerCommentsRepository } from './repositories/prisma-answer-comments-repository'
import { PrismaQuestionAttachmentsRepository } from './repositories/prisma-question-attachments-repository'
import { PrismaQuestionCommentsRepository } from './repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepository } from './repositories/prisma-questions-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentsRepository } from './repositories/prisma-students-repository'

@Module({
  providers: [
    PrismaService,
    PrismaAnswerAttachmentRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaQuestionCommentsRepository,
    { provide: QuestionsRepository, useClass: PrismaQuestionsRepository },
    { provide: StudentsRepository, useClass: PrismaStudentsRepository },
  ],
  exports: [
    PrismaService,
    PrismaAnswerAttachmentRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaQuestionCommentsRepository,
    QuestionsRepository,
    StudentsRepository,
  ],
})
export class DatabaseModule {}

agora vamos la no httpModule e importamos o cryptography module o http module fica assim:
import { Module } from '@nestjs/common'
import { AutenticateController } from './controllers/autentication-controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/prisma/database.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { ListRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/list-recent-questions'
import { AutenticateStudentUseCase } from '@/domain/forum/application/use-cases/autenticate-student'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { CryptographyModule } from '../cryptography/cryptography.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AutenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [
    CreateQuestionUseCase,
    ListRecentQuestionsUseCase,
    AutenticateStudentUseCase,
    RegisterStudentUseCase,
  ],
})
export class HttpModule {}

e agora se a gente rodar o banco de dados e tambem a aplicação e a gente for no clienthttp e pedir para autenticar ele deve devolver o access-token. ta funcionando.

# create account

vamos agora refatorar o controller de riação de conta para ele usar o nosso useCase
a gente muda o construcotr para pegar o useCase
  constructor(private registeStudent: RegisterStudentUseCase) {}
  a gente apaga o que tinha e passa a usar o execute do use case:
    async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body
    const result = await this.registeStudent.execute({
      name,
      email,
      password,
    })
  }

  e agora a gente verifica se deu erro com isLeft. a gente não precisa retornar nenhum objeto nem nada no caso de sucesso. o arquivo fica assim:
  import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private registeStudent: RegisterStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @HttpCode(201)
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body
    const result = await this.registeStudent.execute({
      name,
      email,
      password,
    })
    if (result.isLeft()) {
      throw new Error()
    }
  }
}

## tratamento de erros
agora vamos fazer a tratamento de erros.
nos nossos casos de uso a gente ja esta retornando erros diferentes para cada situação. porem no controller a gente tem um erro padrão sendo jogado.
então o que vamos fazer é que no controller quando acontecer um erro a gente vai pegar qual erro aconteceu.
 const error = result.value

 e nos vamos fazer um switch(error.constructor) ou seja vamos usar a chamada da swithc e vamos pegar o constructor do erro que vai basicamente retornar qual classe originou esse erro. então fica assim:
  if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
      }
    }
    gora temos que dizer o que fazer quando ele pegar esse constructor.
    e caso o erro seja originario na classe wrongCredentials a gente vai jogar o unauthorizedException que ja vem do nest e passar a mensgam de erro que vem do useCase fica assim:
     if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
      }
    }

    e se acontecer qualquer outro erro qe não seja esse a gente vai dar um thwro new badRequestException usando o defalt e ai ele vai pegar qualquer erro esperado e vai dar isso. caso seja um erro inesperado ele não vai bater no result is.left ai o proprio nest vai devolver um erro 500
    a pagina de autenticate fica assim:
    import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { AutenticateStudentUseCase } from '@/domain/forum/application/use-cases/autenticate-student'
import { WrongCredentialsError } from '@/domain/forum/application/use-cases/errors/wrong-credentials-error'

const autenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AutenticateBodySchema = z.infer<typeof autenticateBodySchema>

@Controller('/sessions')
export class AutenticateController {
  constructor(private autenticateStudent: AutenticateStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(autenticateBodySchema))
  async handle(@Body() body: AutenticateBodySchema) {
    const { email, password } = body

    const result = await this.autenticateStudent.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}

agora a gente copia essa parte do erro evamos para a pagina de createaccount e cola la na parte do erro. mas mudamos os tipos de erro com excessão do bad request. a pagina fica assim:
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { StudentAlreadyExistsError } from '@/domain/forum/application/use-cases/errors/student-already-exists-error'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private registeStudent: RegisterStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @HttpCode(201)
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body
    const result = await this.registeStudent.execute({
      name,
      email,
      password,
    })
    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case StudentAlreadyExistsError:
          throw new ConflictException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}

agora vamos para o fetchRecentQuestionController e como ele néao tem nenhum erro esperado a gente vai jogar so o badRequest nele. a pagina fica assim
import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { ListRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/list-recent-questions'
import { QuestionPresenter } from '../presenters/question-presenter'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageParamsTypeSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private listRecentQuestions: ListRecentQuestionsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageParamsTypeSchema) {
    const result = await this.listRecentQuestions.execute({
      page,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
    const questions = result.value.questions

    return { questions: questions.map(QuestionPresenter.toHTTP) }
  }
}

agora vamos no createquestion e fazemso tambem so esse badRequest porem temos tambem que transformar o await na const resulta a pagina fica assim:

import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jtw.strategy'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
  ) {
    const { title, content } = body
    const userId = user.sub

    const result = await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentIds: [],
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}


# rotas privadas por padrao
agora nos vamos começar a fazer muitas rotas na aplicaçéao com muitas funcionalidades. e geralmente a gente vem usando o guard para dizer quais rotas o usuario precisa estar autenticado para usar. porem é muito comum a gente fazer o contrario e dizer apenas as que ele não precisa estar autenticado, até porque geralmente o numero é bem menor.
e assim por padrão a gente vai dizer que todas as rotas da aplicação o usuario precisa estar autenticado
vamos no auth.module
na parte de providers a gente vai passar um objeto
e usar o jwt authguard
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },


assim o app_guard a gente importa do proprio nest e o jwt é a classe que a gente criou.
o app guard é uma forma de registrar um guard de forma global.
o auth module fica assim:
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Env } from '@/infra/env'
import { JwtStrategy } from './jtw.strategy'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './jwt-auth.guard'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      async useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
        const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}

agora nos controllesr a gfente pode tirar o nosso guard
no create question, fetchquestions e no é so tirar a linha @useGuard nos arquivos e a importaçéao tambem
e ele deve continuar fazendo as autenticações
e agora a gente precisa tirar a autenticação da rta de criação de conte e autenticação
e para isso a gente tem criar um PUBLIC que é uma forma de falar que a rota é publica
o authGuard busca de dentro do metadata do nest o metadata é uma forma de transitar informações entre midlewares
esse authGaurd busca um metadado chamado IS_PUBLIC e se ele existir e estiver como true ele diz que essa rota é publica
entéao dentro dapasta auth a gente vai criar um arquivo chamado public.ts e nele a gente cola isso:
import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

agora com isso a gente pode ir la no autenticate.controller e a gente coloca abaixo do @controller esse decorator que a gente criou @Public() importando ele de infra/auth/public.ts
fica assim:
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { AutenticateStudentUseCase } from '@/domain/forum/application/use-cases/autenticate-student'
import { WrongCredentialsError } from '@/domain/forum/application/use-cases/errors/wrong-credentials-error'
import { Public } from '@/infra/auth/public'

const autenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AutenticateBodySchema = z.infer<typeof autenticateBodySchema>

@Controller('/sessions')
@Public()
export class AutenticateController {
  constructor(private autenticateStudent: AutenticateStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(autenticateBodySchema))
  async handle(@Body() body: AutenticateBodySchema) {
    const { email, password } = body

    const result = await this.autenticateStudent.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}

e no createAccountController a gente faz igual e fica assim:
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { StudentAlreadyExistsError } from '@/domain/forum/application/use-cases/errors/student-already-exists-error'
import { Public } from '@/infra/auth/public'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private registeStudent: RegisterStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @HttpCode(201)
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body
    const result = await this.registeStudent.execute({
      name,
      email,
      password,
    })
    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case StudentAlreadyExistsError:
          throw new ConflictException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}

porem ainda vai dar erro porque faltou a gente configurar no jwtAuthGuard então vamos abrir o JWTauthguard que esta na pasta auth
e dentro da class que esta o authguard
export class JwtAuthGuard extends AuthGuard('jwt') {}
a gente vai jogar esse codigo que a gente pode copiar da documentaçéao do nest
 constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }

a gente vem no tsconfig e retira essa linha para néao ficar dando erro
 "declaration": true,
 (no meiu néao estava dando erro mas eu preferi remover para ficar igual o da rocketseat)
 o declaration true é para ele gerar os arquivos .d.ts quando a gente fizer a bulid do ts e como no nest a gente gera o codigo com JS na produção ai não precisa tanto.
 a pagina auth.guard fica assim
 import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from './public'
import { ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }
}

e esse codigo esta buscando de dentro do metadata o IS_PUBLIC_Key
e se a publicKey for true ele diz que o usuario pode acessar aquela rota retornando um true se néao ou seja se não existir a publicKey ele vai fazer a verificação tradicional que a gente setou no module. não podemos eswuecer de colocar o injectable porque sem o injectable o reflector néao vai ser injetado.

# env module
toda vez que a gente for usar o configService para buscar uma variavel ambiente a gente precisa fazer toda a tipagem la do env, true ets como aqui no main.ts
  const configService = app.get<ConfigService<Env, true>>(ConfigService)
    const port = configService.get('PORT', { infer: true })

a gente usa isso no authmodule e no jwt straegy tambem.
para mudar isso a gente pode dentro do infra criar um env.service.ts
e nele a gente cria nossa propria class envService com injectable
import { Injectable } from '@nestjs/common'

@Injectable()
export class EnvService {}

e dentro dela a gente vai criar um construtor para fazer a inversão de dependencia
do configService do proprio nest e ai nesse configService que esta no construtor a gente pode ja tipar ele passando o Env das variaveis ambientes e true no segundo argumento
  constructor(private configService: ConfigService<Env, true>) {}

  e agora a gente cria um unico metodo chamado get que vai receber quam a chave que ele vai querer das variaveis ambeintes e essa chave a gente vai tipar como keyOf Env e keyof é um padrão que pega como env sendo um objeto ele retornar todas as possiveis chaves. e a gente retorna então o this.configService.get pegando a key e ja dando o infer como true fica assim:
  import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<Env, true>) {}

  get(key: keyof Env) {
    return this.configService.get(key, { infer: true })
  }
}

assim a gente criou um helper que ja faz toda awuela configuração apra a gente
agora vamos no app.modules colocamos um providers e passamos o envService
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { HttpModule } from './http/http.module'
import { EnvService } from './env.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
  ],
  providers: [EnvService],
})
export class AppModule {}

com isso a gente pode ir agora no main e ao invez de fazer o app.get no configservice a gente vai pegar so o envService e néao vai mais precisar passar tudo aquilo para pegar a porta vai ser so envService.get(port)
isso:
const configService = app.get<ConfigService<Env, true>>(ConfigService)
se torna isso:
 const envService = app.get(EnvService)
 e isso:
  const port = configService.get('PORT', { infer: true })
  se torna isso:
    const port = envService.get('PORT')
    fica a pagina toda bem menor assim; e ja com tudo tipado:
    import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const envService = app.get(EnvService)
  const port = envService.get('PORT')

  await app.listen(port)
}
bootstrap()


agora vamos no authModule e onde estamos injetando o onfigService a gente vai injetar o envService
e onde tem config como aqui
config: ConfigService<Env, true>
a gente vai pegar o env:EnvService
e depois podemus usar o env.get assim sem passar o infer
 const privateKey = env.get('JWT_PRIVATE_KEY')
        const publicKey = env.get('JWT_PUBLIC_KEY')
  a pagina fica assim porem da erro porque ele ta chando que as key podem ser string ou numero:
  import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Env } from '@/infra/env'
import { JwtStrategy } from './jtw.strategy'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './jwt-auth.guard'
import { EnvService } from '../env.service'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [EnvService],
      global: true,
      async useFactory(env: EnvService) {
        const privateKey = env.get('JWT_PRIVATE_KEY')
        const publicKey = env.get('JWT_PUBLIC_KEY')

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}

para resolver isso a gente tem que ir no
envService e passar
 get<T extends keyof Env>(key: T) {
  ou seja no get a gente coloca para o tipo extender o tipo de chave de Env e a chave vai ficar tipada como T
  e ai para de dar erro no authModule
isso é o uso de generics no typescript o get recebe uma generic de qual chave q gente quer pegar do env e a gente quer que essa chave herde a chave que estamos enviando como parametro e para fazer isso a gente cria um generique e fala que o parametro que o usuario envie vai ser assinado a esse generic que a gente colocou chamado T e apartir desse momento o T equivale a o que o usuario mandou como key 
agora a pagina de env.service ficou assim:
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<Env, true>) {}

  get<T extends keyof Env>(key: T) {
    return this.configService.get(key, { infer: true })
  }
}

agora o ultimio que esta faltando é o jtwStrategy a gente tambem esta usando o configService e trocamos pelo EnvService que não vai precisar do generic que o configService estava pegando fica assim
constructor(env: EnvService) {
    const publicKey = env.get('JWT_PUBLIC_KEY')
    a pagina toda assim:
    import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { z } from 'zod'
import { EnvService } from '../env.service'

const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
})

export type UserPayload = z.infer<typeof tokenPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(env: EnvService) {
    const publicKey = env.get('JWT_PUBLIC_KEY')

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    })
  }

  async validate(payload: UserPayload) {
    return tokenPayloadSchema.parse(payload)
  }
}

agora a gente tem que vir no authModule e vamos ter que mudar um pouco as coisas porque o JWTModule ele é tratado como se fosse um outro modulo e por isso se a gente passar o envService como provider eele néao vai funcioanr
e dentro do register Asyn ele não tem como passar novos providers aqui:
 JwtModule.registerAsync({
      inject: [EnvService],
      global: true,
      async useFactory(env: EnvService) {
        const privateKey = env.get('JWT_PRIVATE_KEY')
        const publicKey = env.get('JWT_PUBLIC_KEY')

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),

    então o que nos vamos fazer é dentro de infra a gente vai criar uma pasta chamada env e dentro dela vamos jogar o envService o env.ts e talbel vamos criar um env.module.ts
    e ai a gente vai criar a classe envModules fazer o decorator modules e dentro desse decorator a gente passa os providers envService e exports envService tambem para ele ficar acessivel
    import { Module } from '@nestjs/common'
import { EnvService } from './env.service'

@Module({
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}

agora vamos no main no strategy e no authmodulo arrumar a importação do enService
no app/module a gente tira o envService do providers e passa o envModule nos imprts
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env/env'
import { AuthModule } from './auth/auth.module'
import { HttpModule } from './http/http.module'
import { EnvModule } from './env/env.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    EnvModule,
  ],
})
export class AppModule {}

e agora no nosso authModule como o envModule é um modulo a gente pode ir la no registerAsync e imports o envModule o authModule deve ficar assim:
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jtw.strategy'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './jwt-auth.guard'
import { EnvService } from '../env/env.service'
import { EnvModule } from '../env/env.module'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      async useFactory(env: EnvService) {
        const privateKey = env.get('JWT_PRIVATE_KEY')
        const publicKey = env.get('JWT_PUBLIC_KEY')

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),
  ],
  providers: [
    JwtStrategy,
    EnvService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}

# finalizando o schema no prisma
vamos criar no schema do prisma os models para comments e para attachments
colocamos logo um id nelas com @id e o deault sendo uuid
agora vamos colocar alguns campos comuns o comments vai ter content e o attachment vai ter title e url.
no comentario vamos colocar o createdAt e o updatedAt dentro dele
e vamos usar o @@map() para renomear os nomes das tabelas

model Comment {
  id        String    @id @default(uuid())
  content   String
  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime? @updatedAt @map("updated_at")

  @@map("comments")
}

model Attachment {
  id    String @id @default(uuid())
  title String
  url   String

  @@map("attachments")
}

agora nos vamos criar os relacionamentos. um comentario sempre vai ter um author e ese authornvai ser o user entéao se a gente colocar author User e salvar ele cria o relacionamento
mas a gente muda o userId por author Id e agente faz um map para usar o underline nos coments então adiciona isso:
  author User   @relation(fields: [authorId], references: [id])
  authorId String @map("author_id")
  vaos subir o authorId para cima so para ele ficar junto com os outros atributos
  em user ele criou o relacionamento inverso então a gente so precisa troca de Comment para comments para ficar no padrão fica assim:
  model User {
  id        String     @id @default(uuid())
  name      String
  email     String     @unique
  password  String
  role      UserRole   @default(STUDENT)
  questions Question[]
  answers   Answer[]
  comments   Comment[]

  @@map("users")
}

agora precisamos criar os relacionamentos do comentario a pergunta e a resposta. e é interessante que tanto o anexo quanto o comentario podem pertecer tanto a pegunta quanto aresposta
tem varias formas de resolver isso. uma das formas é o polimorfismo em que uma classe atende a propositos diferentes e no contexto de banco de dados a gente pode pensar em uma tabela que armazena dois tipos de informações que é o nosso caso com os comentarios que podem ser tanto de uma resposta quanto de uma pergunta. porem como saber se é de pergunta ou resposta o que a gente faz geralmente é colocar um parentId String que vai armazenar o id da resposta ou da pergunta mas ainda assim a gente precisa ter uma forma de identificar se é pergunta ou resposta e ai a gente pode ter um parentType e ai a gente cria um enum como comentType para ser question ou answer

enum CommentType {
  QUESTION
  ANSWER
}

model Comment {
  id        String    @id @default(uuid())
  content   String
  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime? @updatedAt @map("updated_at")
  authorId  String    @map("author_id")

  parentId   String
  parentType CommentType

  porem isso traz alguns desafios porque a gente dessa forma por exemplo não pode atribuir esse parentId como se fosse uma foreing key porque uma foreing key representa apenas uma tabela e não duas então a gente teria que marcar essa parentId no maximo com um index. alem disso o prisma não lida muito bem com polimorfismo. então seria uma solução valida mas nos não vamos usar ela.
  como o comentario so vai ser relacionar com duas tabelas tem uma maneira mais facil de resolver. para resolver com polimorfismo so vameria a pena se fosse uma conexão com um numero muito grande de tabelas tipo umas 40
  a gente vai criar um relacionamento do comentario com a pergunta e vai colocar ele como opcional igual com o relacionamento para a answer a gente faz answer? Answer e question? Question
  e salvamos el vai criar os campoe e a gente ajusta onde eles ficam na tabele a efazemos o mapeamento para passar o underline fica assim:
  model Comment {
  id         String    @id @default(uuid())
  content    String
  createdAt  DateTime  @default(now()) @map("created_at")
  updatedAt  DateTime? @updatedAt @map("updated_at")
  authorId   String    @map("author_id")
  questionId String?   @map("question_id")
  answerId   String?   @map("answer_id")

  question Question? @relation(fields: [questionId], references: [id])
  answer   Answer?   @relation(fields: [answerId], references: [id])
  author   User      @relation(fields: [authorId], references: [id])

  @@map("comments")
}
com isso quando for um comentario de pergunta o que vai estar preenchido é o question Id não vai ser nulo e so de ver qual não esta nulo serve como o type
e agora vamos arrumar tambem os nomes nas tabelas de comments e de answer
  comments Comment[]

  e agora vamos fazer igual no attachment então vamos copiar o que colocarmos no comment no attachment para ele ficar assim:
  model Attachment {
  id         String  @id @default(uuid())
  title      String
  url        String
  questionId String? @map("question_id")
  answerId   String? @map("answer_id")

  question Question? @relation(fields: [questionId], references: [id])
  answer   Answer?   @relation(fields: [answerId], references: [id])

  @@map("attachments")
}

agora ao salvarmos a gente tem que ir corrigir o attachment nas tabelas de comment e answer para ficar assim:
attachment   Attachment[]

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  STUDENT
  INSTRUCTOR
}

model User {
  id        String     @id @default(uuid())
  name      String
  email     String     @unique
  password  String
  role      UserRole   @default(STUDENT)
  questions Question[]
  answers   Answer[]
  comments  Comment[]

  @@map("users")
}

model Question {
  id           String    @id @default(uuid())
  title        String
  slug         String    @unique
  content      String
  createdAt    DateTime  @default(now()) @map("created_at")
  updatedAt    DateTime? @updatedAt @map("updated_at")
  authorId     String    @map("author_id")
  bestAnswerId String?   @unique @map("best_answer_id")

  author     User    @relation(fields: [authorId], references: [id])
  bestAnswer Answer? @relation("bestAnswer", fields: [bestAnswerId], references: [id])

  answers    Answer[]
  comments   Comment[]
  attachment Attachment[]

  @@map("questions")
}

model Answer {
  id         String    @id @default(uuid())
  content    String
  createdAt  DateTime  @default(now()) @map("created_at")
  updatedAt  DateTime? @updatedAt @map("updated_at")
  authorId   String    @map("author_id")
  questionId String    @map("question_id")

  author       User         @relation(fields: [authorId], references: [id])
  bestAnswerOn Question?    @relation("bestAnswer")
  question     Question     @relation(fields: [questionId], references: [id])
  comments     Comment[]
  attachment   Attachment[]

  @@map("answers")
}

model Comment {
  id         String    @id @default(uuid())
  content    String
  createdAt  DateTime  @default(now()) @map("created_at")
  updatedAt  DateTime? @updatedAt @map("updated_at")
  authorId   String    @map("author_id")
  questionId String?   @map("question_id")
  answerId   String?   @map("answer_id")

  question Question? @relation(fields: [questionId], references: [id])
  answer   Answer?   @relation(fields: [answerId], references: [id])
  author   User      @relation(fields: [authorId], references: [id])

  @@map("comments")
}

model Attachment {
  id         String  @id @default(uuid())
  title      String
  url        String
  questionId String? @map("question_id")
  answerId   String? @map("answer_id")

  question Question? @relation(fields: [questionId], references: [id])
  answer   Answer?   @relation(fields: [answerId], references: [id])

  @@map("attachments")
}

a pagina toda fica assim
:
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  STUDENT
  INSTRUCTOR
}

model User {
  id        String     @id @default(uuid())
  name      String
  email     String     @unique
  password  String
  role      UserRole   @default(STUDENT)
  questions Question[]
  answers   Answer[]
  comments  Comment[]

  @@map("users")
}

model Question {
  id           String    @id @default(uuid())
  title        String
  slug         String    @unique
  content      String
  createdAt    DateTime  @default(now()) @map("created_at")
  updatedAt    DateTime? @updatedAt @map("updated_at")
  authorId     String    @map("author_id")
  bestAnswerId String?   @unique @map("best_answer_id")

  author     User    @relation(fields: [authorId], references: [id])
  bestAnswer Answer? @relation("bestAnswer", fields: [bestAnswerId], references: [id])

  answers    Answer[]
  comments   Comment[]
  attachment Attachment[]

  @@map("questions")
}

model Answer {
  id         String    @id @default(uuid())
  content    String
  createdAt  DateTime  @default(now()) @map("created_at")
  updatedAt  DateTime? @updatedAt @map("updated_at")
  authorId   String    @map("author_id")
  questionId String    @map("question_id")

  author       User         @relation(fields: [authorId], references: [id])
  bestAnswerOn Question?    @relation("bestAnswer")
  question     Question     @relation(fields: [questionId], references: [id])
  comments     Comment[]
  attachment   Attachment[]

  @@map("answers")
}

model Comment {
  id         String    @id @default(uuid())
  content    String
  createdAt  DateTime  @default(now()) @map("created_at")
  updatedAt  DateTime? @updatedAt @map("updated_at")
  authorId   String    @map("author_id")
  questionId String?   @map("question_id")
  answerId   String?   @map("answer_id")

  question Question? @relation(fields: [questionId], references: [id])
  answer   Answer?   @relation(fields: [answerId], references: [id])
  author   User      @relation(fields: [authorId], references: [id])

  @@map("comments")
}

model Attachment {
  id         String  @id @default(uuid())
  title      String
  url        String
  questionId String? @map("question_id")
  answerId   String? @map("answer_id")

  question Question? @relation(fields: [questionId], references: [id])
  answer   Answer?   @relation(fields: [answerId], references: [id])

  @@map("attachments")
}

agora a gente pode rodar a migration
npx prisma migrate dev
com o docker rodando.
ele vai pedir um nome a gente diz create comments and attachments
e depois disso a tabela vai funcionar agora com todas essas tabaleas.

# criando mappers do prisma
vamos agora criar os mappers que estão faltando paraa nossa aplicação
o objetivo do mapper é alterar ou converter uma entidade da camada de dominio para uma entidade de persistencia como o banco de dados no nosso caso o prisma
não necessariamente cada entidade que a gente tem na camada de dominio vai representar uma tabela no banco de dados. como a gente viu por exemplo do questionComment ou answerComment que tem a mesma tabela
vamos criar lgo todos os arquivos e depois a gente vai enchendo eles
prisma-answer-mapper.ts
prisma-question-comment-mapper.ts
prisma-answer-comment-mapper.ts
prisma-answer-attachment-mapper.ts
prisma-question-attachment-mapper.ts

no answer a gente ja copia do question porque ele é bem parecido
substitui todos os question por qnswer. retira o plural do answer que vem do dominio porque ele esta salvo la sem o plural
e agora vamos substituir as coisas que são diferentes
retiramos o titulo e o bestAnswerID e o slug
a gente tem que ir la no answer e pssar o updated at nas props como possivelmente nulo assim:
export interface AnswerProps {
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date | null
  attachment: AnswerAttachmentList
}

e agra dicionamos na answer a questionId
questionId: new UniqueEntityId(raw.questionId),
e no toprisma a gente faz a mesma coisa tira os slug title e bestanswer e adiciona o question id
tiramos as importações desnecessarias e a pagina fia assim:
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Answer as PrismaAnswer, Prisma } from '@prisma/client'

export class PrismaAnswerMapper {
  static toDomain(raw: PrismaAnswer): Answer {
    return Answer.create(
      {
        content: raw.content,
        questionId: new UniqueEntityId(raw.questionId),
        authorId: new UniqueEntityId(raw.authorId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(answer: Answer): Prisma.AnswerUncheckedCreateInput {
    return {
      id: answer.id.toString(),
      authorId: answer.authorId.toString(),
      questionId: answer.questionId.toString(),
      content: answer.content,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    }
  }
}


copiamos ele e vamos para o qnswerCommentmapper subistituimos todos os answer por answerComment
a gente tem que mudar essa importação porque no prisma é uma unica tabela chamada comment e a gente vai importar como prismacomment então fica assim
import { Comment as PrismaComment, Prisma } from '@prisma/client'
ena entidade o nome do arquivo tem um - antre o answer e o comment fica assim:
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
no static toprisma a gente tem que mudar tambem para commentUnchecked e colocar a maisucula entre o prisma e o Comment
static toPrisma(
    answerComment: AnswerComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {

  agora vamos para as colunas do banco de dados para ver.
  a primeira coisa é que a nossa tabela no banco e dados é a comment e ela serve tanto para o answerComment quanto para o questionComment
  então dentro do raw a gente tem o answer e o questionID
  ambos são opcionais ou seja possivelmente nulos. porem se a gente estiver usando o prismaANSWER comment mapper o answer não pode ser nulo porque obviamente a gente vai estar lidando com uma answer
  então o que a gente pode fazer é logo colocar um se o raw.answerId néao existir a gente da um erro. e nesse caso a gente ta colocando um trhow error porque é um erro não esperado.
  export class PrismaAnswerCommentMapper {
  static toDomain(raw: PrismaComment): AnswerComment {
    if (!raw.answerId) {
      throw new Error('Invalid comment type')
    }
    agora a gente ta no return para criar o answercomment colocado nossas informações
    adicionamos o answerId e retiramos o questionID e dentro da entidade comment a gente coloca o null para o updatedAt
    export interface CommentsProps {
  authorId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date | null
}
agora vomtamos para o mapper e vamos para o metodo toPRisma e agora a gente saber que a gente vai ter sempre o answerId porque se néao teria dado erro.
entéao a gente substitui o questionId pelo answer id e a pagina toda fica assim:
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { Comment as PrismaComment, Prisma } from '@prisma/client'

export class PrismaAnswerCommentMapper {
  static toDomain(raw: PrismaComment): AnswerComment {
    if (!raw.answerId) {
      throw new Error('Invalid comment type')
    }
    return AnswerComment.create(
      {
        content: raw.content,
        authorId: new UniqueEntityId(raw.authorId),
        answerId: new UniqueEntityId(raw.answerId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    answerComment: AnswerComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
      answerId: answerComment.answerId.toString(),
      content: answerComment.content,
      createdAt: answerComment.createdAt,
      updatedAt: answerComment.updatedAt,
    }
  }
}

vamos agora para a questionCommentsmapper e colamos esse mapper da answerComments e substituimos todos os answer por question e ja ta pronto ele fica assim:
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { Comment as PrismaComment, Prisma } from '@prisma/client'

export class PrismaQuestionCommentMapper {
  static toDomain(raw: PrismaComment): QuestionComment {
    if (!raw.questionId) {
      throw new Error('Invalid comment type')
    }
    return QuestionComment.create(
      {
        content: raw.content,
        authorId: new UniqueEntityId(raw.authorId),
        questionId: new UniqueEntityId(raw.questionId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    questionComment: QuestionComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
      questionId: questionComment.questionId.toString(),
      content: questionComment.content,
      createdAt: questionComment.createdAt,
      updatedAt: questionComment.updatedAt,
    }
  }
}

copiamos ele e vamos para o questionattachments colamos no questionattachment selecionamos todo o lugar que esta escrito comment e substituimos por attachment
porem no questionAttachlent a gente por enquanto vai deixar simples mas mais na frente a gente vai mecher mais. no attachment diferente do comentario a gente tem uma whatchedList a gente tem varias classes a classe do attachment e depois a question e answer attachmenent que são so para representar os relacionamentos do attachment com a pergunta ou resposta. então esse mapper que a gente ta fazendo agora ele vai ser so para essa classe do relacionamento a gente vai até tirar o metodo toPSrisma e deixar so o toDomain porque se a gente for no repositorio de attachmentsQuestion a gente não tem nenhum metodo para criar ou salvar a gente so tem de busca entéao a gente não tem metodo que precise que converta um atachment do dominio para a camada de persistencia porque a gente so tem os metodos de busca
a gente mantem a nossa tratativa de erro para o caso de não ter o question id
e cfriamos o questionAttachment passando apenas os dois id o attachment e o question id e do raw o attachmentId esta como simplismen,te id fica assim:
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaQuestionAttachmentMapper {
  static toDomain(raw: PrismaAttachment): QuestionAttachment {
    if (!raw.questionId) {
      throw new Error('Invalid attachment type')
    }
    return QuestionAttachment.create(
      {
        attachmentId: new UniqueEntityId(raw.id),
        questionId: new UniqueEntityId(raw.questionId),
      },
      new UniqueEntityId(raw.id),
    )
  }
}

copiamos isso e coamos no answerAttachment mapper e substituimos os questions por answer fica assim:
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: PrismaAttachment): AnswerAttachment {
    if (!raw.answerId) {
      throw new Error('Invalid attachment type')
    }
    return AnswerAttachment.create(
      {
        attachmentId: new UniqueEntityId(raw.id),
        answerId: new UniqueEntityId(raw.answerId),
      },
      new UniqueEntityId(raw.id),
    )
  }
}

# implementando os repositorios
agora vamos finalizar os repositorios
no prisma answers repository a gente coloca o construtor e tambem faz o metodo findById
export class PrismaAnswersRepository implements AnswersRepository {
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<Answer | null> {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id,
      },
    })
    if (!answer) {
      return null
    }

    return PrismaAnswerMapper.toDomain(answer)
  }
 o prosimo metodo fica assim:
   async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answer = await this.prisma.answer.findMany({
      where: { questionId },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return answer.map(PrismaAnswerMapper.toDomain)
  }
  e fazemos tambem o create save e delete pegando do questions e fazendo alterações fica tudo assim:
 import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaAnswerMapper } from '../mappers/prisma-answer-mapper'
import { PaginationParams } from '@/core/repositories/pagination-params'

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<Answer | null> {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id,
      },
    })
    if (!answer) {
      return null
    }

    return PrismaAnswerMapper.toDomain(answer)
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answer = await this.prisma.answer.findMany({
      where: { questionId },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return answer.map(PrismaAnswerMapper.toDomain)
  }

  async create(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)
    await this.prisma.answer.create({
      data,
    })
  }

  async delete(answer: Answer): Promise<void> {
    await this.prisma.answer.delete({ where: { id: answer.id.toString() } })
  }

  async save(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)
    await this.prisma.answer.update({
      where: { id: data.id },
      data,
    })
  }
}

no delete a gente nem precisa entrar pelo mapper por que ele so vai deletar e nao vai salvar nada.

vamos para o questionComments e vamos fazendo as mesmas coisas com os mesmos metodos
a pagina fica assim:
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionCommentMapper } from '../mappers/prisma-question-comment-mapper'

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    })

    if (!questionComment) {
      return null
    }
    return PrismaQuestionCommentMapper.toDomain(questionComment)
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[]> {
    const questionsComment = await this.prisma.comment.findMany({
      where: { questionId },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questionsComment.map(PrismaQuestionCommentMapper.toDomain)
  }

  async create(questionComment: QuestionComment): Promise<void> {
    const data = PrismaQuestionCommentMapper.toPrisma(questionComment)
    await this.prisma.comment.create({
      data,
    })
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    await this.prisma.comment.delete({
      where: { id: questionComment.id.toString() },
    })
  }
}

par ao prisma answerComment a gente pode copiar todos os metodos e o contructoe do questionComments e colar e deve fucnionar depois de substituir wuestion por answer e importar as dependencias. a pagina fica assim:
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaAnswerCommentMapper } from '../mappers/prisma-answer-comment-mapper'

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    })

    if (!answerComment) {
      return null
    }
    return PrismaAnswerCommentMapper.toDomain(answerComment)
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const answersComment = await this.prisma.comment.findMany({
      where: { answerId },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return answersComment.map(PrismaAnswerCommentMapper.toDomain)
  }

  async create(answerComment: AnswerComment): Promise<void> {
    const data = PrismaAnswerCommentMapper.toPrisma(answerComment)
    await this.prisma.comment.create({
      data,
    })
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    await this.prisma.comment.delete({
      where: { id: answerComment.id.toString() },
    })
  }
}

agora o prisma question attachments fica assim:
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionAttachmentMapper } from '../mappers/prisma-question-attachment-mapper'

@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const questionAttachments = await this.prisma.attachment.findMany({
      where: { questionId },
    })
    return questionAttachments.map(PrismaQuestionAttachmentMapper.toDomain)
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: { questionId },
    })
  }
}

e o answer attachmentsfica assim
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaAnswerAttachmentMapper } from '../mappers/prisma-answer-attachment-mapper'

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answerAttachments = await this.prisma.attachment.findMany({
      where: { answerId },
    })
    return answerAttachments.map(PrismaAnswerAttachmentMapper.toDomain)
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: { answerId },
    })
  }
}

com isso todos os repositorios estão implementados.

# controller buscar pergunta por slug
não é realmente necessario ter um controller para cada caso de uso. as vezes podemos ter dois controllers chamando o mesmo caso de uso ou um controller que cama diversso casos de uso. mas aqui vamos fazer um controller para o buscar pergunta por slug
vamos criar get-question-by-slug.controller.ts
colamos nele o fetchrecentquestion controllers e tiramos todos os parametros no endereço a gente bota /question/:slug para ser um roadparam assim como a genre quer uma unica pergunra a gente coloca o slug da perguna que queremos buscar

@Controller('/questions/:slug')

e agoraa gente seleciona o listRecentQuestions e substitui por getQuestionBySlug e mudamos tambem o nome do controller
a gente não tem parametro query mas tem roadParams entéo na minha que tem os query a gente vai substituir
ao invez de @querry vamos usar o @param e a gente pega o slug no lugar do page

  @Get()
  async handle(@Param('slug') slug: string) {

    agora no execute a gente passa o slug como parametro

    se der left da o mesmo erro de badrequest e se não a gente retorna uma unica question usando o questionPresenterToHttp result value quetion
    fica assim:
    import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { QuestionPresenter } from '../presenters/question-presenter'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlug: GetQuestionBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlug.execute({
      slug,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { questions: QuestionPresenter.toHTTP(result.value.question) }
  }
}

agora podemos fazer o teste get-question-by-slug.controller.e2e-spec.ts
vamos copiar nele o teste do fetch
mudamos o nome para get question by slug no describe e o nome do teste
  test('[get]/questions/:slug', async () => {
    o teste segue o mesmo padrão de criar um usuario e autenticar e na hora da pergunta como precisamos de uma so a gente pode mudar o metodo para create e passar uma so
    e tambem a hora de buscar a pergunra a gente passa o slugda pergunta no endereço fica assim:
      await prisma.question.create({
      data: {
        title: 'Question 01',
        content: 'This is the question',
        slug: 'question-01',
        authorId: user.id,
      },
    })

    const response = await request(app.getHttpServer())
      .get('/questions/question-01')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

e a gente espera que o resultado seja 200 e que no body vai vir apenas uma unica pergunta e a gente pode usar o expect objetc containing title question01 fica assim o teste todo:
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('get question by slug - tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[get]/questions/:slug', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Jhon Doe',
        email: 'jhon@doe.com',
        password: await hash('123456', 8),
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    await prisma.question.create({
      data: {
        title: 'Question 01',
        content: 'This is the question',
        slug: 'question-01',
        authorId: user.id,
      },
    })

    const response = await request(app.getHttpServer())
      .get('/questions/question-01')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      question: expect.objectContaining({ title: 'Question 01' }),
    })
  })
})

e agora vamos no http comule e vamos importar o novo controller e o caso de uso getquestionBy slug controller e useCase fica assim:
import { Module } from '@nestjs/common'
import { AutenticateController } from './controllers/autentication-controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/prisma/database.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { ListRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/list-recent-questions'
import { AutenticateStudentUseCase } from '@/domain/forum/application/use-cases/autenticate-student'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AutenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
  ],
  providers: [
    CreateQuestionUseCase,
    ListRecentQuestionsUseCase,
    AutenticateStudentUseCase,
    RegisterStudentUseCase,
    GetQuestionBySlugUseCase,
  ],
})
export class HttpModule {}

e no caso de uso a gente coloca o injectable assim:

@Injectable()
export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({

agora a gente poderia criar no packageJson um pscript testE2E:watch para manter rodanto 
   "test:e2e:watch": "vitest --config ./vitest.config.e2e.ts",

   o legal do watch é que ele fica observando os tentes que são alterados e ai ele so roda de novo os que são alterados e não todos.
   
  # factories 

  como nos vamos fazer varios testes para os controles de agora em diante nos vamos ter que criar factories 
  enas que a gente tem estamos criando entidades a nivel de camada de dominio e não de persistencia
  então se a gente quisesse usar as factories nos nossos testes a gente teria que criar usando a factory e depois converter ela usando o mapper
  para não ficar fazendo isso sempre a gente poderia ter uma função dentro do factory que ja fizesse isso na camada de persistencia tambem ou seja o factory poderia ser usado tanto para dominio quanto para persistencia
  então vamos começar com o make student
  porem para ter acesso ao banco de dados a gente precisa do prisma service. então a gente vai criar uma classe
  e vamos exportar ela e usar o injectable nela
  a gente vai ter o construtor nela para pegar o prisma e a gentevai criar um unco metodo nela
  esse metodo vai receber um data que vai ser um objeto vazio e vai ter como tipo o partial student props como o outro metodo que vai para a entidade e ele vai devolver um Student da etidade fica assim
  async makePrismaStudent(data: Partial<StudentProps> = {}): Promise<Student> {}

  e la dentro da função a gente vai fazer uma const student para ser igual a utilização da função makestudent de cima desse proprio arquivo e depois no retorno a gente passa ela pelo mapper e salva ela no prisma
  fica assim:
  
@Injectable()
export class StudentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaStudent(data: Partial<StudentProps> = {}): Promise<Student> {
    const student = makeStudent(data)

    await this.prisma.user.create({
      data: PrismaStudentsMapper.toPrisma(student),
    })

    return student
  }
}

e a pagina toda fica assim
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import {
  Student,
  StudentProps,
} from '@/domain/forum/enterprise/entities/student'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaStudentsMapper } from '@/infra/database/prisma/mappers/prisma-students-mapper'

export function makeStudent(
  override: Partial<StudentProps> = {},
  id?: UniqueEntityId,
) {
  const student = Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return student
}

@Injectable()
export class StudentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaStudent(data: Partial<StudentProps> = {}): Promise<Student> {
    const student = makeStudent(data)

    await this.prisma.user.create({
      data: PrismaStudentsMapper.toPrisma(student),
    })

    return student
  }
}


e se a gente for para o teste de getQuestion by slug por exemplo onde a gente cria um student a gente tem la em cima o createTEstModule isso é um modulo que tem providers
   const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    é so a gente passar o pra ele o privider e nele passar a classe que a gente criou
     beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [StudentFactory],
    }).compile()

    e agora a gente pode da mesma forma que pegamos o prisma ou o jwt pegar o factory usando o let e tambem depois a gente pega ele de dentro do contexto do modulo usando p moduleref.get
    describe('get question by slug - tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [StudentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })
  e agora a gente pode usar a factory  no lugar de criar o usuario da forma que estamos cfriando.
  aconst user vai ser apenas um await studentFactory.makeStudentPrisma
    test('[get]/questions/:slug', async () => {
    const user = await studentFactory.makePrismaStudent()
    e agora essa const user vai ser um Student da camada de dominio então para pegar o id dele a gente tem que passar o toString
        const accessToken = jwt.sign({ sub: user.id.toString() })
         await prisma.question.create({
      data: {
        title: 'Question 01',
        content: 'This is the question',
        slug: 'question-01',
        authorId: user.id.toString(),
      },
    })

    porem se a gente tentar rodar os testes vai falhar porque o prismaService néao faz parte do roottestModule

esse erro acontece porque o studentFactory depende do prismaService mas p prismaService não esta presente nesse module. se a gente olhar no teste a gente importa o appmodule que importa o httpmodule o httpmodule importa o databaseModule e esse databasemodule possui o prismaservice.
so que esse prisma service aqui esta sendo exportado somente para o httpmodule ou seja para o module imediatamente acima dele
e não para os outros
então se a gente quer usar o prisma tambem no nosso teste a gente precisa nos imports importar tambem o databasemodule
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory],
    }).compile()

    e se a gente colocar isso e rodar o teste ai sim ele vai passar.
    agora vamos fazer parecido com o makeQuestion a gente copia essa parte do makestudent
    @Injectable()
export class StudentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaStudent(data: Partial<StudentProps> = {}): Promise<Student> {
    const student = makeStudent(data)

    await this.prisma.user.create({
      data: PrismaStudentsMapper.toPrisma(student),
    })

    return student
  }
}


vamos no makequestion e colamos isso e substituimos o student por question fazemos as importações e substituimos o user por question fica assim:

import {
  QuestionProps,
  Questions,
} from '@/domain/forum/enterprise/entities/questions'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaQuestionMapper } from '@/infra/database/prisma/mappers/prisma-question-mapper'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) {
  const question = Questions.create(
    {
      title: faker.lorem.sentence(),
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}

@Injectable()
export class QuestionFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestion(
    data: Partial<QuestionProps> = {},
  ): Promise<Questions> {
    const question = makeQuestion(data)

    await this.prisma.question.create({
      data: PrismaQuestionMapper.toPrisma(question),
    })

    return question
  }
}

agora voltamos la no nosso teste e trazemos tambem o makeuqestion da mesma forma que a gente trouxe o make student e ai a gente faz a question usando esse metodo
   await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

passamos o author id porque as questions precisam ser acossiadas a um author
e o slug a gente passa de uma maneira fixa tambem para poder ter acesso a ele nos parametros de session e tambem passamos o title porque nos vamos esperar esse titlo no nosso expect
 await questionFactory.makePrismaQuestion({
      authorId: user.id,
      slug: Slug.create('question-01'),
      title: 'Question 01',
    })

    a pagina fica assim e se a gente rodar os testes tudo deve funcionar:
    import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

describe('get question by slug - tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[get]/questions/:slug', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    await questionFactory.makePrismaQuestion({
      authorId: user.id,
      slug: Slug.create('question-01'),
      title: 'Question 01',
    })

    const response = await request(app.getHttpServer())
      .get('/questions/question-01')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      questions: expect.objectContaining({ title: 'Question 01' }),
    })
  })
})

## refatorando testes e2e

agora que a gente vai fazer esse tipo de factory 
vamos no fetch recent question test e nele a gente faz criação de user e question entéoa com as factories que a gente tem da pra fazer a refatoração
no cabeçalho a gente faz igul nos outros codigos e para fazer o user tambem para fazer varias questions a gente pode usar o Promisse.all e fazer assim:
e passamos um titulo diferente para cada uma

    await Promise.all([
      questionFactory.makePrismaQuestion({
        authorId: user.id,
        title: 'Question 01',
      }),
      questionFactory.makePrismaQuestion({
        authorId: user.id,
        title: 'Question 02',
      }),
      questionFactory.makePrismaQuestion({
        authorId: user.id,
        title: 'Question 03',
      }),
      questionFactory.makePrismaQuestion({
        authorId: user.id,
        title: 'Question 04',
      }),
    ])

    com isso o codigo ja funciona e podemos remover tambem as mensoes ao prisma dos testes tanto do fetch quando do get by slug então a pagina completa do fetch fica assim:
    import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

describe('Fetch recent questions -tests (e2e)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[get]/questions', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    await Promise.all([
      questionFactory.makePrismaQuestion({
        authorId: user.id,
        title: 'Question 01',
      }),
      questionFactory.makePrismaQuestion({
        authorId: user.id,
        title: 'Question 02',
      }),
      questionFactory.makePrismaQuestion({
        authorId: user.id,
        title: 'Question 03',
      }),
      questionFactory.makePrismaQuestion({
        authorId: user.id,
        title: 'Question 04',
      }),
    ])

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: 'Question 01' }),
        expect.objectContaining({ title: 'Question 02' }),
        expect.objectContaining({ title: 'Question 03' }),
        expect.objectContaining({ title: 'Question 04' }),
      ],
    })
  })
})

vamos agora fazer o mesmo no createquestion controller test
e fazemos igual nesse a gente so precisa do student então fica assim:
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { StudentFactory } from 'test/factories/make-student'

describe('Create questions tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    studentFactory = moduleRef.get(StudentFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST]/questions', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .post('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Question',
        content: 'This is the question',
      })

    expect(response.statusCode).toBe(201)

    const QuestionOnDatabase = prisma.question.findFirst({
      where: {
        title: 'Question',
      },
    })

    expect(QuestionOnDatabase).toBeTruthy()
  })
})

e o crete account não precisa de factory então vamos para o autenicate
nele a gente cria o student usando o factory mas passamos o email e o password usando o hash assim:
  await studentFactory.makePrismaStudent({
      email: 'jhon@doe.com',
      password: await hash('123456', 8),
    })

ele fica assim:
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { StudentFactory } from 'test/factories/make-student'

describe('Autenticate tests (e2e)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    studentFactory = moduleRef.get(StudentFactory)

    await app.init()
  })

  test('[POST]/sessions', async () => {
    await studentFactory.makePrismaStudent({
      email: 'jhon@doe.com',
      password: await hash('123456', 8),
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'jhon@doe.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})

com isso refatoramos todos os testes autentication createquestion fetch recent question e getquestionby slug . agora a gente pode criar mais factories
vamos no makequestion e copiamos aquela parte da classe e vamos para o makeAnser
fica asim:
import { AnswerProps, Answer } from '@/domain/forum/enterprise/entities/answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaAnswerMapper } from '@/infra/database/prisma/mappers/prisma-answer-mapper'

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId,
) {
  const answer = Answer.create(
    {
      questionId: new UniqueEntityId(),
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer
}

@Injectable()
export class AnswerFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAnswer(data: Partial<AnswerProps> = {}): Promise<Answer> {
    const answer = makeAnswer(data)

    await this.prisma.answer.create({
      data: PrismaAnswerMapper.toPrisma(answer),
    })

    return answer
  }
}

ja alterando os question pelos answer mas com cuidado por conda do questionId que precisa se manter question id na função anterior

agora vamos de novo copiar essa classe do answerFactory colamos no questionComment e todo lugar que esta escrito answer a gnte troca por questionComment
e toma cuidado que no prisma. é so comment e não questionComment
fica assim:
import {
  QuestionComment,
  QuestionCommentsProps,
} from '@/domain/forum/enterprise/entities/question-comment'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaQuestionCommentMapper } from '@/infra/database/prisma/mappers/prisma-question-comment-mapper'

export function makeQuestionComment(
  override: Partial<QuestionCommentsProps> = {},
  id?: UniqueEntityId,
) {
  const questionComment = QuestionComment.create(
    {
      questionId: new UniqueEntityId(),

      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return questionComment
}

@Injectable()
export class QuestionCommentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestionComment(
    data: Partial<QuestionCommentsProps> = {},
  ): Promise<QuestionComment> {
    const questionComment = makeQuestionComment(data)

    await this.prisma.comment.create({
      data: PrismaQuestionCommentMapper.toPrisma(questionComment),
    })

    return questionComment
  }
}
copiamos isso e vamos no answercomment fica assim:
import {
  AnswerComment,
  AnswerCommentsProps,
} from '@/domain/forum/enterprise/entities/answer-comment'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaAnswerCommentMapper } from '@/infra/database/prisma/mappers/prisma-answer-comment-mapper'

export function makeAnswerComment(
  override: Partial<AnswerCommentsProps> = {},
  id?: UniqueEntityId,
) {
  const answerComment = AnswerComment.create(
    {
      answerId: new UniqueEntityId(),

      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answerComment
}

@Injectable()
export class AnswerCommentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAnswerComment(
    data: Partial<AnswerCommentsProps> = {},
  ): Promise<AnswerComment> {
    const answerComment = makeAnswerComment(data)

    await this.prisma.comment.create({
      data: PrismaAnswerCommentMapper.toPrisma(answerComment),
    })

    return answerComment
  }
}

com isso a gente finaliza essa parte e agora vamos criar os demais controllers da aplicação.

# controller editar pergunta

vamos criar o arquivo edit-question-controller.ts e tambem o de teste dele com .e2e-spec.ts
colamos nele o controller de createquestion e substituimos o create por edit
mudamos a rota para pegar o id question/:id
trocamos de post para put mudamos o httpcode para 204
 @HttpCode(204)
 porque como não retornamos nenhuma respsota é melhor usar 204 do que 200
 pegamos o parametro id e camamos ele de questionID   async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: EditQuestionBodySchema,
    @Param('id') questionId: string,
    passamos o id para o result na chamada do caso de uso
     const result = await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentIds: [],
      questionId,
    })
     e pronto fica assim:
     import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jtw.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'

const editQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editQuestionBodySchema)

type EditQuestionBodySchema = z.infer<typeof editQuestionBodySchema>

@Controller('/questions/:id')
export class EditQuestionController {
  constructor(private editQuestion: EditQuestionUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: EditQuestionBodySchema,
    @Param('id') questionId: string,
  ) {
    const { title, content } = body
    const userId = user.sub

    const result = await this.editQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentIds: [],
      questionId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

agora vamos  n http module e importamos o controller e o caso de uso
import { Module } from '@nestjs/common'
import { AutenticateController } from './controllers/autentication-controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/prisma/database.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { ListRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/list-recent-questions'
import { AutenticateStudentUseCase } from '@/domain/forum/application/use-cases/autenticate-student'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { EditQuestionController } from './controllers/edit-question-controller'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AutenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
  ],
  providers: [
    CreateQuestionUseCase,
    ListRecentQuestionsUseCase,
    AutenticateStudentUseCase,
    RegisterStudentUseCase,
    GetQuestionBySlugUseCase,
    EditAnswerUseCase,
  ],
})
export class HttpModule {}

e vamos la no caso de uso colocar o injectable

@Injectable()
export class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentRepository: QuestionAttachmentsRepository,
  ) {}

  e agora vamos em todos os repositorios e trocamos as interfaces por classes abstratas pelo mesmo motivo que a gente fez um pouco antes
  import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export abstract class AnswerAttachmentsRepository {
  abstract findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  abstract deleteManyByAnswerId(answerId: string): Promise<void>
}

import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../../enterprise/entities/answer-comment'

export abstract class AnswerCommentsRepository {
  abstract findById(id: string): Promise<AnswerComment | null>
  abstract findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>

  abstract create(answerComment: AnswerComment): Promise<void>
  abstract delete(answerComment: AnswerComment): Promise<void>
}

import { PaginationParams } from '@/core/repositories/pagination-params'
import { Answer } from '../../enterprise/entities/answer'

export abstract class AnswersRepository {
  abstract findById(id: string): Promise<Answer | null>
  abstract findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>

  abstract create(answer: Answer): Promise<void>
  abstract delete(answer: Answer): Promise<void>
  abstract save(answer: Answer): Promise<void>
}

import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export abstract class QuestionAttachmentsRepository {
  abstract findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]>

  abstract deleteManyByQuestionId(questionId: string): Promise<void>
}

import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-comment'

export abstract class QuestionCommentsRepository {
  abstract findById(id: string): Promise<QuestionComment | null>
  abstract findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>

  abstract create(questionComment: QuestionComment): Promise<void>
  abstract delete(questionComment: QuestionComment): Promise<void>
}


pronto todos agora estão feitos lembrando ue esses repositorios estão na caada de dominio
agora no database module a gente tinha feito o provide e useClass para quando um repositorio precisar de um contrato a gente usar a classe que a gente designa. vamos faaeer isso tambem para os demais repositorios então vamos no database module e nos exports a gente tira o prisma da frente do repositorios a pagina fica assim:
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaAnswerAttachmentsRepository } from './repositories/prisma-answer-attachments-repository'
import { PrismaAnswersRepository } from './repositories/prisma-answers-repository'
import { PrismaAnswerCommentsRepository } from './repositories/prisma-answer-comments-repository'
import { PrismaQuestionAttachmentsRepository } from './repositories/prisma-question-attachments-repository'
import { PrismaQuestionCommentsRepository } from './repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepository } from './repositories/prisma-questions-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentsRepository } from './repositories/prisma-students-repository'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'

@Module({
  providers: [
    PrismaService,
   { provide: AnswerAttachmentsRepository,
    useClass: PrismaAnswerAttachmentsRepository,}
   { provide:AnswersRepository ,
    useClass: PrismaAnswersRepository,}
   { provide:AnswerCommentsRepository ,
    useClass: PrismaAnswerCommentsRepository,}
   { provide:QuestionAttachmentsRepository,
    useClass: PrismaQuestionAttachmentsRepository,}
   { provide:QuestionCommentsRepository,
    useClass: PrismaQuestionCommentsRepository, },
    { provide: QuestionsRepository, useClass: PrismaQuestionsRepository },
    { provide: StudentsRepository, useClass: PrismaStudentsRepository },
  ],
  exports: [
    PrismaService,
    AnswerAttachmentsRepository,
    AnswersRepository,
    AnswerCommentsRepository,
    QuestionAttachmentsRepository,
    QuestionCommentsRepository,
    QuestionsRepository,
    StudentsRepository,
  ],
})
export class DatabaseModule {}


agora vamos criar o teste vamos copiar o teste do create question
a gente cria a pergunta ega o id dessa pergunta, muda para put e passa o id da pergunta. e editamos ela para new title e new content
fica assim:

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

describe('Edit questions tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    questionFactory = moduleRef.get(QuestionFactory)
    studentFactory = moduleRef.get(StudentFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[Put]/questions/:id', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const questionId = question.id.toString()

    const response = await request(app.getHttpServer())
      .put(`/questions/${questionId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'New Title',
        content: 'New Content',
      })

    expect(response.statusCode).toBe(204)

    const QuestionOnDatabase = prisma.question.findFirst({
      where: {
        title: 'New Title',
        content: 'New Content',
      },
    })

    expect(QuestionOnDatabase).toBeTruthy()
  })
})


porem tem um erro no teste de fetch que a gente cria as questions com promisse all e as vezes ele cria forta da ordem e no nosso expect a gente esta esperando que venha em uma ordem especifica então vamos mudar o nosso expect que estava assim:
   expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: 'Question 01' }),
        expect.objectContaining({ title: 'Question 02' }),
        expect.objectContaining({ title: 'Question 03' }),
        expect.objectContaining({ title: 'Question 04' }),
      ],
    })

    para ao invez de eseprar um array assim qe ee vai na ordem a gent" pode fazer um expect array containing qiue ai ele vai validar se o array tem essas coisas independente da ordem assim:
        expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      questions: expect.arrayContaining([
        expect.objectContaining({ title: 'Question 01' }),
        expect.objectContaining({ title: 'Question 02' }),
        expect.objectContaining({ title: 'Question 03' }),
        expect.objectContaining({ title: 'Question 04' }),
      ]),
    })
  })
})


no create question test tem um erro. o userId tem que colocar toString()

## delete question controller
vamos criar o controller de delete-question.controller.ts e tambem o seu teste. lembrando que entre o nome e a palavra controller é separado com . verificar todos se estão assim.
nos vamos copiar e colar nele o edit question e vamos delear a parte de body e validação dele o decorator tem que ser delete o http code pode ser 204
a url continua sendo :id selecionamos todos os edit e trocamos por delete
e para deletar a qustion a gente precisa do do questionId e do author ID
o controller fica assim:
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jtw.strategy'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'

@Controller('/questions/:id')
export class DeleteQuestionController {
  constructor(private deleteQuestion: DeleteQuestionUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') questionId: string,
  ) {
    const userId = user.sub

    const result = await this.deleteQuestion.execute({
      authorId: userId,
      questionId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}


agora vamos para o teste
a gente copia o teste do edit e cola nele.
a gente deixa a parte de criar usuario e a question porem em baixo a gente chama o metodo delete e passa para ele o questionId e o authorID pelos params de autentificação com o userToken o nosso controller vai ter acesso ao author Id e com o params id a question Id
 const response = await request(app.getHttpServer())
      .delete(`/questions/${questionId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({})

e agora o codigo é 204 e quesremos validar que a pergunta nãoesta mais no banco de dados
então a gente da um findUnique e passa o id que é o id que a gente usou nos params para deletar
 const QuestionOnDatabase = prisma.question.findUnique({
      where: {
        id: questionId,
      },
    })

    e ai a gente quer que ele não esteja então a gente exppect o questionOnDatabase to be null
p teste fica assim:
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

describe('Delete questions tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    questionFactory = moduleRef.get(QuestionFactory)
    studentFactory = moduleRef.get(StudentFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[DELETE]/questions/:id', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const questionId = question.id.toString()

    const response = await request(app.getHttpServer())
      .delete(`/questions/${questionId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({})

    expect(response.statusCode).toBe(204)

    const QuestionOnDatabase = prisma.question.findUnique({
      where: {
        id: questionId,
      },
    })

    expect(QuestionOnDatabase).toBeNull()
  })
})

    agora temos que ir no httpmodule e cadastrar o controller.
    a gente vai e colocar o deletequestioncontroller na arte de controllers e o deletequestionUseCase na parte de providers e vamos la no arquivo do useCase e colocamos ele como @Injectable()

## answer question controller

agora vamos para o controller de responder uma pergunta 
vamos criar o qrauivo answer-question.controller.ts
copiamos nele o create question que é mais proximo do que vamos fazer
e a rota dele vai ser /questions/:questionId/answers
@Controller('/questions/:questionId/answers')
isso porque toda resposta vai ser a resposta de uma pergunta então é legal a pergunta estar na url a gente usa o questionId e não so Id porque temos um recurso encadeado o id não vai ser da resposta e a informação principal nesse caso é a reposta então se a gente colocasse so Id a gente poderia pensar que é o id da resposta mas na verdade é o id da pergunta então é melhor expeficiar que é o questionId
a gente pode mais pra frente ter o id assim quando formos tratar de pegar o id da resposta /questions/:questionId/answers/id
mas podemos tambem padronizar para sempre usar id com prefixo para ficar bem claro de qual id a gente esta tratando.
que é o questionId e a gente vai deixar esse nome e fazer ele ser uma string
 async handle(
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string

    o body a gente vai validar apenas com o content pq ele não precisa de titulo e todo os lugares que tem create question a gente vai trocar para answerQuestion e ajustamos a impotação do caso de uso
    a gente passa o questionId dentro da execute
    e o authorId esta dando erro porque la no useCase a gente esta recebendo como instructorId mas a gente vai mudar sso para authorId porque se parar para pensar um aluno tambem pode resposnder a pergunta de outro aluno e a gente aproveita e coloca logo o injectable nesse useCase ele fica assim:
    import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import { Injectable } from '@nestjs/common'

interface AnswerQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
  attachmentIds: string[]
}
type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>
@Injectable()
export class AnswerQuestionUseCase {
  constructor(private anwsersRepository: AnswersRepository) {}

  async execute({
    authorId,
    questionId,
    content,
    attachmentIds,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
    })
    const attachment = attachmentIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      })
    })

    answer.attachment = new AnswerAttachmentList(attachment)
    await this.anwsersRepository.create(answer)
    return right({ answer })
  }
}

voltamos para o controller
com isso o nosso controller fica bom ele fica assim:
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jtw.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'

const answerQuestionBodySchema = z.object({
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(answerQuestionBodySchema)

type AnswerQuestionBodySchema = z.infer<typeof answerQuestionBodySchema>

@Controller('/questions/:questionId/answers')
export class AnswerQuestionController {
  constructor(private answerQuestion: AnswerQuestionUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string,
    @Body(bodyValidationPipe) body: AnswerQuestionBodySchema,
  ) {
    const { content } = body
    const userId = user.sub

    const result = await this.answerQuestion.execute({
      questionId,
      content,
      authorId: userId,
      attachmentIds: [],
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}


podemos agora ir para a parte de teste
answer-question.controller.e2e-spec.ts
para o teste a gente vai copiar o editquestion
vamos muar o describe para answer question test
e o nome do teste fica sendo esse

  test('[POST]/questions/:questionId/answers', async () => {
    ai a gente cria um strudent e uma question e na parte da const response a gente troca para post e coloca o endereço correto pegando o questionId e depois a /ansers e enviamos apenas o conteudo new answer e esperamos um status 201
    e agora a gente vai procurar no database uma answer com esse conteudo que a gente criou de new answer e verificar se ela é truthy
    fica assim:
    import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

describe('Answer questions tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    questionFactory = moduleRef.get(QuestionFactory)
    studentFactory = moduleRef.get(StudentFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST]/questions/:questionId/answers', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const questionId = question.id.toString()

    const response = await request(app.getHttpServer())
      .post(`/questions/${questionId}/answers`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'New Answer',
      })

    expect(response.statusCode).toBe(201)

    const answerOnDatabase = prisma.answer.findFirst({
      where: {
        content: 'New Answer',
      },
    })

    expect(answerOnDatabase).toBeTruthy()
  })
})
 
 agora vamos no http module e adicionamos esse controller e o useCase.
 
 ## editar resposta controller
 vamos criar o arquivo edit-answer.controller.ts e tambem o seu teste
 e nele vamos copiar o edit question
 e no controller a gente muda o endereço para answers

 @Controller('/answers/:id')
 não faz sentido agora a gente colocar o /questionid porque para a gente qaui o questionId né:ao é uma informaçéao importante para editar uma resposta se a gente tem o id da resposta ja, é suficiente.
 agora trocamos todos os editQustion por Editanswer e ajustamos a importação
 a gente não precisa de title so content e não precisa do questionId então retiramos essas informações
e adicionamos o answerId

é ipmportante a gente notar que no nosso useCase a gente tem o erro de resourse not ound ou de not allowed. porem no nosso controller a gente não esta fazendo a tratativa desses erros. a gente so esta tendo um erro mais generico onde a gente não faz a validação para ver de que tipo é o erro. isso acontece porque esses erros especificos que temos no nosso useCase são bem raros, o erro de não existir a pergunta por exemplo não é uma questão que depende tanto da manipulação do usuario. ele teria que manipular muito errado, não é como errar uma senha que acontece sempre ou seja no controller a gente so faz a tratativa de erros que a gente espera que aconteça. não erros bem imporvaveis
o nosso controller fica assim:
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jtw.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'

const editAnswerBodySchema = z.object({
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editAnswerBodySchema)

type EditAnswerBodySchema = z.infer<typeof editAnswerBodySchema>

@Controller('/answers/:id')
export class EditAnswerController {
  constructor(private editAnswer: EditAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: EditAnswerBodySchema,
    @Param('id') answerId: string,
  ) {
    const { content } = body
    const userId = user.sub

    const result = await this.editAnswer.execute({
      content,
      authorId: userId,
      attachmentIds: [],
      answerId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

vamos agora para o teste e a gente cola nele o answerQuestion porque ele ja tem os factories entéao vai ser mais facil
mudamos o titulo para edit answer e o endereçono nome do test vamos precisar tambem do answer factory então a gente adiciona ele assim:
describe('Edit answer tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AnswerFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    questionFactory = moduleRef.get(QuestionFactory)
    studentFactory = moduleRef.get(StudentFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  agora a gente cria a question como ja estava fazendo e criamos tambem uma answer usando o factory e a answer tem que ter tanto um questionId valido quanto um authorId ela fica assim:
  
    const answer = await answerFactory.makePrismaAnswer({
      questionId: question.id,
      authorId: user.id,
    })
    e como a gente usa o question.id a gente pode apagar o questionId que a gente tinha criado porque ele estava e string e para passar para a criação da answer precisa estar em uuid
    se a gente deixasse gerar aultomaticamente ia dar erro porque no banco de dados a gente tem um relacionamento de foreing key
    agora a gente pega o answer ID
    e agora no resposnse a gente muda o metodo para put e coloca o novo endereço e um novo conteudo atualizado fica assim:
      const response = await request(app.getHttpServer())
      .put(`/answers/${answerId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'New edited Answer',
      })

e nos expects o resultado tem que ser 204 e o conteudo do answer no database tem que ser esse que a gente colocou o arquivo fica assim:
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AnswerFactory } from 'test/factories/make-answer'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

describe('Edit answer tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AnswerFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    questionFactory = moduleRef.get(QuestionFactory)
    studentFactory = moduleRef.get(StudentFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT]/answers/:id', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const answer = await answerFactory.makePrismaAnswer({
      questionId: question.id,
      authorId: user.id,
    })

    const answerId = answer.id.toString()

    const response = await request(app.getHttpServer())
      .put(`/answers/${answerId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'New edited Answer',
      })

    expect(response.statusCode).toBe(204)

    const answerOnDatabase = prisma.answer.findFirst({
      where: {
        content: 'New edited Answer',
      },
    })

    expect(answerOnDatabase).toBeTruthy()
  })
})

agora vamos la no httpmodules para passar o controller e o useCase e no useCase temos que colocar o injectable

## controller de deletar resposta
vamos criar o delete-answer.controller.ts e colar nele o delete question
trocamos todos os questions por answer e funciona fica assim:
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jtw.strategy'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'

@Controller('/answers/:id')
export class DeleteAnswerController {
  constructor(private deleteAnswer: DeleteAnswerUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string,
  ) {
    const userId = user.sub

    const result = await this.deleteAnswer.execute({
      authorId: userId,
      answerId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

agora copiamos o teste de delete question e colamos ele no delete-answer.controller.e2e-spec.ts
adicionamos o factory do answer e no teste a gente cria a answer passando o authorid e o questionId criamos tambem a const answerId
mudamos o endereço da chamada http
o codigo esperado é 204
 a const mudamos para answerOnDatabase procurando na table answer do prisma e onde o id é answerId
 e esperamos o restultado null
 fica assim:
 import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AnswerFactory } from 'test/factories/make-answer'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

describe('Delete answer tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AnswerFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    questionFactory = moduleRef.get(QuestionFactory)
    studentFactory = moduleRef.get(StudentFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[DELETE]/answer/:id', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })
    const answer = await answerFactory.makePrismaAnswer({
      authorId: user.id,
      questionId: question.id,
    })
    const answerId = answer.id.toString()

    const response = await request(app.getHttpServer())
      .delete(`/answers/${answerId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({})

    expect(response.statusCode).toBe(204)

    const answerOnDatabase = prisma.answer.findUnique({
      where: {
        id: answerId,
      },
    })

    expect(answerOnDatabase).toBeNull()
  })
})

agora novamente httpmodues adicionar o useCase e o controller e colocar o injectable no useCase

## listar resposta de perguntas
vamos fazer o arquivo fetch-question-answers.controller.ts
por enquanto a gente vai deixar o controller previamente criado mas no futuro vão ter alterações a fazer nele.
vamos colar nele o fetch-recent-question.ts
nos precisamos tambem pegar o id das perguntas então o nedereço é esse
@Controller('/questions/:questionId/answers')
vamos substituir todos os fetchRecentQuestion por fetchquestionAnswers e igual com o list para listQuestionsAnswers
pegamos o questionId pelo @Param
 async handle(
    @Query('page', queryValidationPipe) page: PageParamsTypeSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.listRecentQuestions.execute({
      page,
      questionId,
    })

    e embaixo eu pego a lista de answers e por enquanto a gente vai restronar as answer do jeito que elas estéao vidno do banco de dados. o que não é o ideial porque o ideial é ter presenter. porem esse presenter vai ter que ser um pouco mais detalhado nos queremos que na frente venha informaçãos como o author da resposta entéao a gente vai criar um presenter ainda sem ser o que ele vai ser no futuro. copiamos o presenter das questions e fazemos o arquivo answersPresenter substituimos question por answer e ajustamos a importação
    e ela vai ter id, conteudo e a data de criação e data de update
    por enquanto ela fica assim
    import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class AnswerPresenter {
  static toHTTP(answer: Answer) {
    return {
      id: answer.id.toString(),
      content: answer.content,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    }
  }
}


agora no teste a gente vai copiar o fetchRecent question e colar no teste de questionAnswer vamos precisar da answerFactory e o nome do teste é a rota assim:

  test('[get]/questions/:questionId/answers', async ()

  a gente então cria o usuario e a question e depois a answer vamos criar uma so question
  e a gente faz um promisse all depois para criar varias answers para a mesma pergunta assim:
  
    await Promise.all([
      answerFactory.makePrismaAnswer({
        authorId: user.id,
        questionId: question.id,
        content: 'Answer 01',
      }),
      answerFactory.makePrismaAnswer({
        authorId: user.id,
        questionId: question.id,
        content: 'Answer 02',
      }),
      answerFactory.makePrismaAnswer({
        authorId: user.id,
        questionId: question.id,
        content: 'Answer 03',
      }),
      answerFactory.makePrismaAnswer({
        authorId: user.id,
        questionId: question.id,
        content: 'Answer 04',
      }),
    ])
    o autor da resposta vai ser sempre o mesmo e tabem o mesmo da pergunta mas não tem problema
    agora no nosso response a gente vai colocar o endereço certo e agora a gente espera que o code seja 200 e que seja um array com os objetos com o content e que seja um array answers de answer e numero fica assim a pagina
    import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AnswerFactory } from 'test/factories/make-answer'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

describe('Fetch questions answer tests (e2e)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AnswerFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[get]/questions/:questionId/answers', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const questionId = question.id.toString()

    await Promise.all([
      answerFactory.makePrismaAnswer({
        authorId: user.id,
        questionId: question.id,
        content: 'Answer 01',
      }),
      answerFactory.makePrismaAnswer({
        authorId: user.id,
        questionId: question.id,
        content: 'Answer 02',
      }),
      answerFactory.makePrismaAnswer({
        authorId: user.id,
        questionId: question.id,
        content: 'Answer 03',
      }),
      answerFactory.makePrismaAnswer({
        authorId: user.id,
        questionId: question.id,
        content: 'Answer 04',
      }),
    ])

    const response = await request(app.getHttpServer())
      .get(`/questions/${questionId}/answers`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      answers: expect.arrayContaining([
        expect.objectContaining({ content: 'Answer 01' }),
        expect.objectContaining({ content: 'Answer 02' }),
        expect.objectContaining({ content: 'Answer 03' }),
        expect.objectContaining({ content: 'Answer 04' }),
      ]),
    })
  })
})

voltamos agora para o controller para usar o presenter que a gente criou.
fica a pagina toda assim:
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { ListQuestionsAnswersUseCase } from '@/domain/forum/application/use-cases/list-question-answers'
import { AnswerPresenter } from '../presenters/answer-presenter'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageParamsTypeSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/questions/:questionId/answers')
export class FetchQuestionAnswerController {
  constructor(private listRecentQuestions: ListQuestionsAnswersUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageParamsTypeSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.listRecentQuestions.execute({
      page,
      questionId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
    const answers = result.value.answers

    return { answers: answers.map(AnswerPresenter.toHTTP) }
  }
}

agora vamos no httpmodume e colocamos o controller o useCase e no useCase a gente coloca o injectable
mais para frente vamos atualizar os presenters e as listagens para trazer tambem dados de relaxionamento mas por enquanto é isso.

## controller escolher melhor resposta
choose-question-best-answer.ts
vamos colar nele o editquestion
podemos ja tirar todo o body e sua validação
e ai pegamos todos os editQeustion e substituimos por chooseBestQuestionAnswer e ajustamos a importação
tiramos o title o content e o attachment
e agora para pegar o id a gente não precisa da question so precisamos da resposta porque toda resposta ja tem o questionId então se a gente tiver acesso a resposta a gente tem acesso a pergunta e a gente faz assim la no nosso useCase que pega atravez da answerId ele descobre a answer e dai a question.
então a nossa rota vai ficar pegando o answerId e depois por exemplo choose-as-best fica assim
@Controller('/answers/:answerId/choose-as-best')
nesse caso a gente vai usar o patch como metodo, que é um metodo para atualizar uma info mais especifica
e para atualizar a gente precisa enviar o answerId fica assim:
import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jtw.strategy'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'

@Controller('/answers/:answerId/choose-as-best')
export class ChooseQuestionBestAnswerController {
  constructor(
    private chooseQuestionBestAnswer: ChooseQuestionBestAnswerUseCase,
  ) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('answerId') answerId: string,
  ) {
    const userId = user.sub

    const result = await this.chooseQuestionBestAnswer.execute({
      authorId: userId,
      answerId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

agora para nosso teste a gente vai na editanswer e copia para colar nele
mudamo o nome no describe e o nome do teste que é a rota

  test('[PATCH]/answers/:answerId/choose-as-best', a
  a gente cria o user a question e a answer e  na response a getne troca para patch e luda o endereço e tambem retira o conteudo fica assim:
     const response = await request(app.getHttpServer())
      .patch(`/answers/${answerId}/choose-as-best`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

e para vamidar o condigo é 204 e vamos pegar o question on databease e vamos buscar a question onde o id foi o que a gente criou 

    const questionOnDatabase = prisma.question.findUnique({
      where: {
        id: question.id.toString(),
      },
    })

    e agora a gente quer validar que nessa quesrtionOnDAtabase o bestAnswerId seja igual ao answerId oteste fica assim:
    import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AnswerFactory } from 'test/factories/make-answer'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

describe('Choose best question answer tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AnswerFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    questionFactory = moduleRef.get(QuestionFactory)
    studentFactory = moduleRef.get(StudentFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PATCH]/answers/:answerId/choose-as-best', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const answer = await answerFactory.makePrismaAnswer({
      questionId: question.id,
      authorId: user.id,
    })

    const answerId = answer.id.toString()

    const response = await request(app.getHttpServer())
      .patch(`/answers/${answerId}/choose-as-best`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(204)

    const questionOnDatabase = await prisma.question.findUnique({
      where: {
        id: question.id.toString(),
      },
    })

    expect(questionOnDatabase?.bestAnswerId).toEqual(answerId)
  })
})
 e agora vamos no httpmodules e no useCase para passar as dependencias e o injectabel

## controller commentar pergunta
comment-on-question.controller.ts e seu teste
a gente vai copiar o answerquestion ajustamos as importações mudamos a rota para
@Controller('/questions/:questionId/comments')
e tiramos o attachments
fica assim:
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jtw.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'

const commentOnQuestionBodySchema = z.object({
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(commentOnQuestionBodySchema)

type CommentOnQuestionBodySchema = z.infer<typeof commentOnQuestionBodySchema>

@Controller('/questions/:questionId/comments')
export class CommentOnQuestionController {
  constructor(private commentOnQuestion: CommentOnQuestionUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string,
    @Body(bodyValidationPipe) body: CommentOnQuestionBodySchema,
  ) {
    const { content } = body
    const userId = user.sub

    const result = await this.commentOnQuestion.execute({
      questionId,
      content,
      authorId: userId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}


agora a gente copia o teste do answer question e coloca no teste do commentonquestion no teste a gente mudao os nomes e o endereço o content a gente muda para new comment ena commentOnDatabase a gene acessa o prisma.comment e cooca o content novo que a gente criou fica assim:
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

describe('Comment on question tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    questionFactory = moduleRef.get(QuestionFactory)
    studentFactory = moduleRef.get(StudentFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST]/questions/:questionId/comments', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const questionId = question.id.toString()

    const response = await request(app.getHttpServer())
      .post(`/questions/${questionId}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'New Comment',
      })

    expect(response.statusCode).toBe(201)

    const commentOnDatabase = await prisma.comment.findFirst({
      where: {
        content: 'New Comment',
      },
    })

    expect(commentOnDatabase).toBeTruthy()
  })
})

e vamos no httpmodule e colocamos as dependencias e tambem adicionamos o injectable no useCase

 ## delete question comment
 delete-question-comment.ts
 vamos colar nele o delete answe e a rota vai ser essa
 @Controller('/questions/comments/:id')
 a gente substitui todos os deleteAnswer por deleteComment porem o nome do useCase é esse então temos que substituir a importação
 DeleteCommentOnQuestionUseCase
 e a gente pode renomear no controller para ficar padrão assim
 import { DeleteCommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/delete-comment-on-question'

@Controller('/questions/comments/:id')
export class DeleteQuestionCommentController {
  constructor(private deleteQuestionComment: DeleteCommentOnQuestionUseCase) {}

e ai a gente diq eu o id dos params é o questionCommentId e passamos ele embaixo o controller fica assim:
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jtw.strategy'
import { DeleteCommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/delete-comment-on-question'

@Controller('/questions/comments/:id')
export class DeleteQuestionCommentController {
  constructor(private deleteQuestionComment: DeleteCommentOnQuestionUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') questionCommentId: string,
  ) {
    const userId = user.sub

    const result = await this.deleteQuestionComment.execute({
      authorId: userId,
      commentOnQuestionId: questionCommentId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

agora para o teste a gente copia o delete answer importa o questionCommentFactory e retiramos o answerFacotry mudamos o titulo do teste


  test('[DELETE]/questions/comments/:id', async () => {
    agora a gente cria o usuario a pergunta e vamos criar um commentario no lugar da answer pegamos agora o id desse question comment e passamos ele na rota
    
    const questionCommentId = questionComment.id.toString()

    const response = await request(app.getHttpServer())
      .delete(`/questions/comments/${questionCommentId}`)
      
      e agora o comment on Database a gente procura na tabalea comments um commentario com esse id e a gente espera que ele seja nulo porque apagamos ele
      fica assim o teste
      import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AnswerFactory } from 'test/factories/make-answer'
import { QuestionFactory } from 'test/factories/make-question'
import { QuestionCommentFactory } from 'test/factories/make-question-comment'
import { StudentFactory } from 'test/factories/make-student'

describe('Delete question comment tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let questionCommentFactory: QuestionCommentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, QuestionCommentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    questionFactory = moduleRef.get(QuestionFactory)
    studentFactory = moduleRef.get(StudentFactory)
    questionCommentFactory = moduleRef.get(QuestionCommentFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[DELETE]/questions/comments/:id', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })
    const questionComment =
      await questionCommentFactory.makePrismaQuestionComment({
        authorId: user.id,
        questionId: question.id,
      })

    const questionCommentId = questionComment.id.toString()

    const response = await request(app.getHttpServer())
      .delete(`/questions/comments/${questionCommentId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({})

    expect(response.statusCode).toBe(204)

    const commentOnDatabase = await prisma.comment.findUnique({
      where: {
        id: questionCommentId,
      },
    })

    expect(commentOnDatabase).toBeNull()
  })
})
e vamos em httpmodule e no useCase e colocamos as dependencias e o injectable

## comment on answer controller
comment-on-answer.controller.ts
copiamos o comment on question nele e substituimos todos os question por answer fica assi:
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jtw.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'

const commentOnAnswerBodySchema = z.object({
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(commentOnAnswerBodySchema)

type CommentOnAnswerBodySchema = z.infer<typeof commentOnAnswerBodySchema>

@Controller('/answers/:answerId/comments')
export class CommentOnAnswerController {
  constructor(private commentOnAnswer: CommentOnAnswerUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('answerId') answerId: string,
    @Body(bodyValidationPipe) body: CommentOnAnswerBodySchema,
  ) {
    const { content } = body
    const userId = user.sub

    const result = await this.commentOnAnswer.execute({
      answerId,
      content,
      authorId: userId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

agora vamos para o teste copiamos o teste do comment o question e agora a gente precisa adicionar o answerFactory mudamos os nomes para comment on answer nos titulos dos testes e néao fazendo replace e ai no stest a gente cria uma answer
 const answer = await answerFactory.makePrismaAnswer({
      authorId: user.id,
      questionId: question.id,
    })

    e pega o answerId para criar o commentario passando ele na rota o teste fica assim:
    import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AnswerFactory } from 'test/factories/make-answer'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

describe('Comment on answer tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AnswerFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    questionFactory = moduleRef.get(QuestionFactory)
    studentFactory = moduleRef.get(StudentFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST]/answers/:answerId/comments', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const answer = await answerFactory.makePrismaAnswer({
      authorId: user.id,
      questionId: question.id,
    })
    const answerId = answer.id.toString()

    const response = await request(app.getHttpServer())
      .post(`/questions/${answerId}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'New Comment',
      })

    expect(response.statusCode).toBe(201)

    const commentOnDatabase = await prisma.comment.findFirst({
      where: {
        content: 'New Comment',
      },
    })

    expect(commentOnDatabase).toBeTruthy()
  })
})

agora httpmodules e usecase como sempre e esta pronto.

agora vamos para a parte de
 delete-answer-comment.controller.ts

 vamos colar nele o delete question comment e trocamos o question por answer fica assim:
 import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jtw.strategy'
import { DeleteCommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/delete-comment-on-answer'

@Controller('/answers/comments/:id')
export class DeleteAnswerCommentController {
  constructor(private deleteAnswerComment: DeleteCommentOnAnswerUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') answerCommentId: string,
  ) {
    const userId = user.sub

    const result = await this.deleteAnswerComment.execute({
      authorId: userId,
      commentOnAnswerId: answerCommentId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

para o teste copiamos tambem o delete question comment e adicionamos o answerfactory e o answerCommentfactory
e retiramos o questionCommentFactory
agora fazemos a answer a answercomment e pegamos o id dela passamos para a rota e esperamos que se encontre esse id na tabela comments e que o resultado dessabusca seja null porque deletamos ele. fica assim:
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AnswerFactory } from 'test/factories/make-answer'
import { AnswerCommentFactory } from 'test/factories/make-answer-comment'
import { QuestionFactory } from 'test/factories/make-question'
import { QuestionCommentFactory } from 'test/factories/make-question-comment'
import { StudentFactory } from 'test/factories/make-student'

describe('Delete answer comment tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let answerCommentFactory: AnswerCommentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AnswerFactory,
        AnswerCommentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    questionFactory = moduleRef.get(QuestionFactory)
    studentFactory = moduleRef.get(StudentFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    answerCommentFactory = moduleRef.get(AnswerCommentFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[DELETE]/answers/comments/:id', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })
    const answer = await answerFactory.makePrismaAnswer({
      authorId: user.id,
      questionId: question.id,
    })
    const answerComment = await answerCommentFactory.makePrismaAnswerComment({
      answerId: answer.id,
      authorId: user.id,
    })
    const answerCommentId = answerComment.id.toString()

    const response = await request(app.getHttpServer())
      .delete(`/answers/comments/${answerCommentId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({})

    expect(response.statusCode).toBe(204)

    const commentOnDatabase = await prisma.comment.findUnique({
      where: {
        id: answerCommentId,
      },
    })

    expect(commentOnDatabase).toBeNull()
  })
})

agora vamos no httpmodule e no use case fazer as alterações e esta tudo certo

## controller de listagem de comentarios de peruntas
vamos criar o fetch-question-comments.controller.ts e tambem seu teste 
vamos colar nele o fetchquestionanswercontroller vamos substituidno os liste tudo mais para que tudo tenha a ver com questioncomments como nas de fetch tem o useCase que é com list e outras coisas que vai ser com fetch a gente tem que substituir com cuidado.
a gente vai precisar de um presenter então vamos criar ele la na pasta presenter vamoscriar um comment-presenter.ts que vai servir para os questions e answer comment presenter por enquanto ele ainda vai ser simples e deois vamos aperfeiçoar ele assim como os outros.
ele fica assim:
import { Comment } from '@/domain/forum/enterprise/entities/comment'

export class CommentPresenter {
  static toHTTP(comment: Comment<any>) {
    return {
      id: comment.id.toString(),
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }
  }
}

porem esse Comment estava dando erro então para resolver a gente coloca o type dele como any
e agora no nosso controller a gente pode usar esse presenter e fica assim:
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { ListQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/list-question-comments'
import { AnswerPresenter } from '../presenters/answer-presenter'
import { CommentPresenter } from '../presenters/comment-presenter'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageParamsTypeSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/questions/:questionId/answers')
export class FetchQuestionCommentController {
  constructor(private fetchQuestionComments: ListQuestionCommentsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageParamsTypeSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionComments.execute({
      page,
      questionId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
    const questionComments = result.value.questionComments

    return { questionComments: questionComments.map(CommentPresenter.toHTTP) }
  }
}

agora copiamos o fetchquestionAnswertest para o teste . a gente troca o answer factorypelo questioconmment factory
o teste fica assim:
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AnswerFactory } from 'test/factories/make-answer'
import { QuestionFactory } from 'test/factories/make-question'
import { QuestionCommentFactory } from 'test/factories/make-question-comment'
import { StudentFactory } from 'test/factories/make-student'

describe('Fetch questions comments tests (e2e)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let questionCommentFactory: QuestionCommentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, QuestionCommentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    questionCommentFactory = moduleRef.get(QuestionCommentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[get]/questions/:questionId/comments', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const questionId = question.id.toString()

    await Promise.all([
      questionCommentFactory.makePrismaQuestionComment({
        authorId: user.id,
        questionId: question.id,
        content: 'Comment 01',
      }),
      questionCommentFactory.makePrismaQuestionComment({
        authorId: user.id,
        questionId: question.id,
        content: 'Comment 02',
      }),
      questionCommentFactory.makePrismaQuestionComment({
        authorId: user.id,
        questionId: question.id,
        content: 'Comment 03',
      }),
      questionCommentFactory.makePrismaQuestionComment({
        authorId: user.id,
        questionId: question.id,
        content: 'Comment 04',
      }),
    ])

    const response = await request(app.getHttpServer())
      .get(`/questions/${questionId}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      comments: expect.arrayContaining([
        expect.objectContaining({ content: 'Comment 01' }),
        expect.objectContaining({ content: 'Comment 02' }),
        expect.objectContaining({ content: 'Comment 03' }),
        expect.objectContaining({ content: 'Comment 04' }),
      ]),
    })
  })
})

agora a gente vai no http modules e no use case e pronto.

## fetch-answer-comment.controller.ts
agora vamos para o fetch-answer-comment.controller.ts colamos nele o fetch quesrtioncomment e substituimos todos question por answer e ajustmos as importações fica assim:
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { ListAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/list-answer-comment'
import { CommentPresenter } from '../presenters/comment-presenter'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageParamsTypeSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/answers/:answerId/answers')
export class FetchAnswerCommentController {
  constructor(private fetchAnswerComments: ListAnswerCommentsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageParamsTypeSchema,
    @Param('answerId') answerId: string,
  ) {
    const result = await this.fetchAnswerComments.execute({
      page,
      answerId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
    const answerComments = result.value.answerComments

    return { comments: answerComments.map(CommentPresenter.toHTTP) }
  }
}

agora vamos para o teste copiamos tambem o do fetchquestioncomment e nee precisamos do answerFactory e do answerCommentFactory porem não precisamos do questionCommentFactory. a gente então muda o endereço no titulo do teste e cria uma answer.
e agora com essa answer nos vamos criar os nossos comentarios no promisse all e tambem pegamos a answerid usando o answer.id.tostring() para a gente colocar ele no endereço do teste. e fica assim o teste :
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AnswerFactory } from 'test/factories/make-answer'
import { AnswerCommentFactory } from 'test/factories/make-answer-comment'
import { QuestionFactory } from 'test/factories/make-question'
import { QuestionCommentFactory } from 'test/factories/make-question-comment'
import { StudentFactory } from 'test/factories/make-student'

describe('Fetch answers comments tests (e2e)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let answerCommentFactory: AnswerCommentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AnswerCommentFactory,
        AnswerFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    answerCommentFactory = moduleRef.get(AnswerCommentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[get]/answers/:answerId/comments', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const answer = await answerFactory.makePrismaAnswer({
      authorId: user.id,
      questionId: question.id,
    })

    const answerId = answer.id.toString()

    await Promise.all([
      answerCommentFactory.makePrismaAnswerComment({
        authorId: user.id,
        answerId: answer.id,
        content: 'Comment 01',
      }),
      answerCommentFactory.makePrismaAnswerComment({
        authorId: user.id,
        answerId: answer.id,
        content: 'Comment 02',
      }),
      answerCommentFactory.makePrismaAnswerComment({
        authorId: user.id,
        answerId: answer.id,
        content: 'Comment 03',
      }),
      answerCommentFactory.makePrismaAnswerComment({
        authorId: user.id,
        answerId: answer.id,
        content: 'Comment 04',
      }),
    ])

    const response = await request(app.getHttpServer())
      .get(`/answers/${answerId}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      comments: expect.arrayContaining([
        expect.objectContaining({ content: 'Comment 01' }),
        expect.objectContaining({ content: 'Comment 02' }),
        expect.objectContaining({ content: 'Comment 03' }),
        expect.objectContaining({ content: 'Comment 04' }),
      ]),
    })
  })
})

agora httpmodule e useCase para ajustar

# uploads e relacionamentos

## upload de arquivo
vamos agora fazer o controller de upload de arquivo para os attachments 
porque por enquanto quando a gente usa pergunta ou resposta a gente esta enviando anexos vazios, estamos sem enviar nenhum anexo no copor por enquanto.
mas todas essas rotas recebem ids de anexos e néao os anexos em si e esses ids tem que ser criados previamente quando a gente for usar essas rotas. segundo a logica que a gente pensou la atras
.então o que a gente vai fazer é seguir um fluxo assim
temos uma rota para upload de arquivos que devolve um id desse arquivo e depois esse id é usado para a criação de outro recurso como os attachmentsid que vao estar na criaçao da pergunta ou resposta ou etc.
seguir esse fluxo é bom porque em rest api a gente transiciona os dados entre front e back end usando json e json não funciona para upload de arquivo não da para enviar um arquivo dentro de um json (apenas convertendo ele para base-64 mas ai aumentaria muito o tamanho do arquivo)
e por isso a gente separa uma requisição de uploados de arquivos a gente isola para que ela lide somente com upload de arquivos e néao com o restante.

### upload attachment controller
vamos então criar um arquivo nos controller
upload-attachment-controller.ts
a gente copia e cola nele o get question by slug
e ele vai ter a rota attachments @Controller('/attachments') vai ser um POST
nos não temos ainda o caso de uso então vamos deixar o construtor vazio e comentado e apagar tudo do miolo do controller ele fica meio vazio assim:
import { Controller, Param } from '@nestjs/common'

@Controller('/attachments')
export class ClassToChange {
  // constructor() {}

  @Post()
  async handle(@Param('slug') slug: string) {}
}
lembrando que vamos ter que trocar o nome da class
o nest por baixo dos panos usa o express que é um microframework paranode, a gente pode mudar para fastify ou não no nosso caso a gente não mudou para o fastify. então para fazer uploads de arquivos a gente vai usar o multer
então vamos instalar esse pacote
npm i @types/multer -D

e agora para fazer o upload a gente vai colocar o decorator no nosso controller depois do post 
@
  @Post()
  @UseInterceptors(FileInterceptor('arquivo a dar upload'))
  usamos o useInterceptor do nestcomun e depois dentro dele o FileInterceptor que temos que imoportar tambem e depois a gente passa para o file interceptor o arquivo que a gente quer dar upload
  e agora no handle a gente usa o decorator uploadedFile para pegar os dados do arquivo.
    async handle(@UploadedFile() file: Express.Multer.File) {}
    e no tipo de file vai ser esse express multer file so que da erro porque ele não sabe que o tipo multer existe dentro da varivel global express
para mudar isso vamos la no tsconfig e no types a gente adiciona o multer
{
  "compilerOptions": {
    "module": "commonjs",
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strict": true,
    "strictNullChecks": true,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "paths": {
      "@/*":["./src/*"]
    },
    "types": ["vitest/globals", "multer"]

  }
}

agora ja não da mais esse erro.

agora no nosso controiller dentro do decorator uploadedfile a gente pode fazer uma verificação de arquivo então vamos colocar dentro dele toda uma logica que tem dentro la da documentação do nest. fica assim:

  @Post()
  @UseInterceptors(FileInterceptor('arquivo a dar upload'))
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {}
}

esse numero de max size é em bytes então isso tem 1kb e a gente colocou como tipo de image em jpeg mas tudo isso pode ser alterado e é o que vamos fazer pq 1kb é mto pequento então a gente vai definir o tamanho usando calculo 1024 que é um kb * 1024 para dar 1mg e * 2 para ser 2mb
e no filetype a gente pode passar em minetype que é esse que esta que é o tipo do arquivo seguindo de / e a extenão ou então a gente pode passar so a extençãio fazendo .(png|jpg|jpeg|pdf) assim fica mais facil de colocar varias variaveis de tipo
e ai para visualizar a gente vai fazer um console.log(file) para ver o que aparece la no file.
mudando ja o nome da classe ela fica assim
import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('/attachments')
export class UploadAttachmentController {
  // constructor() {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 2, // 2mb
          }),
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg|pdf)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file)
  }
}

vamos no http module e colocamos ele
e para testar ele a gente pode testar na mão usando nosso client.http
mas vamos tamvbem fazer o teste dele para testar.
upload-attachment.controller.e2e-spec.ts
colamos nele o teste do get question by slug
mudamos o nome para attachment upload podemos apagar o question factory deixar so o student pq precisamos esta logados
e no respose a gente faz assim:

    const response = await request(app.getHttpServer())
      .post('/attachments')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()
      porem a gente precisa enviar um arquivo então o que a gente faz no pc a gente escolhe qualquer arquivo pequeno como um pdf dentro da pasta test do nosso projeto a gente cria uma pasta chamada e2E e jogamos ele la. mudamos o nome dela para sample upload.
      e agora ao invez do send a gente usa o metodo chamado attach
      e dentro desse attach a gente coloca 'file' que é exatambem o mesmo nome que recebe no nosso controller isso é necessario e depois a gente envia o caminho para esse arquivo dessa forma:
       const response = await request(app.getHttpServer())
      .post('/attachments')
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', './test/E2E/sample-upload.pdf')

e agora o nosso expect é por enquanto apenas que de sucesso ou seja que seja um 201
nosso teste por enquanto fica assim;
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { StudentFactory } from 'test/factories/make-student'

describe('upload attachment - tests (e2e)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST]/attachments', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .post('/attachments')
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', './test/E2E/sample-upload.pdf')

    expect(response.statusCode).toBe(201)
  })
})

e agora ao testar ele ja deve mostrar o console.log
agora o que falta a gente fazer é pegar esse arquivo, salvar em algum lugar e cadastrar ele no banco de dados.
para isso vamos criar o nosso caso de uso que vai salvar ele no banco de dados e nos dar um id para a gente relacionar com perguntas ou respostas.

## caso de uso de upload de anexo
vamos em domin forum aplication useCases
upload-and-create-attachment.ts
 cooiamos o registesutend e mudamos todos os registerStudent para upload and create attachment

na nossa entidade de attachment a gente tem titulo e link 
então para nossa interface como vamos salvar isso o titulo vai ser o nome do anexo 
então na interface nos vamos receber o fileName mas tambem o fileType poqrua a gente faz uma validação de tipo no controller so que essa validação esta no infra e no dominio a gente néao vai ter tanto conhecimento dessa validação para que o domain continue funcionando independente do infra caso a gente troque de infra. mas tambem porque quando a gente for fazer upload para algum lugar que vai lidar com isso como a amazon ou alguma aplicação qu vai receber o upload do arquivo a gente precisa informar o tipo do arquivo e nos vamos tambem receber o body do arquivo com o rquivo em si e no nosso caso vai ser umBuffer, mas podia ser alguma outra estrategia como b64 ou outras.
interface UploadAndCreateAttachmentUseCaseRequest {
  fileName: string
  fileType: string
  body: Buffer
}
como a gente esta usando arquivos pequenos de no max 2 mb a gente pode usar o buffer que funciona salvando esse arquivo na memoria de apos salvar ele o proprio garbage collector do node vai apagar isso da memoria. porem em algum momento vai ficar esses 2mb todo utilizados na memoria do sistema. o que poderia ser ruim se a gente tivesse possibilidade para arquivos maiores de 100mb por exemplo que em uma maquina mais fraca ficaria difici de rodar nossa aplicação e para isso a gente usaria então a alternativa de stream que o multer tambem suporta e que vai salvadno as coisas aos poucos e não ocupando tanta memoria ram.
agora para o type a gente vai precisar criar um erro então vamos na pasta de erros e criamos o arquivo inalideattachmentTypi.ts e colamos nele um outro erro qualquer para modificar  o erro fica assim:
import { UseCaseErrors } from '@/core/errors/use-case-errors'

export class InvalidAttachmentTypeError extends Error implements UseCaseErrors {
  constructor(type: string) {
    super(`File type "${type}" is not supported`)
  }
}
agora o nosso useCase vai devolver esse erro ou então o attachment que egamos das entidades
type UploadAndCreateAttachmentUseCaseResponse = Either<
  InvalidAttachmentTypeError,
  {
    attachment: Attachment
  }
>

porem nos repositorios a gente tem o question attachment ou p answerAttachment so que esse useCase esta criando so um attachment que não é nem para uma pergunta ou resposta é so um anexo que depois vai ser direcionado
vamos então criar um attachmentRepository para ser uma anexo antes de estar associado a uma pergunta ou resposta por enquanto ele vai ter apenas o metodo create. ele fica assim:
import { Attachment } from '../../enterprise/entities/attachment'

export abstract class AttachmentsRepository {
  abstract create(attachment: Attachment): Promise<void>
}
agora no nosso usecase a gente pode colocar esse repository no construcotr e no execute a gente recebe filename filetype e body


@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(private attachmentsRepository: AttachmentsRepository) {}

  async execute({
    fileName,
    fileType,
    body,
  }: UploadAndCreateAttachmentUseCaseRequest): Promise<UploadAndCreateAttachmentUseCaseResponse> {

    agora vamos começar a fazer o useCase
    A PRIMEIRA COISA QUE A GENTE VAI FAZER 2 VALIDAR O TYPE  e para isso a gente vai pedir pro chatgpt criar um regex para validar memetype de png pdf jpg e jpeg ele faz esse regex
    ^(image\/(jpeg|png))|^application\/pdf$
agora a gente vai la no nosso controlle e joga dentro do if depos de // e depois dela eu dou um . e passamos o filetype entre parenteses e colocamos uma esclamação na frente para ver se ele néao passa para a gente dar nosso erro:
    if (!/^(image\/(jpeg|png))$|application\/pdf$/.test(fileType))
    agora que a validaçéao esta feita a gente pode criar o attachment então fazemod a const attachment a gente vai usar o attachmentCreate e a gente vai passar o title como foileName e o link (que vamos la na eintidade e mudamos para urm para ficar mais semantico)a entidade via ficar assim:
    import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'

interface AttachmentProps {
  title: string
  url: string
}

export class Attachment extends Entity<AttachmentProps> {
  get title() {
    return this.props.title
  }

  get url() {
    return this.props.url
  }

  static create(props: AttachmentProps, id?: UniqueEntityId) {
    const attachment = new Attachment(props, id)
    return attachment
  }
}


e no nosso useCase a url vai estar ficticia por enquanto vamos colocar o fileName de novo pq essa url vai vir quando a gente subir esse attachment para algum sistema de storage então fica assim:
 const attachment = Attachment.create({
      title: fileName,
      url: fileName,
    })
    a gente samva então isso no nosso attachlment repository e tambem retorna o attachment. a gente não usa o body ainda porque ainda não estamos fazendo upload do arquivo .
    o useCase fica assim por enquanto:
    import { Either, right, left } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type'
import { Attachment } from '../../enterprise/entities/attachment'
import { AttachmentsRepository } from '../repositories/attachments-repository'

interface UploadAndCreateAttachmentUseCaseRequest {
  fileName: string
  fileType: string
  body: Buffer
}

type UploadAndCreateAttachmentUseCaseResponse = Either<
  InvalidAttachmentTypeError,
  {
    attachment: Attachment
  }
>

@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(private attachmentsRepository: AttachmentsRepository) {}

  async execute({
    fileName,
    fileType,
    body,
  }: UploadAndCreateAttachmentUseCaseRequest): Promise<UploadAndCreateAttachmentUseCaseResponse> {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidAttachmentTypeError(fileType))
    }

    const attachment = Attachment.create({
      title: fileName,
      url: fileName,
    })

    await this.attachmentsRepository.create(attachment)

    return right({ attachment })
  }
}
agora como eventualmente nos vamos fazer uma integração para esse uploade ser fora do nosso disco porque as aplicações hoje não faz sentido guardar nada em disco. a gente vai la em aplication e onde tem pastas como cryptography repositories useCase a gente vai cirar uma pasta chamada storage e nela um arquivo chamado uploader.ts
o uploader vai ser um contrato, mas como é o next a gente não vai usar interface e sim uma abstract class e ele vai ter um unico metodo chamado upload que vai receber paramteros e vai devolver uma promisse que é uma url: string essa url vai ser o mink para onde nos enviamos o nosso arquivo. e nos vamos criar tambem uma interface que vai ser os parametros que esse upload vai receber que vao ser o filename fileType e o body fica assim:
export interface UploaderParams {
  fileName: string
  fileType: string
  body: Buffer
}

export abstract class Uploader {
  abstract upload(params: UploaderParams): Promise<{ url: string }>
}
agora a gente volta para o useCase e agora no constructor a gente usa tambem a classe uploader e agora tambem antes de salvar no banco de dados a gente vai subir ele (por enquant de forma ficcticia ) usando o uploader.
constructor(private attachmentsRepository: AttachmentsRepository, private uploader: Uploader) {}


e para subir ele com o uploader a gente pode ja ir pegando a url dele para passar ela no lugar do filename onde a gente passa a url
  const { url } = await this.uploader.upload({
      body,
      fileName,
      fileType,
    })

    o arquivo todo fica assim ja passando a url
    import { Either, right, left } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type'
import { Attachment } from '../../enterprise/entities/attachment'
import { AttachmentsRepository } from '../repositories/attachments-repository'
import { Uploader } from '../storage/uploader'

interface UploadAndCreateAttachmentUseCaseRequest {
  fileName: string
  fileType: string
  body: Buffer
}

type UploadAndCreateAttachmentUseCaseResponse = Either<
  InvalidAttachmentTypeError,
  {
    attachment: Attachment
  }
>

@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(
    private attachmentsRepository: AttachmentsRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    fileName,
    fileType,
    body,
  }: UploadAndCreateAttachmentUseCaseRequest): Promise<UploadAndCreateAttachmentUseCaseResponse> {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidAttachmentTypeError(fileType))
    }

    const { url } = await this.uploader.upload({
      body,
      fileName,
      fileType,
    })
    const attachment = Attachment.create({
      title: fileName,
      url,
    })

    await this.attachmentsRepository.create(attachment)

    return right({ attachment })
  }
}

## testando  caso de uso de upload do anexo
vamos agora testar esse caso de uso.
dentro da pasta de useCases a gente faz um novo arquivo com o mesmo nome do arquico e com spec no fim 
upload-and-create-attachment.spec.ts
a gente copia nele o teste de register student e trocamos o nome para upload and create attachment
vamos precisar de um repositorio inmemory para a parte de attachment então vamos criar copiar o repositorio de student e colar em um novo arquivo chamado in-memory-attachment-repository.ts
a gente apaga o metodo findbyemail e onde tem student a gente da replace por attachment
e retiramos tambem a parte de domainevents fica assim:
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
  public items: Attachment[] = []

  async create(attachment: Attachment) {
    this.items.push(attachment)
  }
}

agora voltamos para o teste e colocamos o inmemoryAttachmentRepository la no let e tambem o sut. porem para o sut a gente precisa não so do repository mas tambem do uploadre então vamos la na pasta test e vamos criar uma pasta storage la dentro e vamos nele criar um fake-uploader.ts e nele vamos colar o fakeencripter que temos em cryptography
a gente implementa o ulpload nele e criamos uma propriedade interna public chamada uploads que vai ser um aray que vai armazenad varios oploads então apra isso a gente vai criar uma interface chamada upload e nela a gente vai botrar fileName e url e ai o public uploads vai ser upload[] = [] tem que fazer o =[] pq ele tem que inicializar vazio.
agora na função upload async a gente vai pegar dosparams o fileName porque como estamos so fingindo que estamos fazendo o upload não precisamos dos tres. agora na implementação da função a gente faze um this.uploads.push(fileName ulr) e no caso da url a gente vai antes ter gerado um valor ficticio como é uma string a gente pode gerar uma id com o ramdom uuid e a gente tambem retorna essa url fica assim:
import { randomUUID } from 'crypto'
import {
  Uploader,
  UploaderParams,
} from '../../src/domain/forum/application/storage/uploader'

interface Upload {
  fileName: string
  url: string
}

export class FakeUploader implements Uploader {
  public uploads: Upload[] = []
  async upload({ fileName }: UploaderParams): Promise<{ url: string }> {
    const url = randomUUID()
    this.uploads.push({
      fileName,
      url,
    })
    return { url }
  }
}

agora com isso feito a gente vai no nosso teste e podemos instanciar ela e passar ela para o sut

let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let fakeUploader: FakeUploader
let sut: UploadAndCreateAttachmentUseCase

describe('upload and create attachment test', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    fakeUploader = new FakeUploader()
    sut = new UploadAndCreateAttachmentUseCase(
      inMemoryAttachmentsRepository,
      fakeUploader,
    )
  })

agora vamos para os testes if can upload and create an attachment
e ai na cost result a gente envia o fileName o fileType que tem que ser um valor valido e um body a gente vai mandar um Buffer.from("") e mandamos uma string vazia dentro do from
  const result = await sut.execute({
      fileName: 'profile.png',
      fileType: 'image/png',
      body: Buffer.from(''),
    })
    e nos expects que seja true e que o result.value esteja dentro de attachment inmemoryattachmentrepository[0] e tambem que la dentro do nosso fakeUploader.uploads tenha mength de 1 ou seja tenha uma coisa la. e tambem que la nesse fakeUploads o primeiro item que tenha la seja igual a um objeto contendo fileName: 'profile.png  tambem um expect que 
se a gente deixar so esse teste e rodar o teste ja deve passar e passou mas ainda vamos fazer um segundo teste. para que néao seja possivel fazer um opload com um tipo de arquivo errado usamos esse response passando o audio/mpeg e o result tem que ser left()
 const result = await sut.execute({
      fileName: 'profile.mp3',
      fileType: 'audio/mpeg',
      body: Buffer.from(''),
    })
    e tambem fazemos um expect para que o result value seja uma instancia do erro que a gente definiu que é o invalid attachment format o teste todo fica assim:
    import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachment-repository'
import { UploadAndCreateAttachmentUseCase } from './upload-and-create-attachment'
import { FakeUploader } from 'test/storage/fake-uploader'
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type'

let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let fakeUploader: FakeUploader
let sut: UploadAndCreateAttachmentUseCase

describe('upload and create attachment test', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    fakeUploader = new FakeUploader()
    sut = new UploadAndCreateAttachmentUseCase(
      inMemoryAttachmentsRepository,
      fakeUploader,
    )
  })
  test('if can upload and create an attachment', async () => {
    const result = await sut.execute({
      fileName: 'profile.png',
      fileType: 'image/png',
      body: Buffer.from(''),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      attachment: inMemoryAttachmentsRepository.items[0],
    })
    expect(fakeUploader.uploads).toHaveLength(1)
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'profile.png',
      }),
    )
  })
  test('if cannot upload with wrong file type', async () => {
    const result = await sut.execute({
      fileName: 'profile.mp3',
      fileType: 'audio/mpeg',
      body: Buffer.from(''),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidAttachmentTypeError)
  })
})

## integracao de com cloudfare r3
agora que a gente ja tem o caso de uso e o controller a gente precisa integrar os dois e para isso temos que salvar o osso upload em qlgum lugar, e por isso nos vamos usar uma integação com o cloudfare
existem varias aplições de integração para armazenamento de arquivos como a amazon s3. mas a gente vai usar o cloudfare r3 porque o amazon s3 precisa colocar cartãode credito e o amazon s3 cobra uma taxa para cada vez que vc baixa um arquivo. e caso os usuarios possam baixar os arquivos pode ficar caro. a gene vai usar o cloudfare que não cobra essa taxa e vamos usar a api do amazon s3 então caso a gente precise usar o amazon s3 é da mesma maneira é so trocar o endpoint
então vamos criar uma conta no cloudfare
apos criar a conta nos vamos na esquerda onde tem a dashboard e vamos na parte r2
e vamos criar um new bucket. pelo visto precisa colocar o cartão de credito mas eles so cobram se a gente exceder o limite do gratuito
o nome do bucket vai ser ignite-nest-clean
e a regiao a gente coloca automatic
e ai a gente clica em create bucket. a gente pode olhar as settings dele e tal mas não vamos configurar nada agora. a gente volta para r2 e vamos na direita clicar em manenger-r2apitokens e nele a gente vai criar uma api que a gente consiga fazer upload de arquivos dentro dela clicamos em criar api token e damos o nome de Ignite Nest Clean e vamos dclicar em object read and wrigth
a gente coloca specific bucket e escolhe o que a gente criou e em ttl time to live a gente coloca forever e o resto a gente néao mexe e comoca create ap token
agora voltamos para o nosso projeto e vamos no rquivo .env e colocamos nele as keys de acces e de secret acces key nele. a gente não vai usar a token vaue porque nos vamos usar a api da amazon.
AWS_ACCESS_KEY_ID
AWS_SECRET_KEY_ID

e vamos precisar de mais duas env o nome do bucket e o id da conta na cloudflare que fica na direita.

AWS_BUCKET_NAME="ignite-nest-clean"
CLOUDFLARE_ID=

com isso salvo a gente vai no nosso arquivoque faz a validação do env
infra/env/env.ts
copiamos as quarto variaveis que a gente criou. joga nele e troca o = por : e coloca z.string(),
import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3333),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  AWS_BUCKET_NAME: z.string(),
  CLOUDFLARE_ID: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_KEY_ID: z.string(),
})

export type Env = z.infer<typeof envSchema>

e agora dentro da pasta infra fazemos a pasta storage e dentro dela o r2-storage.ts e nela a gente faz o r2uploader para implementar o uploader assim:
import {
  Uploader,
  UploaderParams,
} from '@/domain/forum/application/storage/uploader'

export class r2Uploader implements Uploader {
    private client: 
  async upload({
    fileName,
    fileType,
    body,
  }: UploaderParams): Promise<{ url: string }> {
    throw new Error('Method not implemented.')
  }
}

e a gente vai criaresse private client para criar a coneção com o cloudflare mas para isso a gente precisa instalar o sdk da amazon então no terminalr a gente da npm i @aws-sdk/client-s3

agora a gente vai importar da  awsS3 o s3client e o putobjectcommand a aws trabalha com co uma rota e o put object é o comando para fazer upma rota e o put object é o comando para fazer upload de arquivo. e ai o nosso client vai ser do tipo S2client e vamos fazer um constructor para instanciar ele assim
    private client: S3client
    constructor(){this.client = new S3client()}
    agora esse s3ceient el que a gente vai pegar la na setingsendpoint que a gente vai pegar la na setings do buckt a gente copia e cola sem o nome do bucket e os numeros que vem antes 
    a segunda delas é a acount id então a gente vai fazer uma inversão de dependencias e vamos pegar o nosso envservice pa nos temos o acointid e jogamos na frennos liugares dos numeros que vinham no endpoint
    e temos tambem as infgormaçoes region quie a gente coloca auto e o c gente pega tamm o acces id e o secretid que a gente pega tambem la do env
    } from '@/domain/forum/application/storage/uploader'

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { EnvService } from '../env/env.service'

export class r2Uploader implements Uploader {
  private client: S3Client
  constructor(envService: EnvService) {
    const acountId = envService.get('CLOUDFLARE_ID')
    this.client = new S3Client({
      endpoint: `https://${acountId}.r2.cloudflarestorage.com`,
      region: 'auto',
      credentials: {
        accessKeyId: envService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: envService.get('AWS_SECRET_KEY_ID'),
      },
    })
  }

  e agora a gente pode ir no na função no metodo de asybc upload e implementar ele
  a gente precisa que os arquivos sejam lidos então a gente vai fazer umuploadId usando o ramdom uuid isso porqe podemos ter usuarios diferentes fazndo upload de arquivos diferentes mas com o mesmo nome.
  e agora a gente faz um uniqueFileName interpolando  nome do arquivo com o fileId
  }: UploaderParams): Promise<{ url: string }> {
    const uploadId = randomUUID()
    const uniqueFileName = `${uploadId}-${fileName}`
    agora nos vamos fazer o upload que é this.client e usamos o send e dentro dele a gente vai passar o comando que o putObject e ai dentro do comando a gente passa as informações que vao ser o bucket e como o bucket esta no env a gente precisa colocar um privete antes do nosso envService no consttructor
    ai dentro a gente joga o bucket o key qe é o nome do arquivo o content type que é o tipo do arquivo e o body que é o body
    e depois a gente devolve uma url que é o nome do arquivo essa dica do nome do arquivo é boa porque o que se salva no banco de dados não é o arquivo todo, para não ficar pesado. a gente pode salvar um nome ou o url todo. a gente no caso so salva uma referencia porque salvar a url toda é um risco porque se a gente mudar o storage a url vai mudar mas o nome fica o mesmo. então fica mais faci e quando for vhamar a gente interpola. fca assim o qrauvio.
    import {
  Uploader,
  UploaderParams,
} from '@/domain/forum/application/storage/uploader'

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { EnvService } from '../env/env.service'
import { randomUUID } from 'node:crypto'

@Injectable()
export class r2Storage implements Uploader {
  private client: S3Client
  constructor(private envService: EnvService) {
    const acountId = envService.get('CLOUDFLARE_ID')
    this.client = new S3Client({
      endpoint: `https://${acountId}.r2.cloudflarestorage.com`,
      region: 'auto',
      credentials: {
        accessKeyId: envService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: envService.get('AWS_SECRET_KEY_ID'),
      },
    })
  }

  async upload({
    fileName,
    fileType,
    body,
  }: UploaderParams): Promise<{ url: string }> {
    const uploadId = randomUUID()
    const uniqueFileName = `${uploadId}-${fileName}`

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.envService.get('AWS_BUCKET_NAME'),
        Key: uniqueFileName,
        ContentType: fileType,
        Body: body,
      }),
    )
    return {
      url: uniqueFileName,
    }
  }
}

agora vamos criar o storage.module.tsnos moesmos modles do outros com useCalss e providers
e a gente usa import do envmodules porque o storage usa o env service. fica assim:
import { Uploader } from '@/domain/forum/application/storage/uploader'
import { Module } from '@nestjs/common'
import { r2Storage } from './r2-storage'
import { EnvModule } from '../env/env.module'

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: Uploader,
      useClass: r2Storage,
    },
  ],
  exports: [Uploader],
})
export class StorageModule {}

agora vamos no httpmodule e nele a gente da import no storageModule e coloca o useCase dos upload ele fica assim:
import { Module } from '@nestjs/common'
import { AutenticateController } from './controllers/autentication.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/prisma/database.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { ListRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/list-recent-questions'
import { AutenticateStudentUseCase } from '@/domain/forum/application/use-cases/autenticate-student'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { EditQuestionController } from './controllers/edit-question.controller'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'
import { AnswerQuestionController } from './controllers/answer-question.controller'
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
import { EditAnswerController } from './controllers/edit-answer.controller'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { DeleteAnswerController } from './controllers/delete-answer.controller'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'
import { FetchQuestionAnswerController } from './controllers/fetch-question-answers.controller'
import { ListQuestionsAnswersUseCase } from '@/domain/forum/application/use-cases/list-question-answers'
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'
import { CommentOnQuestionController } from './controllers/comment-on-question.controller'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'
import { DeleteQuestionCommentController } from './controllers/delete-question-comment'
import { DeleteCommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/delete-comment-on-question'
import { CommentOnAnswerController } from './controllers/comment-on-answer.controller'
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'
import { DeleteAnswerCommentController } from './controllers/delete-answer-comment.controller'
import { DeleteCommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/delete-comment-on-answer'
import { ListQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/list-question-comments'
import { FetchQuestionCommentController } from './controllers/fetch-question-comments.controller'
import { FetchAnswerCommentController } from './controllers/fetch-answer-comment.controller'
import { ListAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/list-answer-comment'
import { UploadAttachmentController } from './controllers/upload-attachment.controller'
import { StorageModule } from '../storage/storage.module'
import { UploadAndCreateAttachmentUseCase } from '@/domain/forum/application/use-cases/upload-and-create-attachment'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [
    CreateAccountController,
    AutenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionAnswerController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
    FetchQuestionCommentController,
    FetchAnswerCommentController,
    UploadAttachmentController,
  ],
  providers: [
    CreateQuestionUseCase,
    ListRecentQuestionsUseCase,
    AutenticateStudentUseCase,
    RegisterStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    ListQuestionsAnswersUseCase,
    ChooseQuestionBestAnswerUseCase,
    CommentOnQuestionUseCase,
    DeleteCommentOnQuestionUseCase,
    CommentOnAnswerUseCase,
    DeleteCommentOnAnswerUseCase,
    ListQuestionCommentsUseCase,
    ListAnswerCommentsUseCase,
    UploadAndCreateAttachmentUseCase,
  ],
})
export class HttpModule {}

## integrando o controller de upload
agora vamos no nosso controller de upload e no constructor a gente faz u private uploadattachment que vai usar o uploadattachmentuseCAS
xport class UploadAttachmentController {
  constructor(
    private uploadAndCreateAttachment: UploadAndCreateAttachmentUseCase,
  ) {}
 e agora la onde tinha o conseole.log a gente vaitirar e vai colocar uma const result para ser uma chamada para esse useCase usando a funçéao create e a fente passa o fileName Filetype e o body e esses pontos vem de diferentes coisas que estão dentro do file que a gente pegou fica assim:
     file: Express.Multer.File,
  ) {
    const result = await this.uploadAndCreateAttachment.execute({
      fileName: file.originalname,
      fileType: file.mimetype,
      body: file.buffer,

      ogirinal name mimetype e buffer do file

      agora a gente faz uma tatartiva de erro verificando if(isLeft())

          if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case InvalidAttachmentTypeError:
          throw new BadRequestException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
    ai a gente ve o tipp de erro e joga ele como sendo badRequest na verdade qualquer erro vai ser o badRequest porque o defalut a gente tambem joga esse mas so estamos deixando separado para poder izer que esse useCase pode retornar esse invalidAttachmanetType error

    se passar sem cair nessez erro a gente pega o attachment do result.value e retorna apenas o attachlmentId fica assim:

    import { InvalidAttachmentTypeError } from '@/domain/forum/application/use-cases/errors/invalid-attachment-type'
import { UploadAndCreateAttachmentUseCase } from '@/domain/forum/application/use-cases/upload-and-create-attachment'
import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('/attachments')
export class UploadAttachmentController {
  constructor(
    private uploadAndCreateAttachment: UploadAndCreateAttachmentUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 2, // 2mb
          }),
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg|pdf)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const result = await this.uploadAndCreateAttachment.execute({
      fileName: file.originalname,
      fileType: file.mimetype,
      body: file.buffer,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case InvalidAttachmentTypeError:
          throw new BadRequestException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { attachment } = result.value

    return { attachmentId: attachment.id.toString() }
  }
}


com isso em mãos vamos para o teste desse controller.
muitagente faria nesse caso um mock para o cloudFlare mas isso não é o ideal porque temos que realmente testar o end2end de uma aplicação para saber se ele vai pra produção corretamente.
no teste que a gente tinha la a gente cria um novo expect para ver se esta vindo um attachmentId com a string fica assim esse expect
expect(response.body).toEqual({
      attachmentId: expect.any(String),
    })
    temos que ir no database.modules para colocar o repositorio e precismos tambem criar o prismaAttachments repsitorio entãop primeiro criamos esse arquivo la na pasta de repositories

    fica assim mas ai precismos tambem de um mapper
    import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { PrismaAttachmentsMapper } from '../mappers/prisma-attachment-mapper'

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {
  constructor(private prisma: PrismaService) {}
  async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentsMapper.toPrisma(attachment)

    await this.prisma.attachment.create({
      data,
    })
  }
}

vamos na pasta de mappers e criamos o prisma-attachment-mapper.ts
fica assim:
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { Prisma } from '@prisma/client'

export class PrismaAttachmentsMapper {
  static toPrisma(
    attachment: Attachment,
  ): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.url,
    }
  }
}

e agora funciona o repository pegando o attachment

agora no database modules a gente pode usar o repositorio no providers e tambem passar ele no exports fiva assim:

import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaAnswerAttachmentsRepository } from './repositories/prisma-answer-attachments-repository'
import { PrismaAnswersRepository } from './repositories/prisma-answers-repository'
import { PrismaAnswerCommentsRepository } from './repositories/prisma-answer-comments-repository'
import { PrismaQuestionAttachmentsRepository } from './repositories/prisma-question-attachments-repository'
import { PrismaQuestionCommentsRepository } from './repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepository } from './repositories/prisma-questions-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentsRepository } from './repositories/prisma-students-repository'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository'
import { PrismaAttachmentsRepository } from './repositories/prisma-attachments-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    { provide: AnswersRepository, useClass: PrismaAnswersRepository },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
  ],
  exports: [
    PrismaService,
    AnswerAttachmentsRepository,
    AnswersRepository,
    AnswerCommentsRepository,
    QuestionAttachmentsRepository,
    QuestionCommentsRepository,
    QuestionsRepository,
    StudentsRepository,
    PrismaAttachmentsRepository,
  ],
})
export class DatabaseModule {}

agora se a gente rodar os testes a gente pode ir no cloudflare e depois dos testes olhar se ele esta la dentro de objects . se o teste passar o arquvioddeve estar la
porem qi ainda temos um problema por estarmos jogando os arquivos de teste no mesmop bucket do de produção. e ai ficaria cheio de lixo no bucket de produção então o que vamos fazer é la no cloudflare a gente vai criar um bucket novo so para testes e col ele criado vamos em settings elm object life cycle rules e vamos add rule e vamos colocar o nome delete all files para 1 dia depois da criação deles
e damos add rule para confirmar essaregra
agora copiamo o nome do bucket e criamos um arquivo na raiz .env.test e colocamos ele tambmem no gitignore
e vamos substuir a variavel de bucketname posso colocar como ficou o env test aqui porque néao é nada sensivel fica assim:
# override env variables during test
AWS_BUCKET_NAME="ignite-nest-clean-test"

e ai no nosso arquivo de setup end2end que é onde ele carega a configuração antes dos testes ele ta importando o envConfig que é onde as variaveis estão sendo carregadas
e o nest le tambem as variaveis ambiente com o configService.
porem o nest esta atualmente com u problema que eles estão trabalhando para resolver que é a abilidade de fazer override nas variaveis ambiente ou seja trocar uma por uma outra
então quando a gente roda os testes e ele tem o config dotEnv o config service quando a gente rodar o aplicativoele não vai carregar novamente as variaveis ambiente ele vai levar em consideração as que ja foram carregadas. então se a gente quiser carregar o arquivo env.test a gente vai ter que carregar ele no arquivo setupE2E porque é ele que carrega as variaveis do ambiente de teste
então no setup-e2e.ts ao inves de carregar o config como estava dessa forma
import 'dotenv/config'

a gente vai carregar assim para poder usar o config 
import { config } from 'dotenv'

e agora  a gente usa o config assim
 config() fora da função antes do prisma logo depois das importações. e ai a gente pode passar configurações dentro dess config
 vamos passar um path para ele carregar primeiramente as variaveis do .env mas depois passamos a override como true
 config({ path: '.env', override: true })
 e executamos isso uma segunda vez passando o arquivo .env.test assim ele le o arquivo env e ve que se tiver alguma varavel que ja tivesse definida anteriormente ele vai substituir ela com um novo valor e ele faz isso uma segunda vez com o test assim vai sustituir o valor do nome do bucket
 gora para não dar erro a gente tem que voltar la no cloudFlare e configurar a nossa chave de api para tambem ter acesso ao bucket de teste do lado direito no r2 a gente vai em menage api tokens vai em edit o token e desce ate encontrar os cukets que ela tem acesso e ai é so colocar o novo bucket.
 
 # perguntas com anexos
 agora que nosso projeto ja esta fazendo upload a gente tem que nos controllers pegar os attachments de forma real e enviar ele para o caso de uso. por enquanto a gente esta enviando um attachment vazio assim attachments: []
 porem a gente não começa na camada de nfra vamos começar nos casos de uso. atualmente no caso de uso de create question a gente recebe o id dos attachments a gente cria o attachment e salva dentro de question.Attachment por que é uma watchedlist
 e chamamos o metodo create do questions repository
 o metodo create pega os dados da pergunta porem em nenhum momento a gente salva os anexos no banco de dados. eles so estão salvos dentro da pergunta
 vamos começar a fazer alguns testes para ajustar isso então
 a primeira coisa que temos que lembrar é que a question é um agregado que é um conjunto de entidades que caminham juntas a question é o root do agregado e o attachment faz parte desse agregado. quando salvamos o agregado é uimportante que as informações como a lista de anexo seja salva junta.
 entéao vamos começar a fazer isso pelos repositorios de inmemory
 no inmemory de question no metodo create a gente salva a pergunta mas os anexos em si eles néao estão sendo salvos.
 então vamos no metodo questionAttachmentrepository (sem o inmemory) hoje ele so tem metodopara buscar e deletar. e nos vamos criar dois novos metodos nele um que vai criar varios e um que vai deletar varios
  abstract createMany(attachments: QuestionAttachment[]): Promise<void>
  abstract deleteMany(attachments: QuestionAttachment[]): Promise<void>
  fica assim:
  import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export abstract class QuestionAttachmentsRepository {
  abstract createMany(attachments: QuestionAttachment[]): Promise<void>
  abstract deleteMany(attachments: QuestionAttachment[]): Promise<void>
  abstract findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]>

  abstract deleteManyByQuestionId(questionId: string): Promise<void>
}

  eles vao receber ula lista de anexos e salvar e o outro vai receber essa lista e deletar
   no nosso banco de dados hoje criar o anexo néao significa criar uma nova coluna no banco de dados porque quando criarmos um anexo a gente cria um registro na tabela attachment so que ele é criado sem relacionamento com uma pergunta ou resposta então quando a gente salvaro anexo a gente ão esta criando um novo anexo e sim criando o relacionamento
   porque ao salvar a gente so esta enviando os ids para relacionar.
   agora que ja temos esses metodos a gente pode ir no inmemory questions repository e aplicar eles

e ao implementar eles no create many é o push so que como são varios a gente usa retcencias entes e no delete é um filtro e vamos verificar o que tem te igual aos attachment da lista assim a gente usa o some para identificar os que são iguais aos que vem da lista que a gente passa para a função e a gente passa o ! antes dele para pegar so os que não são iguais e depois a gente atualiza o valor de attachments para todos que não são iguais. a pagina com os dois metodos fica assim:
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )

    return questionAttachments
  }

  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    this.items.push(...attachments)
  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    const questionAttachments = this.items.filter((item) => {
      return !attachments.some((attachment) => attachment.equals(item))
    })
    this.items = questionAttachments
  }

  async deleteManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toString() !== questionId,
    )
    this.items = questionAttachments
  }
}
agora vamos para o inmemory questions reporitory que ja usa o attachment repository e no metodo create e  save dele a gente vai chamar tambem o metodo para integrar com o repositorio de attachments
pegando eles a travez do question.attachment.getItems para pegar os attachments de dentro da question
no metodo save vai ser um pouco diferente porquea a gente pode ter tanto adicionado quanto deletado attachments então a gente chama o createMany para os newItens e o deleteMany para os removedItens e é para isso que usamos a watchedList isso é a grande vantagem monitorando as modificação acho que no delete não precisa fazer nada por conta do efeito cascata do prisma que vai deletar tambem os anexos. fica assim:
import { DomainEvents } from '@/core/event/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Questions } from '@/domain/forum/enterprise/entities/questions'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Questions[] = []

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async create(question: Questions) {
    this.items.push(question)

    await this.questionAttachmentsRepository.createMany(
      question.attachment.getItems(),
    )
    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id)
    if (!question) {
      return null
    }
    return question
  }

  async findBySlug(slug: string): Promise<Questions | null> {
    const question = this.items.find((item) => item.slug.value === slug)
    if (!question) {
      return null
    }
    return question
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async delete(question: Questions) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)
    this.items.splice(itemIndex, 1)

    this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    )
  }

  async save(question: Questions) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items[itemIndex] = question

    await this.questionAttachmentsRepository.createMany(
      question.attachment.getNewItems(),
    )
    await this.questionAttachmentsRepository.deleteMany(
      question.attachment.getRemovedItems(),
    )

    DomainEvents.dispatchEventsForAggregate(question.id)
  }
}

agora para o teste disso
vamos la no create question.spec e criamos um novo teste a gente cria a pergunta colmo,estavamos fazendo antes crimaos o attachment 1 e 2 e agora nos expects a gente faz que espera que nos items dentro do questionattachmentrepository tenha length 2
podemos ir mais longe e verificar se nos items tem um array e dentro dele dois objetos ques são a entetidade questionAttachment então ele deve ter uma id sendo um new uniqueentityId uma sendo 1 e o outro sendo 2 assim a gente esta garantido que ao criar uma pergunta ele tambem esta persistindo os attachments fica assim esse teste:
test('if can create an attachment persistence when question is created', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'question',
      content: 'this question?',
      attachmentIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsAttachmentRepository.items).toHaveLength(2)
    expect(inMemoryQuestionsAttachmentRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityId('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityId('2'),
        }),
      ]),
    )
o qrauivo todo fica assim:
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachment-repository'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionsAttachmentRepository: InMemoryQuestionAttachmentsRepository
let sut: CreateQuestionUseCase

describe('create question test', () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentRepository,
    )
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  test('if can create an question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'question',
      content: 'this question?',
      attachmentIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.question.content).toEqual('this question?')
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
    expect(
      inMemoryQuestionsRepository.items[0].attachment.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionsRepository.items[0].attachment.currentItems,
    ).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityId('1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityId('2'),
      }),
    ])
  })
  test('if can create an attachment persistence when question is created', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'question',
      content: 'this question?',
      attachmentIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsAttachmentRepository.items).toHaveLength(2)
    expect(inMemoryQuestionsAttachmentRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityId('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityId('2'),
        }),
      ]),
    )
  })
})

    agora vamos fazer o ultimo ajuste que é na parte de edição
    entao vamos para o arquivo de testes de edit question copiamos o teste principal deles e colamos na parte de aixo criando um novo teste e mudamos o nome pra 
    test('if sync new and removed attachment when editing a question', async () => {
   
   mantemos o inicio dele de criar a question criar os attachment 1 e 2 e depois chamar o useCase com 1 e 3 ou seja adicionou o 3 e removeu o 2
   vamos nomear a chamada para o execute como uma const chamada result
    e agora nos expects a gente remove os que estão porem esperamos que o resultado seja right e esperamos que la no inmemoryattachments a gente tenha o 1 e o 3 e não tenha o 2. tamem que tenha lenght de 2. sabendo que o length é dois e que la tem os ids 1 e 3 fica obvio que o id2 não existe mais la.
    fica assim o arquivo de teste:
    import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UnauthorizedError } from '../../../../core/errors/errors/unauthorized'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachment-repository'
import { makeQuestionAttachments } from 'test/factories/make-question-attachments'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionsAttachmentRepository: InMemoryQuestionAttachmentsRepository
let sut: EditQuestionUseCase

describe('edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentRepository,
    )
    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionsAttachmentRepository,
    )
  })

  test('if can edit a question using id', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)
    inMemoryQuestionsAttachmentRepository.items.push(
      makeQuestionAttachments({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeQuestionAttachments({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-1',
      title: 'new title',
      content: 'content edited',
      attachmentIds: ['1', '3'],
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'new title',
      content: 'content edited',
    })
    expect(
      inMemoryQuestionsRepository.items[0].attachment.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionsRepository.items[0].attachment.currentItems,
    ).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityId('1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityId('3'),
      }),
    ])
  })

  test('if cannot edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-2',
      title: 'new title',
      content: 'content edited',
      attachmentIds: [],
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedError)
  })
  test('if sync new and removed attachment when editing a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)
    inMemoryQuestionsAttachmentRepository.items.push(
      makeQuestionAttachments({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeQuestionAttachments({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-1',
      title: 'new title',
      content: 'content edited',
      attachmentIds: ['1', '3'],
    })
    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsAttachmentRepository.items).toHaveLength(2)
    expect(inMemoryQuestionsAttachmentRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityId('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityId('3'),
        }),
      ]),
    )
  })
})


agora na camada de dominio a gente ja tem a garantia que estamos criando os attacjhments e persistindo eles junto da criação de questions. porem ainda temos que fazer o mesmo na camada de infra.
## persistindo anexos no banco de dados
vamos abrir a camada de infra
vamos em database prisma repositories e pegamos o prisma questions repository
e nesse repositorio a gente vai adicionar uma nova dependencia la no constructor que é o repositorio de anexos
constructor(
    private prisma: PrismaService,
    private questionAttachments: QuestionAttachmentsRepository,
  ) {}

  e agora no create alem de disparar a ciração da question a gente tambme vai disparar a criação no questionAttachments do createMany pegando os attachments que vão vir da question
    async create(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.create({
      data,
    })

    await this.questionAttachments.createMany(question.attachment.getItems())
  }

  no update a gente tambem vai disparar porem com aquela alteração para o remove ou create
    async save(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.update({
      where: { id: data.id },
      data,
    })
    await this.questionAttachments.createMany(question.attachment.getNewItems())
    await this.questionAttachments.deleteMany(
      question.attachment.getRemovedItems(),
    )
  }
  porem agora que estamos na parte de infra a gente tem que se preocupar um pouco mais com performace e ai por exemplo na criação da pergunta a gente não pode rodar simultaneamente a criação da pergunta e do attachment porque precisamos do id da pergunta para os attachments
  e por outro lado no save a criação e remoção de anexos pode acontecer ao mesmo tempo. então no caso do save a gente usa um await Promisse.all e jogamos as tres coisas la ao mesmo tempo. o create esta certo com o await para cada uma das operações.
  ele fica assim 

   async save(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await Promise.all([
      this.prisma.question.update({
        where: { id: data.id },
        data,
      }),
      this.questionAttachments.createMany(question.attachment.getNewItems()),
      this.questionAttachments.deleteMany(
        question.attachment.getRemovedItems(),
      ),
    ])
  }
  e com isso a operação fica mais rapida.
  a gente poderia fazer transactions dentro do prisma e que ai se um falahar ele continuaria com os outros ou algo assim. o ideal seria sim ser uma transaction porem o prisma não permite transactions que englobem coisas que acontecem em arquivos diferentes
  e ai teria uma extenção do prisma para resolver isso
  callback free interactive transactions assim a gente consegue fazer uma transaction dessa forma que poderia chamar em diferentes arquivos. porem isso não é ainda para usar em produçéao então o prisma nos evita de fazer isso em transaction por enquanto.
  a pagina fica assim:
  import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Questions } from '@/domain/forum/enterprise/entities/questions'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(
    private prisma: PrismaService,
    private questionAttachments: QuestionAttachmentsRepository,
  ) {}

  async findById(id: string): Promise<Questions | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    })

    if (!question) {
      return null
    }
    return PrismaQuestionMapper.toDomain(question)
  }

  async findBySlug(slug: string): Promise<Questions | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
    })
    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findManyRecent({ page }: PaginationParams): Promise<Questions[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions.map(PrismaQuestionMapper.toDomain)
  }

  async create(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.create({
      data,
    })

    await this.questionAttachments.createMany(question.attachment.getItems())
  }

  async delete(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.delete({ where: { id: data.id } })
  }

  async save(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await Promise.all([
      this.prisma.question.update({
        where: { id: data.id },
        data,
      }),
      this.questionAttachments.createMany(question.attachment.getNewItems()),
      this.questionAttachments.deleteMany(
        question.attachment.getRemovedItems(),
      ),
    ])
  }
}

agora vamos para o prisma question attachment repository e implementamos os dois metodos no create many primeiro a gente verifica se o attachment.mength for iqual a 0 a gente retorna nada assim ele não vai fazer nenhuma operação no banco
se for maior que zero o que a gente quer fazer néao é criar esses attachments e sim atualizar varios attachments para colocar o id la no anco de dados nos attachments a gente colocando o questionId para fazer o link e ai a gente quer atualizar todos onde o id estiver dentro da lista de attachments e para isso a gente vai fazer um const attachmentIds  que vai ser uma mapeamento de cada attachment retornarnso o attachment.id.tostring

 const attachmentIds = attachments.map((attachment)=> {
      return attachment.id.toString()
    })

    e ai a gente vai no prisma updateMany where id in:attachmentId

e ai como todos os attachments vão ter o mesmo questionId pq eles chegam juntos a gente vai pegar o questionId do primeiro e dar to string passando isso no data. 
porem para melhorar um pouco isso a gente pode ir la no prisma attachment mapper e criar um novo metodo static toPrismaUpdateMany  que vai devolver um prismaAttachmetUpdateManyArgs que é o que ele recebe la no banco de dados O mapper fica 100% associado ao repostiorio então ele não tem que ficar desconectado do prisma. e agora a gente vai mover a nossa logica que a gente fez la no repositorio que estava assim:
async createMany(attachments: QuestionAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return
    }
    const attachmentIds = attachments.map((attachment) => {
      return attachment.id.toString()
    })

    await this.prisma.attachment.updateMany({
      where: {
        id: { in: attachmentIds },
      },
      data: {
        questionId: attachments[0].questionId.toString(),
      },
    })
  }
  para dentro do mapper
  o mapper fica assim:
  import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaQuestionAttachmentMapper {
  static toDomain(raw: PrismaAttachment): QuestionAttachment {
    if (!raw.questionId) {
      throw new Error('Invalid attachment type')
    }
    return QuestionAttachment.create(
      {
        attachmentId: new UniqueEntityId(raw.id),
        questionId: new UniqueEntityId(raw.questionId),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    attachments: QuestionAttachment[],
  ): Prisma.AttachmentUpdateManyArgs {
    const attachmentIds = attachments.map((attachment) => {
      return attachment.id.toString()
    })
    return {
      where: {
        id: { in: attachmentIds },
      },
      data: {
        questionId: attachments[0].questionId.toString(),
      },
    }
  }
}
agora a gente volta no repositorio que ficou assim o metodo com as partes arrancadas
 async createMany(attachments: QuestionAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return
    }
  

    await this.prisma.attachment.updateMany({
    
    })
  }
  e fazemos uma const data para chamar o mapper e passar para ele nossos attachments e ai na chamada para o banco de dados a gente passa esse data
   fica assim:

  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return
    }
    const data = PrismaQuestionAttachmentMapper.toPrisma(attachments)

    await this.prisma.attachment.updateMany(data)
  }

  agra vamos para o metodo delete many
  a gente vai fazer a mesma verificação de length e deois a gente vai pegar os ids da mesma forma e deposia  gente chama o prisma para deletar many onde o id aparece. o repositorio fica assim:
  import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionAttachmentMapper } from '../mappers/prisma-question-attachment-mapper'

@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const questionAttachments = await this.prisma.attachment.findMany({
      where: { questionId },
    })
    return questionAttachments.map(PrismaQuestionAttachmentMapper.toDomain)
  }

  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return
    }
    const data = PrismaQuestionAttachmentMapper.toPrisma(attachments)

    await this.prisma.attachment.updateMany(data)
  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return
    }
    const attachmentIds = attachments.map((attachment) => {
      return attachment.id.toString()
    })

    await this.prisma.attachment.deleteMany({
      where: {
        id: { in: attachmentIds },
      },
    })
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: { questionId },
    })
  }
}

agora a gente so precisa fazer o controller receber os attachments ent#ao vamos la no controller
vamosn no create-question.controller.ts 
ena validação do body a gente rrecebe uma lista de attachments que vai ser um array de string que são uuid então vai ser assim:

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid()),
})

e agora no controller a gente recebe essa lista de attachments e repassa para o caso de uso como sendo attachments id
 {
    const { title, content, attachments } = body
    const userId = user.sub

    const result = await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentIds: attachments,
    })

    fica assim o controller
    import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jtw.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid()),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
  ) {
    const { title, content, attachments } = body
    const userId = user.sub

    const result = await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentIds: attachments,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

ainda falta agora ver o teste
## teste de criaão de pergunta com anexo
quando a gente vai criar a pergurta a gente precisa que os nossos anexos ja estejam criados previamente (em um caso real seria meio que vc adiciona os arquivos e so libera o butão de criar a pergunta quando o upload completar.)
atualmente a gentetem a factory de makequestionattachment qu cria o relacionamento entre a question e a pergunta mas não temos ainda uma factory de attachment para criar o anexo sowinho.
então vamos em factories e vamos criar um make-attachemnt.ts copiamos o makestudent nele a damos replace e todos os student para ser attachment
temos que ir la no attachment entity para exportar as attachment porps
ajustamos a importação do mapper
e agora o attachment vai ter um title que a gente vai usar o loren slug
a url a gente tambem vai usar um loren slug 
 const attachment = Attachment.create(
    {
      title: faker.lorem.slug(),
      url: faker.lorem.slug(),
      ...override,
    },
    id,
  )

  e no factory que esta abaixo a gente tem que substituir o user por attachment
  
    await this.prisma.attachment.create({
      data: PrismaAttachmentsMapper.toPrisma(attachment),
    })
o factory fica assim:
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import {
  Attachment,
  AttachmentProps,
} from '@/domain/forum/enterprise/entities/attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaAttachmentsMapper } from '@/infra/database/prisma/mappers/prisma-attachment-mapper'

export function makeAttachment(
  override: Partial<AttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const attachment = Attachment.create(
    {
      title: faker.lorem.slug(),
      url: faker.lorem.slug(),
      ...override,
    },
    id,
  )

  return attachment
}

@Injectable()
export class AttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAttachment(
    data: Partial<AttachmentProps> = {},
  ): Promise<Attachment> {
    const attachment = makeAttachment(data)

    await this.prisma.attachment.create({
      data: PrismaAttachmentsMapper.toPrisma(attachment),
    })

    return attachment
  }
}

agora voltamos para o teste e vamos instansiar o attachmentFactory com o let, o moduleref e etc. e la no nosso teste mesmo antes de criar a pergunta a gente vai criar dois anexso com o factory lembrando que com o makePrismaAttachment ele ja esta salvando no banco de dados.
  const attachment1 = await attachmentFactory.makePrismaAttachment()
    const attachment2 = await attachmentFactory.makePrismaAttachment()

e agora dentro da criação de pergunta a gente vai enviar o id dos dois attachments
 const response = await request(app.getHttpServer())
      .post('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Question',
        content: 'This is the question',
        attachments: [attachment1.id.toString(), attachment2.id.toString()],
      })

      e agora a gente tem que saber se o controller esta associando esses ids de anexos que ja foram criados previamente com o id da pergunta.
      então depois do primeiro expect a gente vai criar uma nova const chamada attachmentOnDatabase para ir no prisma e dar um findMany para verificar quantos attachments existem com o id dessa pergunta e ai a gente faz um expect que seja length 2
      
    expect(QuestionOnDatabase).toBeTruthy()

    const attachmentOnDatabase = await prisma.attachment.findMany({
      where: {
        questionId: QuestionOnDatabase?.id,
      },
    })

    expect(attachmentOnDatabase).toHaveLength(2) 

    porem assim teriamos um erro porque a entidade attachment tem o id dela tambem que ela pode criar se néao for passado e agente cria esse id a cada vez então a gentenão estava pegando o id correto no prismaquestionAttachmentMapper ele fica assim com o ajuste:
     import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaQuestionAttachmentMapper {
  static toDomain(raw: PrismaAttachment): QuestionAttachment {
    if (!raw.questionId) {
      throw new Error('Invalid attachment type')
    }
    return QuestionAttachment.create(
      {
        attachmentId: new UniqueEntityId(raw.id),
        questionId: new UniqueEntityId(raw.questionId),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    attachments: QuestionAttachment[],
  ): Prisma.AttachmentUpdateManyArgs {
    const attachmentIds = attachments.map((attachment) => {
      return attachment.attachmentId.toString()
    })
    return {
      where: {
        id: { in: attachmentIds },
      },
      data: {
        questionId: attachments[0].questionId.toString(),
      },
    }
  }
}

e o teste do create question fica assim e ja passa:
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AttachmentFactory } from 'test/factories/make-attachemnt'
import { StudentFactory } from 'test/factories/make-student'

describe('Create questions tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let attachmentFactory: AttachmentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, AttachmentFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    studentFactory = moduleRef.get(StudentFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST]/questions', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const attachment1 = await attachmentFactory.makePrismaAttachment()
    const attachment2 = await attachmentFactory.makePrismaAttachment()

   const response = await request(app.getHttpServer())
      .post('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Question',
        content: 'This is the question',
        attachments: [attachment1.id.toString(), attachment2.id.toString()],
      })

    expect(response.statusCode).toBe(201)

    const QuestionOnDatabase = await prisma.question.findFirst({
      where: {
        title: 'Question',
      },
    })

    expect(QuestionOnDatabase).toBeTruthy()

    const attachmentOnDatabase = await prisma.attachment.findMany({
      where: {
        questionId: QuestionOnDatabase?.id,
      },
    })

    expect(attachmentOnDatabase).toHaveLength(2)
  })
})

## edit question with attachment
vamos no edit question controller e no schema dele vamos fazer o derebimento dos attachments igual
const editQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid())
  e vamos pegar ela na função e vamos mandar ela no attachment ids
   const { title, content, attachments } = body
    const userId = user.sub

    const result = await this.editQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentIds: attachments,
      questionId,
    })
    a pagina toda fica assim:
    import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jtw.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'

const editQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid()),
})

const bodyValidationPipe = new ZodValidationPipe(editQuestionBodySchema)

type EditQuestionBodySchema = z.infer<typeof editQuestionBodySchema>

@Controller('/questions/:id')
export class EditQuestionController {
  constructor(private editQuestion: EditQuestionUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: EditQuestionBodySchema,
    @Param('id') questionId: string,
  ) {
    const { title, content, attachments } = body
    const userId = user.sub

    const result = await this.editQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentIds: attachments,
      questionId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

agora podemos ir no teste do edit question e vamos instanciar o attachment factory e tambem o questionAttachmentFactory porem como não temos o questionAttachmentFactory a gente vai criar ele no arquivo de make question attachment. copimos uma parte do o makeAttachments e colamos no make-question-attachments.ts
a parte copiada " essa

@Injectable()
export class AttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAttachment(
    data: Partial<AttachmentProps> = {},
  ): Promise<Attachment> {
    const attachment = makeAttachment(data)

    await this.prisma.attachment.create({
      data: PrismaAttachmentsMapper.toPrisma(attachment),
    })

    return attachment
  }
}

e mudamos o nome para questionAttachmentFactory e importamos as coisas mudamos o metodo para makeprismaquestionattachment ao inves do attachmentProps a gente pega o questionAttachmentProps e devolvemos o questionAttachment e ai usamos o makequestionAttachment para ter um questionAttachment e ai a gente não cria uma nova entrada no banco de dados a gente so atualiza o existente para faer a relação.
então damos um opdate onde o id é igual ao questionattachment attachmentId e a gente atualiza o questionId dele para ser o questionAttachment.questionId fica assim a pagina toda
import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from '@/domain/forum/enterprise/entities/question-attachment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeQuestionAttachments(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const questionAttachments = QuestionAttachment.create(
    {
      questionId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return questionAttachments
}

@Injectable()
export class QuestionAttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestionAttachment(
    data: Partial<QuestionAttachmentProps> = {},
  ): Promise<QuestionAttachment> {
    const questionAttachment = makeQuestionAttachments(data)

    await this.prisma.attachment.update({
      where: {
        id: questionAttachment.attachmentId.toString(),
      },
      data: { questionId: questionAttachment.questionId.toString() },
    })

    return questionAttachment
  }
}

agora podemos voltar par ao teste e instanciar o questionAttachmentFactory
e agora no corpo do teste a gente assim que cria a pergunta a gente ja cria ela com dois anexos e tambem vamos criar o questionAttachmentFactory para criar o relacionamento entre a question e o attachment tanto para o attachment1 quanto para o 2 fica assim:
   const attachemnt1 = await attachmentFactory.makePrismaAttachment()
    const attachemnt2 = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachemnt1.id,
      questionId: question.id,
    })
    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachemnt2.id,
      questionId: question.id,
    })
    vamos colocaf os attachment 1 e 2 antes da criação da pergunta. não muda nada mas é apenas para simular o processo que o usuario vai azer.
    e agora depois de relacionar os dois attachments a gente vai criar o attachment 3 e agora na requisição a gente vai enviar apenas o id do attachment 1 e 3 assim ele deve manter o um apagar o dois e adicionar o tres
    agora nos expects a gente pode copiar do create question a parte do attachmentOnDatabase e o expect dele que tem que continuar tendo length 2 e podemos tambem verificar se o attachmentondatabase é um array contendo dois objetos com os ids dos attachment1 e 3 a pagina toda fica assim:
    import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AttachmentFactory } from 'test/factories/make-attachemnt'
import { QuestionFactory } from 'test/factories/make-question'
import { QuestionAttachmentFactory } from 'test/factories/make-question-attachments'
import { StudentFactory } from 'test/factories/make-student'

describe('Edit questions tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let attachmentFactory: AttachmentFactory
  let questionAttachmentFactory: QuestionAttachmentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AttachmentFactory,
        QuestionAttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    questionFactory = moduleRef.get(QuestionFactory)
    studentFactory = moduleRef.get(StudentFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    questionAttachmentFactory = moduleRef.get(QuestionAttachmentFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[Put]/questions/:id', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const attachemnt1 = await attachmentFactory.makePrismaAttachment()
    const attachemnt2 = await attachmentFactory.makePrismaAttachment()

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachemnt1.id,
      questionId: question.id,
    })
    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachemnt2.id,
      questionId: question.id,
    })

    const attachemnt3 = await attachmentFactory.makePrismaAttachment()

    const questionId = question.id.toString()

    const response = await request(app.getHttpServer())
      .put(`/questions/${questionId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'New Title',
        content: 'New Content',
        attachments: [attachemnt1.id.toString(), attachemnt3.id.toString()],
      })

    expect(response.statusCode).toBe(204)

    const QuestionOnDatabase = await prisma.question.findFirst({
      where: {
        title: 'New Title',
        content: 'New Content',
      },
    })

    expect(QuestionOnDatabase).toBeTruthy()

    const attachmentOnDatabase = await prisma.attachment.findMany({
      where: {
        questionId: QuestionOnDatabase?.id,
      },
    })

    expect(attachmentOnDatabase).toHaveLength(2)
    expect(attachmentOnDatabase).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: attachemnt1.id.toString() }),
        expect.objectContaining({ id: attachemnt3.id.toString() }),
      ]),
    )
  })
})

# resposta com anexos
primeiro de tudo vamos la nos repositorios da camada de dominio e vamos fazer s metodos createMany e deleteMany no answers attachment repository e ele fica assim:
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export abstract class AnswerAttachmentsRepository {
  abstract createMany(attachments: AnswerAttachment[]): Promise<void>
  abstract deleteMany(attachments: AnswerAttachment[]): Promise<void>
  abstract findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  abstract deleteManyByAnswerId(answerId: string): Promise<void>
}
agora vamos no inmemory repository e vamos copiar os metodos que fizemos para o question dentro do answr e trocamos todos os questionAttachment por answer attachment.  fica assim:
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public items: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    )

    return answerAttachments
  }

  async createMany(attachments: AnswerAttachment[]): Promise<void> {
    this.items.push(...attachments)
  }

  async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
    const answerAttachments = this.items.filter((item) => {
      return !attachments.some((attachment) => attachment.equals(item))
    })
    this.items = answerAttachments
  }

  async deleteManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    )
    this.items = answerAttachments
  }
}




e tambem no questionRepository temos ajustes de chamar os metodos dentro do create e do save e tambem de color a dependencia no constructor então tambem fazemos isso a dependencia ja estava feita porem trocamos um erro de digitação que o A estava maisuclo no nome da variavel e depois adicionamos as chamadas no create e save e ajustamos o nome para ser answer fica assim:
import { DomainEvents } from '@/core/event/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  constructor(
    private answerAttachmentRepository: AnswerAttachmentsRepository,
  ) {}

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)

    await this.answerAttachmentRepository.createMany(
      answer.attachment.getItems(),
    )

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id)
    if (!answer) {
      return null
    }
    return answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items.splice(itemIndex, 1)
    this.answerAttachmentRepository.deleteManyByAnswerId(answer.id.toString())
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[itemIndex] = answer

    await this.answerAttachmentRepository.createMany(
      answer.attachment.getNewItems(),
    )
    await this.answerAttachmentRepository.deleteMany(
      answer.attachment.getRemovedItems(),
    )

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }
}


agora podemos ir no caso de uso vamos no teste do create question e temos um teste para testar se ele esta criando os attachments copiamos ele e colamos ele no teste do create answer ajustamos o erro que tinha instructor id no teste que ja estava la e trocamos por author id
ajustamo o titulo do novo teste e as coisas que passamos na result e se validamos dentro do answersRepository fica assim:
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answer-repository'
import { AnswerQuestionUseCase } from './answer-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachment-repository'

let inMemoryAnswersAttachmentRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('create answer for question test', () => {
  beforeEach(() => {
    inMemoryAnswersAttachmentRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswersAttachmentRepository,
    )
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  test('if can create an answer', async () => {
    const result = await sut.execute({
      questionId: '1',
      authorId: '1',
      content: 'this is the answer content',
      attachmentIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answer.content).toEqual('this is the answer content')
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
    expect(
      inMemoryAnswersRepository.items[0].attachment.currentItems,
    ).toHaveLength(2)
    expect(inMemoryAnswersRepository.items[0].attachment.currentItems).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityId('1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityId('2'),
      }),
    ])
  })
  test('if can create an attachment persistence when answer is created', async () => {
    const result = await sut.execute({
      authorId: '1',
      questionId: '1',
      content: 'this answer',
      attachmentIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersAttachmentRepository.items).toHaveLength(2)
    expect(inMemoryAnswersAttachmentRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityId('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityId('2'),
        }),
      ]),
    )
  })
})

e agora vamos no edit question e temos o teste do sync e vamos colocar esse teste no edit answer.spec ajustamos o titulo do teste  e nele a gente faz o a=make answer e não o make question damos um push usando o maka answerAttachment e mudando para answer as coisas
e ai no result a gente anda o answerId e tiramos o title  e no expect a gente sa o answerAttachment repository o arquivo fica assim:
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answer-repository'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UnauthorizedError } from '../../../../core/errors/errors/unauthorized'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachment-repository'
import { makeAnswerAttachments } from 'test/factories/make-answer-attachments'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswersAttachmentRepository: InMemoryAnswerAttachmentsRepository
let sut: EditAnswerUseCase

describe('edit answer', () => {
  beforeEach(() => {
    inMemoryAnswersAttachmentRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswersAttachmentRepository,
    )
    sut = new EditAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswersAttachmentRepository,
    )
  })

  test('if can edit a answer using id', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )
    await inMemoryAnswersRepository.create(newAnswer)
    inMemoryAnswersAttachmentRepository.items.push(
      makeAnswerAttachments({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeAnswerAttachments({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-1',
      content: 'content edited',
      attachmentIds: ['1', '3'],
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'content edited',
    })
    expect(
      inMemoryAnswersRepository.items[0].attachment.currentItems,
    ).toHaveLength(2)
    expect(inMemoryAnswersRepository.items[0].attachment.currentItems).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityId('1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityId('3'),
      }),
    ])
  })

  test('if cannot edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )
    await inMemoryAnswersRepository.create(newAnswer)
    const result = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-2',
      content: 'content edited',
      attachmentIds: [],
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedError)
  })

  test('if sync new and removed attachment when editing a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )
    await inMemoryAnswersRepository.create(newAnswer)

    inMemoryAnswersAttachmentRepository.items.push(
      makeAnswerAttachments({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeAnswerAttachments({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    const result = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-1',
      content: 'content edited',
      attachmentIds: ['1', '3'],
    })
    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersAttachmentRepository.items).toHaveLength(2)
    expect(inMemoryAnswersAttachmentRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityId('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityId('3'),
        }),
      ]),
    )
  })
})

e ai com isso a gente pode rodar os testes unit para ver se esta funcionando. e depois vamos para a parte de infra vamoslogo nos mappers e copiamos o metodo que adcionamos do mapper do questionAttachent e colamos no mapper para answer attachments e ajustamos as modificações e importações o mapper fica assim:
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: PrismaAttachment): AnswerAttachment {
    if (!raw.answerId) {
      throw new Error('Invalid attachment type')
    }
    return AnswerAttachment.create(
      {
        attachmentId: new UniqueEntityId(raw.id),
        answerId: new UniqueEntityId(raw.answerId),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    attachments: AnswerAttachment[],
  ): Prisma.AttachmentUpdateManyArgs {
    const attachmentIds = attachments.map((attachment) => {
      return attachment.attachmentId.toString()
    })
    return {
      where: {
        id: { in: attachmentIds },
      },
      data: {
        answerId: attachments[0].answerId.toString(),
      },
    }
  }
}

agora vamos no prisma answer repository e vamos colocar a dependencia igual a gente fez no questions
  constructor(
    private prisma: PrismaService,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {} 
  agora vamos no metodo create dele e colamos a mesma coisa que adicionamos no metodo create do questions repository
   async create(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)
    await this.prisma.answer.create({
      data,
    })

    await this.answerAttachmentsRepository.createMany(
      answer.attachment.getItems(),
    )
  }
  e no metodo save a gente faz o promisse all
o arquivo fica assim:import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaAnswerMapper } from '../mappers/prisma-answer-mapper'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  constructor(
    private prisma: PrismaService,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async findById(id: string): Promise<Answer | null> {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id,
      },
    })
    if (!answer) {
      return null
    }

    return PrismaAnswerMapper.toDomain(answer)
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answer = await this.prisma.answer.findMany({
      where: { questionId },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return answer.map(PrismaAnswerMapper.toDomain)
  }

  async create(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)
    await this.prisma.answer.create({
      data,
    })

    await this.answerAttachmentsRepository.createMany(
      answer.attachment.getItems(),
    )
  }

  async delete(answer: Answer): Promise<void> {
    await this.prisma.answer.delete({ where: { id: answer.id.toString() } })
  }

  async save(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)

    await Promise.all([
      await this.prisma.answer.update({
        where: { id: data.id },
        data,
      }),
      this.answerAttachmentsRepository.createMany(
        answer.attachment.getNewItems(),
      ),
      this.answerAttachmentsRepository.deleteMany(
        answer.attachment.getRemovedItems(),
      ),
    ])
  }
}


  agora a gente vai no questionattachmentrepositoy e copia o metodo create many e delete many e jogamos eles no answerAttachment repositorye substituimos questiion attachment por answer attachment fica assim:
  import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaAnswerAttachmentMapper } from '../mappers/prisma-answer-attachment-mapper'

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answerAttachments = await this.prisma.attachment.findMany({
      where: { answerId },
    })
    return answerAttachments.map(PrismaAnswerAttachmentMapper.toDomain)
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: { answerId },
    })
  }

  async createMany(attachments: AnswerAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return
    }
    const data = PrismaAnswerAttachmentMapper.toPrisma(attachments)

    await this.prisma.attachment.updateMany(data)
  }

  async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return
    }
    const attachmentIds = attachments.map((attachment) => {
      return attachment.id.toString()
    })

    await this.prisma.attachment.deleteMany({
      where: {
        id: { in: attachmentIds },
      },
    })
  }
}

agora o que precisamos mudar é o controller vamos no answer question controller e vamos receber uma lista de attachments
const answerQuestionBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()),
}) e agora a gente pega a lista de attachments do body e passa ela para o usecase fica assim:
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jtw.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'

const answerQuestionBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()),
})

const bodyValidationPipe = new ZodValidationPipe(answerQuestionBodySchema)

type AnswerQuestionBodySchema = z.infer<typeof answerQuestionBodySchema>

@Controller('/questions/:questionId/answers')
export class AnswerQuestionController {
  constructor(private answerQuestion: AnswerQuestionUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string,
    @Body(bodyValidationPipe) body: AnswerQuestionBodySchema,
  ) {
    const { content, attachments } = body
    const userId = user.sub

    const result = await this.answerQuestion.execute({
      questionId,
      content,
      authorId: userId,
      attachmentIds: attachments,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

e fazemos logo a mesma coisa no edit answer.
ele fica assim:
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jtw.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'

const editAnswerBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()),
})

const bodyValidationPipe = new ZodValidationPipe(editAnswerBodySchema)

type EditAnswerBodySchema = z.infer<typeof editAnswerBodySchema>

@Controller('/answers/:id')
export class EditAnswerController {
  constructor(private editAnswer: EditAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: EditAnswerBodySchema,
    @Param('id') answerId: string,
  ) {
    const { content, attachments } = body
    const userId = user.sub

    const result = await this.editAnswer.execute({
      content,
      authorId: userId,
      attachmentIds: attachments,
      answerId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

agora vamos atualizar os testes
vamos mudar as factories e copiamos o metodo que esta injectable no make question attachments e coamos ele no make answer attachments o factor fica assim do make answer attachments
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeAnswerAttachments(
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const answerAttachments = AnswerAttachment.create(
    {
      answerId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return answerAttachments
}

@Injectable()
export class AnswerAttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAnswerAttachment(
    data: Partial<AnswerAttachmentProps> = {},
  ): Promise<AnswerAttachment> {
    const answerAttachment = makeAnswerAttachments(data)

    await this.prisma.attachment.update({
      where: {
        id: answerAttachment.attachmentId.toString(),
      },
      data: { answerId: answerAttachment.answerId.toString() },
    })

    return answerAttachment
  }
}

agora vamos para o teste do answer question e instanciamos o attachment factory
e agora dentro do teste a gente cria a question como estavamos fazendo e para criar a resposta com attachment antes dela a gente cria os dois attachments

    const attachment1 = await attachmentFactory.makePrismaAttachment()
    const attachment2 = await attachmentFactory.makePrismaAttachment()
    e agora na lista de attachments a gente passa o id dos dois
    
    const response = await request(app.getHttpServer())
      .post(`/questions/${questionId}/answers`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'New Answer',
        attachments: [attachment1.id.toString(), attachment2.id.toString()],
      })
      e vamos checar pelo banco de dados se eles foram salvos.
      fica assim o teste todo
      import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AttachmentFactory } from 'test/factories/make-attachemnt'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

describe('Answer questions tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let attachmentFactory: AttachmentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AttachmentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    questionFactory = moduleRef.get(QuestionFactory)
    studentFactory = moduleRef.get(StudentFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST]/questions/:questionId/answers', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const questionId = question.id.toString()

    const attachment1 = await attachmentFactory.makePrismaAttachment()
    const attachment2 = await attachmentFactory.makePrismaAttachment()

    const response = await request(app.getHttpServer())
      .post(`/questions/${questionId}/answers`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'New Answer',
        attachments: [attachment1.id.toString(), attachment2.id.toString()],
      })

    expect(response.statusCode).toBe(201)

    const answerOnDatabase = await prisma.answer.findFirst({
      where: {
        content: 'New Answer',
      },
    })

    expect(answerOnDatabase).toBeTruthy()

    const attachmentOnDatabase = await prisma.attachment.findMany({
      where: {
        answerId: answerOnDatabase?.id,
      },
    })

    expect(attachmentOnDatabase).toHaveLength(2)
  })
})

com essas alterações vai dar erro no teste de edit porque agora a gente falou no controller dele que precisa de uma lista de attachment. para previnir isso a gente pode no schema dele passar um default como array vazio assim:

const editAnswerBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()).default([]),
})
agora para terminar a gente vai no teste de edit answer e instanciar o attachmentfactory e o answer attachment factory e ai no teste apos criar uma resposta a gente ja associa alguns anexos a essa resposta assim:
    const answer = await answerFactory.makePrismaAnswer({
      questionId: question.id,
      authorId: user.id,
    })
    const attachment1 = await attachmentFactory.makePrismaAttachment()
    const attachment2 = await attachmentFactory.makePrismaAttachment()

    await answerAttachmentFactory.makePrismaAnswerAttachment({
      attachmentId: attachment1.id,
      answerId: answer.id,
    })
    await answerAttachmentFactory.makePrismaAnswerAttachment({
      attachmentId: attachment2.id,
      answerId: answer.id,
    })

agora temos uma resposta criada com dois anexos e vamos editar ela para um terceiro anexo e deletar o dois
então criamos o attachment3 logo depois e na edição a gente passa o id do primeiro e do terceiro attachment
  const response = await request(app.getHttpServer())
      .put(`/answers/${answerId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'New edited Answer',
        attachments: [attachment1.id.toString(), attachment3.id.toString()],
      })

      agora para a verificação a gente pode ir no edit question controller spec e copiar o attachment on database e sua verificaçõa e colar nesse
    
## dados relacionados com a api rest
pensando em nossa aplicação que é um forum em um forum geralmente temos uma listagem de perguntas e todas as perguntas ja vem com os dados do autor da pergunta e a nossa rota de listagem de perguntas não faz isso ainda e por mais que o front end tenha acesso ao id do autor é inviavel para o front end fazer uma requisição ao back para receber as informações do autor com o id para cada uma das pergutas o ideal é isso vir pronto do backend 
e quando abrimos uma pergunta a gente começa a ter um pouco mais de opção porque agora não estamos mais lidando com uma listagem inteira e sim apenas com uma pergunta e suas respostas anexos e etc ~então nessa unica pergunta a gente pode ja trazer a pergunta, os dados do autor porem nã é idial ja trazer os dados de todas as respostas dessa pergunta; o ideal é dividir isso em duas requisições e a requisicao quze vai trazer os dados da resposta da pergunta pode trazer dados do autor dessa resposta e alguns comentarios dessa resposta e um, butéao para carregar mais comentarios.
em outras palavras a gente não esta usando graphql mas a gente tem que entender o motivo por qual ele surgiu e as limitações ao usar o rest que estamos usando. os dois principas problemans do rest é overfetching e underfetching
se a gente na requisição da pergunta ja trazer as respostas como é que a gente vai fazer quando a gente quiser apenas a pergunta sem as respostas? não vai ter, vamos ter que filtrar porque teriamos uma rota que retorna tudo. isso é ruim porque isso vai somando na quantidade de bytes enviados na comunicação e faz mais processamento e fica mais lento.
o underfetch seria microrotas que não vao ter muitas coisas e ai teriamos que fazer diversas requisições para poder fazer uma coisa. 
então o que vamos fazer na nossa aplicação. vamos começar fazendo que na listagem de perguntas a gente ja tenha os dados do autor da pergunta. assim como a listagem de respostas e o comentario tambem ou seja tres rotas que vao vir com uma informação provionda de um relacionamento.
e tambem no caso de get question by slug alem de retornar os dados da pergunta ele vai retornar tambem os do autor e do anexo. 
## value object com comentario do autor
por enquanto nos nossos repositorios de contratos a gente pode ver que os metodos sempre retornam entidades pore exemplo 
  abstract findBySlug(slug: string): Promise<Questions | null>
  porem agora que a gente viu essa questão de relacionamento com api rest a gente quer que se retorne dados de diersas entidades de uma vez
  então vamos ter estruturas de dados que são compostas por diversas entidades e elas não são estruturas que a gente pode representar como tabelas de banco porque els ficam salvas em diversas tabelas de bancos.
  a forma de representar essas estruturas de dados saindo da caixa de entidade é porque entidade é o que a gente consegue identificar de forma individual, ou seja o que tem id unico. então se temos uma listagem de pergunta e que vai trazer tambem autor não vai ter id unico vai tero id da pergunta e do autor.
  para isso a gente vai usar o value object o value object é uma classe em que a gente identifica a individualidade dessa classe de acordo com o valor de suas propriedades ou seja ao inves de usar o id a gente vai usar as propriedades como o name ou algo assim. então se a gente quer listar perguntas com autores a gente vai identificar isso usando value object.
  então como vamos ter varios value objects agora na apliação a gente vai criar uma classe root para ele tambem. vamos copiar a classe root de entity que fica em core/entities.entity.ts
  e vamos colar no arquivo novo que vamos fazer nessa pasta core entities chamado value-object.ts
não tem problema se os outros values objects que a gente ja tinha não implementaresm essa entidade.
então no codigo que a gete colou no value-object.ts a gente ja vai retirar toda referencia a id porque eles néao tem id e no metodo equals que a gente usa para verificar se uma value object e igual a outra value object nos néoa temos o id então vamos ter que comparar um a outro de acordo com suas propriedaes então vamos fazer o if o value object for igual a null ou undefined a fgente retorna false
  if (valueObject === null || valueObject === undefined) {
      return false
    }

    se as propriedades do value object que estamos recebendo forem undefined a gente retorna false tamvem porque nesse caso ele não passou pelo metodo constructor porque o constructor define as props
    if (valueObject.props === undefined) {
      return false
    }

mas isso é so para evitar erros porque a real comparação vem agora. comparando uma classe a outra com vbase no valor de suas propriedades é interessante saber que se a gente tiver esses dois objetos
{
  name: 'iuri'
}
{
  name: 'iuri'
}
e a gente comparar eles com === ele vai dar false dizendo que não são iguais, porque o === não compara os valores e sim se eles ocupam o mesmo espaço na memoria. e nesse caso como tem dois objetos eles não iréao ocupar o mesmo mugar.
então para comparar os valores a gente precisa converter os props deles em um texto por exemplo ou alguma estrutira de dados que permita comparar somente o valor, entao a gente vai jogar o valueObject.props dentro de um JSON.stringfy()
o metodo fica assim:

  public equals(valueObject: ValueObject<unknown>) {
    if (valueObject === null || valueObject === undefined) {
      return false
    }

    if (valueObject.props === undefined) {
      return false
    }

    return JSON.stringify(valueObject.props) === JSON.stringify(this.props)
  }
  sendo assim se bater nesse ultimo como igual ele retorna true se não ele retorna false
  com isso a nossa clsse base de value object fica assim:
  export abstract class ValueObject<Props> {
  protected props: Props

  protected constructor(props: Props) {
    this.props = props
  }

  public equals(valueObject: ValueObject<unknown>) {
    if (valueObject === null || valueObject === undefined) {
      return false
    }

    if (valueObject.props === undefined) {
      return false
    }

    return JSON.stringify(valueObject.props) === JSON.stringify(this.props)
  }
}

e agora podemos ir na pasta de entitys no entreprise e na pasta de value object a gente pode criar o primeiro value object que vai ser de comentario com autor.
vamos partir para evitar mais o overfetching do que o underfetching. 
o comentario pode ter varios relcionamentos. mas aqui a gente vai trazer so o relacionamento do comentario com author. vamos começr da menor fatia possivel e ir aumentando no futuro se necessario.
o value object vai se chamar comment-with-author.ts
e vai ser uma classe que vai extender o valueobject que a gente acabou de criar
e nela vamos criar uma interface comment with author props e nela vamos falar quais infiormações vamos transicionar. não podemos desconectar da comunicação backend e front porque isso é uma coisa para a necessidade do front então vamos pensar em quais informações vamos passar para o front. entéao vamos trazer o id do comentario. e não vamos colocar apenas id porque o valueobject não tem id
ele não tem identidade principal; ele tem ul aglomerado de coisas e cada uma com seu importancia
vamos colocar o conteudo do comentario. vamos colocar o nome do autor o id do author a data em que o comentario foi criado e a data de update
export interface CommentWithAuthorProps {
  commentId: string
  content: string
  authorId: string
  author: string
  createdAt: Date
  updatedAt: Date | null
} 

e agora passamos no value object essas props e agora a gente vai fazer um metodo create porque o constructor do value object que a gente esta extendendo é protected etão ele não é acessivel. e esse metodo create vai receber as props e dar um new commentwithautor passando as props
  static create(props: CommentWithAuthorProps) {
    new CommentWithAuthor(props)
  }
  é melhor assim do que usando o construtor porque agora a gente pode fazer tipos de validação antes de criar e tambem vamos criar metodos getters para todos os campos que emos dentro desa classe
  se a gente não fizer o metodo get quando a gente quiser serializar essa classe ou seja transformar ela em json para enviar para o frontend a informação que não
estiver com get néao vai vir.
o value object fica assim:
import { ValueObject } from '@/core/entities/value-object'

export interface CommentWithAuthorProps {
  commentId: string
  content: string
  authorId: string
  author: string
  createdAt: Date
  updatedAt: Date | null
}
export class CommentWithAuthor extends ValueObject<CommentWithAuthorProps> {
  get commentId() {
    return this.props.commentId
  }

  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get author() {
    return this.props.author
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: CommentWithAuthorProps) {
    new CommentWithAuthor(props)
  }
}


agora o que a gete precisa é que nos usecase que dão fetch nos comments ao invez deles retornarem um array com a entidade questionComment ou com a entidade answerComment eles retornem um array com o valueObject commentwithauthor.

## listando o comentario com autor
agora se a gente vai no nosso question-comment-repository.ts  gente vai acha por exemplo o metodo findById mas ele não vai funcionar para a gente porque o value object néao tem id
ele serve mais para garantir que o comentario existe quando a gente for editar criar ou apagar.
o que nos queremos fazer é ter uma listagem de comentarios com o autor e o comentario
e isso é feito no findManyByQuestionId porem para não deletarmos nada a gente vai duplicar ele e chamad de findManyByQuestionIdWithAuthor e a estrutura do metodo vai ser a mesma porem ele não vai devolver uma lista de comments e sim de comments withauthor
  abstract findManyByQuestionIdWithAuthor(
    questionId: string,
    params: PaginationParams,
  ): Promise<CommentWithAuthor[]>

a pagina fica assim:
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author'

export abstract class QuestionCommentsRepository {
  abstract findById(id: string): Promise<QuestionComment | null>
  abstract findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>

  abstract findManyByQuestionIdWithAuthor(
    questionId: string,
    params: PaginationParams,
  ): Promise<CommentWithAuthor[]>

  abstract create(questionComment: QuestionComment): Promise<void>
  abstract delete(questionComment: QuestionComment): Promise<void>
}

agora a gente vai acarretar que a gente vai ter que modificar os nossos repositorios e como estamos nacamada de dominoo vamos começar no repositorio in memory que esta la em tests e la a gente duplica  metodo findManyByquestionId e mudamos o nome dele para o nome do withauthor
e ai vai dar erro porque ele retorna uma listagem de entidades e não é isso que o metodo espera.
então para ter cesso ao autor de uma pergunta a gente vai precisar ter acesso ao repositorio onde estão guardados os usuarios.
dentro do questionComments não tem como a gente pegar dados do autor a gente so tem o id mas não vai poder pegar o nome. entõa quando a gente precisa de informação que vem de um otro lugar a gente vai fazer uma injeção de dependecia
 e uma dica é que sempre que a gente esta lidando na camada do inMemoryRepository todos os outros repositorios que a gente receber tambem é bom usarmos do inmemory então a gente vai pegar o studentsRepository mas la do inMemoryStudends repostiry
 então fazemos ul constructor privete student repository
 
  constructor(private studentsRepository: InMemoryStudentsRepository) {}
porque usando o inmemory a gente tem acesso aos itens e com os itens a gente tem acesso a todos os usuarios de la e assim a gente pode procurar o id deles.
e agora o que a gente faz é no nosso metodo de withAutor a gente
const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)
      nisso a gente vai adicionar um map e nesse map a gente vai retornar um comment qiwhtAuthor . create assim vamos criar um e so disso não precisa nem criar nada mas a assinatura do metodo ja para de dar erro porque ele entende que o que ele esta devolvendo um commentwithautor como o nosso contrato pede.
  agora vamos preencher os dados desse commentWithAuthor. os que a gente ja tem são: onteudo, o id, a data de criação e de atualização .
  vamos voltar la pra o valueObject do props do commentWithAuthor e mudar o commentId de string para unique entityId e no authorId tambem e botamos o update como opcional.
export interface CommentWithAuthorProps {
  commentId: UniqueEntityId
  content: string
  authorId: UniqueEntityId
  author: string
  createdAt: Date
  updatedAt?: Date | null
}

assim a const fica assim:
 const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)
      .map((comment) => {
        return CommentWithAuthor.create({
          commentId: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        })
      })

  agora temos que colocar as informaçéoes do autor
  o authorId a gente ate pega do comment.authorId
  mas para o author que seria o nome a gente vai ter que manipular antes do return mas dentro do map a gente vai fazer a cosnt author ser uma chamada para o strundets repository itens.find assim vamos encontrar um aluno
  onde o id desse aluno seja igual ( e para isso vamos usar o metodo equals, a gente poderia usar tambem o to string e fazer uma comparação mas nesse caso vamos usar o equals que é o metodo do nosos unique entity id)
  que seja igual ao comment.authorid assiù
    const author = this.studentsRepository.items.find((student) => {
          return student.id.equals(comment.authorId)
        })
        dessa forma o author pode ser um student ou um undefined porque esse metodo pode sempreretonrar um undefined caso algo ai esteja vazio. então a gente vai lançar um erro caso o autor não exista. como é apenas para teste podemos jogar um erro mais generico mesmo porque o inmemory so roda nos testes.
        agora a gente pode passar como author o author.name e fica certo
  na commentWithAuthor value object estava faltando o return no metoo creta por isso dava erro a pagina correta é assim:
  import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'

export interface CommentWithAuthorProps {
  commentId: UniqueEntityId
  content: string
  authorId: UniqueEntityId
  author: string
  createdAt: Date
  updatedAt?: Date | null
}
export class CommentWithAuthor extends ValueObject<CommentWithAuthorProps> {
  get commentId() {
    return this.props.commentId
  }

  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get author() {
    return this.props.author
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: CommentWithAuthorProps) {
    return new CommentWithAuthor(props)
  }
}

e agora o in memory repository fica certo dessa forma;
import { DomainEvents } from '@/core/event/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { InMemoryStudentsRepository } from './in-memory-students-repository'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  constructor(private studentsRepository: InMemoryStudentsRepository) {}

  async findById(id: string) {
    const questionComment = this.items.find((item) => item.id.toString() === id)
    if (!questionComment) {
      return null
    }
    return questionComment
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async findManyByQuestionIdWithAuthor(
    questionId: string,
    { page }: PaginationParams,
  ) {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)
      .map((comment) => {
        const author = this.studentsRepository.items.find((student) => {
          return student.id.equals(comment.authorId)
        })

        if (!author) {
          throw new Error(`Author with ID ${comment.authorId} does not exists`)
        }

        return CommentWithAuthor.create({
          commentId: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          authorId: comment.authorId,
          author: author.name,
        })
      })

    return questionComments
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)

    DomainEvents.dispatchEventsForAggregate(questionComment.id)
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionComment.id,
    )
    await this.items.splice(itemIndex, 1)
  }
}
 e criamos um metodo que retorna tanto as infos do comentario quando to autor.
 agora podemos ir no caso de uso onde listamos os questionComments e vamos mudar o retorno de para commentsWithAuthro na list questionComents
 interface ListQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}
type ListQuestionCommentsUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>
e mudamos o metodo para o findManywithauthor e muamos o retorno para comments e a const tambm fica assim a pagina 
import { Either, right } from '@/core/either'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { Injectable } from '@nestjs/common'
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author'

interface ListQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}
type ListQuestionCommentsUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>

@Injectable()
export class ListQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    page,
    questionId,
  }: ListQuestionCommentsUseCaseRequest): Promise<ListQuestionCommentsUseCaseResponse> {
    const comments =
      await this.questionCommentsRepository.findManyByQuestionIdWithAuthor(
        questionId,
        {
          page,
        },
      )

    return right({ comments })
  }
}

agora vamos para o test desse use case e o inmemory uestion comments agora tem uma dependencia
o students repository para isso a gente vai instanciar esse repositorio e passamos a dependencia
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: ListQuestionCommentsUseCase

describe('list recent questioncomments test', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      inMemoryStudentsRepository,
    )
    sut = new ListQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })
  e agora em cada teste a gente não pode mais fazer comentario sem associar eles a um student que existe. ent éao a gente tem que criar um student antes dos comentarios e tambem adicionamos ele no repositorio com o itens . push ou com o create . a gente vai colocar o nome jhon doe para a gente poderverificar o nome depois.

    const student = makeStudent({ name: 'Jhon Doe' })
    await inMemoryStudentsRepository.items.push(student)
    e agora em todos os comentarios a gengte vai colocar ele como autor. mas tambem colocar cada comentario com um nome comment2 2 ou 3 para assim podermos ter acesso ao id deles.

        makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
        authorId: student.id,
      }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
        authorId: student.id,
      }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
        authorId: student.id,
      }),
    )

    porem para ter acesso ao id do comentario a gente tem que fazer uma const com a criação e deoois passar essa const para o inmemoryprepository assim:
       const comment1 = makeQuestionComment({
      questionId: new UniqueEntityId('question-1'),
      authorId: student.id,
    })

    const comment2 = makeQuestionComment({
      questionId: new UniqueEntityId('question-1'),
      authorId: student.id,
    })

    const comment3 = makeQuestionComment({
      questionId: new UniqueEntityId('question-1'),
      authorId: student.id,
    })

    await inMemoryQuestionCommentsRepository.create(comment1)
    await inMemoryQuestionCommentsRepository.create(comment2)
    await inMemoryQuestionCommentsRepository.create(comment3)



    e agora na listagem ao invez de questionComments a gente vai usar o comments
    
    expect(result.value?.comments).toHaveLength(3)
    e para ver se os dados do autor estão mesmo vindo a gente vai fazer um expect para isso tambem/
assim podemos fazer esse expect
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: 'Jhon Doe',
          commentId: comment1.id.toString(),
        }),
        expect.objectContaining({
          author: 'Jhon Doe',
          commentId: comment2.id.toString(),
        }),
        expect.objectContaining({
          author: 'Jhon Doe',
          commentId: comment3.id.toString(),
        }),
      ]),
    )
    e no segundo teste a gente so muda de questionComment para comment a pagina toda fica assim:
    import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { ListQuestionCommentsUseCase } from './list-question-comments'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { makeStudent } from 'test/factories/make-student'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: ListQuestionCommentsUseCase

describe('list recent questioncomments test', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      inMemoryStudentsRepository,
    )
    sut = new ListQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  test('if can list the questions questioncomments', async () => {
    const student = makeStudent({ name: 'Jhon Doe' })
    await inMemoryStudentsRepository.items.push(student)
    const comment1 = makeQuestionComment({
      questionId: new UniqueEntityId('question-1'),
      authorId: student.id,
    })

    const comment2 = makeQuestionComment({
      questionId: new UniqueEntityId('question-1'),
      authorId: student.id,
    })

    const comment3 = makeQuestionComment({
      questionId: new UniqueEntityId('question-1'),
      authorId: student.id,
    })

    await inMemoryQuestionCommentsRepository.create(comment1)
    await inMemoryQuestionCommentsRepository.create(comment2)
    await inMemoryQuestionCommentsRepository.create(comment3)

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.comments).toHaveLength(3)
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: 'Jhon Doe',
          commentId: comment1.id,
        }),
        expect.objectContaining({
          author: 'Jhon Doe',
          commentId: comment2.id,
        }),
        expect.objectContaining({
          author: 'Jhon Doe',
          commentId: comment3.id,
        }),
      ]),
    )
  })

  test('if can list paginated question comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})

porem se a gente rodar os testes ele vai dar o erro de autnhor com o id não existe. awuele erro que a gente configurou
porem o erro vai ser de outros testes porque como  inmemoryquestionComments agora tem uma dependencia para o studentrepository outros testes que usam esse repostiory vao falhar.
porem o teste de baixo esta falhando porque ele esta criando comentario sem autor e a gente não pode mais criar comentario sem autor então precisamos tambem criar o student nesse teste e passar o id quando a gente cria os questionComments
com a alteração a pagina fica assim:
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { ListQuestionCommentsUseCase } from './list-question-comments'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { makeStudent } from 'test/factories/make-student'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: ListQuestionCommentsUseCase

describe('list recent questioncomments test', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      inMemoryStudentsRepository,
    )
    sut = new ListQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  test('if can list the questions questioncomments', async () => {
    const student = makeStudent({ name: 'Jhon Doe' })
    await inMemoryStudentsRepository.items.push(student)
    const comment1 = makeQuestionComment({
      questionId: new UniqueEntityId('question-1'),
      authorId: student.id,
    })

    const comment2 = makeQuestionComment({
      questionId: new UniqueEntityId('question-1'),
      authorId: student.id,
    })

    const comment3 = makeQuestionComment({
      questionId: new UniqueEntityId('question-1'),
      authorId: student.id,
    })

    await inMemoryQuestionCommentsRepository.create(comment1)
    await inMemoryQuestionCommentsRepository.create(comment2)
    await inMemoryQuestionCommentsRepository.create(comment3)

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.comments).toHaveLength(3)
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: 'Jhon Doe',
          commentId: comment1.id,
        }),
        expect.objectContaining({
          author: 'Jhon Doe',
          commentId: comment2.id,
        }),
        expect.objectContaining({
          author: 'Jhon Doe',
          commentId: comment3.id,
        }),
      ]),
    )
  })

  test('if can list paginated question comments', async () => {
    const student = makeStudent({ name: 'Jhon Doe' })
    await inMemoryStudentsRepository.items.push(student)
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityId('question-1'),
          authorId: student.id,
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})
agora rodos testes passam
agora so precisamos nos controllers fazer ele retornar scomentarios com autnor.

## prisma comentario com author 
vamos la na camada de infa em database eabrimos os repositorios prisma question comments ele vai estar falhando porque não implementamos o metodo. vamos então duplicar o findManyByquestionid
e mudar o nome  como fizemos no outro e colocamos ele para retornar o commentWithAuthor
e ai nele a gente ta fazendo uma busca no prisma e o prisma nos da a possibilidade de usar o include quando usamos o findMany para trazer dados do relacionamento
assim a gente pode colocar author: true e ai ele vai trazer tanto os dados do comment quanto do author pq ele vai no relacionamento e pega as coisas das duas tabelas. para uma representação visual a questionComment vai ser isso agora:
const questionsComment: ({
    author: {
        id: string;
        name: string;
        email: string;
        password: string;
        role: $Enums.UserRole;
    };
} & {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date | null;
    authorId: string;
    questionId: string | null;
    answerId: string | null;
})[]

repare que tem dados do author e do commentario.
o nome disso é eagerloading
porem o prismaMapperquestionComment não esta preparado para essa informação do author por isso temos um erro porque ele so pega um comentario sem qualquer relacionamento e transforma e uma entidade ee néao esta preparado para pegar tambem o authro
então vamos criar o prisma-comment-with-author-mapper.ts
vamos criar um novo arquivo e não somplismente um novo metodo porque  porque a gente vai aproveitar ele tanto para respostas quanto para perguntas
a gente vai criar a classe dentro dele com o unico metodo toDomain
que vai receber um raw que vai ser por enquanto any
e vai devolver commentWithAuthor e ai dentro dele a gente da um return commentWithAuthor.create e dentro desse create a gente vai coocando as coisas.
 ainda sem colocar o codigo fica assim:
 import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'

export class PrismaCommentWithAuthorMapper {
  static todomain(raw: any): CommentWithAuthor {
    return CommentWithAuthor.create({
        
    })
  }
}

então como o metodo la do repositorio tras as infos do comentario mas tambem um objeto com os dados do autor a gente quando for tipar o raw vamos precisar e ai vamos importar la do prisma client o commentario chamando ele de prismaComment e o author que é o user chamando ele de prismaUser
assim a gente pode fazer a nossa tipagem PrismaCommentWithAuthor ser = ao comment + dentro dele um objecto que vai ser o author que vai ser o prismaUser isso na sintaxe fica assim

type PrismaCommentWithAuthor = PrismaComment & {
  author: PrismaUser
}

e ai vamos dizer qeu o tipo de raw é isso
e agora podemos preencher o campo created usando unique entity id para os id e para o author usando raw.author.name. a pagina fica assim:
import { Comment as PrismaComment, User as PrismaUser } from '@prisma/client'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

type PrismaCommentWithAuthor = PrismaComment & {
  author: PrismaUser
}

export class PrismaCommentWithAuthorMapper {
  static toDomain(raw: PrismaCommentWithAuthor): CommentWithAuthor {
    return CommentWithAuthor.create({
      commentId: new UniqueEntityId(raw.id),
      authorId: new UniqueEntityId(raw.authorId),
      content: raw.content,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      author: raw.author.name,
    })
  }
}

e agora la no repositorio a gente pode usar esse mapper para a p metodo
 async findManyByQuestionIdWithAuthor(

  a pagina toda do repositorio fica assim:
  import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionCommentMapper } from '../mappers/prisma-question-comment-mapper'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { PrismaCommentWithAuthorMapper } from '../mappers/prisma-comment-with-author-mapper'

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    })

    if (!questionComment) {
      return null
    }
    return PrismaQuestionCommentMapper.toDomain(questionComment)
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[]> {
    const questionsComment = await this.prisma.comment.findMany({
      where: { questionId },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questionsComment.map(PrismaQuestionCommentMapper.toDomain)
  }

  async findManyByQuestionIdWithAuthor(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<CommentWithAuthor[]> {
    const questionsComment = await this.prisma.comment.findMany({
      where: { questionId },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questionsComment.map(PrismaCommentWithAuthorMapper.toDomain)
  }

  async create(questionComment: QuestionComment): Promise<void> {
    const data = PrismaQuestionCommentMapper.toPrisma(questionComment)
    await this.prisma.comment.create({
      data,
    })
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    await this.prisma.comment.delete({
      where: { id: questionComment.id.toString() },
    })
  }
}

agora falta la no controller a gente ajustar as coisas hoje ele tem um presenter que recebe a entidade commentario e devolve algumas coisas com base nisso. como a gente mudou umas coisas a gente vai ter que fazer ajustes tambem no controller.

## controller CommentWithAuthor
vamos no fetch questioncomments controller e vamos mudar porque não estamos mais retornando questioncomments e sim so comments assim:

    const comments = result.value.comments

    return { comments: comments.map(CommentPresenter.toHTTP) }

    porem ai vamos ter um erro no nosso presenter então amos criar um novo presenter chamado comment with author presenter.ts
    e ele vai receber um comment with author
    export class CommentWithAuthorPresenter {
  static toHTTP(commentWithAuthor: CommentWithAuthor) {
    return {

      e ele vai devolver as informações do jeito que for mais interessante para o frontEnd
      e com o presenter a gente pode mudar o nome das informações então vamos colocar authorName para ser o author pq a informação que esta dentro do author é o nome do autor mesmo.
      o presenter fica assim:
      import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'

export class CommentWithAuthorPresenter {
  static toHTTP(commentWithAuthor: CommentWithAuthor) {
    return {
      commentId: commentWithAuthor.commentId.toString(),
      authorId: commentWithAuthor.authorId.toString(),
      authorName: commentWithAuthor.author,
      content: commentWithAuthor.content,
      createdAt: commentWithAuthor.createdAt,
      updatedAt: commentWithAuthor.updatedAt,
    }
  }
}


agora voltaos para o controller e podemus usar esse presenter
e o controller com as alterações fica assim:
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { ListQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/list-question-comments'
import { CommentWithAuthorPresenter } from '../presenters/comment-with-author-presenter'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageParamsTypeSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/questions/:questionId/comments')
export class FetchQuestionCommentController {
  constructor(private fetchQuestionComments: ListQuestionCommentsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageParamsTypeSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionComments.execute({
      page,
      questionId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
    const comments = result.value.comments

    return { comments: comments.map(CommentWithAuthorPresenter.toHTTP) }
  }
}

agora vamos para o teste desse controller
a gente ja esta criando usuario, mas vamos criar ele com nome especifico
  const user = await studentFactory.makePrismaStudent({
      name: 'Jhon Doe',
    })
    e no expect vamos verificar se o authorName vai ser o jhon doe que a gente definiu com as alterações o teste fica assim:
    import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { QuestionFactory } from 'test/factories/make-question'
import { QuestionCommentFactory } from 'test/factories/make-question-comment'
import { StudentFactory } from 'test/factories/make-student'

describe('Fetch questions comments tests (e2e)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let questionCommentFactory: QuestionCommentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, QuestionCommentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    questionCommentFactory = moduleRef.get(QuestionCommentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[get]/questions/:questionId/comments', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: 'Jhon Doe',
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const questionId = question.id.toString()

    await Promise.all([
      questionCommentFactory.makePrismaQuestionComment({
        authorId: user.id,
        questionId: question.id,
        content: 'Comment 01',
      }),
      questionCommentFactory.makePrismaQuestionComment({
        authorId: user.id,
        questionId: question.id,
        content: 'Comment 02',
      }),
      questionCommentFactory.makePrismaQuestionComment({
        authorId: user.id,
        questionId: question.id,
        content: 'Comment 03',
      }),
      questionCommentFactory.makePrismaQuestionComment({
        authorId: user.id,
        questionId: question.id,
        content: 'Comment 04',
      }),
    ])

    const response = await request(app.getHttpServer())
      .get(`/questions/${questionId}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      comments: expect.arrayContaining([
        expect.objectContaining({
          content: 'Comment 01',
          authorName: 'Jhon Doe',
        }),
        expect.objectContaining({
          content: 'Comment 02',
          authorName: 'Jhon Doe',
        }),
        expect.objectContaining({
          content: 'Comment 03',
          authorName: 'Jhon Doe',
        }),
        expect.objectContaining({
          content: 'Comment 04',
          authorName: 'Jhon Doe',
        }),
      ]),
    })
  })
})

## comentario da resposta com autor
agora vamos fazer a mesma funcionalidade porem para o comentario de resposta
em entreprise não precisamos mudar nada porque vamos usar o mesmo value object que criamos que é o comment with author.
então vamos no repositorio de answerComments para mudar os metodo criamos o findManyByAnswerIdWithAuthor que vai retornar um commentWith author a pagina fica assim:
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author'

export abstract class AnswerCommentsRepository {
  abstract findById(id: string): Promise<AnswerComment | null>
  abstract findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>

  abstract findManyByAnswerIdWithAuthor(
    answerId: string,
    params: PaginationParams,
  ): Promise<CommentWithAuthor[]>

  abstract create(answerComment: AnswerComment): Promise<void>
  abstract delete(answerComment: AnswerComment): Promise<void>
}


então vamos em useCases
vamos no list answerComments
a gente muda o retorno dele. e no execute a gente muda para usar o metodo que criamos e mudamos as coisas de answerComment para comment
a pagina fica assim:
import { Either, right } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { Injectable } from '@nestjs/common'
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author'

interface ListAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}
type ListAnswerCommentsUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>

@Injectable()
export class ListAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    page,
    answerId,
  }: ListAnswerCommentsUseCaseRequest): Promise<ListAnswerCommentsUseCaseResponse> {
    const comments =
      await this.answerCommentsRepository.findManyByAnswerIdWithAuthor(
        answerId,
        {
          page,
        },
      )

    return right({ comments })
  }
}

agora para fazer o teste vamos ter ue mudar o nosso inMemoryRepository
vamos copiar do inMemoryQuestionComments o metodo porque vai sr muito parecido. e a genente modifica ele para ao invez de tratar de questão tratar de answer, mudando os nomes. fazemos tambel o condtructor para o student repository a pagina fica assim:
import { DomainEvents } from '@/core/event/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { InMemoryStudentsRepository } from './in-memory-students-repository'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  constructor(private studentsRepository: InMemoryStudentsRepository) {}

  async findById(id: string) {
    const answerComment = this.items.find((item) => item.id.toString() === id)
    if (!answerComment) {
      return null
    }
    return answerComment
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return answerComments
  }

  async findManyByAnswerIdWithAuthor(
    answerId: string,
    { page }: PaginationParams,
  ) {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)
      .map((comment) => {
        const author = this.studentsRepository.items.find((student) => {
          return student.id.equals(comment.authorId)
        })

        if (!author) {
          throw new Error(`Author with ID ${comment.authorId} does not exists`)
        }

        return CommentWithAuthor.create({
          commentId: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          authorId: comment.authorId,
          author: author.name,
        })
      })

    return answerComments
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)

    DomainEvents.dispatchEventsForAggregate(answerComment.id)
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answerComment.id,
    )
    await this.items.splice(itemIndex, 1)
  }
}

agora a gente pode modificar nosso teste
a gente instancia o student repository
e agora como o nosso answerRepository depende do student todoanswerComment que a gente criar vai precisar ter um autor real então vamos criar um student la tambem
e passamos o id dele na criação de cada comment. agora no expect ao invez de esperar o answerComments a gente so espera o comment porque a gente tinha mudado isso la
e a gente verifica tambem a parte se oscommentarios estão vindo com o nome do author e o id do commentario diferente então a gente separa a criação de comments e faz o expect como tinhamos feito no teste de question
  test('if can list the answers answercomments', async () => {
    const student = makeStudent({ name: 'Jhon Doe' })

    inMemoryStudentsRepository.items.push(student)

    const comment1 = makeAnswerComment({
      answerId: new UniqueEntityId('answer-1'),
      authorId: student.id,
    })
    const comment2 = makeAnswerComment({
      answerId: new UniqueEntityId('answer-1'),
      authorId: student.id,
    })
    const comment3 = makeAnswerComment({
      answerId: new UniqueEntityId('answer-1'),
      authorId: student.id,
    })

    await inMemoryAnswerCommentsRepository.create(comment1)
    await inMemoryAnswerCommentsRepository.create(comment2)
    await inMemoryAnswerCommentsRepository.create(comment3)

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.comments).toHaveLength(3)
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: 'Jhon Doe',
          commentId: comment1.id,
        }),
        expect.objectContaining({
          author: 'Jhon Doe',
          commentId: comment2.id,
        }),
        expect.objectContaining({
          author: 'Jhon Doe',
          commentId: comment3.id,
        }),
      ]),
    )

    agora no segundo teste a gente coloca tambem a criação de student e passamos esse studentId no loop de criação e mudamos o expect para comments no lugar de answer comments o teste todo fica assim:
    import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { ListAnswerCommentsUseCase } from './list-answer-comment'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { makeStudent } from 'test/factories/make-student'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: ListAnswerCommentsUseCase

describe('list recent answercomments test', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(
      inMemoryStudentsRepository,
    )
    sut = new ListAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  test('if can list the answers answercomments', async () => {
    const student = makeStudent({ name: 'Jhon Doe' })

    inMemoryStudentsRepository.items.push(student)

    const comment1 = makeAnswerComment({
      answerId: new UniqueEntityId('answer-1'),
      authorId: student.id,
    })
    const comment2 = makeAnswerComment({
      answerId: new UniqueEntityId('answer-1'),
      authorId: student.id,
    })
    const comment3 = makeAnswerComment({
      answerId: new UniqueEntityId('answer-1'),
      authorId: student.id,
    })

    await inMemoryAnswerCommentsRepository.create(comment1)
    await inMemoryAnswerCommentsRepository.create(comment2)
    await inMemoryAnswerCommentsRepository.create(comment3)

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.comments).toHaveLength(3)
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: 'Jhon Doe',
          commentId: comment1.id,
        }),
        expect.objectContaining({
          author: 'Jhon Doe',
          commentId: comment2.id,
        }),
        expect.objectContaining({
          author: 'Jhon Doe',
          commentId: comment3.id,
        }),
      ]),
    )
  })

  test('if can list paginated answer comments', async () => {
    const student = makeStudent({ name: 'Jhon Doe' })

    inMemoryStudentsRepository.items.push(student)
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId('answer-1'),
          authorId: student.id,
        }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})

se a gente passar os unit tests funciona
vamos para o infra agora vamos começar dentro do repositorio do prisma e copiamos e colamos o metodo que tinhamos no questionCommets
fazemos as alterações e as importações lembrando que nessa parte do prisma a gente vai usar o mesmo mapper porque como usam a mesma tabela não tem tanto problema.
a pagina fica assim:
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaAnswerCommentMapper } from '../mappers/prisma-answer-comment-mapper'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { PrismaCommentWithAuthorMapper } from '../mappers/prisma-comment-with-author-mapper'

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    })

    if (!answerComment) {
      return null
    }
    return PrismaAnswerCommentMapper.toDomain(answerComment)
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const answersComment = await this.prisma.comment.findMany({
      where: { answerId },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return answersComment.map(PrismaAnswerCommentMapper.toDomain)
  }

  async findManyByAnswerIdWithAuthor(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<CommentWithAuthor[]> {
    const answerComment = await this.prisma.comment.findMany({
      where: { answerId },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return answerComment.map(PrismaCommentWithAuthorMapper.toDomain)
  }

  async create(answerComment: AnswerComment): Promise<void> {
    const data = PrismaAnswerCommentMapper.toPrisma(answerComment)
    await this.prisma.comment.create({
      data,
    })
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    await this.prisma.comment.delete({
      where: { id: answerComment.id.toString() },
    })
  }
}

agora vamos para o controller
fetchanswerComments comntroller a gente muda de answercomments para comment e ao invez de usar o commentPresenter a gente vai usar o comment withauthor presenter fica assim:
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { ListAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/list-answer-comment'
import { CommentWithAuthorPresenter } from '../presenters/comment-with-author-presenter'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageParamsTypeSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/answers/:answerId/comments')
export class FetchAnswerCommentController {
  constructor(private fetchAnswerComments: ListAnswerCommentsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageParamsTypeSchema,
    @Param('answerId') answerId: string,
  ) {
    const result = await this.fetchAnswerComments.execute({
      page,
      answerId,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
    const comments = result.value.comments

    return { comments: comments.map(CommentWithAuthorPresenter.toHTTP) }
  }
}


agora podemos ir para o teste
vamos criar um usuario coocar um nome dnele e verificar que ele esta sendo retornado o teste fica assim:
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AnswerFactory } from 'test/factories/make-answer'
import { AnswerCommentFactory } from 'test/factories/make-answer-comment'
import { QuestionFactory } from 'test/factories/make-question'
import { QuestionCommentFactory } from 'test/factories/make-question-comment'
import { StudentFactory } from 'test/factories/make-student'

describe('Fetch answers comments tests (e2e)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let answerCommentFactory: AnswerCommentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AnswerCommentFactory,
        AnswerFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    answerCommentFactory = moduleRef.get(AnswerCommentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[get]/answers/:answerId/comments', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: 'Jhon Doe',
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const answer = await answerFactory.makePrismaAnswer({
      authorId: user.id,
      questionId: question.id,
    })

    const answerId = answer.id.toString()

    await Promise.all([
      answerCommentFactory.makePrismaAnswerComment({
        authorId: user.id,
        answerId: answer.id,
        content: 'Comment 01',
      }),
      answerCommentFactory.makePrismaAnswerComment({
        authorId: user.id,
        answerId: answer.id,
        content: 'Comment 02',
      }),
      answerCommentFactory.makePrismaAnswerComment({
        authorId: user.id,
        answerId: answer.id,
        content: 'Comment 03',
      }),
      answerCommentFactory.makePrismaAnswerComment({
        authorId: user.id,
        answerId: answer.id,
        content: 'Comment 04',
      }),
    ])

    const response = await request(app.getHttpServer())
      .get(`/answers/${answerId}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      comments: expect.arrayContaining([
        expect.objectContaining({
          content: 'Comment 01',
          authorName: 'Jhon Doe',
        }),
        expect.objectContaining({
          content: 'Comment 02',
          authorName: 'Jhon Doe',
        }),
        expect.objectContaining({
          content: 'Comment 03',
          authorName: 'Jhon Doe',
        }),
        expect.objectContaining({
          content: 'Comment 04',
          authorName: 'Jhon Doe',
        }),
      ]),
    })
  })
})

agora a gente roda o test e2e e passando nos sabemnos que ja estamos retornarndo o commentario com os dados do autor desse comentario.

# dados da resposta.
assim como fizemos com os dados da pergunta trazendo dados do autor vamos fazer tambem para a resposta. da mesma forma que o question comment tem as suas coisas a answer question tambem trazer os dados. então vamos fazer isso
# value object detalhes da pergunta
agora vamos criar um value object para que quando clicar para vilualizar uma pergunta ela traga os dados do autor e dos anexos da pergunta
vamos criar m value object chamado uestion-details porque queremos retornar os datos da pergunta com mais relacionamento o autor e os anexos
copiamos e colamos o comment wiht autor e mudamos os nomes
nas props a gente coloca o attachment como sendo o Attachment entidade e array. isso porque essa entidade retorna apenas o url e o title e como nos vamos precisar dessas duas coisas a gente pode reaproveitar. se fosse uma entidade que retornasse enormemente de coisas que a gente não fosse usar a gente poderai recriar o attachment novalue object como sendo um array de objetos com algumas informações
o value object fica assim:
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'
import { Slug } from './slug'
import { Attachment } from '../attachment'

export interface QuestionWithDetailsProps {
  questionId: UniqueEntityId
  authorId: UniqueEntityId
  author: string
  title: string
  content: string
  slug: Slug
  attachments: Attachment[]
  bestAnswerId?: UniqueEntityId | null
  createdAt: Date
  updatedAt?: Date | null
}
export class QuestionWithDetails extends ValueObject<QuestionWithDetailsProps> {
  get questionId() {
    return this.props.questionId
  }

  get authorId() {
    return this.props.authorId
  }

  get author() {
    return this.props.author
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get attachments() {
    return this.props.attachments
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: QuestionWithDetailsProps) {
    return new QuestionWithDetails(props)
  }
}

agora vamos no repositorio do question na camada de dominio e vamos copiar o metodo getquestionByslug.  mas o getQuestionBySLug vai ser exatamente o metodo para trazer mais info sobre uma pergunta quando se clica nela então vamos usar ele para criar um novo a pagina fca assim:
import { PaginationParams } from '@/core/repositories/pagination-params'
import { Questions } from '../../enterprise/entities/questions'
import { QuestionWithDetails } from '../../enterprise/entities/value-objects/question-with-details'

export abstract class QuestionsRepository {
  abstract findById(id: string): Promise<Questions | null>
  abstract findBySlug(slug: string): Promise<Questions | null>
  abstract findDetailsBySlug(
    slug: string,
  ): Promise<QuestionWithDetails | null>

  abstract findManyRecent(params: PaginationParams): Promise<Questions[]>
  abstract create(question: Questions): Promise<void>
  abstract delete(question: Questions): Promise<void>
  abstract save(question: Questions): Promise<void>
}

com isso feito vamos editar o nosso caso de uso então vamos no getQuestionbySlug useCase
mudamos o retorno para dar a questionWithDetails e o cadso de uso para usar o finddetailsBySlug fica asim:
import { Either, left, right } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { QuestionWithDetails } from '../../enterprise/entities/value-objects/question-with-details'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}
type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  { question: QuestionWithDetails }
>

@Injectable()
export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findDetailsBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({ question })
  }
}

agora vamos la no inMemoryQuestionRepository para implementar esse novo metodo
o nosso repositorio ja tem o questionAttachmentsRepository mas esse repositorio so armazzena os ids e não o titulo e a url e como nos queremos o titulo e aurl a gente vai precisar tambem do attachmentsRepository e do student e tambem passamos todos esses repositorios para ser inmemory fica assim o constructor constructor(
    private questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository,
    private studentRepository: InMemoryStudentsRepository,
    private attachmentsRepository: InMemoryAttachmentsRepository,
  ) {}

agora no metodo a gente mantem a busca pela pergunta. e ja tendo a pergunta a gente pde buscar o author.
 const author = this.studentRepository.items.find((student) => {
      return student.id === question.authorId
    })
  
agora para pegar os questionAttachents primeiro a gente precisa pegar o id deles então vamos usar o questionAttachments repositoy e filtrar todos os attachments que tem o questionid igual o do question.Id
  const questionAttachments = this.questionAttachmentsRepository.items.filter(
      (attachment) => {
        return attachment.questionId === question.id
      },
    )
    isso vai nos dar uma lista de id de anexos e agora com essa lista a gente pode pegar os url e titulo deles então vamos fazer uma const attachment e vamos pegar essa lista e mapear e pegar dentro do atachmentrepository um anexo que tenha esse id,
    const attachment = questionAttachments.map((questionAtachment) => {
      const attachment = this.attachmentsRepository.items.find((attachment) => {
        return attachment.id === questionAtachment.attachmentId
      })
      if (!attachment) {
        throw new Error(
          `Attachment with id ${questionAtachment.attachmentId.toString()} does not exists`,
        )
      }
      return attachment
    })
    
     e agora a gente vai retornar o questionWithDetails. create e preencher todos os camos dele
     houveram alguns erros nos extratos de metodos que eu colei aqui antes. eu usei === no lugar de .equals por exemplo e o metodo tem como promisse uma questionWithDetails. então é melhor confiar nessa colada da pagina inteira que esta abaixo:
     import { DomainEvents } from '@/core/event/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Questions } from '@/domain/forum/enterprise/entities/questions'
import { InMemoryAttachmentsRepository } from './in-memory-attachment-repository'
import { InMemoryStudentsRepository } from './in-memory-students-repository'
import { InMemoryQuestionAttachmentsRepository } from './in-memory-question-attachment-repository'
import { QuestionWithDetails } from '@/domain/forum/enterprise/entities/value-objects/question-with-details'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Questions[] = []

  constructor(
    private questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository,
    private studentRepository: InMemoryStudentsRepository,
    private attachmentsRepository: InMemoryAttachmentsRepository,
  ) {}

  async create(question: Questions) {
    this.items.push(question)

    await this.questionAttachmentsRepository.createMany(
      question.attachment.getItems(),
    )
    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id)
    if (!question) {
      return null
    }
    return question
  }

  async findBySlug(slug: string): Promise<Questions | null> {
    const question = this.items.find((item) => item.slug.value === slug)
    if (!question) {
      return null
    }

    return question
  }

  async findDetailsBySlug(slug: string): Promise<QuestionWithDetails | null> {
    const question = this.items.find((item) => item.slug.value === slug)
    if (!question) {
      return null
    }
    const author = this.studentRepository.items.find((student) => {
      return student.id.equals(question.authorId)
    })
    if (!author) {
      throw new Error(
        `Author with id ${question.authorId.toString()} does not exists`,
      )
    }
    const questionAttachments = this.questionAttachmentsRepository.items.filter(
      (attachment) => {
        return attachment.questionId.equals(question.id)
      },
    )
    const attachments = questionAttachments.map((questionAttachment) => {
      const attachment = this.attachmentsRepository.items.find((attachment) => {
        return attachment.id.equals(questionAttachment.attachmentId)
      })
      if (!attachment) {
        throw new Error(
          `Attachment with id ${questionAttachment.attachmentId.toString()} does not exists`,
        )
      }
      return attachment
    })

    return QuestionWithDetails.create({
      questionId: question.id,
      authorId: author.id,
      author: author.name,
      title: question.title,
      slug: question.slug,
      content: question.content,
      bestAnswerId: question.bestAnswerId,
      attachments,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    })
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async delete(question: Questions) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)
    this.items.splice(itemIndex, 1)

    this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    )
  }

  async save(question: Questions) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items[itemIndex] = question

    await this.questionAttachmentsRepository.createMany(
      question.attachment.getNewItems(),
    )
    await this.questionAttachmentsRepository.deleteMany(
      question.attachment.getRemovedItems(),
    )

    DomainEvents.dispatchEventsForAggregate(question.id)
  }
}

agora vamos para o test de get question by slug e el ja esta pedindo a instanciação da dependencia que a gente adicionou
então a gente cria e instancia o inmemory students e attachments repository
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

import { Slug } from '../../enterprise/entities/value-objects/slug'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachment-repository'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachment-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'

let inMemoryQuestionsAttachmentRepository: InMemoryQuestionAttachmentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('get question by slug test', () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository,
    )
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })
  sabendo que a ordem delesdentro do questionRepository tem que ser a mesma do que aparece dentro do constructor do questionRepository. eu aletrei a ordem la no constructor do question repository para bater com essa e o erro sair.
  agora no teste atualmente a gente so estava criando a pergunta mas nos queremos verificar se esta vindo os dados do autor e dos attachments então a gente vai criar um student com a factory para ele ser o autor
   const student = makeStudent({ name: 'John Doe' })
    inMemoryStudentsRepository.items.push(student)
    depois a gente cria a questão passando o autorid e o anexo com um titulo de attachment
    
    const newQuestion = makeQuestion({
      slug: Slug.create('exemple-slug'),
      authorId: student.id
    })
    await inMemoryQuestionsRepository.create(newQuestion)

    const attachment = makeAttachment({
      title: 'Some attachment',
    })
    inMemoryAttachmentsRepository.items.push(attachment)

e agora a gente vai fazer o questionAttachment 
 inMemoryQuestionsAttachmentRepository.items.push(
      makeQuestionAttachments({
        attachmentId: attachment.id,
        questionId: newQuestion.id,
      }),
    )

  agora quando chamarmos o caso de uso ele tem que trazer as informações do titulo, doautor e os attachments o teste fica assim e ele passa:
  import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

import { Slug } from '../../enterprise/entities/value-objects/slug'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachment-repository'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachment-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { makeStudent } from 'test/factories/make-student'
import { makeAttachment } from 'test/factories/make-attachemnt'
import { makeQuestionAttachments } from 'test/factories/make-question-attachments'

let inMemoryQuestionsAttachmentRepository: InMemoryQuestionAttachmentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('get question by slug test', () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository,
    )
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  test('if can get a question by slug', async () => {
    const student = makeStudent({ name: 'John Doe' })
    inMemoryStudentsRepository.items.push(student)

    const newQuestion = makeQuestion({
      slug: Slug.create('exemple-slug'),
      authorId: student.id,
    })
    await inMemoryQuestionsRepository.create(newQuestion)

    const attachment = makeAttachment({
      title: 'Some attachment',
    })
    inMemoryAttachmentsRepository.items.push(attachment)

    inMemoryQuestionsAttachmentRepository.items.push(
      makeQuestionAttachments({
        attachmentId: attachment.id,
        questionId: newQuestion.id,
      }),
    )

    const result = await sut.execute({
      slug: 'exemple-slug',
    })

    if (result.isRight()) {
      expect(result.value).toMatchObject({
        question: expect.objectContaining({
          title: newQuestion.title,
          author: 'John Doe',
          attachments: [
            expect.objectContaining({
              title: 'Some attachment',
            }),
          ],
        }),
      })
    }
  })
})

porem agora as dependencias vao dar erro de typescript em outros testes que usam o questionsRepository (mas os testes passam mesmo assim)
entã agora a gente vai ter que fazer a instanciação dessas duas linhas em todos os arquivos que usam o questionRepository. néao vou colocar o processo todo aqui mas é basicamente o let e o before each em cada um desses arquivos para ficar parecido com o desse teste do slug; e como a gente mudou o de answer tambem temos que colocar o student nos que usam o answer
vamos passar teste por teste adicionando as dependencias.
depois de tudo rodamos o teste e se passar vamos para a parte de infra
## prisma controller question com details
vamos mudar a cade infra para retornar os dados da pergunta com detalhes. primeiro vamos la em mappers para criar o mapper
prisma-question-with-details-mapper.ts
vamos colar nele o questionComment with autor
porem nessa a gente precisa do question do user e do attachent então fazelos essa importação 

import {
  Question as PrismaQuestion,
  User as PrismaUser,
  Attachment as PrismaAttachment,
  Prisma,
} from '@prisma/client'
e a gente faz o type dele que vai ser uma pergunta com dentro um autor e um attachment lista que vai ser um array de attachment
type PrismaQuestionWithDetails = PrismaQuestion & {
  author: PrismaUser
  attachment: PrismaAttachment[]
}
e a gente quer converter isso que chega como raw em uma questionWithDetails

export class PrismaQuestionWithDetailsMapper {
  static toDomain(raw: PrismaQuestionWithDetails): QuestionWithDetails {
    então vamos usar o create dessa questionQithDetails e vamos passar os campos para o slug a gente tem que fazer o slug . create e fica assim:
    
        slug: Slug.create(raw.slug),

  para o attachment a gente vai er que criar o toDomain no mapper do attachments então vamos em prismaattachments-mapper.ts e vamos criar o toDomain
  fica assim:
 import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaAttachmentsMapper {
  static toDomain(raw: PrismaAttachment): Attachment {
    return Attachment.create(
      {
        title: raw.title,
        url: raw.url,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    attachment: Attachment,
  ): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.url,
    }
  }
}


agora voltamos para o mappre do questionWithDetails
e agora podemos reaproveitar um mapper dentro do outro e no attachments a gente usar esse mapper para passar os attachments to domain
 attachments: raw.attachment.map(PrismaAttachmentsMapper.toDomain)
 e o best answer id tem que verificar se ele existe ele tem que ser um new uniqueentityId rawbestanswerid sen não vai ser nulo o mapper fica assim:
 import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionWithDetails } from '@/domain/forum/enterprise/entities/value-objects/question-with-details'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import {
  Question as PrismaQuestion,
  User as PrismaUser,
  Attachment as PrismaAttachment,
  Prisma,
} from '@prisma/client'
import { PrismaAttachmentsMapper } from './prisma-attachment-mapper'

type PrismaQuestionWithDetails = PrismaQuestion & {
  author: PrismaUser
  attachment: PrismaAttachment[]
}

export class PrismaQuestionWithDetailsMapper {
  static toDomain(raw: PrismaQuestionWithDetails): QuestionWithDetails {
    return QuestionWithDetails.create({
      questionId: new UniqueEntityId(raw.id),
      authorId: new UniqueEntityId(raw.authorId),
      content: raw.content,
      title: raw.title,
      author: raw.author.name,
      slug: Slug.create(raw.slug),
      attachments: raw.attachment.map(PrismaAttachmentsMapper.toDomain),
      bestAnswerId: raw.bestAnswerId
        ? new UniqueEntityId(raw.bestAnswerId)
        : null,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}

agora podemos ir no repositorio prisma questionsreposirtory duplicamos o metodo findBySlug e mudamos o nome e ele retorna um questionWithDetails
e ele retorna usando o mapper que acamos de criar e ai vai dar erro porque precisamos colocar o include trazendo true para author e ara attachment fica assim a pagina toda
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Questions } from '@/domain/forum/enterprise/entities/questions'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionWithDetails } from '@/domain/forum/enterprise/entities/value-objects/question-with-details'
import { PrismaQuestionWithDetailsMapper } from '../mappers/prisma-question-with-details-mapper'
@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(
    private prisma: PrismaService,
    private questionAttachments: QuestionAttachmentsRepository,
  ) {}

  async findById(id: string): Promise<Questions | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    })

    if (!question) {
      return null
    }
    return PrismaQuestionMapper.toDomain(question)
  }

  async findBySlug(slug: string): Promise<Questions | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
    })
    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findDetailsBySlug(slug: string): Promise<QuestionWithDetails | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
      include: {
        author: true,
        attachment: true,
      },
    })
    if (!question) {
      return null
    }

    return PrismaQuestionWithDetailsMapper.toDomain(question)
  }

  async findManyRecent({ page }: PaginationParams): Promise<Questions[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions.map(PrismaQuestionMapper.toDomain)
  }

  async create(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.create({
      data,
    })

    await this.questionAttachments.createMany(question.attachment.getItems())
  }

  async delete(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.delete({ where: { id: data.id } })
  }

  async save(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await Promise.all([
      this.prisma.question.update({
        where: { id: data.id },
        data,
      }),
      this.questionAttachments.createMany(question.attachment.getNewItems()),
      this.questionAttachments.deleteMany(
        question.attachment.getRemovedItems(),
      ),
    ])
  }
}

vamos agora criar um novo presenter para isso e para retornar nesse presenter os attachment vamos fazer antes um presenter para attachment então attachment-presenter.ts fica assim:
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'

export class AttachmentPresenter {
  static toHTTP(attachment: Attachment) {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.url,
    }
  }
}

e o question-with-details-presenter.ts fica assim:
fica assim utilizando o attachment presenter
import { QuestionWithDetails } from '@/domain/forum/enterprise/entities/value-objects/question-with-details'
import { AttachmentPresenter } from './attachment-presenter'

export class QuestionWithDetailsPresenter {
  static toHTTP(questionWithDetails: QuestionWithDetails) {
    return {
      questionId: questionWithDetails.questionId.toString(),
      authorId: questionWithDetails.authorId.toString(),
      author: questionWithDetails.author,
      title: questionWithDetails.title,
      slug: questionWithDetails.slug.value,
      content: questionWithDetails.content,
      attachments: questionWithDetails.attachments.map(
        AttachmentPresenter.toHTTP,
      ),
      bestAnswerId: questionWithDetails.bestAnswerId?.toString(),
      createdAt: questionWithDetails.createdAt,
      updatedAt: questionWithDetails.updatedAt,
    }
  }
}
agora vamos no controller e mudamos ele para questinWithDetailspresenter fica assim:
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { QuestionWithDetailsPresenter } from '../presenters/question-with-details-presenter'

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlug: GetQuestionBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlug.execute({
      slug,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      questions: QuestionWithDetailsPresenter.toHTTP(result.value.question),
    }
  }
}

e agora podemos ir no teste dele no teste vamos importar tambem o attachment factory e o questionAttachmentFactory agora no teste a gente transforma a criaçéao da pergunta em uma const question
e pegamos tambem a criação do attachment com um titulo Some Attachment e a gente usa o questionAttachmentFactory para criar um relacionamento passando o id do attachment e da question
vamos tambem adicionar o nome ao usuario para ficar mais visivel nos testes
e agora no expect a gente verifica se ela traz titulo que ja estava verificando mas tambem se traz o author e se traz o attachment. o teste fica assim:
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AttachmentFactory } from 'test/factories/make-attachemnt'
import { QuestionFactory } from 'test/factories/make-question'
import { QuestionAttachmentFactory } from 'test/factories/make-question-attachments'
import { StudentFactory } from 'test/factories/make-student'

describe('get question by slug - tests (e2e)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let attachmentFactory: AttachmentFactory
  let questionAttachmentFactory: QuestionAttachmentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AttachmentFactory,
        QuestionAttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    questionAttachmentFactory = moduleRef.get(QuestionAttachmentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[get]/questions/:slug', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: 'John Doe',
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
      slug: Slug.create('question-01'),
      title: 'Question 01',
    })

    const attachment = await attachmentFactory.makePrismaAttachment({
      title: 'Some attachment',
    })

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment.id,
      questionId: question.id,
    })

    const response = await request(app.getHttpServer())
      .get('/questions/question-01')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      questions: expect.objectContaining({
        title: 'Question 01',
        author: 'John Doe',
        attachments: [
          expect.objectContaining({
            title: 'Some attachment',
          }),
        ],
      }),
    })
  })
})

se a gente rodar deve tuso funcionar. mas podemos tambem fazer uma checagem de tipos com o npx tsc --noEmit
e ele vai apontar u erro la no no domain notification aplication subscribers em todos os testes vai ter erro de typescript 
a gente instancia em todos e os erros de typescript devem sair. porem estou recebendo o erro de que o spy ta depricated
'SpyInstance' is deprecated.ts(6385)
index.d.ts(100, 4): The declaration was marked as deprecated here.
(alias) interface SpyInstance<TArgs extends any[] = any[], TReturns = any>
import SpyInstance
@deprecated — Use MockInstance<A, R> instead

No quick fixes available
esse aviso acontece por esse motivo:
O aviso que você encontrou indica que a interface SpyInstance da biblioteca vitest foi marcada como obsoleta (deprecated). Isso significa que os desenvolvedores da biblioteca recomendam não usar mais essa interface em novos códigos e sugerem a migração para uma alternativa recomendada, neste caso, MockInstance<A, R>.

Esse tipo de aviso geralmente aparece quando uma biblioteca ou framework está evoluindo e seus mantenedores decidem melhorar a API, remover funcionalidades duplicadas ou corrigir design flaws. Marcar uma funcionalidade como obsoleta é uma forma de informar aos desenvolvedores que eles devem começar a transição para as novas recomendações, enquanto ainda mantêm compatibilidade com o código legado para não quebrar aplicações existentes de imediato.

O motivo pelo qual você não viu esse aviso quando escreveu os testes originalmente é que, naquela época, a SpyInstance ainda era considerada uma parte atual e suportada da API de vitest. Desde então, uma atualização na biblioteca deve ter introduzido a nova interface MockInstance<A, R> e marcado SpyInstance como obsoleta.

Os seus testes continuam passando porque a depreciação de uma funcionalidade geralmente não afeta sua funcionalidade imediatamente. Isso é feito para dar tempo aos desenvolvedores para atualizar seus códigos sem quebrar suas aplicações. No entanto, é recomendável que você atualize seu código para usar a nova interface recomendada, MockInstance<A, R>, para evitar potenciais problemas no futuro e garantir que seu código esteja alinhado com as práticas recomendadas e atualizações da biblioteca.

Para atualizar seu código, você precisará substituir o uso de SpyInstance por MockInstance conforme a documentação de vitest, ajustando qualquer parte do seu código de teste que dependa dessa interface. Isso pode envolver mudar como você cria spies, mocks ou como você os utiliza nos seus testes. É uma boa prática verificar a documentação oficial ou exemplos atualizados para entender como a nova interface deve ser usada.
eu não vou mudar ainda para manter como o codigo das aulas que ja estão terminando. porem caso de problema no futuro eu posso mudar.
com isso essaparte esta finalizada.

# registrando eventos de dominio
agora vamos disparar os eventos de dominio que a parte de notificaç~sa que esta desconectada da camada de infra da aplicação
o qiue a gente vai fazer então é esse relação para que os eventossejam disparados.
a parte de relação entre os dois subdominios não esta necessariamente relacionada ao http então o que a gente vai fazer é que no infra a gente vai criar uma nova pasta para isso chamada events
nela vamos criar o modulo events.module.ts
e nesse module vamos ter provavelmente imports e providers mas não controllers porque não é uma camada http fica assim por enquanto
import { Module } from '@nestjs/common'

@Module({
  imports: [],
  providers: [],
})
export class EventsModule {}

agora a primeira coisa é que dentro dos nosso evetos como por exemplo on comment on question create a gente vai ter dependencias como podemos ver aqui
  private questionsRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase,

    então la nos vamos colocar o injectable do nest em todos os arquivos da pasta subscriber
    e vamos tambem coocar no sendNotification que é o caso de uso que faz o envio da notificaçéao
    agora nos vamos voltar para o modules e colocar todos os providers ou seja tudoo queesta relacionado com a parte de eventos
    então vamos importar os subscribers e o send notification use Case
      providers: [
    OnAnswerCreated,
    OnCommentOnAnswerCreated,
    OnCommentOnQuestionCreated,
    OnQuestionBestAnswerChosen,
    SendNotificationUseCase,
  ],
  essasclasses usam tambem o questionrepository e a gente não pecisa cadastrar ele porque como eles estão cadastrados no databaseModule basta a gente importar o database module e ele vai ficar acessivel o event module completo fica assim:
  import { OnAnswerCreated } from '@/domain/notification/application/subscribers/on-answer-created'
import { OnCommentOnAnswerCreated } from '@/domain/notification/application/subscribers/on-comment-on-answer-created'
import { OnCommentOnQuestionCreated } from '@/domain/notification/application/subscribers/on-comment-on-question-created'
import { OnQuestionBestAnswerChosen } from '@/domain/notification/application/subscribers/on-question-best-answer-chosen'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/prisma/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [
    OnAnswerCreated,
    OnCommentOnAnswerCreated,
    OnCommentOnQuestionCreated,
    OnQuestionBestAnswerChosen,
    SendNotificationUseCase,
  ],
})
export class EventsModule {}

agora precisamos importar ele no nosso app module para que o nest ache ele. o app/module fica assim
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env/env'
import { AuthModule } from './auth/auth.module'
import { HttpModule } from './http/http.module'
import { EnvModule } from './env/env.module'
import { EventsModule } from './events/events.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    EnvModule,
    EventsModule,
  ],
})
export class AppModule {}

porem se a gente tentar rodar a aplicação agora vai dar erro porque o nosso caso de uso de notificação depende do repositorio de notificação e as dependencias do sendnotificaitionUseCase não vao ser encontradas porque ele depende do notificationsRepository que a gente néao riou ainda na camada de dominio.
então vamos dentro de prisma repositories e vamos criar um arquivo chamado
prisma-notifications-reposiory.ts
vamos colar nele o prisma questions repository para reaproveitar
a gente muda o titulo ede onde ele implementa e tira todos os metodos que néao sejam findById create e save
e ai a gente tira os inmports desnecessarios e da replace em todos os questions por notification.
e ai começa a aparecer alguns erros. o primeiro dele é que não temos a tabela de notification no nosso prisma. então vamos abriro arquivo de schema para criar ela.
ela vai ter id title content data de leitura ou seja readAt  e  notirifação vai esta associada a um usuario entéao a gente pode tirar as relaçéaes com questão que tinha antes e fazer uma para um usuario e vamos chamar esse usuatio de recipient so de colocar recipient User ele n#ao estava fazendo a relação automaticamente então eu coloquei recipient User e fui no terminal e rodei npx prisma format e ai ele fez.
ele cria como userId e a gente vai alterar para recipientId e fazemos um map para renomear a coluna e a gente move o id para cima para ter as colunas juntas e os relacionamentos depois.
vamos criar tambem um createdAt para ser dateTime e colocar nele um default como now() e um map para usar o underline com isso a tabela esta pronta. e vamos so na tabela user para colocar o notifications (o primeiro) com letra minuscual e s no fim para ficar no padréao o schema completo fica assim:
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  STUDENT
  INSTRUCTOR
}

model User {
  id           String         @id @default(uuid())
  name         String
  email        String         @unique
  password     String
  role         UserRole       @default(STUDENT)
  questions    Question[]
  answers      Answer[]
  comments     Comment[]
  notifications Notification[]

  @@map("users")
}

model Question {
  id           String    @id @default(uuid())
  title        String
  slug         String    @unique
  content      String
  createdAt    DateTime  @default(now()) @map("created_at")
  updatedAt    DateTime? @updatedAt @map("updated_at")
  authorId     String    @map("author_id")
  bestAnswerId String?   @unique @map("best_answer_id")

  author     User    @relation(fields: [authorId], references: [id])
  bestAnswer Answer? @relation("bestAnswer", fields: [bestAnswerId], references: [id])

  answers    Answer[]
  comments   Comment[]
  attachment Attachment[]

  @@map("questions")
}

model Answer {
  id         String    @id @default(uuid())
  content    String
  createdAt  DateTime  @default(now()) @map("created_at")
  updatedAt  DateTime? @updatedAt @map("updated_at")
  authorId   String    @map("author_id")
  questionId String    @map("question_id")

  author       User         @relation(fields: [authorId], references: [id])
  bestAnswerOn Question?    @relation("bestAnswer")
  question     Question     @relation(fields: [questionId], references: [id])
  comments     Comment[]
  attachment   Attachment[]

  @@map("answers")
}

model Comment {
  id         String    @id @default(uuid())
  content    String
  createdAt  DateTime  @default(now()) @map("created_at")
  updatedAt  DateTime? @updatedAt @map("updated_at")
  authorId   String    @map("author_id")
  questionId String?   @map("question_id")
  answerId   String?   @map("answer_id")

  question Question? @relation(fields: [questionId], references: [id])
  answer   Answer?   @relation(fields: [answerId], references: [id])
  author   User      @relation(fields: [authorId], references: [id])

  @@map("comments")
}

model Attachment {
  id         String  @id @default(uuid())
  title      String
  url        String
  questionId String? @map("question_id")
  answerId   String? @map("answer_id")

  question Question? @relation(fields: [questionId], references: [id])
  answer   Answer?   @relation(fields: [answerId], references: [id])

  @@map("attachments")
}

model Notification {
  id      String    @id @default(uuid())
  recipientId    String @map("recipient_id")
  title   String
  content String
  readAt  DateTime? @map("read_at")
  createdAt DateTime @default(now()) @map("created_at")

  recipient User   @relation(fields: [recipientId], references: [id])
  

  @@map("notifications")
}

agora se a gente roda o npx prisma migrate dev para ele dar migration na tabela isso com o docker rodando ai ele pede para a gente da um nome para a nova migration e assim a gente cria a nova tabela.
agora podemos voltar para o nosso repository e ele ja deve identificar a nova tabela. caso néao a gente da um restar no vscode e agora a gente vai criar o nsso mapper vamos na pasta de mappers
prisma-notifications-mapper.ts
copiamos o mapper de question e damos replace em todas questions para notification e vamos depois substituindo os campos.
no entity notificaion como o readAt é opcional a gente tem que colocar ele nas props como possivelmente nulo tambem assim:
export interface NotificationProps {
  recipientId: UniqueEntityId
  title: string
  content: string
  readAt?: Date | null
  createdAt: Date
}


o mapper fica assi:
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { Notification as PrismaNotification, Prisma } from '@prisma/client'

export class PrismaNotificationMapper {
  static toDomain(raw: PrismaNotification): Notification {
    return Notification.create(
      {
        title: raw.title,
        content: raw.content,
        recipientId: new UniqueEntityId(raw.recipientId),
        createdAt: raw.createdAt,
        readAt: raw.readAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    notification: Notification,
  ): Prisma.NotificationUncheckedCreateInput {
    return {
      id: notification.id.toString(),
      recipientId: notification.recipientId.toString(),
      title: notification.title,
      content: notification.content,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
    }
  }
}

agora podemos voltar para o repositorio e ajustar a importação do mapper e tambem tirar as coisas de attachments por que isso era especifico do question. o repositorio fica assim:
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notification-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { PrismaNotificationMapper } from '../mappers/prisma-notifications-mapper'

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id,
      },
    })

    if (!notification) {
      return null
    }
    return PrismaNotificationMapper.toDomain(notification)
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPrisma(notification)
    await this.prisma.notification.create({
      data,
    })
  }

  async save(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPrisma(notification)

   
     await this.prisma.notification.update({
        where: { id: data.id },
        data,
      })
   
  }
}

agora antes de ir no databasemodule a gente precisa ir no notification repository na camada domain e tracar por uma classe abstrata
import { Notification } from '../../enterprise/entities/notification'

export abstract class NotificationsRepository {
  abstract findById(id: string): Promise<Notification | null>
  abstract create(notification: Notification): Promise<void>
  abstract save(notification: Notification): Promise<void>
}

com isso feito a gente pode ir no nosso databaseModule e criar lais um provider para ser o notificationrepository e o useClase op prisma notificationREpository.
  {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },

e no exports a gente passa o notificationsRepository ao arquivo fica assim e ai se a gente rodar o npm run dev ele deve funcionar
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaAnswerAttachmentsRepository } from './repositories/prisma-answer-attachments-repository'
import { PrismaAnswersRepository } from './repositories/prisma-answers-repository'
import { PrismaAnswerCommentsRepository } from './repositories/prisma-answer-comments-repository'
import { PrismaQuestionAttachmentsRepository } from './repositories/prisma-question-attachments-repository'
import { PrismaQuestionCommentsRepository } from './repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepository } from './repositories/prisma-questions-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentsRepository } from './repositories/prisma-students-repository'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository'
import { PrismaAttachmentsRepository } from './repositories/prisma-attachments-repository'
import { PrismaNotificationsRepository } from './repositories/prisma-notifications-repository'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notification-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    { provide: AnswersRepository, useClass: PrismaAnswersRepository },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [
    PrismaService,
    AnswerAttachmentsRepository,
    AnswersRepository,
    AnswerCommentsRepository,
    QuestionAttachmentsRepository,
    QuestionCommentsRepository,
    QuestionsRepository,
    StudentsRepository,
    AttachmentsRepository,
    NotificationsRepository,
  ],
})
export class DatabaseModule {}

tudo funciona.

## testes e2e para evento de dominio

vamos criar testes para validar que os evnetos estão sendo disparados e as notificação estão sendo enviadas.
nos controllers a gente criou os testes muito proximos ao controler. na mesma pasta.
porem no caso dos eventos a gente não vai ter controller porque eles são disparados de forma automatizada então vamos crar so os testes diretamente. mesmo que a gente tenha os testes na camada unitaria eles não garantem que esteja funcionando na camada de infra então vamos criar os testes na pasta de eventos mesmo sem ter nenhum outro arquivo alem do module. vamos criar o on-answer-created.e2e.spec.ts
tems que lembrar que nos temos mais eventos do que a aula entéao tambem temos que criar os testes dos eventos que ele não vai criar na aula.
vamos copiar o teste do answerquestionCreatedController para usar a mesma logica e mudar algumas coisas. mudamos o titulo. emovemos toda a parte de attachments da instanciação. porque não vamos testar os attachments
nos vamos manter a chamada da rota de criação de answer porque como esse teste é a camada de infra não tem problema fazer isso a gente poderia fazer uma chamada diretamente para e caso a gente vai deixar a swer tambem. mas nesse caso a gente vai deixar a a chamda pela rota mesmo sem problemas.
a gente pode tirar todas as validações e a criação de anexos e o envio deles tambem. a gente vai validar otras coisas enãtao não precisamos validar isso da rota e se a pergunta foi criada.
a gente quer validar que a notificação foi enviada.
porem temos que mebrar que os eventod de dominio são assincronos. então quando a gente fez os testes unitarios a gente usou o wait for para esperar ter ua resposta deles porque eles são assincronos.  então no nosso teste e2E tambem temos que levar em conta essa assincronia
ou seja a gente não pode ir direto no banco de dados ver se a notificação ja foi criada diretamente com um expect porque ela demora alguns milisegundos para ser criada.
então vamos criar u await waitfor(async()=>{})
ou seja uma wait e um waitfor com uma funçéao assincrona.
e se a gente for la no nosso test utils wait-for wque é o qrauivo que criamos com as funções de waitfor  temos o assertios que sta retornando void vamos mudar ele para que essa função que a angete passa para o waitfor ou seja essa função assync que e angete esta colocando  no nosso teste ela possa devolver algem de um void ela possa devolver tambem um promise<void>
 */
export async function waitFor(
  assertions: () => void | Promise<void>,
  maxDuration = 1000,
e estamos fazendo isso para que la no nosso try  a gente possa usar um await assertions
 try {
        await assertions()
        clearInterval(interval)
e assim no nosso setInterval a gente tem que passar um async
    const interval = setInterval(async () => {
      elapsedTime += 10

a gente faz isso tudo porque la nos testes unitarios o conteudo que a gente passava no waitfor não era assincrono então nao precisava ser promise o resultado nem ter os awaits e asyncs dentro das funções. porem agora no nosso teste e2E a gente quer bater no banco de dados então vai precisar ser assincrono então fazemos essa mudança no wait-for o arquivo wait for fica assim:
/**
 * This function loops through a function rerunning all assertions
 * inside of it until it gets a truthy result.
 *
 * If the maximum duration is reached, it then rejects.
 *
 * @param expectations A function containing all tests assertions
 * @param maxDuration Maximum wait time before rejecting
 */
export async function waitFor(
  assertions: () => void | Promise<void>,
  maxDuration = 1000,
): Promise<void> {
  return new Promise((resolve, reject) => {
    let elapsedTime = 0

    const interval = setInterval(async () => {
      elapsedTime += 10

      try {
        await assertions()
        clearInterval(interval)
        resolve()
      } catch (err) {
        if (elapsedTime >= maxDuration) {
          reject(err)
        }
      }
    }, 10)
  })
}

e assim podemos dentro da nossa função la do waitfr a gengte passa assinc e podemos pegar o notificaitionOnDatabase usando o await dentro dessa função. e agora a gente pode dar o await e uma chamada no prisma.notification ou seja n o banco de dados da notificação e procurar o primeiro onde o recipientId for igual ao usario que criou a pergunta (no nosso caso o mesmo usuario criou a pergunta e a resposta então vai ser o mesmo)
 no caso o user.id.toString()
 agora ainda dentro do waitfor a gente espera que a notification esteja no banco de dados.
 então podemos fazer que esperanos qe o resultado não seja nulo usando o not tobe(null ) porem mesmo com o teste criando ele ainda vai falhar porque no nosso repositorio prisma a gente não esta disparando os eventos  como no inMemory a gente dispara com o dispatchevents entéão vamos teanto ficou alguns ajustes. porem o teste por enqanto ficou assim:
 import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'
import { waitFor } from 'test/utils/wait-for'

describe('On answer created tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    questionFactory = moduleRef.get(QuestionFactory)
    studentFactory = moduleRef.get(StudentFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('if send notification on answer create', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const questionId = question.id.toString()

    await request(app.getHttpServer())
      .post(`/questions/${questionId}/answers`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'New Answer',
        attachments: [],
      })

    await waitFor(async () => {
      const notificationOnDatabase = await prisma.notification.findFirst({
        where: {
          recipientId: user.id.toString(),
        },
      })
      expect(notificationOnDatabase).not.toBe(null)
    })
  })
})

## disparando o evento de dominio
agora nos repositorios do prisma como o prisma answerRepository quando a gente cria o aanswer a gente tem que disparar o evento dela. ebt éao temos que importar o domaineEvents no plural e passar o dispachdfor agregate passando o id da answer
DomainEvents.dispatchEventsForAggregate(answer.id)
colocamos isso no create e no save fica assim:
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaAnswerMapper } from '../mappers/prisma-answer-mapper'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/answer-with-author'
import { PrismaAnswerWithAuthorMapper } from '../mappers/prisma-answer-with-author-mapper'
import { DomainEvents } from '@/core/event/domain-events'

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  constructor(
    private prisma: PrismaService,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async findById(id: string): Promise<Answer | null> {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id,
      },
    })
    if (!answer) {
      return null
    }

    return PrismaAnswerMapper.toDomain(answer)
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answer = await this.prisma.answer.findMany({
      where: { questionId },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return answer.map(PrismaAnswerMapper.toDomain)
  }

  async findManyByQuestionIdWithAuthor(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<AnswerWithAuthor[]> {
    const answer = await this.prisma.answer.findMany({
      where: { questionId },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return answer.map(PrismaAnswerWithAuthorMapper.toDomain)
  }

  async create(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)
    await this.prisma.answer.create({
      data,
    })

    await this.answerAttachmentsRepository.createMany(
      answer.attachment.getItems(),
    )

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(answer: Answer): Promise<void> {
    await this.prisma.answer.delete({ where: { id: answer.id.toString() } })
  }

  async save(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)

    await Promise.all([
      await this.prisma.answer.update({
        where: { id: data.id },
        data,
      }),
      this.answerAttachmentsRepository.createMany(
        answer.attachment.getNewItems(),
      ),
      this.answerAttachmentsRepository.deleteMany(
        answer.attachment.getRemovedItems(),
      ),
    ])
    DomainEvents.dispatchEventsForAggregate(answer.id)
  }
}

vamos fazer igual no repositorio de question
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Questions } from '@/domain/forum/enterprise/entities/questions'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionWithDetails } from '@/domain/forum/enterprise/entities/value-objects/question-with-details'
import { PrismaQuestionWithDetailsMapper } from '../mappers/prisma-question-with-details-mapper'
import { DomainEvents } from '@/core/event/domain-events'
@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(
    private prisma: PrismaService,
    private questionAttachments: QuestionAttachmentsRepository,
  ) {}

  async findById(id: string): Promise<Questions | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    })

    if (!question) {
      return null
    }
    return PrismaQuestionMapper.toDomain(question)
  }

  async findBySlug(slug: string): Promise<Questions | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
    })
    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findDetailsBySlug(slug: string): Promise<QuestionWithDetails | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
      include: {
        author: true,
        attachment: true,
      },
    })
    if (!question) {
      return null
    }

    return PrismaQuestionWithDetailsMapper.toDomain(question)
  }

  async findManyRecent({ page }: PaginationParams): Promise<Questions[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions.map(PrismaQuestionMapper.toDomain)
  }

  async create(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.create({
      data,
    })

    await this.questionAttachments.createMany(question.attachment.getItems())

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async delete(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.delete({ where: { id: data.id } })
  }

  async save(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await Promise.all([
      this.prisma.question.update({
        where: { id: data.id },
        data,
      }),
      this.questionAttachments.createMany(question.attachment.getNewItems()),
      this.questionAttachments.deleteMany(
        question.attachment.getRemovedItems(),
      ),
    ])

    DomainEvents.dispatchEventsForAggregate(question.id)
  }
}

om essas alterações se a gente rodar o teste de on answer created ele ja funciona.
como temos os tambem os eventos de comentarios que não teve na aula vamos alterar tambem isso nos reposotorios de comentarios para isso ja ficar pronto e depois quando fazer os testes deles ja fucnionar.
o repositorio de question Comment fica assim:
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionCommentMapper } from '../mappers/prisma-question-comment-mapper'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { PrismaCommentWithAuthorMapper } from '../mappers/prisma-comment-with-author-mapper'
import { DomainEvents } from '@/core/event/domain-events'

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    })

    if (!questionComment) {
      return null
    }
    return PrismaQuestionCommentMapper.toDomain(questionComment)
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[]> {
    const questionsComment = await this.prisma.comment.findMany({
      where: { questionId },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questionsComment.map(PrismaQuestionCommentMapper.toDomain)
  }

  async findManyByQuestionIdWithAuthor(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<CommentWithAuthor[]> {
    const questionsComment = await this.prisma.comment.findMany({
      where: { questionId },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questionsComment.map(PrismaCommentWithAuthorMapper.toDomain)
  }

  async create(questionComment: QuestionComment): Promise<void> {
    const data = PrismaQuestionCommentMapper.toPrisma(questionComment)
    await this.prisma.comment.create({
      data,
    })
    DomainEvents.dispatchEventsForAggregate(questionComment.id)
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    await this.prisma.comment.delete({
      where: { id: questionComment.id.toString() },
    })
  }
}

e o de answer comment fica assim:
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaAnswerCommentMapper } from '../mappers/prisma-answer-comment-mapper'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { PrismaCommentWithAuthorMapper } from '../mappers/prisma-comment-with-author-mapper'
import { DomainEvents } from '@/core/event/domain-events'

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    })

    if (!answerComment) {
      return null
    }
    return PrismaAnswerCommentMapper.toDomain(answerComment)
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const answersComment = await this.prisma.comment.findMany({
      where: { answerId },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return answersComment.map(PrismaAnswerCommentMapper.toDomain)
  }

  async findManyByAnswerIdWithAuthor(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<CommentWithAuthor[]> {
    const answerComment = await this.prisma.comment.findMany({
      where: { answerId },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return answerComment.map(PrismaCommentWithAuthorMapper.toDomain)
  }

  async create(answerComment: AnswerComment): Promise<void> {
    const data = PrismaAnswerCommentMapper.toPrisma(answerComment)
    await this.prisma.comment.create({
      data,
    })
    DomainEvents.dispatchEventsForAggregate(answerComment.id)
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    await this.prisma.comment.delete({
      where: { id: answerComment.id.toString() },
    })
  }
}
eu percebi que esses repositorios não tem save. não vai ser possivel editar os comentarios. mas como não tinha nas aulas. talvez seja algo a ser visto no fim do projeto.
vamos fazer agora um teste para quando se escolhe a melhor resposta.
na pasta infra de events vamos criar o arquivo on-question-best-answer-chosen.e2e-spec.ts
vamos copiar o teste do controller de escolhera melhor resposta e trocamos os nomes dos testes.
deixamos a estrutura do teste toda igual mas na hora do espect a gente tira os que estão e copiamos o expect do outro teste de eventos que criamos:
   await waitFor(async () => {
      const notificationOnDatabase = await prisma.notification.findFirst({
        where: {
          recipientId: user.id.toString(),
        },
      })
      expect(notificationOnDatabase).not.toBe(null)
    })
    podemos tirar a nomação da chamada http como response. mas deixamos a partir do await.
    importamos o wait for o teste fica assim:
    import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AnswerFactory } from 'test/factories/make-answer'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'
import { waitFor } from 'test/utils/wait-for'

describe('On question best answer chosen tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AnswerFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    questionFactory = moduleRef.get(QuestionFactory)
    studentFactory = moduleRef.get(StudentFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('if send notification on question best answer', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const answer = await answerFactory.makePrismaAnswer({
      questionId: question.id,
      authorId: user.id,
    })

    const answerId = answer.id.toString()

    await request(app.getHttpServer())
      .patch(`/answers/${answerId}/choose-as-best`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    await waitFor(async () => {
      const notificationOnDatabase = await prisma.notification.findFirst({
        where: {
          recipientId: user.id.toString(),
        },
      })
      expect(notificationOnDatabase).not.toBe(null)
    })
  })
})

se a gente testar ele ja funciona.

a aula continua para fazer um ajuste porque nesses testes a gente esta testando o todo. e como a gente adicionou no nosso repositorio o disparo dos eventos de dominio em todos os nossos outros testes de controllers os eventos de dominio vão ser disparados. mesmo que a gente néao queira pesar a app fazendo isso.
então seria legal a gente ter uma forma de controlar isso.
para resolver isso vamos la na classe de evnetos no arquivo domain events
e vamos criar um pblic static shouldRun para controlar isso e a gente inici ele como true ou seja se não passar false ele vai ser true
export class DomainEvents {
  private static handlersMap: Record<string, DomainEventCallback[]> = {}
  private static markedAggregates: AggregateRoot<unknown>[] = []

  public static shouldRun = true
  e la embaixo na parte do dispatch. logo no começo a gente vai fazer uma condicional deposi da const isRegisted para que se não existir o shouldrun ele não execute a gente escreve isso dessa forma
   if (!this.shouldRun) {
      return
    }
    ou seja se não existir o shouldRun o que é igual a ele ser falso. ele retorna e não executa a o resto da função.
    assim quando a gente passar o domainEvents shouldRun como falso nos testes de controller ele não vai disarar os domain events.
    fica assim o arquivo de domain events
    import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityId } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'

type DomainEventCallback = (event: unknown) => void

export class DomainEvents {
  private static handlersMap: Record<string, DomainEventCallback[]> = {}
  private static markedAggregates: AggregateRoot<unknown>[] = []

  public static shouldRun = true

  public static markAggregateForDispatch(aggregate: AggregateRoot<unknown>) {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id)

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate)
    }
  }

  private static dispatchAggregateEvents(aggregate: AggregateRoot<unknown>) {
    aggregate.domainEvents.forEach((event: DomainEvent) => this.dispatch(event))
  }

  private static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<unknown>,
  ) {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate))

    this.markedAggregates.splice(index, 1)
  }

  private static findMarkedAggregateByID(
    id: UniqueEntityId,
  ): AggregateRoot<unknown> | undefined {
    return this.markedAggregates.find((aggregate) => aggregate.id.equals(id))
  }

  public static dispatchEventsForAggregate(id: UniqueEntityId) {
    const aggregate = this.findMarkedAggregateByID(id)

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate)
      aggregate.clearEvents()
      this.removeAggregateFromMarkedDispatchList(aggregate)
    }
  }

  public static register(
    callback: DomainEventCallback,
    eventClassName: string,
  ) {
    const wasEventRegisteredBefore = eventClassName in this.handlersMap

    if (!wasEventRegisteredBefore) {
      this.handlersMap[eventClassName] = []
    }

    this.handlersMap[eventClassName].push(callback)
  }

  public static clearHandlers() {
    this.handlersMap = {}
  }

  public static clearMarkedAggregates() {
    this.markedAggregates = []
  }

  private static dispatch(event: DomainEvent) {
    const eventClassName: string = event.constructor.name

    const isEventRegistered = eventClassName in this.handlersMap

    if (!this.shouldRun) {
      return
    }

    if (isEventRegistered) {
      const handlers = this.handlersMap[eventClassName]

      for (const handler of handlers) {
        handler(event)
      }
    }
  }
}

com isso em mãos vamos no setup end 2 end que é o arquivo que fazemos a configuração dos testesque esta dentro de utils na raiz
no beforeAll a gente coloca o domainEvents.shouldRun = false
ou seja em nenhulm teste end2end a gente vai disparar os eventos de dominio.
porem agora vamos nos nossos testes de evento e passamos de volta para true.
fica assim 
import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { DomainEvents } from '@/core/event/domain-events'

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })
const prisma = new PrismaClient()

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}
const schemaId = randomUUID()
beforeAll(async () => {
  const databaseUrl = generateUniqueDatabaseURL(schemaId)
  process.env.DATABASE_URL = databaseUrl

  DomainEvents.shouldRun = false

  execSync('npx prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  prisma.$disconnect()
})

agora vamos em cada um dos nossos testes de event na camada de infra e passamos n o before all o shouldRun como true
import { DomainEvents } from '@/core/event/domain-events'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AnswerFactory } from 'test/factories/make-answer'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'
import { waitFor } from 'test/utils/wait-for'

describe('On question best answer chosen tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AnswerFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    questionFactory = moduleRef.get(QuestionFactory)
    studentFactory = moduleRef.get(StudentFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    DomainEvents.shouldRun = true

    await app.init()
  })

  test('if send notification on question best answer', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const answer = await answerFactory.makePrismaAnswer({
      questionId: question.id,
      authorId: user.id,
    })

    const answerId = answer.id.toString()

    await request(app.getHttpServer())
      .patch(`/answers/${answerId}/choose-as-best`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    await waitFor(async () => {
      const notificationOnDatabase = await prisma.notification.findFirst({
        where: {
          recipientId: user.id.toString(),
        },
      })
      expect(notificationOnDatabase).not.toBe(null)
    })
  })
})

apenas para ver como é esse exemplo assima, replicar esse domainevents no before all dos outros testes de on.
para testar podemos executar um test end2end do eventos e um do controller para ver se esta passando. ou se conseguir passar os end2end gerais.
fazemos agora o teste para a notificação de comentario na respostaele fica assim ja passando o shouldRun.
import { DomainEvents } from '@/core/event/domain-events'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AnswerFactory } from 'test/factories/make-answer'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'
import { waitFor } from 'test/utils/wait-for'

describe('Event comment on answer (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AnswerFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    questionFactory = moduleRef.get(QuestionFactory)
    studentFactory = moduleRef.get(StudentFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    DomainEvents.shouldRun = true

    await app.init()
  })

  test('if send notification when a answe recives comment', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const answer = await answerFactory.makePrismaAnswer({
      authorId: user.id,
      questionId: question.id,
    })
    const answerId = answer.id.toString()

    await request(app.getHttpServer())
      .post(`/answers/${answerId}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'New Comment',
      })

    await waitFor(async () => {
      const notificationOnDatabase = await prisma.notification.findFirst({
        where: {
          recipientId: user.id.toString(),
        },
      })
      expect(notificationOnDatabase).not.toBe(null)
    })
  })
})

o teste passou vamos agora fazer o do comment on question
import { DomainEvents } from '@/core/event/domain-events'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'
import { waitFor } from 'test/utils/wait-for'

describe('Event comment on a question (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    questionFactory = moduleRef.get(QuestionFactory)
    studentFactory = moduleRef.get(StudentFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    DomainEvents.shouldRun = true

    await app.init()
  })

  test('if send notification when a question recives comment', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const questionId = question.id.toString()

    await request(app.getHttpServer())
      .post(`/questions/${questionId}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'New Comment',
      })

    await waitFor(async () => {
      const notificationOnDatabase = await prisma.notification.findFirst({
        where: {
          recipientId: user.id.toString(),
        },
      })
      expect(notificationOnDatabase).not.toBe(null)
    })
  })
})

ambos arquivos passaram nos testes.

## controller de leitura de notificação
a gente teù la na parte de dominio na parte de notificaition os usecase de send e read notification. o de send não vai ter um controller porque a parte de envio de notificações vai ser apenas acionada pelos events. porem a parte de readprecisa de um controller para marcar a notificação como lida.
então vamos na nossa pasta de controllers e criamoso arquivo
read-notification.controller.ts
vaos copiar nele o get question by slug controller
vamos trocar todos os getQuestionBySlug pro readNotification a gente muda a rota para isso:

@Controller('/notification/:notificationId/read')
o metodo que vamos usar vai ser o patch porque vamos atualisar uma unica modificaçéo que vai ser o campo readAt
vamos usar o httpCode204
@Patch()
  @HttpCode(204) porque assim ele não vai ter nenhum tipo de retorno
  e ai no param a gente precisa pegar o notificationId e tambem precisamos pegar os dados do usuario para garantir que a notificação é dele mesmo então usamos o curentUser
   async handle(
    @CurrentUser() user: UserPayload,
    @Param('notificationId') notificationId: string) {
      e ai a gente chama o useCase passando para ele o notificationId e o recipientId que vem de user.sub que éo id do usuario 
      const result = await this.readNotification.execute({
      notificationId,
      recipientId: user.sub,
    })

    ai se der erro ele da um bad request
    e podemos tirar o return porque a rota néao vai ter retorno. ficaassim
    import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jtw.strategy'

@Controller('/notifications/:notificationId/read')
export class ReadNotificationController {
  constructor(private readNotification: ReadNotificationUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('notificationId') notificationId: string,
  ) {
    const result = await this.readNotification.execute({
      notificationId,
      recipientId: user.sub,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

e agora podemos criar o teste
read-notification.controller.e2e-spec.ts

copiamos nele o teste de getquestionBy slug porem antes de modificar precisamos atualizar a criação de notificaço na factory para criar ela no banco de dados. porque a factory que temos so cria a nivel de dominio.
a gente copia do maequestion a parte do injectable e cola no make notification e substitui todos os question por notification e ajustamos as importações fica assim:
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification'
import { PrismaNotificationMapper } from '@/infra/database/prisma/mappers/prisma-notifications-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityId,
) {
  const notification = Notification.create(
    {
      title: faker.lorem.sentence(4),
      recipientId: new UniqueEntityId(),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id,
  )

  return notification
}

@Injectable()
export class NotificationFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaNotification(
    data: Partial<NotificationProps> = {},
  ): Promise<Notification> {
    const notification = makeNotification(data)

    await this.prisma.notification.create({
      data: PrismaNotificationMapper.toPrisma(notification),
    })

    return notification
  }
}

agora podemos voltar para o teste e começar a fazer os ajustes mudamos os nomes dos testes
as instanciações a gente retira os attachments e a question e coloca apenas o notification e o student
describe('read notification controller - tests (e2e)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let notificationFactory: NotificationFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, NotificationFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    notificationFactory = moduleRef.get(NotificationFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })
  ai no teste a gente cria o user e a notification
    const user = await studentFactory.makePrismaStudent({
      name: 'John Doe',
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const notification = await notificationFactory.makePrismaNotification({
      recipientId: user.id,
    })
e a gente precisa fazer o notificationId sendo o notification.id.tostring( ) para poder passar ele na rota.

e ai na const respose a gente passa a rota patch 
 const notificationId = notification.id.toString()

    const response = await request(app.getHttpServer())
      .patch(`/notifications/${notificationId}/read`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

  ai a gente espera que o status code seja 204 e néao esperamos nada de body então podemos retirar essa parte porem vamos fazer uma verificação no database então const notificationOnDatabase e vamos ver se o readAt esta modificado la  e para isso precisamos instanciar o prisma la nos let
  
describe('read notification controller - tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let notificationFactory: NotificationFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, NotificationFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    studentFactory = moduleRef.get(StudentFactory)
    notificationFactory = moduleRef.get(NotificationFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })
  e ai a gente faz o notificationOnDatabase para pegar a onde o recipientId é o usuario e a gente verifica se o readAt dela não é nulo. fica assim
  
    const notificationOnDatabase = await prisma.notification.findFirst({
      where: { recipientId: user.id.toString() },
    })

    expect(notificationOnDatabase?.readAt).not.toBeNull()
  })
  o teste inteiro fica assim
  import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { NotificationFactory } from 'test/factories/make-notification'
import { StudentFactory } from 'test/factories/make-student'

describe('read notification controller - tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let notificationFactory: NotificationFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, NotificationFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    studentFactory = moduleRef.get(StudentFactory)
    notificationFactory = moduleRef.get(NotificationFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PATCH]/notifications/:notificationID/read', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: 'John Doe',
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const notification = await notificationFactory.makePrismaNotification({
      recipientId: user.id,
    })

    const notificationId = notification.id.toString()

    const response = await request(app.getHttpServer())
      .patch(`/notifications/${notificationId}/read`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(204)

    const notificationOnDatabase = await prisma.notification.findFirst({
      where: { recipientId: user.id.toString() },
    })

    expect(notificationOnDatabase?.readAt).not.toBeNull()
  })
})

agora a gente vai no http module para cadastrar o controller e o useCase e no useCase a gente entra nele para colocar o injectable.
e se a gente testar ja funciona.

## criando repositorio de cache
cache é algo que utilizamos para otimizar performace de alguma ação que demora um pouco mais de tempo, principalmente uma ação de busca de dados. 
imagina uma consulta no banco de dados que busque dados de tres tabelas
uma pergunta batem em tabel de resposta, na tabela de usuario e na tabela de comentarios por exemplo e na de question. uma so consulta pode bater em 4 tabelas assim temos uma consulta que pode ser pesada.
e se pensarmos a tabela de perguntas dificilmente vai mudar então podemo talvez armazenar os dados em cache para que quando varios usuarios fizerem a mesma requisição sobre a mesma pergunta apenas a requisição do primeiro usuario vai realmente bater nos bancos de dados.
porem temos que ter cuidado porque cache é algo bem dificil de lidar em largaescala
se a gente criasse um cache para a pergunta 1 a gente estaria salvando os dados de maneira estatica por exemplo oautor da pergunta que dificilmente(ou nunca) vai mudar poreù se a gente salvar junto no cache uma lista das 3 respostas mais recentes. isso pode mudar uma respostapode ser apagada ou outras entrarem e o cache ainda vai conter as mesmas tres
então temos que entender que trabalhando com cache a gente vai ter que se contentar a as vezes estar trabalhando com informações desatualizadas. isso é normal e acontece, o que não podemos é deixar aquela informação desatualizada para sempre.
até por isso a gente não pode colocar cache em toda aplicação. por exemplo n,a nossa aplicação pode não fazer muito sentido colocar cache na listagem de perguntas porque podemos talvez ter novas perguntas surgindo a cada minutos. alem disso o cache para listagem de perguntas é um pouco mais complexo, ele tem listagem e tudo mais ai a depender da pagina que o usuario esta o cache tem que ser outro, ai se a gente tiver ul filtro na lista, fica ainda mais cimplicado. etão é melhor colocar cache em informações que ja por padrão é dificil de mudar. a gente olha para um recurso na aplicação e nos perguntamos, é normal isso atualizar com frequencia? ou algo que se 15 pessoas acessarem em um intervalo de 15 minutos elas vão ver a mesma coisa? se a resposta for sim a gente pode fazer um cache, e isso significa que o primeiro usuasrio que acessar vai sim bater no banco de dados e vai trazer todas aquelas infos e elas vao ser salvas no cache e os proximos usuarios que acessarem nos proximos X minutos vao pegar as infos que foram salvas no cache (algum serviço que geralmente é muito mais performatico para leitura e escrita de dados não relacionados) e não no direto do banco de dados. 
esse serviço segue uma estrutura de chave e valor. chamado banco de dados nocycle. existem varios como dragonfly redis. o redis é o mais famoso.
então vamos começar a ver isso na nossa aplicação afgora.
## implementação de cache
a primeira cisa a saber é que cache é especificamente da camada de infra da aplicação. não faz sentido a camadade dominio ter qualquer menção ao cache
se a gente olhar os nossos casos de uso. ele não se importa de onde vao vir os detalhes das requisições dele, se véao vir do inmemory, do prisma ou de onde quer ue seja (agora do cache) o caso de uso não faz menção a isso. ele so diz para pegar a indormação usando um metodo que esta no repositorio. ou seja o if que vamos fazer para ver se a informação que queremos esta no cache e se não então devemos buscala no banco de dados não é uma regra de negocio da aplicação. não é uma coisa realmente necessaria para o fucnionamento da aplicação e sim uma amelhoração de eficiencia, uma otimização e nos fazemos isso pela camada apenas de infra.
então dentro da camada de infra vamos começar a criar a estrutura de cache. vamos fazer uma pasta chamada cache dentro da pasta infra. e dentro dela vamos criar uma cache-repository.ts
nele vamos criar uma classe abstrata (porque o prisma pede que repositorios sejam classes abstratas) e dentro dele vamos colocar alguns metoso abstratos tambem. vamos começar com metodos simples set (para salvar uma informação ) temos que lebrar que o cache geralmente ( e no nosso caso) não vai ser um banco relacional então ele vai seguir uma estrutura igual a de um objeto de chave valor. então no nosso set vamos tar isso então por exemplo se a gente for salvar uos detalhes de question a gente vai fazer algo como a key dela vai ser 'question:id:details': { e aqui vamos ter uma string como os attachments autor, respostas etc isso é o value}
o redis até aceita o value como não sendo string mas ai a gente comocaria uma complexidade néao necessaria para agora. porque o objeto que serai o value a gente salvaria numa string com  o json stringfy. isso porqeu nos não vamos filtrar e percorrer esses dados. porque nos não vamos fazer query neles.
e tambem vamos ter o get que não vai ter o value ele so vai ter a chave porque vamos achar as coisas la pela chave e ele vai devolver a string que achou la com esse alor ou um nulo caso não ache nada na pesquisa e vamos ter tambem o delete para deletar uma informação do cache. com esses tres metodos a gente pode savar buscar e deletar a gente chama deletar de invalidaçéao do cache. por exemplo se alguem mexer em uma informação cruxial da pergunta como por exemplo modificar o titulo a gente pode deletar a pergunta porque podemos querer que o cache tenha sempre as informações cruxiais atualizadas.
fica assim:
export abstract class CacheRepository {
  abstract set(key: string, value: string): Promise<void>
  abstract get(key: string): Promise<string | null>
  abstract delete(key: string): Promise<void>
}
## integrando cache no prisma
agora vamos entrar no repositorio onde nos queremos colocar cache. no caso vai ser o prisma-questions-reporitory e vamos começar colocando a dependencia do cacherepository como o private la no constructor
constructor(
    private prisma: PrismaService,
    private questionAttachments: QuestionAttachmentsRepository,
    private cacheRepository: CacheRepository,
  ) {}

e no metodo de indDetails by slug a gente vai integrar essa parte de cache.
que vai ser no primeiro momento quando o usuario carregar os dados da pergunta a gente vai salvar isso em cache. então la quando a gente converte para o dominio a gente vai tambem salvar em cache.
transformarmos o toDomain em uma const e retornamos essa const e tambem salvamos essa const no cache usando o cacheRepository.set() e dentro dele a gente vai dar uma chave que precisa ser unica e no redis a gente geralmente separa a chave com : a gente separa com : porque por exemplo a gente pode ter uma pergunta com id 1 fica question:1 e ai dessa pergunta a gente pode ter dois caches salvos um de details e um de reputação fica question:1:details e question:1:reputation assim a gente consegue diferenciar as coisas. separamos por "categoria" isso é importante porque no redis se a gente quiser deletar question:1 ele vai deletar todas as informações que tem o question:1 no caso o reputation e o details. se a gente não separar por: o redis néao vai encontrar facilmente tudo da question:1
é importante tambem quando vamos salvar em cache lembrar de ter informações na chave (key) que vao ser identificadores. a gente usa aqui o id mas poderia ser outra coisa. no caso do nosso find by slug a gente vai usar o slug. etão vamos compor o key desse set assim question:slug:details 
    await this.cacheRepository.set(`question:${slug}:details`) e agora temos que colocar o value
    que vai ser o json stringfy no questiondetails
      await this.cacheRepository.set(
      `question:${slug}:details`,
      JSON.stringify(questionDetails),
    )

    agora o que a gente vai fazer é no inicio do metodo;, ou seja a primeira vez que o usuario usar esse metodo a gente quer que ele calcule la pegano do banco de dados todas as informaç~es e entregue para o usuario salvando uma copia no cacherepository
    quando o segundo usuario usar o metodo a gente quer ver se essa informação não ja esta la no cache. ent~~ao no inicio do metodo a gente vai fazer um const cacheHit buscando la no repositorio com o get essa mesma chave que a gente passou.
       const cacheHit = await this.cacheRepository.get(`question:${slug}:details`)

se algo foi encontrado no cache a gente vai pegar isso usando o json.parse no cacheHit porque a gente tinha antes usado o stringfy e agora a gente retransforma para objeto e retornamos esses dados com o return cacheData
    if (cacheHit) {
      const cacheData = JSON.parse(cacheHit)
      return cacheData
    }
    e ai com esse retorno ele nem vai executar o resto do codigo ou seja ele achou no cache ele devolve o cache e acaba, se não ele executa o resto do codigo para buscar no banco de dados;
    fica assim:
    async findBySlug(slug: string): Promise<Questions | null> {
    const cacheHit = await this.cacheRepository.get(`question:${slug}:details`)

    if (cacheHit) {
      const cacheData = JSON.parse(cacheHit)
      return cacheData
    }
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
    })
    if (!question) {
      return null
    }

    const questionDetails = PrismaQuestionMapper.toDomain(question)

    await this.cacheRepository.set(
      `question:${slug}:details`,
      JSON.stringify(questionDetails),
    )

    return questionDetails
  }

e agora vamos no metodo save para invalidar o cache sempre que houver alterações no banco de dados.
então dentro do promise all a gente vai dar umthis.cache.delete 
   this.cacheRepository.delete(`question:${data.slug}:details`),
   usamos o data.slug porque o data ja era a questão que achamos no banco de dados. caso a gente quisesse deletar tudo relacionado a essa question a gente poderia usar o prefixo como a gente falou antes assim:
      this.cacheRepository.delete(`question:${data.slug}:*`),
  coloquei tambem no metodo deletemesmo que não tinha isso na aula. a pagina do repositorio fica assim:
  import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Questions } from '@/domain/forum/enterprise/entities/questions'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionWithDetails } from '@/domain/forum/enterprise/entities/value-objects/question-with-details'
import { PrismaQuestionWithDetailsMapper } from '../mappers/prisma-question-with-details-mapper'
import { DomainEvents } from '@/core/event/domain-events'
import { CacheRepository } from '@/infra/cache/cache-repository'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(
    private prisma: PrismaService,
    private questionAttachments: QuestionAttachmentsRepository,
    private cacheRepository: CacheRepository,
  ) {}

  async findById(id: string): Promise<Questions | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    })

    if (!question) {
      return null
    }
    return PrismaQuestionMapper.toDomain(question)
  }

  async findBySlug(slug: string): Promise<Questions | null> {
    const cacheHit = await this.cacheRepository.get(`question:${slug}:details`)

    if (cacheHit) {
      const cacheData = JSON.parse(cacheHit)
      return cacheData
    }
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
    })
    if (!question) {
      return null
    }

    const questionDetails = PrismaQuestionMapper.toDomain(question)

    await this.cacheRepository.set(
      `question:${slug}:details`,
      JSON.stringify(questionDetails),
    )

    return questionDetails
  }

  async findDetailsBySlug(slug: string): Promise<QuestionWithDetails | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
      include: {
        author: true,
        attachment: true,
      },
    })
    if (!question) {
      return null
    }

    return PrismaQuestionWithDetailsMapper.toDomain(question)
  }

  async findManyRecent({ page }: PaginationParams): Promise<Questions[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions.map(PrismaQuestionMapper.toDomain)
  }

  async create(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.create({
      data,
    })

    await this.questionAttachments.createMany(question.attachment.getItems())

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async delete(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.delete({ where: { id: data.id } })

    await this.cacheRepository.delete(`question:${data.slug}:details`)
  }

  async save(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await Promise.all([
      this.prisma.question.update({
        where: { id: data.id },
        data,
      }),
      this.questionAttachments.createMany(question.attachment.getNewItems()),
      this.questionAttachments.deleteMany(
        question.attachment.getRemovedItems(),
      ),
      this.cacheRepository.delete(`question:${data.slug}:details`),
    ])

    DomainEvents.dispatchEventsForAggregate(question.id)
  }
}

## serviços para cache
agora que temos isso no nosso repositorio a gente tem que colocar no ar um serviço para o cache e qaui vamos configurar isso.
vamos usar o redis então temos que criar um serviço nele
mas vamos na pasta cache e vamos criar uma pasta redis la dentro da mesma forma que a gente criou a pasta prisma para criar o prismaservice
então dentro da pastaredis a gente vai ter o arquivo redis.service.ts
e vamos instalar o redis na aplicação. existem duas bibliotecas para o redis, a redis e a ioredis
e gente vai usar a ioredis porque essa permite que a gente trabalhe com promises async await diferente das outras.
npm i ioredis
e agora la no redis service a gente importa o redis de ioredis e exporta a classe redisservice que extende o redis
import { Redis } from 'ioredis'

export class RedisService extends Redis {}

isso porque o redis que a gente importou é uma classe, então se a gente derum new na redisservice ele vai trazer tiudo que a redis ja tem e ai dentro da classe a gente chama o constructor com o metodo super e nele a gente pode passar algumas informações
o host que vai ser o endereço onde o redis esta executando  a gente geralmente usa o endereço ip então seria 127.0.0.1
a porta padrão do redis é a 6379
e o db que podemos configurar
no redis é interessante que n éao conseguimos separar os dados por u banco de dados nomeado. então  no db a gente podeseparar por banco de dados, mas não pode passar nome e sim numeros, por padrão ele é 0 mas a gente pode dizer por exemplo que vai ser 1 ou 2 ou etc. nos vamos deixar 0
import { Redis } from 'ioredis'

export class RedisService extends Redis {
  constructor() {
    super({
      host: '127.0.0.1',
      port: 6379,
      db: 0,
    })
  }
}

vamos tambem implementar o onModuleDestroi logo apos o extendsredis e ai com isso esse onModuledestroy é um hook do nest para quando a aplicação for derrubada a gente falar o que queremos fazer com essa instancia. e nesse caso a gente vai dizer para desconectar. no prisma temo tambem o onMouleInit mas no redis isso não é necessario.porque a conexão é feita automaticamente assim que a gente da um new redis
fica assim o redisService:
import { OnModuleDestroy } from '@nestjs/common'
import { Redis } from 'ioredis'

export class RedisService extends Redis implements OnModuleDestroy {
  constructor() {
    super({
      host: '127.0.0.1',
      port: 6379,
      db: 0,
    })
  }

  onModuleDestroy() {
    return this.disconnect()
  }
}

e agora a gente precisa configurar isso tudo então vamos la no nosso arquivo env/env.ts e adicionamos o redis_host que precisa ser uma string opicional e com default de 127.0.0.1 no port a gente faz parecido com o que fizemos para a portda aplicação porem o default vai ser 6379 e o regisdb a gente faz igual a port mas o deafault vai ser 0 fica assim o arquivo env
import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3333),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  AWS_BUCKET_NAME: z.string(),
  CLOUDFLARE_ID: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_KEY_ID: z.string(),
  REDIS_HOST: z.string().optional().default('127.0.0.1'),
  REDIS_PORT: z.coerce.number().optional().default(6379),
  REDIS_DB: z.coerce.number().optional().default(0),
})

export type Env = z.infer<typeof envSchema>

a gente não precisa criar essas variaveis ambientes no nosso .env porque como elas tem valores padrão vasta sair usando.
ai agora no nosso constructor do redisSErvice a gente vai receber o envService e agora usando o envService ele fica assim o nosso redis.service
import { EnvService } from '@/infra/env/env.service'
import { OnModuleDestroy } from '@nestjs/common'
import { Redis } from 'ioredis'

export class RedisService extends Redis implements OnModuleDestroy {
  constructor(envService: EnvService) {
    super({
      host: envService.get('REDIS_HOST'),
      port: envService.get('REDIS_PORT'),
      db: envService.get('REDIS_DB'),
    })
  }

  onModuleDestroy() {
    return this.disconnect()
  }
}

e agora com isso pronto a gente vaina nossa pasta cache e podemos criar um cache.module.ts e fazemos uma classe com tambem o @module
 import { Module } from '@nestjs/common'

@Module({})
export class CacheModule {}

agora dentro desse module a gente vai imortar o envmodule porque como ele esta sendo usado no envService ele vai precisar do envmodule e vamos criar um providers que porenquanto vai ser apenas o envService fica assim por enquanto:
import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { EnvService } from '../env/env.service'

@Module({
  imports: [EnvModule],
  providers: [EnvService],
})
export class CacheModule {}

agora vamos no database module 
vamos importar o cachemodule, porque é dentro do repositorio de question que vamos usar o cache então ele precisa estar impotado no modulo que usa ele. 
fica assim:
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaAnswerAttachmentsRepository } from './repositories/prisma-answer-attachments-repository'
import { PrismaAnswersRepository } from './repositories/prisma-answers-repository'
import { PrismaAnswerCommentsRepository } from './repositories/prisma-answer-comments-repository'
import { PrismaQuestionAttachmentsRepository } from './repositories/prisma-question-attachments-repository'
import { PrismaQuestionCommentsRepository } from './repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepository } from './repositories/prisma-questions-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentsRepository } from './repositories/prisma-students-repository'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository'
import { PrismaAttachmentsRepository } from './repositories/prisma-attachments-repository'
import { PrismaNotificationsRepository } from './repositories/prisma-notifications-repository'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notification-repository'
import { CacheModule } from '@/infra/cache/cache.module'

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    { provide: AnswersRepository, useClass: PrismaAnswersRepository },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [
    PrismaService,
    AnswerAttachmentsRepository,
    AnswersRepository,
    AnswerCommentsRepository,
    QuestionAttachmentsRepository,
    QuestionCommentsRepository,
    QuestionsRepository,
    StudentsRepository,
    AttachmentsRepository,
    NotificationsRepository,
  ],
})
export class DatabaseModule {}

a gente salva isso mas se tentarmos rodar a aplicação agora vai dar erro porque o repositorio ainda não foi implementado a gente so criou a interface do cacherepository. a gente tem que agora fazer a implementação do redis com o cace repository.

## implementando cache com redis
para isso a gente precisa no docker-compose.yml criar tambem o container do cache
na mesma identação do postgress a gente vai criar um novo que vamos chamar de cache
colocamos o nome e na image a gente vai usar a imagem do redis
cache:
    container_name: nest-clean-cache
    image: redis
    a imagem do redis é otima para desenvolvimento para produção a gente usaria a bitnami porque ela ja tem melhores configurações de segurança. las aqui a gente vai usar a redis mesmo.
    no ports a gente ai usar usar a 
      ports:
      - 6379:6379

    no volumes a gente vai fazer uma pasta redis dentro da pasta data e a gente vai pegar e mapear essa pasta para a pasta data dessa forma:
     volumes:
      - ./data/redis:/data
    fica assim:
 version: '3.8'

services:
  postgres:
    container_name: nest-clean-pg
    image: postgres
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: docker
      POSTGRES_DB: nest-clean
    volumes:
      - pgdata:/var/lib/postgresql/data
  
  cache:
    container_name: nest-clean-cache
    image: redis
    ports:
      - 6379:6379
    volumes:
      - ./data/redis:/data


volumes:
  pgdata:

a gente precisa colocar esse volumes e pgdata vazio no fim.

e a gente da um docker compose up
ou sudo docker compose up
e ai ele ja mostra que o cache esta como started:
] Running 2/2
 ✔ Container nest-clean-cache  Started                                     0.4s 
 ✔ Container nest-clean-pg     Running                                     0.0s 
➜  nest-clean git:(master) ✗ 

com isso funcionanando a gente vai criar a implmentação do repositorio então vamos na pasta redis e criamos o redis-cache-repository.ts
e fazemos uma classe ingetavel para ele que vai impleentar o repositorio do cache e a gente ja coloca os metodos pelo emmet fica assim e colocamos tambem o constructor que vai ser injetado pelo ingectable no constructor vai ter o redis service:
import { Injectable } from '@nestjs/common'
import { CacheRepository } from '../cache-repository'
import { RedisService } from './redis.service'

@Injectable()
export class RedisCacheRepository implements CacheRepository {
  constructor(private redis: RedisService) {}
  set(key: string, value: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  get(key: string): Promise<string | null> {
    throw new Error('Method not implemented.')
  }

  delete(key: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
e agora vamos criar cada um dos metodos que vai ser bem simples vamos dar um this.redis. e ai aparece todos os metodos que o redis tem. ele tem metodos simples como set e get e tambem metodos mais completos para por exemplo lidar com hash lidar com lista todos metodos que começam com l tratam de lista os de h tratam de hash. da pra trabalhar com muita coisa com ele.  então no set vamos usar o metodo set do redis e passamos a key e o value porem ele tem um terceiro parametro o terceiro parametro é  data de expiração. e a gente passa isso usando o EX e depois a gente passa o numero de segundos para essa informação expirar. isso é bom porque a gente não quer manter o cache eternamente. isso é ate perigoso com informações desatualizadas e tal. então a gente pode fazer 60 * 15 para deixar 60 segundo vezes 15 minutos.
  async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value, 'EX', 60 * 15)
  }
  o nome EX antes poderia ser tambem outras coisas como FX para milissegundos o EXAT a gente passa uma data para ele expirar e varios outros que podemos ver na documentaçéao do redis. o ex então lida com segundos.
  para o metodo get a gente da um return this.redis.get(key) e o del a gente vai colocar em async e await porque o del do redis retorna o numero de dados que foram deletads entao não vai funcionar fazerndo um return. a pagina fica assim:
  import { Injectable } from '@nestjs/common'
import { CacheRepository } from '../cache-repository'
import { RedisService } from './redis.service'

@Injectable()
export class RedisCacheRepository implements CacheRepository {
  constructor(private redis: RedisService) {}
  async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value, 'EX', 60 * 15)
  }

  get(key: string): Promise<string | null> {
    return this.redis.get(key)
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key)
  }
}
*agra que remos o repositorio cache implementado a gente pode ir no cache module e dentro de providers a gente faz aquela chave com o useClass
   {
      provide: CacheRepository,
      useClass: RedisCacheRepository,
    },

  e tambem exportams o cache repository. e tinha um erro que em providers a gente tinha colocado envService e é redis service. e la no redisService a gente tem que colocar o injectable. ele fica assim:
  import { EnvService } from '@/infra/env/env.service'
import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { Redis } from 'ioredis'

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  constructor(envService: EnvService) {
    super({
      host: envService.get('REDIS_HOST'),
      port: envService.get('REDIS_PORT'),
      db: envService.get('REDIS_DB'),
    })
  }

  onModuleDestroy() {
    return this.disconnect()
  }
}

    o module fica assim:
  
import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { CacheRepository } from './cache-repository'
import { RedisCacheRepository } from './redis/redis-cache-repository'
import { RedisService } from './redis/redis.service'

@Module({
  imports: [EnvModule],
  providers: [
    RedisService,
    {
      provide: CacheRepository,
      useClass: RedisCacheRepository,
    },
  ],
  exports: [CacheRepository],
})
export class CacheModule {}
e a aplicação ja ta girando.

vamos agora fazer testes para a parte de cache para garantir que esta tudo funcionando.
e essa parte de cache não esta necessariamente associada aos controllers. a gente tem sim um controller para ela para buscar os detalhes da pergunta porem a isso não é uma regra o cache não precisava ser chamado apenas por um controller, ele podia ser chamado por qualquer coisa. o que a gente pode fazer aqui é criar um teste dentro do proprio repositorio. eentão em repositories a gente pode criar um arquivo chamada prisma-question-repository.e2e-spec.ts
vamos nos controllers e pegamos o teste de question by slug e jogamos nesse arquivo pra servir de modelo
vamos trocar o nome para prisma test repository e2e e nos vamos precisar manter todos os factories mas vamos adicionar tambem o cacheRepository nos imports colocamos o cacheodule
e depois pegamos o cacherepositori com o moduleRef
e vamos tambem usar o questionRepository porque vamos lançar o metodo findDetailsBySlug direto do repositorio nos não vamos usar a rota (apesar de que poderiamos) 
describe('Prisma Questions Repository (e2e)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let attachmentFactory: AttachmentFactory
  let questionAttachmentFactory: QuestionAttachmentFactory
  let cacheRepository: CacheRepository
  let questionRepository: QuestionsRepository
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, CacheModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AttachmentFactory,
        QuestionAttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    questionAttachmentFactory = moduleRef.get(QuestionAttachmentFactory)
    cacheRepository = moduleRef.get(CacheRepository)
    questionRepository = moduleRef.get(QuestionsRepository)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  vamos tambem mudar o nome do teste para can cache question details vamos tambem deixar mais simples o teste tirar o nome da criação do user a criação da question so vai ter o authorId
    test('if can cache question details', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const attachment = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment.id,
      questionId: question.id,
    })

    e abaixo disso a gente remove tudo.
    e como vamos pegar os detalhes pelo slug q gente precisa criar o slug
    e como não vai ter rota não vamos precisar do accesstoken então podemos tirar tudo do jwt dele com o slug em mãos a gente faz uma chamada direto no questionsRepository para find details by slug
        const slug = question.slug.value

    const questionDetails = await questionRepository.findDetailsBySlug(slug)
    e agora a gente vai verificar se os dados foram cacheados então vamos la no cacherepository e damos o get passando a key 
      const questionDetails = await questionRepository.findDetailsBySlug(slug)
    const cached = await cacheRepository.get(
      `question:${question.slug}:details`,
    )
    e agora a gente quer que esse cache que ele traz seja igual a json stringfy question details
     expect(cached).toEqual(JSON.stringify(questionDetails)) o teste fica assim:
     import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { AppModule } from '@/infra/app.module'
import { CacheRepository } from '@/infra/cache/cache-repository'
import { CacheModule } from '@/infra/cache/cache.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AttachmentFactory } from 'test/factories/make-attachemnt'
import { QuestionFactory } from 'test/factories/make-question'
import { QuestionAttachmentFactory } from 'test/factories/make-question-attachments'
import { StudentFactory } from 'test/factories/make-student'

describe('Prisma Questions Repository (e2e)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let attachmentFactory: AttachmentFactory
  let questionAttachmentFactory: QuestionAttachmentFactory
  let cacheRepository: CacheRepository
  let questionRepository: QuestionsRepository

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, CacheModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AttachmentFactory,
        QuestionAttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    questionAttachmentFactory = moduleRef.get(QuestionAttachmentFactory)
    cacheRepository = moduleRef.get(CacheRepository)
    questionRepository = moduleRef.get(QuestionsRepository)

    await app.init()
  })

  test('if can cache question details', async () => {
    const user = await studentFactory.makePrismaStudent()

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const attachment = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment.id,
      questionId: question.id,
    })

    const slug = question.slug.value

    const questionDetails = await questionRepository.findDetailsBySlug(slug)
    const cached = await cacheRepository.get(
      `question:${slug}:details`,
    )
    expect(cached).toEqual(JSON.stringify(questionDetails))
  })
})

porem se a gente rodasse ia dar erro porque no prisma question repositorio a gente tinha feito a implementação no findquestionBySlug e não no finddetails. então eu tive que alterar o repositorio. agora o repositorio fica assim:
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Questions } from '@/domain/forum/enterprise/entities/questions'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionWithDetails } from '@/domain/forum/enterprise/entities/value-objects/question-with-details'
import { PrismaQuestionWithDetailsMapper } from '../mappers/prisma-question-with-details-mapper'
import { DomainEvents } from '@/core/event/domain-events'
import { CacheRepository } from '@/infra/cache/cache-repository'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(
    private prisma: PrismaService,
    private questionAttachments: QuestionAttachmentsRepository,
    private cacheRepository: CacheRepository,
  ) {}

  async findById(id: string): Promise<Questions | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    })

    if (!question) {
      return null
    }
    return PrismaQuestionMapper.toDomain(question)
  }

  async findBySlug(slug: string): Promise<Questions | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
    })
    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findDetailsBySlug(slug: string): Promise<QuestionWithDetails | null> {
    const cacheHit = await this.cacheRepository.get(`question:${slug}:details`)
    if (cacheHit) {
      const cacheData = JSON.parse(cacheHit)
      return cacheData
    }
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
      include: {
        author: true,
        attachment: true,
      },
    })
    if (!question) {
      return null
    }

    const questionDetails = PrismaQuestionWithDetailsMapper.toDomain(question)
    await this.cacheRepository.set(
      `question:${slug}:details`,
      JSON.stringify(questionDetails),
    )
    return questionDetails
  }

  async findManyRecent({ page }: PaginationParams): Promise<Questions[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions.map(PrismaQuestionMapper.toDomain)
  }

  async create(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.create({
      data,
    })

    await this.questionAttachments.createMany(question.attachment.getItems())

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async delete(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.delete({ where: { id: data.id } })

    await this.cacheRepository.delete(`question:${data.slug}:details`)
  }

  async save(question: Questions): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await Promise.all([
      this.prisma.question.update({
        where: { id: data.id },
        data,
      }),
      this.questionAttachments.createMany(question.attachment.getNewItems()),
      this.questionAttachments.deleteMany(
        question.attachment.getRemovedItems(),
      ),
      this.cacheRepository.delete(`question:${data.slug}:details`),
    ])

    DomainEvents.dispatchEventsForAggregate(question.id)
  }
}

agora com isso ele ja passa. so temos que lembrar de sempre rodar o docker usando o sudo docker compose up -d
tem que ter o sudo se não a imagem do cache não roda.
porem é legal a gente lembrar que o ideal é não usar o mesmo banco de dados para desenvolvimento e para teste. então a gente pode fazer como no prisma e alterar a url do banco de dados para os testes porem dessa vez não vamos alterar a url e sim o indice do banco de dados
no nosso env a gente criou o redis db então vamos no env.test que é o arquivo que subescreve a confiruação na hora do teste e nele vamos passar um outro revis db como 1 fica assim o env. test
#override env variables during test
AWS_BUCKET_NAME="ignite-nest-clean-test"
REDIS_DB=1

e assim nos testes o redis vai usar um outro db.

com isso vamos salvar as coisas no nosso banco de dados em teste.
mas o que podemos fazer tambem é apagar todos os dados do banco de teste do redis antes dos testes executarem.
então vamos la no setupE2E e vamos importar o redis de dentro de ioredis
import { Redis } from 'ioredis'
e vamos fazer a conexão com o banco de dados. então se hoje a gente esta usando o env nesse arquivo mas nos podemos tambem fazer uma const env e importar o envSchema e fazer um parse em process. env
const env = envSchema.parse(process.env)
e agora para a conexão com o redis a gente joga uma const redis = new redis( e passamos configurações aqui)
com isso do env agora para a gente setar o host do redis so de escrever env. ele ja vai trazer as variaveis que existem porque usando o process.env ele não traz. então vamos setar o host o port e o db 
const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  db: env.REDIS_DB,
})
e como criamos o env a gente pode trocar nos outros lugares onde esta process env so por env
e agra que temos essa conexão com o redis no before all a gente pode eliminar todos os dados do redis. é so dar um await redis.flushdb()
beforeAll(async () => {
  const databaseUrl = generateUniqueDatabaseURL(schemaId)
  process.env.DATABASE_URL = databaseUrl

  DomainEvents.shouldRun = false

  await redis.flushdb()

  execSync('npx prisma migrate deploy')
})
a gente usa flushdb e néao flush all porque o all apara os dados de todos os bancos de dados e nesse caso a gente quer so do db que a gente selecionou. 
o setup fica assim:
import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { DomainEvents } from '@/core/event/domain-events'
import { Redis } from 'ioredis'
import { envSchema } from '@/infra/env/env'

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

const env = envSchema.parse(process.env)

const prisma = new PrismaClient()
const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  db: env.REDIS_DB,
})

function generateUniqueDatabaseURL(schemaId: string) {
  if (!env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable')
  }

  const url = new URL(env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}
const schemaId = randomUUID()
beforeAll(async () => {
  const databaseUrl = generateUniqueDatabaseURL(schemaId)
  process.env.DATABASE_URL = databaseUrl

  DomainEvents.shouldRun = false

  await redis.flushdb()

  execSync('npx prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  prisma.$disconnect()
})

e agora voltamos para o nosso teste do repositorio e duplicamos o teste porque vamos fazer um segundo teste para ver se ele retorna as details que foram cacheadas nas chamadas sequentes.
ou seja a primeira chamada que a gente fizer ele vai criar o cache mas nas sequentes ele ja deve ver que tem o cache la e pegar do cache e não do banco de dados normall.
então antes de chamar o find details by slug a gente vai setar o cache. passando o cacherepository set e passando como segundo argumento um jsonstringfy comocando algo aleatorio nele:
 await cacheRepository.set(
      `question:${slug}:details`,
      JSON.stringify({ empty: true }),
    )

a gente néao precisa colocar os questionDetails reais porque esse metodo vai bater no cache e vai retornar qualquer coisa que tenha la. 
e agora que a gente deu esse set a gente quer que na chamada do finddetails ele retorne o que a gente setou que é o que esta no cache. e não o que busque do banco de dados. então esperamos que o nosso questionDetails seja igual a empty:true 
fica assim o teste:
test('if can return cached question details on subsequent calls', async () => {
    const user = await studentFactory.makePrismaStudent()

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const attachment = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment.id,
      questionId: question.id,
    })

    const slug = question.slug.value

    await cacheRepository.set(
      `question:${slug}:details`,
      JSON.stringify({ empty: true }),
    )

    const questionDetails = await questionRepository.findDetailsBySlug(slug)

    expect(questionDetails).toEqual({ empty: true })
  })

  e agora vamos fazer o ultimo teste que é para ver se esta deletando do cache quando salvamos uma pergunta
  a gente faz igual até o set do cache e depois disso a gente tem que dar um update na pergunta. 

    await questionRepository.save(question)
    então depois que fizemos isso o cache deve ser deletado porque a gente colocou o delete nesse metodo (colocamos tambem no metodo delete então tambem vamos ter que criar esse teste por conta propria.)
então apos isso a gente vai tentar buscar cached e esperamos que seja nulo
 test('if can reset question cached details when saving question', async () => {
    const user = await studentFactory.makePrismaStudent()

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const attachment = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment.id,
      questionId: question.id,
    })

    const slug = question.slug.value

    await cacheRepository.set(
      `question:${slug}:details`,
      JSON.stringify({ empty: true }),
    )

    await questionRepository.save(question)

    const cached = await cacheRepository.get(`question:${slug}:details`)

    expect(cached).toBeNull()
  })

  e agora vamos fazer tambem um praticamente igual a esse mas chamadno o metodo de delte da question fica assim:
  import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { AppModule } from '@/infra/app.module'
import { CacheRepository } from '@/infra/cache/cache-repository'
import { CacheModule } from '@/infra/cache/cache.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AttachmentFactory } from 'test/factories/make-attachemnt'
import { QuestionFactory } from 'test/factories/make-question'
import { QuestionAttachmentFactory } from 'test/factories/make-question-attachments'
import { StudentFactory } from 'test/factories/make-student'

describe('Prisma Questions Repository (e2e)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let attachmentFactory: AttachmentFactory
  let questionAttachmentFactory: QuestionAttachmentFactory
  let cacheRepository: CacheRepository
  let questionRepository: QuestionsRepository

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, CacheModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AttachmentFactory,
        QuestionAttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    questionAttachmentFactory = moduleRef.get(QuestionAttachmentFactory)
    cacheRepository = moduleRef.get(CacheRepository)
    questionRepository = moduleRef.get(QuestionsRepository)

    await app.init()
  })

  test('if can cache question details', async () => {
    const user = await studentFactory.makePrismaStudent()

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const attachment = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment.id,
      questionId: question.id,
    })

    const slug = question.slug.value

    const questionDetails = await questionRepository.findDetailsBySlug(slug)
    const cached = await cacheRepository.get(`question:${slug}:details`)
    expect(cached).toEqual(JSON.stringify(questionDetails))
  })
  test('if can return cached question details on subsequent calls', async () => {
    const user = await studentFactory.makePrismaStudent()

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const attachment = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment.id,
      questionId: question.id,
    })

    const slug = question.slug.value

    await cacheRepository.set(
      `question:${slug}:details`,
      JSON.stringify({ empty: true }),
    )

    const questionDetails = await questionRepository.findDetailsBySlug(slug)

    expect(questionDetails).toEqual({ empty: true })
  })
  test('if can reset question cached details when saving question', async () => {
    const user = await studentFactory.makePrismaStudent()

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const attachment = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment.id,
      questionId: question.id,
    })

    const slug = question.slug.value

    await cacheRepository.set(
      `question:${slug}:details`,
      JSON.stringify({ empty: true }),
    )

    await questionRepository.save(question)

    const cached = await cacheRepository.get(`question:${slug}:details`)

    expect(cached).toBeNull()
  })
  test('if can reset question cached details when saving question', async () => {
    const user = await studentFactory.makePrismaStudent()

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const attachment = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment.id,
      questionId: question.id,
    })

    const slug = question.slug.value

    await cacheRepository.set(
      `question:${slug}:details`,
      JSON.stringify({ empty: true }),
    )

    await questionRepository.delete(question)

    const cached = await cacheRepository.get(`question:${slug}:details`)

    expect(cached).toBeNull()
  })
})

e com isso a gente termina todos os testes e por consequencia a aplicação.
