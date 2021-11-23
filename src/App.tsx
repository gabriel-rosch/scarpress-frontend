import { GlobalStyle } from "./styles/global";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { useState } from 'react';
import Modal from 'react-modal'
import { NewTransactionModal } from "./components/NewTransactionModal";

Modal.setAppElement('#root')

export function App() {
  const [isNewTransitionModalOpen, setIsNewTransitionModalOpen] = useState(false);

  function handleOpenNewTransitionModal() {
    setIsNewTransitionModalOpen(true);
  }

  function handleCloseNewTransitionModal() {
    setIsNewTransitionModalOpen(false);
  }
  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransitionModal}/>
      <Dashboard />
      
      <NewTransactionModal isOpen={isNewTransitionModalOpen} onRequestClose={handleCloseNewTransitionModal}/>

      <GlobalStyle />
    </>
  );
}
