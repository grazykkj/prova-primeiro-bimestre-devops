# Relatório de Processo — Prova de DevOps (1º Bimestre)

**Aluno:** Grazielli Monteiro 
**RA:** 6325165 
**Curso:** Análise e Desenvolvimento de Sistemas  
**Disciplina:** DevOps — 2026.2  
**Ferramenta de IA Utilizada:** minha nova IA abençoada Gemini

---

### Questão 1 — A Jornada Completa (Aulas 01 a 07)

Para montar o projeto da API de Reservas, fiz tudo em etapas, indo do ambiente local até a subida na AWS. Ao mesmo tempo q essa ordem facilitou, deu um estresse exurbitante!!! Mas no fim, consegui garantir que a aplicação "funciona-se" (ter que colocar os aspas pq o que teve de erro nesse projeto nao é brincadeira rapazkkk), antes de tentar automatizar a infraestrutura na nuvem.

Sendo sincera, nao quero resumir nada em etapas naokkkk, muita dor de cabeça, só sei que passei um estresse do caralho, além de errar uma porrada de PR + fazer alteração (QUE EU NEM SABIA QUE TINHA FEITO, DESCULPA ALE, VOU MELHORAR!!!). Mas enfim, vamos direto ao ponto, pelo o que eu me recordo, confesso que usei bastante a IA pra fazer (nao fui a unica te garanto issokk), mas, de qualquer forma, comecei na aula-01 (começou pelo começo bla bla blakk) organizando o Git. Criei o repo bonitin e já fui configurando tudo, pelo o que eu lembre, acho que a priemira coisa que eu fiz foi com o gitignore (e é engraçado isso pq foi essa bosta ai que eu alterei sem querer do senhor, EU NEM SABIA DISSO INCLUSIVE). Mas essa parte ai da alteração, foi na aula-02, mas isso eu deixo pra contar daqui a pouquin rs. Bom, eu fiz primeiro ele pra não correr o risco de subir arquivos sensíveis, como senhas, chaves e os estados do Terraform (e no final nao adiantou de nada pq a jumenta aqui teve a capacidade de vazar tudokkkkk, é uma burra mesmo) ai montei o dockerfile pra rodar API e esses treco que voce ja conhece a mais de 30 anos. COM ISSO, ENTRA A AULA-02, usei a benção do docker compose para subir as API junto com o banco PostgreSQL de um jeito integrado sla, criando um volume pros dados nao irem pra casa do cacete e um healthcheck (nao lembro oq krls é isso, so lembro que existe) pra nossa querida API só tentar conectar no banco quando ele estivesse prontin (e no final nao adiantou muita coisa ja que teve uns dado ai que sumiu e vazokk, ai como eu amo essa area!!!! <3>). Dito isso, local, testei todas as rotas do CRUD (POST, GET, PUT, DELETE e health, essas peste ai que tamo falando desde o começo do curso, ave maria viu).

Com tudo "rodando certinho" no Docker (ou eu pelo menos pensava que estavakk), fui para as aulas 03 e 06 pra mexer no demonio do Terraform na AWS (voce acabou com a minha vida aws obrigada!!!!). Primeiro (pelo o que eu lembre), preparei o remote state criando o bucket S3 e a tabela no DynamoDB para travar o estado do Terraform (pensa num inferno mexer nisso pprt). Depois disso, dividi a infraestrutura em módulos dentro da pasta infra/modules (igual nessa prova maldita). Com isso temos:
1. VPC (nem pra ser cano vpc, era menos pior): Para criar a rede com subnets públicas e privadas em duas zonas de disponibilidade (us-east-1a e us-east-1b), além das tabelas de roteamento e do Internet Gateway (outra desgraca tbm).
2. Security Group: Para controlar o acesso liberando só as portas 22 (SSH) e 3000 (API) na EC2 (eu tive que pesquisar, nao lemvbrava nkk), e travando a 5432 do PostgreSQL no RDS para aceitar conexões vindas apenas da própria EC2 (mais um que fudeo minha vida).
3. EC2: O servidor t2.micro na subnet pública com user_data configurado e usando o LabInstanceProfile( pra no final dar uns 300 erro no PRkkkkkkkkkkkkk inferno).
4. RDS:O banco PostgreSQL db.t3.micro isolado nas subnets privadas, sem acesso público e com armazenamento criptografado (so voce e o gustavo mesmo pra fude a gente pqp, acho que sua prova foi menos pior, E NAO FALO ISSO PRA ZOAR NAO VLW).

Por fim, nessas aula madlta (02 e 07), usei a IA como copiloto para ajudar na montagem e revisão das estruturas do Terraform, fechando o projeto de forma completa (e nao adiantou nadakkkk desculpa).

