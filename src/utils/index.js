import moment from 'moment'

function formatDate (date) {
  return moment(date).format('D MMM YYYY')
}

export {
  formatDate
}
