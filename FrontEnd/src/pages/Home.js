import { useEffect, useState } from 'react';
import Post from './Post';

function Home() {    
    const [postText, setPostText] = useState("");
    const [posts, setPosts] = useState([]);
    const imgStyle = {
        width: "40px",
        borderRadius: "20px"
    }

    const divStyle = {
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "15px",
        backgroundColor: "white"
    }

    const user = JSON.parse(localStorage.getItem("token")).user;
    let image = (user != null && user != undefined) ? user.image : "";

    const sendPost = async () => {
        let model =
        {
            _id: "",
            user_id: user._id,
            content: postText,
            date: new Date()
        }

        const api = "http://localhost:4000/api/post/add";

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(model)
        }

        const result = await fetch(api, requestOptions);
        await fetchData();
        setPostText("");
        let element = document.getElementById("postModalCloseBtn");
        element.click();   
    }

    const fetchData = async () => {
        const api = "http://localhost:4000/api/post/getAll";

        const result = await fetch(api);
        const jsonResult = await result.json();             
        setPosts(jsonResult);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>  
            <div className="form-group" style={divStyle}>
                <img src={image} style={imgStyle} />
                <button
                    className="btn btn-default mx-2"
                    style={{ width: "90%", border: "1px solid #ccc" }}
                    data-bs-toggle="modal"
                    data-bs-target="#postModal">
                    Gönderi başlat
                </button>
            </div>
            <hr />

            <Post posts={posts} myClick={fetchData}/>

            <div className="modal fade" id="postModal" tabIndex="-1" aria-labelledby="postModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="postModalLabel">Gönderi Oluştur</h1>
                            <button type="button" id="postModalCloseBtn" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <textarea
                                id="postText"
                                className="form-control"
                                rows="5"
                                value={postText}
                                onChange={(e) => setPostText(e.target.value)}>
                            </textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={sendPost} className="btn btn-primary">Paylaş</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Home;