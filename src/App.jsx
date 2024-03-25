import React,{ useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.sass";
import Home from "./Pages/Home";
import Panel from "./Pages/Panel";
import Chapter from "./Pages/Chapter";
import News from "./Pages/News";
import Search from "./Pages/Search";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const [mode,setMode]=useState("dark");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  function handleBtnClick(){
      if(mode === "dark"){
        document.body.classList.remove("dark");
        setMode("light");
      }else{
        document.body.classList.add("dark");
        setMode("dark");
      }
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main><div className="fullPage" >
    <BrowserRouter>
            <Routes>
                <Route index element={<Home mode={mode} setMode={setMode} changeMode={handleBtnClick} />} />
                <Route path="/home" element={<Home mode={mode} setMode={setMode} changeMode={handleBtnClick} />} />
                <Route path="/panel/:id" element={<Panel mode={mode} setMode={setMode} changeMode={handleBtnClick} />} />
                <Route path="/chapter" element={<Chapter mode={mode} setMode={setMode} changeMode={handleBtnClick} />} />
                <Route path="/news" element={<News mode={mode} setMode={setMode} changeMode={handleBtnClick} />} />
                <Route path="/search/:name" element={<Search mode={mode} setMode={setMode} changeMode={handleBtnClick} />} />
                
            </Routes>
        </BrowserRouter>
    </div></main></ThemeProvider>
    
  );
}

export default App;
