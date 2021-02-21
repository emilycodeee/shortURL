function randomSelector(Array) {
  const index = Math.floor(Math.random() * Array.length)
  return Array[index]
}

function shortenGenerator() {

  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const number = '0123456789'

  const selection = lowerCaseLetters + upperCaseLetters + number

  let shortenurl = ''
  for (let i = 1; i <= 5; i++) {
    shortenurl += randomSelector(selection)
  }

  return shortenurl

}

module.exports = shortenGenerator