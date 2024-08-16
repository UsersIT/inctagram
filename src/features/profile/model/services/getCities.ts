import axios from 'axios'

import { CitiesApiResult } from '../schemas/citiesSchema'

// TODO: Перенести переменные в .env
const GEO_API_KEY = '06c5f74c46mshd3999937b3a538bp11408bjsn90ad9d845241'
const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities'

const geoApi = axios.create({
  baseURL: GEO_API_URL,
  headers: {
    'x-rapidapi-key': GEO_API_KEY,
  },
})

export type City = {
  label: string
  value: string
}

export const getCities = async (query: string, locale: string) => {
  const { data } = await geoApi.request({
    params: {
      languageCode: locale,
      namePrefix: query,
      types: 'CITY',
    },
  })

  const cities = data.data.reduce((acc: City[], item: CitiesApiResult) => {
    if (item.city && !acc.find(city => city.label === item.city)) {
      acc.push({
        label: item.city,
        value: item.city,
      })
    }

    return acc
  }, []) as City[]

  return cities
}
