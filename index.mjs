import chalk from 'chalk'
import fs from 'fs'

// função que cria um novo objeto do tipo Erro, nativo do Javascript
// lança um novo objeto erro
function handleErro(erro) {
  throw new Error(chalk.red(erro.code, 'Não há arquivo no caminho'))
}

// função para ler o arquivo dentro do diretório 'files' utilizando o modulo fs do javascript
// promises é usado para tratar erros.
// o .then() ou então(), é uma callback que recebe o conteúdo do meu readFile.
// o .catch() ou apanhar(), é uma callback que recebe o erro(err) como parâmetro.
function getFile(filePath) {
  const encoding = 'utf-8'
  fs.promises
    .readFile(filePath, encoding)
    .then(data => {
      console.log(chalk.green(data))
    })
    .catch(err => {
      if (err) {
        handleErro(err)
      }
    })
}

// o async indica que o retorno da minha função é assíncrona
// o await vem em seguida, ele diz que espere o retorno dos meus dados, e então atribua o valor
// o try ou tente, diz para minha função fazer o que esta dentro do seu bloco.
// caso o bloco do try não rode, o catch pega o erro e retorna para o handleErro
async function takeFile(filePath) {
  const encoding = 'utf-8'
  try {
    const text = await fs.promises.readFile(filePath, encoding)
    console.log(chalk.green(text))
  } catch (err) {
    handleErro(err)
  } finally {
    console.log(chalk.yellowBright('operação concluída'))
  }
}

// o readfile recebe três parâmetros, sendo o caminho do arquivo, o encoding, e uma callback
// o parâmetro de erro da callback guarda o estado do mesmo para caso não seja possível executar a função
// o parâmetro de data guarda os dados do arquivo buscado pela função
function getFiles(filePath) {
  const encoding = 'utf-8'
  fs.readFile(filePath, encoding, (erro, data) => {
    if (erro) {
      handleErro(erro)
    }
    console.log(chalk.green(data))
  })
}

// getFiles('./files/texto1.md')
// getFile('./files/texto1.md')
takeFile('./files/texto1.md')
