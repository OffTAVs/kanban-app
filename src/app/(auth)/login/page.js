'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const router = useRouter()
  const handleSignIn = async (e) => {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage('Erro: Emali ou senha erra' + error.message)
    } else {
      setMessage('Login realizado com sucesso!')
      //router.push(`/organizations/${orgId}/projects/${projectId}`)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form
        onSubmit={handleSignIn}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />

        <Input
          type="password"
          label="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />

        <div className="flex justify-center mt-4">
          <Button type="submit">Entrar</Button>
        
        </div>
        {message && (
  <p className="text-center text-sm text-red-600">{message}</p>
)}
      </form>
    </div>
  )
}
