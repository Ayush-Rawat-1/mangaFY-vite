import React from "react";
import Header from "../components/Header"
import Loader from "../components/Loader"
function Error(props){
    return (
        <>
            <Header mode={props.mode} setMode={props.setMode} changeMode={props.changeMode} />
            <div className="container col-xxl-8 px-4 py-5">
            <h3 style={{fontWeight:"bold",fontSize:"3rem",textAlign:"center"}}>404 Page Not Found</h3>
                <Loader />
            </div>
        </>
    )
};

export default Error;