---

### Questão 2 — O Processo com IA como Copiloto

Pra deselvolver esse lixo aqui, usei o Gemini meu amiguxo como assistente. A ideia de usar a IA foi para ganhar tempo na hora de gerar a estrutura inicial dos arquivos de código(VALEU MUITO A PENA), tirar dúvidas de sintaxe do Docker e do Terraform(tirei pra krl viu), e me ajudar a entender as mensagens de erro que apareciam no terminal( e nao foi pouco, se tiver errado eu vo me matar).

Eu pedia as coisas dando bastante contexto, tenho esse costume de especificar pq acho mais pratico sla, parece que entendem melhot. Por exemplo, enviei um prompt assim: "Crie um módulo Terraform de RDS PostgreSQL para o AWS Learner Lab, usando subnets privadas, sem criar IAM e liberando a porta 5432 só para o Security Group da EC2". A IA me entregava rápido o esqueleto do código com o aws_db_instance e o aws_db_subnet_group (nenhuma dessas palavras existe na biblia pqp ale).

Só que eu não podia simplesmente copiar e colar (nao podia, como fui la e fiz mesmo assim fdskkkkkkkk brincadeira, eu pelo menos li e revisei coisa pra krl pra evitar cometer o mesmo erro nas terrafas e nao faltar nada na prova, e EU ESPERO QUE TENHA DADO CERTO). Várias vezes a IA tentava colocar blocos de aws_iam_role no meio do código, e como no Learner Lab a gente não tem permissão para criar regras de IAM, eu precisava ajustar manualmente para usar a LabRole e o LabInstanceProfile. Também precisei corrigir alguns caminhos de pastas nos arquivos .tf (isso eu fiz bastante viu, como pode tanta coisa dar erro).

Usar a IA economizou bastante tempo de digitação e pesquisa (AOH POTENCIA). Por outro lado, exigiu que eu prestasse o dobro de atenção para não deixar passar nenhum erro de configuração (e ainda sim da uma insegurança da porra achando que tem algo errado). No fim, percebi que a IA ajuda muito a acelerar o trabalho, mas quem tem que validar e tomar as decisões é o desenvolvedor (ainda vou chegar no nivel de depender disso pra so realmente criar algo que ja existe pra evitar um trabalho que ja pode estar pronto a qualquer momento, e nao fazer tudo com isso, cobrança em cima de voce mesmo é necessario em muitos casos, principamente como esse). No final, realmente falicitou coisa pra cacete e valeu a pena apesar dos erros e consequencias :/ 

---

### Questão 3 — Infraestrutura, Segurança e o Learner Lab

A arquitetura que montei na AWS foi pensada para manter a aplicação funcionando bem e os dados seguros (e de seguro nao tem porra nenhumakk). Criei uma VPC (10.0.0.0/16) dividida em subnets públicas e privadas distribuídas em duas Zonas de Disponibilidade na região us-east-1 (por incrivel que pareça, acho legal de fazer essas partes).

A decisão de deixar a EC2 na subnet pública e o banco RDS na subnet privada foi por questão de segurança em camadas (e nem isso prestou):
- EC2: Ficou na subnet pública porque precisa receber as requisições da internet na porta 3000 para a API funcionar, além de permitir meu acesso via SSH na porta 22 (maldição).
- RDS: Ficou escondido nas subnets privadas com a opção publicly_accessible = false. A única forma de conversar com o banco é pela porta 5432 (q numero bosta pra uma porta em), e só se a conexão vier do grupo de segurança da EC2. Assim, ninguém da internet consegue tentar acessar o banco diretamente (nao foi isso q me disseram da ultima vezkk).

Como a prova foi feita no AWS Academy Learner Lab (tinha que ter essa porra pra me azucrinar, todo ano tem algum capeta pra me estressar o bimestre inteiro e eu pegar ranço), tive que lidar com algumas limitações do ambiente. A principal é que ele bloqueia a criação de regras e papéis de IAM. Para contornar isso, usei o parâmetro iam_instance_profile = "LabInstanceProfile" para reaproveitar a LabRole (lamberolakkkkk piada merda do krl) que o lab já oferece. Também precisei ficar atento com as credenciais temporárias do AWS CLI (AWS_SESSION_TOKEN) E PENSA NUMA RAIVA DO CARALHO Q EU PASSEI ARRUMANDO ISSO AI. Mas, pelo menos garantiu que tudo estivesse configurado na região us-east-1.

---

### Questão 4 — Validação e Responsabilidade

