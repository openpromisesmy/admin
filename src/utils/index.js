import moment from 'moment'

function formatDate (date) {
  return moment(date).format('D MMM YYYY')
}

function filterByStatus (array, status) {
  return array.filter(item => item.status === status)
}

function generateStats (promises) {
  if (!Array.isArray(promises)) {
    return []
  }
  const statusOptions = new Set(promises.map(promise => promise.status))
  const stats = []
  statusOptions.forEach(statusOption => {
    const hits = promises.filter(promise => promise.status === statusOption)
    stats.push({ value: statusOption || 'undefined', number: hits.length })
  })
  return stats
}

export {
  formatDate,
  filterByStatus,
  generateStats
}
