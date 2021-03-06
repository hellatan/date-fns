// @flow
/* eslint-env mocha */
/* global suite, benchmark */

var addDays = require('./')
var moment = require('moment')

suite('addDays', function () {
  benchmark('date-fns', function () {
    return addDays(this.date, 7)
  })

  benchmark('Moment.js', function () {
    return this.moment.add(7, 'days')
  })
}, {
  setup: function () {
    this.date = new Date()
    this.moment = moment()
  }
})
