'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"


export async function criarOrganizacao(formData) {
    const supabase = createClient()
    const nome = formData.get('nome')
    

const{
    data: {session},

} = await supabase.auth.getSession()

if(!session?.user){
    return {error: 'Usuario não autentificado'}
}

const userId = session.user.id
// Inserir na tabela organizations com owner_id
const { data: novaOrg, error: orgError } = await supabase
.from('organizations')
.insert({ name: nome, owner_id: userId })
.select()
.single()

if (orgError) {
return { error: 'Erro ao criar organização: ' + orgError.message }
}

// Inserir o criador como admin em organization_members
const { error: memberError } = await supabase
.from('organization_members')
.insert({
  organization_id: novaOrg.id,
  user_id: userId,
  role: 'admin',
})

if (memberError) {
return { error: 'Erro ao adicionar membro: ' + memberError.message }
}

revalidatePath('/(dashboard)/organizations')
return { success: true }
}
