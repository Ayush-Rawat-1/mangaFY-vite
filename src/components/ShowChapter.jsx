import React,{ useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Loader from "./Loader";

function ShowChapter(props){
    const [activeIndex,setActiveIndex]=useState(0);
    const [chapterImage,setChapterImage]=useState([]);
    const chapterId = useLocation().search.substring(1);
    const [loaded,setLoaded]=useState(false);
    function fetchChapter(){
        axios.get(`/api/chapter/`,{
            params:{
                chapter_id : chapterId
            }
        })
        .then((response)=>{
            setChapterImage(response.data.data);
        })
        .catch((err)=> console.log(err))
    }

    useEffect(()=>{
        fetchChapter();
    },[]);

    function nextSlide(){
        setActiveIndex((prevIndex)=> (prevIndex === chapterImage.length-1)?0:prevIndex+1);
        setLoaded(false);
    }
    function previousSlide(){
        setActiveIndex((prevIndex)=> (prevIndex === 0)?chapterImage.length-1:prevIndex-1);
        setLoaded(false);
    }
    
    return(
        <div className="container col-xxl-8 px-4 py-5 text-body-emphasis">
            {chapterImage?.length>0?<div className="carousel">
                <button onClick={previousSlide} className="carousel__btn carousel__btn--prev">
                    &lt;
                </button>
                <img
                    // style={loaded?{}:{display:"none"}}
                    src={chapterImage[activeIndex].link}
                    alt={`Slide ${activeIndex}`}
                    className="carousel__img"
                    onLoad={()=>setLoaded(true)}
                />
                {!loaded && <div style={{position:"absolute",height:"100%",width:"100%",backgroundColor:"rgba(0, 0, 0, 0.75)",display:"flex",justifyContent:"center",alignItems:"center",top:"0",left:"0"}}>
                    <CircularProgress color="success" />
                </div>}
                <button onClick={nextSlide} className="carousel__btn carousel__btn--next">
                    &gt;
                </button>
            </div>:<Loader mode={props.mode}/>}
        </div>
    );
}

export default ShowChapter;