import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = () => {
  const [repositories, setRepositories] = useState()
  const [queryLoading, setLoading] = useState(false)
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    // Other options
  })

  /*
  const fetchRepositories = async () => {
    setLoading(true)

    // Replace the IP address part with your own IP address!
    const response = await fetch('http://192.168.0.11:5001/api/repositories')
    const json = await response.json()

    setLoading(false)
    setRepositories(json)
  }

  useEffect(() => {
    fetchRepositories()
  }, [])
  */

  useEffect(() => {
    setLoading(loading)
  }, [loading])

  useEffect(() => {
    if (data) {
      setRepositories(data.repositories)
    }
  }, [data])

  return {
    repositories,
    queryLoading,
    refetch,
  }
}

export default useRepositories
