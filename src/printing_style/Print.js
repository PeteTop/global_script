const printMessage = require('print-message')

class Print {
      static info (ary) {
        printMessage(ary, {color: 'green', borderColor: 'green'})
      }
      static error (ary) {
        printMessage(ary, {color: 'red',borderColor: 'red'})
      }
      static warn (ary) {
        printMessage(ary, {color: 'yellow', borderColor: 'yellow'})
      }
}
Object.freeze(Print)
module.exports = Print