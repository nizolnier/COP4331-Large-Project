import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// protecting pages that u need to be logged on to see
export function useProtectedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = 'idk what we are using for token lol'

    if (!token) {
      navigate.push("/login")
    }

  }, [navigate]);
}