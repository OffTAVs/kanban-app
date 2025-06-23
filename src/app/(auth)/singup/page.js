'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'


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
                  <Button type="submit">Cadastrar</Button>
              </div>
             </form>
           </div>
  )
}