Usar IA para gerar código de infraestrutura exige muito cuidado (exige mesmo pq do nada ela fica burra igual eu). Pq se vc fou um idiota e aceitar tudo o que a IA sugere sem olhar essa desgraca, pode acabar gerando custos desnecessários (E PIOR, ALTERAR O QUE NAO DEVE), abrindo brechas de segurança ou travando o deploy por causa de incompatibilidades na nuvem (e é claro que alguem tinha q ter a capacidade de fazer uma asneira dessaskkkkkkk quem sera q foikkkkkkkkkk).

Antes de rodar qualquer comando importante como o terraform apply (outro lixo), eu segui um checklist básico:
1. Conferir IAM: Garantir que o código gerado pela IA não tentava criar papéis de IAM que o Learner Lab bloquearia (e olha q dessa vez eu revisei umas 10k de vezes).
2. Revisar Portas e Redes: Checar se a porta do banco ou do SSH não estavam abertas para o mundo (0.0.0.0/0) sem necessidade (mexer com porta é pior q fazer pacto pq vc nunca sabe oq te esperakk).
3. Rodar Validações do Terraform: Executar o terraform validate para checar a sintaxe e o terraform plan para ler com calma exatamente o que seria criado na AWS (e é engracado isso pq eu morria de medo de gastar os creditos + dar mais 300 erros + nunca funcionar, POREM, creio eu q deu certo ja q as evidencia ta tudo ai vlw).
4. Checar o .gitignore: Ver se arquivos de estado (.tfstate), chaves `.pem e pastas temporárias não seriam enviados para o GitHub (eu tenho CERTEZA q isso foi oq eu mais reviseikkkkkkkkk medo da desgraca).

Se eu tivesse rodado o código da IA sem revisar, o terraform apply teria falhado logo de cara por conta das restrições de IAM do Learner Lab (e o milagre veio, funcionou de primeirakkkkk ATE ESTRANHEI). As aulas do bimestre me deram vontade de me matar a base para entender o quuao burra eu sou + pegar odio de empresa bilionaria, a cada linha de código q eu fazia, meu cerebro colapsava, pelo menos me permitiu usar IA (PRA UM CARAI) como uma ferramenta de produtividade com responsabilidade (responsabilidade é uma palavra forte, mas a experiencia foi engracada e estressante, tenho que confessar!!). Mas oh, fico feliz de ta fazendo (ou tentando fazer) mais coisas na mao, porem errando pa peste, entretanto, pelo menos mostra que eu to tentando e isso é algo bom num é ale? Mas cara, vo te fala, manera ai nas coisinha bixokk sei q tamo ta etapa da semifinal ae, mas acho que precisamos de mais verdades e ações doq palavras de conforto, muita gente anda desanimada nesses tempos pra ca, nao conseguem muita coisa na area (ate mesmo meus proprios amigos, e me incluindo, claro.) e é uma situação complicada cara, pq no meu caso, eu ainda nao me sinto capacitada nem uns 60% pra programar de verdade, insegurança acaba com a nossa cabeça de um jeito bizarro, ja tenho problema demais e a facul foi pra tentar dar um escape nessa vida monotona, porem, existe gente MUITO mais capacitada doq eu e nem eles mesmo conseguem oportunidades boaskkk imagina eu q foi aprender a usar branch no começo do ano de agorakkkk E AINDA SIM TEM A CAPACIDADE DE ERRAR UMA PORRADA DE COISA!! meu sonho trabalhar na google ou qualquer multinacional q sentir dó de mim pra sentir a expeciencia (vou sofrer q so a desgraca), mas ainda sim, to tentando o maximo nao desistir, ultimamente to me programando pra focar mais nos estudos e esses cursinhos que vc conseguiu pra gente parece que foi um sinal divino bixokkk tu é foda cara, é velho mas sabe o que faz. De verdade mesmo ale, muito obrigada por se importar com a gente e querer q a gente tenha um futuro daora e força de vontade, voce vai ser mais um dos professores que eu confesso q nao vou esquecer, apesar de vc ser um palhaçokkkkkkkkkkkkk, mas de vdd msm man vlw pelo carinho, to perdendo 25 minutos da minha vida digitando isso e nem sei se tu vai le tnckkk foco da pergunta nem era esse mas tamo ai ne.
Vereditos finais, nao to puxando o krai do seu saco n vlw, so deu vontade de fazer um textao fudido pra ver se vc lekkkkkkkkkkkk troxaokkkkkkkkkk (to zuando viado). Mas é isso parcero, tmj, vo melhorar nas aulas ae e ajuda nois ai a arruma uns trampo daora (nao sendo igual o seu q parece escravidao ja ta otimo!!!) bjos e vlw por ler ate aqui, rs.
