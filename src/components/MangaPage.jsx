import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from './Loader';

function MangaPage(props) {
    const details=props.details;
    const [chapterArray,setChapterArray]=useState([]);
    const [detailNews,setDetailNews]=useState([]);
    
    function fetchChapter(){
        axios.get(`${import.meta.env.VITE_API_URL}/api/manga/`,{
            params:{
                manga_id : details.id
            }
        })
        .then((response)=>{
            setChapterArray(response.data.data);
        })
        .catch((err)=> console.log(err))
    }

    function fetchNews(){
        axios.get(`${import.meta.env.VITE_API_URL}/api/newsPage/`,{
            params:{
                news_id:details.details_api.id,
                news_title:details.details_api.title,
                news_date:details.details_api.date
            }
        })
        .then((response)=>{
            setDetailNews(response.data[0]);
        })
        .catch((err)=> console.log(err))
    }

    useEffect(()=>{
        if(props.news){
            fetchNews();
            
        }else{
            fetchChapter();
        }
    },[props.details]);

  return (
    <div className="container col-xxl-8 px-2 py-3 text-body-emphasis" data-bs-theme={props.mode} >
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
                <img src={details.thumb || details.article.thumbnail} className="d-block mx-lg-auto img-fluid" alt={details.title || details.article.title} loading="lazy" />
            </div>
            {props.news?
            <div className="col-lg-6">
                <h1 className="display-5 fw-bold lh-1 mb-3">{details.title}</h1>
                <h2 className="lh-1 mb-3">Introduction : </h2>
                <p className="fw-semibold fs-5">{detailNews.intro}</p>
                <h3 className="lh-1 mb-3">Body : </h3>
                <p className=" fs-5">{detailNews.body}</p>
                <div className="d-grid ">
                    <h5>Authors : {detailNews.author}</h5>
                    <h5>Date : {detailNews.date}</h5>
                </div>
            </div>
            :
            <div className="col-lg-6">
                <h1 className="display-5 fw-bold lh-1 mb-3">{details.title}</h1>
                <h2 className="lh-1 mb-3">Summary : </h2>
                <p className="fw-semibold fs-5">{details.summary}</p>
                <div className="d-grid ">
                    <h5>Authors : {details?.authors?.map((item)=> item+" ")}</h5>
                    <h5>Status : {details?.status}</h5>
                    <h5>Chapters : {details?.total_chapter}</h5>
                    <h5>Genres : {details?.genres?.map((item)=>item+",")}</h5>
                    <h5>Type : {details?.type}</h5>
                </div>
            </div>}
        </div>
        {!props.news && <div>
            <h3>Chapters : </h3>
            <div style={{
                border: props.mode==="dark" && "2px solid #8cffff",
                margin: "2%",
                padding: "5px",
                
            }}>
            <Paper elevation={5} 
        sx={{
            padding: "5px",
            backgroundColor: props.mode==="dark" && "black",
            maxHeight: "55vh",
            overflowY: "scroll"
        }} >
                {chapterArray.length==0?<Loader mode={props.mode} />:chapterArray?.map((item,idx)=><Link key={"chl"+idx} to={`/chapter?${chapterArray[idx].id}`} >
                    <Button variant="outlined" color={props.mode==="dark"?"success":"primary"} sx={{color: props.mode==="dark" && "#8cffff"}} >{idx+1}</Button>
                </Link>
                )}
            </Paper>
            </div>
        </div>}
    </div>
  );
}

export default MangaPage;
