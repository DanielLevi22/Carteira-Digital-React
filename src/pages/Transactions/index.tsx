import { useContextSelector } from "use-context-selector";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { TransacionsContext } from "../../contexts/transactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formater";
import { PriceHighlight, TransactionsContainerTable, TransactionsTable } from "./styles";




export function Transactions() {
 const  transactions  = useContextSelector(TransacionsContext, (context) => {
  return context.transactions
 })


  return(
    <div>
      <Header />
      <Summary />
      <TransactionsContainerTable>
        <SearchForm />
        <TransactionsTable>
        <tbody>
            {
              transactions.map(transaction => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td >
                  <PriceHighlight variant={transaction.type}>
                    {transaction.type === 'outcome' && '- ' }
                    {priceFormatter.format(transaction.price)}
                  </PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
             </tr>
              ))
            }

        </tbody>
       </TransactionsTable>
      </TransactionsContainerTable>


    </div>
  )
}