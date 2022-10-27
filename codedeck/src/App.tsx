import React from 'react';
import Homescreen from './screens/Homescreen';
import GlobalStyles from './styles/global';
import ModalProvider from "./context/ModalContext"
import PlaygroundProvider from './context/PlaygroundContext';
import Playground from './screens/Playground';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Page404 from './screens/Page404';



function App() {
  return (
    <PlaygroundProvider>
      <ModalProvider>
      <GlobalStyles />
      {/* <Homescreen/> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homescreen/>}/>
          <Route path='/code/:folderId/:playgroundId' element={<Playground/>}/>
          <Route path='*' element={<Page404/>} />
          {/* <Route path='/:folderId/:playgroundId' element= */}
        </Routes>
      </BrowserRouter>
      {/* <Playground/> */}
      
      </ModalProvider>
    </PlaygroundProvider>
    
  );
}

export default App;
