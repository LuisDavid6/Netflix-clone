import useSwr from 'swr'

import fetcher from '@/libs/fetcher'

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSwr('/api/currentUser', fetcher)
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useCurrentUser
