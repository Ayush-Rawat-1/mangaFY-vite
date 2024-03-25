import React from "react";
import Header from "../components/Header"
import Front from "../components/Front"
import Loader from "../components/Loader"
function Home(props){
    return (
        <>
            <Header mode={props.mode} setMode={props.setMode} changeMode={props.changeMode} />
            {/* <NewsPage mode={props.mode} news={false} /> */}
            <Front mode={props.mode} news={false} />
        </>
    )
};

export default Home;