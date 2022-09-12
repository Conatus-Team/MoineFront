import ImageGallery from 'react-image-gallery';
import axios from 'axios';
import {useEffect, useState} from 'react';
import MyGroup from '../../components/MyGroup';
import { useNavigate, useParams } from 'react-router-dom';
import MyButton from '../../components/MyButton';
import { BASE_URL } from "./../../App";


function Gallery(){
    const navigate = useNavigate();
    const [galleryData, setGalleryData] = useState([]);
    const {groupId} = useParams();

    useEffect(()=>{
    axios.get(`${BASE_URL.react}/assets/gallery_data.json`)
    .then(response => {
        setGalleryData(response.data);
    });
    }, []);

    const images = galleryData.map((it)=>{ return({
        original: `${BASE_URL.react}/assets${it.image}`,
        thumbnail: `${BASE_URL.react}/assets${it.image}`
    })
        
    }, []);
    console.log(images);


    return (
        <div>
            <MyGroup id={parseInt(groupId)}/>
            <div className='gallery_new'>
                <MyButton type= "positive" text="New" onClick={()=> navigate(`/group/gallery/new/${groupId}`)}/>
            </div>
             <ImageGallery items={images} />

        </div>
        
    )
}
export default Gallery;