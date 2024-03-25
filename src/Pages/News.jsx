import React from "react";
import Header from "../components/Header"
import Front from "../components/Front";

function News(props){
    return (
        <>
            <Header mode={props.mode} setMode={props.setMode} changeMode={props.changeMode} link="news" />
            <Front mode={props.mode} news={true} />
        </>
    )
};

export default News;