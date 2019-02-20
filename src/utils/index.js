import moment from 'moment'
import { isEmpty, capitalize } from 'lodash'
import sources from '@/constants/sources'

function formatDate (date) {
  return date ? moment(date).format('D MMM YYYY') : '-'
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
    if (!politician) {
      alert(
        `Politician with ID ${promise.politician_id} not found Promise ${
          promise.id
        }: ${
          promise.title
        }. Please screenshot this and report to the tech team.`
      )
    }

    return {
      ...promise,
      politician_name: politician.name
    }
  }

  return promises.map(promise => parseSinglePromise(promise, politicians))
}

function sortByName (a, b) {
  // to be supplied to Array.sort()
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}

async function updateCache (self, key, promise) {
  self.$store.commit(`cache${capitalize(key)}`, await promise)

  return self.$store.state[key]
}

async function loadCache (self, key, promise) {
  if (isEmpty(self.$store.state[key])) {
    return updateCache(self, key, promise)
  }

  return self.$store.state[key]
}

function extractHostname (url) {
  var hostname

  if (url.indexOf('//') > -1) {
    hostname = url.split('/')[2]
  } else {
    hostname = url.split('/')[0]
  }

  hostname = hostname.split(':')[0]
  hostname = hostname.split('?')[0]

  return hostname
}

function matchUrlToSourceName (url) {
  const hostname = extractHostname(url)
  const result = sources.find(x => x.hostname === hostname)
  return result && result.name
}

function copyById (id) {
  let text = document.getElementById(id)
  let range = document.createRange()
  range.selectNode(text)
  let selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
  try {
    document.execCommand('copy')
  } catch (err) {
    console.log('unable to copy')
  }
  selection.removeAllRanges()
}

export {
  formatDate,
  filterByStatus,
  generateStats,
  parsePromises,
  sortByName,
  updateCache,
  loadCache,
  extractHostname,
  matchUrlToSourceName,
  copyById
}
