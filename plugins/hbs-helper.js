const hbs = require('express-handlebars')

const helpers = hbs.create({
  checkSelectValue: function (selectValue, optionValue) {
    if (selectValue === optionValue) return 'selected'
  }
})

module.exports = helpers
