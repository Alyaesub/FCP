import { useEffect, useState } from 'react'

function HelloTest() {
  const [message, setMessage] = useState('Chargement...')

  useEffect(() => {
    fetch('http://localhost:3000/api/test')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage('Erreur de connexion ❌'))
  }, [])

  return (
    <div>
      <h2>Test connexion back-end :</h2>
      <p>{message}</p>
    </div>
  )
}

export default HelloTest