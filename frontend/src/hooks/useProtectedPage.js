import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// protecting pages that u need to be logged on to see
export function useProtectedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {

      navigate("/login")
    }

  }, [navigate])

}