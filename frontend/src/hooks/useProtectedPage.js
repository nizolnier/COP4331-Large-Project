import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// protecting pages that u need to be logged on to see
export function useProtectedPage() {
  const history = useHistory();

  useEffect(() => {
    const token = 'idk what we are using for token lol'

    if (!token) {
      history.push("/login")
    }

  }, [history]);
}