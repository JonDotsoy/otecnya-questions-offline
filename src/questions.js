const n = n => parseFloat(String(n).replace(/[^0-9.]/ig, ''))
const tagVERDADEROFALSO = 'VERDADERO O FALSO'

const sortAsc = (a, b) => a > b
const sortAscNumber = (a, b) => a.toString().padStart(50, '0') > b.toString().padStart(50, '0')
const sortAscReverse = (a, b) => a.split('').reverse().join('') > b.split('').reverse().join('')
const sortAlwaysEnd = (opt) => (a, b) => a === opt ? 1 : 0

/**
 * @typedef {{title:string,options:string[],sort?:Function,stag?:string}} Question
 */

/**
 * @type {Question[]}
 */
const questions = [
]

module.exports = questions
