import React,{ useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useMediaQuery } from 'react-responsive'
import Pagination from '@mui/material/Pagination';
import axios from "axios";
import Loader from './Loader';

function Front(props){
    const [page,setPage]=useState(1);
    const [latestManga,setLatestManga]=useState([]);
    const [loaded,setLoaded]=useState(false);
    function handleLatestManga(newMangaArray){
      setLatestManga(newMangaArray);
      setLoaded(true);
    }
    function fetchMangaArray(){
        handleLatestManga([]);
        setLoaded(false);
        axios.get(`/api/front/`,{
            params:{
            page:page
            }
        })
        .then((response)=>{
            handleLatestManga(response.data.data);
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    function fetchNewsArray(){
        setLoaded(false);
        axios.get(`/api/news/`)
        .then((response)=>{
            handleLatestManga(response.data);
        })
        .catch((err)=>{ 
            console.log(err);
        })
    }
    
    function fetchSearchArray(){
        setLoaded(false);
        axios.get(`/api/mangaSearch/`,{
            params:{
                manga_name:props.search
            }
        })
        .then((response)=>{
            console.log(response.data);
            handleLatestManga(response.data.data);
        })
        .catch((err)=>{ 
            console.log(err);
        })
    }
  
    useEffect(()=>{
        if(props.search){
            fetchSearchArray();
        }
        else if(props.news){
            fetchNewsArray();
            
        }else{
            fetchMangaArray();
        }
    },[page]);
  
    const handlePageChange = (event, value) => {
      setPage(value);
    };
    const isLaptop = useMediaQuery({ query: "(min-device-width: 1024px)" });
    const isLandscape = useMediaQuery({ query: "(orientation: landscape)" });
    return (
        
        <div className="container col-xxl-8 px-4 py-5">
        {loaded?
        <ImageList cols={isLaptop || isLandscape?3:2} gap={14} >
          {latestManga?.map((item) => {
            const thumbnail=item.thumb || item.article.thumbnail;
            const title=item.title || item.article.title;
            return <Link  key={thumbnail} to={`/Panel/${title}`} state={{page : item,news: props.news}} >
              <ImageListItem sx={{width:isLaptop?"20vw":"40vw" }}>
                <img
                  srcSet={`${thumbnail}`}
                  src={`${thumbnail}`}
                  alt={title}
                  loading="lazy"
                  className="manga-wall"
                />
                <ImageListItemBar
                  title={title}
                  position="below"
                  sx={{
                      color: props.mode==="dark"?"white":"black",
                      cursor: "pointer"
                  }}
                  
                />
              </ImageListItem>
            </Link>
          })}
        </ImageList>:<Loader mode={props.mode}/>}
        {!props.news && <div className="text-body-emphasis">
        <Pagination count={40} page={page} onChange={handlePageChange} variant="outlined" color="success" />
        </div>}
        </div>
    );
  }
  
  export default Front;
  