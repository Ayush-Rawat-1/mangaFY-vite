import React,{ useState } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header(props) {
    const [activeLink,setActiveLink]=useState(props.link || "home");
    const [searchManga,setSearchManga]=useState("");
    const navigate=useNavigate();
    function handleActive(item){
        setActiveLink(item);
    }
    function changeSearch(e){
        const val=e.target.value;
        setSearchManga(val);
    }
    function handleSubmit(e){
        e.preventDefault();
        
        if(searchManga != ""){
            navigate(`/search/${searchManga}`,{state:{name:searchManga}});
        }
    }
    return (
        <div className="container Header" data-bs-theme={props.mode} >
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start" >
            <Navbar  data-bs-theme={props.mode} className=" nav col-12 col-lg-auto me-lg-auto mb-3 justify-content-center mb-md-0">
            <Container>
                <Navbar.Brand href="/"><img className="logo-img" src="/mangafy3.png" alt='Manga-fy' /></Navbar.Brand>
                <Nav style={{fontSize:"1.4rem",fontWeight:"600"}}>
                <Nav.Link href="/home" active={activeLink==="home"} onClick={()=>handleActive("home")} >Home</Nav.Link>
                <Nav.Link href="/news" active={activeLink==="news"} onClick={()=>handleActive("news")} >News</Nav.Link>
                <Nav.Link href="/anime" disabled>Anime</Nav.Link>
                </Nav>
            </Container>
            </Navbar>
            <form className="col-5 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search"
            onSubmit={(e)=>handleSubmit(e)}
            >
            <input type="search" className="form-control" placeholder="Search..." aria-label="Search" value={searchManga} onChange={(e)=>changeSearch(e)} />
            </form>
            <Button varient="outlined" className="toggle-mode" onClick={()=>props.changeMode()} sx={{
                color: props.mode==="dark"?"white":"teal"
            }} >{ props.mode==="light"?<Brightness4Icon />:<Brightness7Icon /> }</Button>
        </div>
        </div>
    );
}

export default Header;