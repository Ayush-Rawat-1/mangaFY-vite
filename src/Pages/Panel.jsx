import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header"
import MangaPage from "../components/MangaPage";

function Panel(props){
    const { state } = useLocation();
    return (
        <>
            <Header mode={props.mode} setMode={props.setMode} changeMode={props.changeMode} />
            <MangaPage details={state.page} mode={props.mode} news={state.news} />
        </>
    )
};

export default Panel;