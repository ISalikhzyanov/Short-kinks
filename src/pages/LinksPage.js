import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import Loader from "../components/Loader";
import LinkList from "../components/LinkList";
import {getPageCount, getPagesArray} from "../pages";

const LinksPage = () => {
    const [totalPages, setTotalPages] = useState(0)
    const [value, setValue] = useState(JSON.parse(localStorage.getItem('value')))
    const [links, setLinks] = useState([]);
    const [linksLength, setLinksLength] = useState([]);
    const limit = 10;
    const [offset, setOffset] = useState(JSON.parse(localStorage.getItem('offset')))
    const {loading} = useHttp()
    const auth = useContext(AuthContext);
    let pagesArray = getPagesArray(totalPages)

    const handleChange = (e) => {
        setValue(e.target.value)
        e.target.selected = true
        localStorage.setItem("value", JSON.stringify(e.target.value))

    }
if(value===null){
    setValue('asc_short')

}
    if(offset===null){
        setOffset(1)
    }

    useEffect( ()=>{
         fetch(`http://79.143.31.216/statistics?order=asc_short`, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${auth.access_token}`
            }
        })
            .then (r=>r.json())
            .then(res=>{
                setLinksLength(res)
            })
    },[])


    const getLinks = useCallback(async ()=>{
         await fetch(`http://79.143.31.216/statistics?order=${value}&offset=${limit*(offset-1)}&limit=${limit}`, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${auth.access_token}`
            }
        }).then(r=> r.json())
             .then(res=>{setLinks(res)})

    },[value,offset])

    useEffect(() => {
        setTotalPages(getPageCount(linksLength.length, limit))
        console.log(totalPages)
    }, [linksLength])


    useEffect(() => {
        // getLinksLength()
        getLinks()
    }, [getLinks])
    if (loading) {
        return <Loader/>
    }

    return (

        <div className="links">
            <select style={{display: 'inline', marginTop: "10px", marginBottom: "10px", width: "90%", marginLeft: "5%"}}
                    className="select" aria-label="Default select example" onChange={handleChange}>
                <option selected disabled={true}>{value}</option>
                <option value="asc_short">По возрсастанию кортокой ссылки (asc_short)</option>
                <option value="asc_target">По возрастанию исходной ссылки (asc_target)</option>
                <option value="asc_counter">По возрастанию количества переходов (asc_counter)</option>
                <option value="desc_short">По убыванию кортокой ссылки (desc_short)</option>
                <option value="desc_target">По убыванию исходной ссылки (desc_target)</option>
                <option  value="desc_counter">По убыванию количества переходов (desc_counter)</option>

            </select>
            {!loading && <LinkList links={links}/>}
            <div className='page__wrapper'> {pagesArray.map(p =>
                <span
                    onClick={() => {setOffset(p); localStorage.setItem("offset", JSON.stringify(p))}}
                    className={offset===p ? 'page page__current': 'page'} key={p}
                >
                    {p}
                </span>
            )}</div>

        </div>
    );
};

export default LinksPage;