import moment from 'moment'

function formatDate (date) {
  return moment(date).format('D MMM YYYY')
}

function filterByStatus (promises, status) {
  return promises.filter(promise => promise.status === status)
}

export {
  formatDate,
  filterByStatus
}
