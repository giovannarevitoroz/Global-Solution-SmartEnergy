# SmartEnergy

## Descrição

A **SmartEnergy** tem como objetivo otimizar o consumo de energia em residências e empresas, fornecendo uma plataforma inteligente para o gerenciamento de dados de consumo energético. Através da integração com dispositivos de medição e energia solar, a solução oferece relatórios detalhados, cálculo de custos e sugestões de melhorias para reduzir o impacto ambiental e os gastos com energia elétrica.

## Diferenciais

- **Gerenciamento Eficiente de Energia**: Plataforma que coleta e analisa dados de consumo de energia, identificando padrões e oportunidades de economia.
- **Integração com Energia Solar**: Suporte completo para usuários que desejam integrar sistemas de energia solar ao seu consumo.
- **Cálculos Precisos**: Utilização de algoritmos para estimar o custo total de energia com base no consumo mensal e no valor do kWh, otimizando o orçamento familiar ou empresarial.

## Vídeos do Projeto

- [Video 1](https://www.youtube.com/watch?v=Xk_73wwOvGo&ab_channel=FIAPKAIAN)
- [Video 2](https://www.youtube.com/watch?v=iUpLNIqccpc)

## Instruções para Manipulação do Sistema

A plataforma **SmartEnergy** está disponível localmente através de um servidor local, utilizando as tecnologias **React**, **Vite**, **Next.js** e **Flask** para a API. Para rodar a aplicação, siga os passos abaixo:

1. Clone o repositório do projeto em sua máquina.
2. No terminal, navegue até o diretório do projeto.
3. Instale as dependências do projeto com o comando:

   ```bash
   npm install
   ```

4. Em seguida, abra o terminal no diretório do projeto e execute:

   ```bash
   Sprint 4 - SmartEnergy/Sprint 4 - SmartEnergy
   ```

5. Instale as seguintes dependências para o ambiente Python:

   ```bash
   pip install flask
   pip install flask_cors
   pip install joblib
   pip install pandas
   pip install scikit-learn==1.5.2  # Caso haja algum aviso de problema de versão
   ```

6. Rode no terminal o comando:

   ```bash
   python api.py
   ```

7. O prompt retornado deve ser semelhante a:

   ```
   Transformation Pipeline and Model Successfully Loaded
   Serving Flask app 'api'
   Debug mode: on
   WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
   Running on http://127.0.0.1:5000
   ```

### Instalação e configuração do ambiente Java

A API de Java foi desenvolvida no Eclipse IDE.

1. **IDE**: Abra o projeto em uma IDE compatível (Eclipse, IntelliJ IDEA ou NetBeans).
2. **Java JDK**: Verifique se o JDK está instalado e configurado. Você pode verificar executando `java -version` no terminal.
3. **Oracle Database**: Certifique-se de que o Oracle Database está instalado e em execução.
4. **JDBC Driver**: Verifique se o `ojdbc11` está no arquivo `pom.xml` para conexão com o Oracle Database.

### Configuração do Projeto Maven

- No arquivo `pom.xml`, você já incluiu as dependências essenciais, como `ojdbc11` para o banco de dados Oracle, Jersey para o servidor REST, e Gson para manipulação de JSON.
- Certifique-se de que o `maven-compiler-plugin` está configurado para Java 17 (ou a versão que você está usando) e o `maven-war-plugin` para empacotar a aplicação como um arquivo WAR.

### Configuração do banco de dados Oracle

- Execute os comandos SQL para criar as tabelas necessárias no Oracle Database.
- No código de configuração de banco de dados (credenciais package), adicione as credenciais do banco Oracle.

### Configuração do servidor Tomcat

1. Instale e configure o Tomcat, se ainda não o fez.
2. No Eclipse: `Servers > Tomcat v9.0 Server at localhost` e adicione o projeto.
3. Inicie o servidor Tomcat e verifique se a aplicação é carregada com sucesso, acessando no navegador.

## Integrantes

- **Kaian Gustavo de Oliveira Nascimento** RM 558986  
- **Giovanna Revito Roz** RM 558981  
- **Lucas Kenji Kikuchi** RM 554424
