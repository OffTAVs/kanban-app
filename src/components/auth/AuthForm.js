'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SignUpForm() {
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const handleSignUp = async (e) => {
    e.preventDefault()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Cadastro feito! Verifique seu e-mail para confirmar.')
    }
  }

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Senha"
        required
      />
      <button type="submit">Cadastrar</button>
      {message && <p>{message}</p>}
    </form>
  )
}
