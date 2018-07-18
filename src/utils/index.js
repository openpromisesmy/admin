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

function parsePromises (promises, politicians) {
  function parseSinglePromise (promise, politicians) {
    const politician = politicians.find(
      politician => politician.id === promise.politician_id
    )
    if (!politician) alert(`Politician with ID ${promise.politician_id} not found Promise ${promise.id}: ${promise.title}. Please screenshot this and report to the tech team.`)

    return ({
      ...promise,
      politician_name: politician.name
    })
  }

  return promises.map(promise => parseSinglePromise(promise, politicians))
}

export {
  formatDate,
  filterByStatus,
  generateStats,
  parsePromises
}
