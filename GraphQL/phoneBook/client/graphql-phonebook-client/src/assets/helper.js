import { ALL_PERSONS } from "./queries"

export const updateCache = (cache, query, addedPerson) => {
    const uniqueByName = (a) => {
      let seen = new Set()
      return a.filter((item) => {
        let k = item.name
        return seen.has(k) ? false : seen.add(k)
      })
    }
    cache.updateQuery({ query : ALL_PERSONS }, ({ allPersons }) => {
      return {
        allPersons : uniqueByName(allPersons.concat(addedPerson))
      }
    })
  }