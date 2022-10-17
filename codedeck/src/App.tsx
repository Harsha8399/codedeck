import React from 'react';
import Homescreen from './screens/Homescreen';
import GlobalStyles from './styles/global';
import ModalProvider from "./context/ModalContext"
import PlaygroundProvider from './context/PlaygroundContext';

function App() {
  return (
    <PlaygroundProvider>
      <ModalProvider>
      <GlobalStyles />
      <Homescreen/>
      </ModalProvider>
    </PlaygroundProvider>
    
  );
}

export default App;
