# Recuperação de senha

## Funcionalidades em si
**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber o e-email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

## Qual lib, qual banco de dados e etc...
**RNF**

- Utilizar Mailtrap para ambiente de desenvolvimento
- Utilizar Amazon SES para envios em produção
- O envio de e-mails deve acontecer em segundo plano (background job)

## Regras de negócio
**RN**

- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar a sua senha;


# Atualização do perfil

## Funcionalidades em si
**RF**

- O usuário deve poder atualizar o seu nome, perfil e senha;

## Qual lib, qual banco de dados e etc...
**RNF**

## Regras de negócio
**RN**

- O usuário não pode alterar seu e-mail para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar a sua senha, o usuário precisa confirmar a nova senha;


# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis de um dias específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache(resultado de visualizações guardados de uma forma mais rápida);


**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (primeiro às 8h, último às 17h)
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;



# Painel do prestador

**RF**

- O usuário deve poder listar seu agendamentos de um dia específico;
- O prestador deve receber um notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache
- As notificações do prestador devem ser armazenadas no MongoDB
- As notificações do prestador devem ser enviadas em tempo-real para que o prestador possa controlar

**RN**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar

**TDD**

![image](https://github.com/Davibarreto11/reactypescript/assets/102602408/61a2f4d9-5bd8-4a05-a2d5-ba49fc2545e6)
![image](https://github.com/Davibarreto11/reactypescript/assets/102602408/2c5678cf-0d74-42f4-ba4f-898f7d8b23bf)

