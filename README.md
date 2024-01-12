# Projeto CrudClients

## Demonstração do projeto
Acesse a demonstração do projeto aqui: <a href="https://drive.google.com/file/d/1HRYpLaJ8KcsxNXGWOpucOYKdZxBQDiG3/view?usp=drive_link" target="_blank">Ver video</a>

## Descrição

Este projeto consiste em uma aplicação web de gerenciamento de clientes (CrudClients) que permite realizar operações CRUD (Create, Read, Update, Delete) em dados de clientes. A aplicação é dividida em um frontend desenvolvido em JavaScript e um backend implementado em Java com o framework Spring Boot.

## Clone o repositório
Link: 
git clone https://github.com/frontRocha/datatable.git

## Tecnologias Utilizadas

### Frontend (JavaScript, CSS3 e HTML5)

O frontend foi desenvolvido utilizando JavaScript e é responsável por interagir com o usuário, enviar requisições para o backend e exibir os dados de clientes em uma tabela.

### Backend (Spring Boot)

O backend foi desenvolvido em Java com o framework Spring Boot. Utiliza o padrão de projeto Builder para a construção de objetos, integração com o banco de dados MySQL e fornece uma API RESTful para as operações CRUD.

#### Estrutura do Código

- `CrudClientsApplication.java`: Classe principal que inicia a aplicação Spring Boot.

- `Client.java`: Entidade que representa um cliente, utilizando o padrão de projeto Builder para facilitar a criação de instâncias.

- `ClientRepository.java`: Interface que estende `JpaRepository` para operações de acesso a dados.

- `ClientService.java`: Classe de serviço que contém a lógica de negócios para manipulação de clientes.

- `ClientController.java`: Controlador REST que define os endpoints para as operações CRUD.

## Requisitos do Sistema

1. Java 17 ou superior.
2. Maven para compilação e gestão de dependências.

## Backend - Configuração do Banco de Dados MySQL

A aplicação utiliza o MySQL como banco de dados. Configure as seguintes propriedades no arquivo `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/nome_do_banco
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```
