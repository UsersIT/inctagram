import axios from 'axios'

import { CitiesApiResult } from '../schemas/citiesSchema'

const geoApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GEO_API_URL,
  headers: {
    'x-rapidapi-key': process.env.NEXT_PUBLIC_GEO_API_KEY,
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
