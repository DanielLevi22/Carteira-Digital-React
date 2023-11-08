import { createContext } from 'use-context-selector'
import { useEffect , useState, useCallback} from "react"
import { api } from '../lib/axios';

interface Transactions {
  id: number;
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
  createdAt: string;
}


interface createTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}


interface TransactionsContextType {
  transactions: Transactions[];
  fetchTransactions: (qyery?: string) =>  Promise<void>
  createTransactions: (data:createTransactionInput) => Promise<void>
}


export const TransacionsContext = createContext({} as TransactionsContextType)


export function TransactionProvider({children}: {children: React.ReactNode}) {
  const [transactions, setTransactions] = useState<Transactions []>([])
  

 const fetchTransactions = useCallback( async (query?: string) => {
  const response = await api.get(`/transactions`, {
    params: {
      _sort: 'createdAt',
      _order: 'desc',
      q: query
    }
  })
  
  setTransactions(response.data)
},[])


const createTransactions =  useCallback( async (data:createTransactionInput) => {
  const response = await api.post('/transactions',{
    description: data.description,
    price: data.price,
    category: data.category,
    type: data.type,
    createdAt: new Date()
  })
  setTransactions( state => [response.data,...state, ])
}, [])


  useEffect(()=> {
    fetchTransactions()
  }, [])
  return(
    <TransacionsContext.Provider value={{transactions,fetchTransactions, createTransactions}}>
        {children} 
    </TransacionsContext.Provider>
  )
}