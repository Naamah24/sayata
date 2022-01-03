import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { appTheme } from './pages/UI/themes';
import SubmissionsPageComp from './pages/SubmissionsPageComp'
import LayoutComp from './components/layout/LayoutComp';
import NewSubmissionPageComp from './pages/NewSubmissionPageComp';
import BindSubmissionPageComp from './pages/BindSubmissionPageComp';
import { PageContextProvider } from './contexts/appContext'

function App() {

  return (
    <PageContextProvider>
      <ThemeProvider theme={appTheme}>
        <div className="App"> 
          <main>
            <LayoutComp>
                <Routes>
                    <Route path="/" element={<SubmissionsPageComp />} />
                    <Route path="/newsubmission" element={<NewSubmissionPageComp />} />
                    <Route path="/bindsubmission/:Id" element={<BindSubmissionPageComp />} />
                </Routes>
            </LayoutComp>
          </main>
        </div>
      </ThemeProvider>
    </PageContextProvider>
  );
}

export default App;