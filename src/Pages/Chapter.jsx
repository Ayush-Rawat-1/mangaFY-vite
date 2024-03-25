import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import ShowChapter from "../components/ShowChapter";


function Chapter(props){
    const { search } = useLocation();
    const chapterId=search.substring(1);

    return (
        <>
            <Header mode={props.mode} setMode={props.setMode} changeMode={props.changeMode} />
            <ShowChapter />
        </>
    )
};

export default Chapter;