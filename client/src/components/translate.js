/* eslint-disable no-use-before-define */
import emojilib from 'emojilib'

const allEmojis = emojilib.lib
let emojiRange = '\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]'

// TRANSLATE INPUT STRING
export function translate(message) {
  console.log('MESSAGE', message)
  let translatedArr = []
  const linesArr = message.split('\n')
  console.log('LINES ARR', linesArr)
  for (let line = 0; line < linesArr.length; line++) {
    let translatedLineArr = []

    // if word is a space move onto next word
    if (linesArr[line] === '') continue

    // split words string into array of each word
    let wordsArr = linesArr[line].split(' ')
    console.log('WRDS ARR', wordsArr)

    // iterate through each word and get translations
    for (let i = 0; i < wordsArr.length; i++) {
      console.log('TRANSLATE WORD ', wordsArr[i], '!')

      // if word is a space move onto next line or
      // if word is an emoji move onto next word
      if (wordsArr[i] === '' || linesArr[line].match(emojiRange)) {
        translatedLineArr.push(wordsArr[i])
        continue
      }

      // format word
      const { formattedWord, startSymbols, endSymbols } = formatWord(wordsArr[i])

      // get translation options
      let wordTranslations = getWordTranslations(formattedWord, startSymbols, endSymbols)

      // add to translated line array
      if (!wordTranslations.length) {
        translatedLineArr.push(wordsArr[i])
      } else translatedLineArr.push(wordTranslations)
    }

    translatedArr.push(translatedLineArr)
  }
  console.log('TRANSLATED ARR', translatedArr)
  return translatedArr
}

// FORMAT WORD FOR TRANSLATION
function formatWord(word) {
  let formattedWord = word.toLowerCase()
  // matches all non-letter non-number chars
  const regex = /[^a-zA-Z0-9 ]/g
  let startSymbols = ''
  let endSymbols = ''

  while (formattedWord[0].match(regex)) {
    startSymbols += formattedWord[0]
    formattedWord = formattedWord.slice(1)
  }

  while (formattedWord[formattedWord.length - 1].match(regex)) {
    endSymbols = formattedWord[formattedWord.length - 1] + endSymbols
    formattedWord = formattedWord.slice(0, formattedWord.length - 1)
  }

  return { formattedWord, startSymbols, endSymbols }
}

// GET ALL POSSIBLE EMOJI MATCHES FOR WORD
function getWordTranslations(word, startSymbols = '', endSymbols = '') {
  let possibleTranslations = []
  let singularWord = word[word.length - 1] === 's' ? word.slice(0, word.length - 1) : ''

  for (let emoji in allEmojis) {
    // if emoji in emoji lib exactly matched word, add to front of returned arr
    if (emoji === word || emoji === singularWord) {
      possibleTranslations.unshift(startSymbols + allEmojis[emoji].char + endSymbols)
    }

    // TODO: clean up so not hard coded
    // if emoji in emoji lib is partial word match
    if (word !== 'and' && word !== 'the' && word !== 'to' && word !== 'in') {
      if (emoji.split('_').indexOf(word) !== -1 || emoji.split('_').indexOf(singularWord) !== -1) {
        possibleTranslations.push(startSymbols + allEmojis[emoji].char + endSymbols)
      }

      // if word matches keyword of an emoji in emoji lib, add emoji to return arr
      if (allEmojis[emoji].keywords.includes(word) || allEmojis[emoji].keywords.includes(singularWord)) {
        possibleTranslations.push(startSymbols + allEmojis[emoji].char + endSymbols)
      }
    }
  }

  return possibleTranslations
}
