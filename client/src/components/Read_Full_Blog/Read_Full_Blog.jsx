import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Read_Full_Blog() {
  const [postInfo, setPostInfo] = useState();
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/user/post/${id}`).then((response) => {
      response.json().then((postsInfo) => {
        setPostInfo(postsInfo);
      });
    });
  }, []);
  return (
    <>
      <div>dadad</div>
    </>
  );
}
