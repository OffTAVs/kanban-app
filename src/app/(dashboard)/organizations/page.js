import { createClient } from "@/lib/supabase/server";
import { criarOrganizacao } from "./actions";


export async function OrganizationsPage() {
    const supabase = createClient()


    const {
        data: { session },
      } = await supabase.auth.getSession()


      if (!session?.user) {
        return <p className="p-4 text-red-600">Você precisa estar logado.</p>
      }


 // Busca organizações do usuário (join via relationship)
 const { data: organizacoes, error } = await supabase
 .from('organizations')
 .select('id, name, organization_members!inner(user_id)')
 .eq('organization_members.user_id', session.user.id)

return (
 <main className="p-6 max-w-xl mx-auto">
   <h1 className="text-2xl font-bold mb-4">Minhas Organizações</h1>

   {error && <p className="text-red-600">Erro: {error.message}</p>}

   {organizacoes?.length > 0 ? (
     <ul className="mb-4 space-y-2 list-disc pl-5">
       {organizacoes.map((org) => (
         <li key={org.id}>{org.name}</li>
       ))}
     </ul>
   ) : (
     <p className="text-gray-500 mb-4">Você ainda não pertence a nenhuma organização.</p>
   )}

   <form action={criarOrganizacao} className="space-y-2">
     <input
       type="text"
       name="nome"
       placeholder="Nome da nova organização"
       required
       className="w-full border p-2 rounded"
     />
     <button
       type="submit"
       className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
     >
       Criar Organização
     </button>
   </form>
 </main>
)
} 