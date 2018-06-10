import moment from 'moment'

function formatDate (date) {
  return moment(date).format('D MMM YYYY')
}

function filterByStatus (array, status) {
  return array.filter(item => item.status === status)
}

export {
  formatDate,
  filterByStatus
}
