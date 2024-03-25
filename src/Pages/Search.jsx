import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header"
import Front from "../components/Front";

function Panel(props){
    const { state } = useLocation();
    return (
        <>
            <Header mode={props.mode} setMode={props.setMode} changeMode={props.changeMode} />
            <Front search={state.name} mode={props.mode} news={false} />
        </>
    )
};

export default Panel;