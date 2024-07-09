import axios from 'axios'

import { CitiesApiResult } from '../schemas/citiesSchema'

// TODO: Перенести переменные в .env
const GEO_API_KEY = 'a8a8c84cc5c1481aaa2d5b9d19bc2165'
const GEO_API_URL = 'https://api.geoapify.com/v1/geocode/autocomplete'

const geoApi = axios.create({
  baseURL: GEO_API_URL,
})

export type City = {
  label: string
  value: string
}

export const getCities = async (query: string, locale: string) => {
  const { data } = await geoApi.request({
    params: {
      apiKey: GEO_API_KEY,
      format: 'json',
      lang: locale,
      text: query,
      type: 'city',
    },
  })

  const cities = data.results.reduce((acc: City[], item: CitiesApiResult) => {
    const cityName = item.hamlet ? item.hamlet : item.city

    if (cityName && !acc.find(city => city.label === cityName)) {
      acc.push({
        label: cityName,
        value: cityName,
      })
    }

    return acc
  }, []) as City[]

  return cities
}
