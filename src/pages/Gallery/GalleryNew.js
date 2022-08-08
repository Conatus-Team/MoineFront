import MyGroup from "../../components/MyGroup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import MyButton from "../../components/MyButton";
import { BASE_URL } from "../../constants/baseUrl";

const GalleryNew = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState();
  const [fileUrl, setFileUrl] = useState();

  const onLoadFile = (e) => {
    const file_data = e.target.files;
    setFileUrl(file_data);
    const file = { image: file_data };
    setFiles(file);
  };
  const sendData = (e) => {
    let url = `${BASE_URL.react}/group/gallery/new`;
    axios
      .post(url, JSON.stringify(files), {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        console.log(res);
      });
    navigate(`/group/gallery/${groupId}`, { replace: true });
  };

  const preview = () => {
    console.log(files, fileUrl);
    if (!files) return false;
    const imgEL = document.querySelector(".gallery_preview");
    const reader = new FileReader();

    reader.onload = () =>
      // (imgEL.style.backgroundImage = `http://localhost:3000/group/gallery/new/${fileUrl[0].name}`);
      (imgEL.style.backgroundImage = `url(${reader.result})`);
    reader.readAsDataURL(fileUrl[0]);
    // console.log(`url(${reader.result})`);
  };

  useEffect(() => {
    preview();
    return () => preview();
  });

  return (
    <div>
      <MyGroup id={parseInt(groupId)} />
      <div className="gallery_preview"></div>
      <form className="gallery_input">
        <input type="file" accept="image/*" name="file" onChange={onLoadFile} />
        <MyButton type="positive" text="submit" onClick={() => sendData()} />
      </form>
    </div>
  );
};
export default GalleryNew;
