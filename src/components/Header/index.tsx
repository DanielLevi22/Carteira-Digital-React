import * as Dialog from '@radix-ui/react-dialog'
import Logo from '../../assets/logo.svg'
import { HeaderContainer, HeaderContent, NewTransactionButton } from './style'
import { NewTransactionModal } from '../NewTransactionModal'


export function Header() {
  return(
    <HeaderContainer>
      <HeaderContent>
        <img src={Logo} alt="Logo" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova Transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>

      </HeaderContent>
    </HeaderContainer>
  )
}