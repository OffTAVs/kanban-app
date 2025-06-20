'use client'

import { useState } from 'react'


export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

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
      setMessage("Erro: " + error.message)
    } else {
      setMessage("Verifique seu e-mail para confirmar o cadastro.")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSignUp} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-4 text-center">Cadastro</h2>

        <input
          type="email"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Cadastrar
        </button>

        {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
      </form>
    </div>
  )
}
