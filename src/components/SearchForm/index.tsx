import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./style";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransacionsContext } from "../../contexts/transactionsContext";
import { useContextSelector } from "use-context-selector";

const searchFormSchema = z.object({
  query: z.string()
})
 

type SearchFormsInput = z.infer<typeof searchFormSchema>

export function SearchForm() {

  const fetchTransactions  = useContextSelector(TransacionsContext, (context) => {
    return context.fetchTransactions
  })

  const {register, handleSubmit, formState: { isSubmitting} } = useForm<SearchFormsInput>({
    resolver: zodResolver(searchFormSchema)
  });


 async function handleSearchTransaction(data: SearchFormsInput) {
    await fetchTransactions(data.query)
  }

  return(
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
      <input type="text" 
      placeholder="Busque por transacoes"
      {...register('query')} 
      />

      <button type="submit"  disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}