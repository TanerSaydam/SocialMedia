import { useEffect, useState } from 'react';

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

    const getAllPost = async () => {
        const api = "http://localhost:4000/api/post/getAll";

        await fetch(api)
        .then(res => res.json())
        .then(data => {            
            setPosts(data);
        });
    }

    const sendPost = () => {
        let model = 
        {
            userId: user._id,
            content: postText,
            date: new Date()
        }

        const api = "http://localhost:4000/api/post";

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(model)
        }

        fetch(api,requestOptions)
        .then(response => response.json())
        .then(data => {
            setPosts(data);
        });
    }
  

    useEffect(() => {
        getAllPost();
    }, []);

    return (
        <>
            <div className="form-group" style={divStyle}>
                <img src={image} style={imgStyle} />
                <button 
                    className="btn btn-default mx-2" 
                    style={{width: "90%", border: "1px solid #ccc"}}
                    data-bs-toggle="modal"
                    data-bs-target="#postModal">
                    Gönderi başlat
                </button>
            </div>
            <hr />

            {posts.map((element, i) => {
                    <div key={i} className="form-group mt-4" style={divStyle}>
                        <img src={element.userImg} style={imgStyle} />
                        <label className="mx-2">element.userName</label>
                        <p dangerouslySetInnerHTML={{ __html: element.content }}>
                        </p>
                        <hr />
                        <button className="btn btn-default">
                            <i className="fa-regular fa-thumbs-up mx-2"></i>
                            Beğen
                        </button>
                        <button className="btn btn-default mx-2">
                            <i className="fa-regular fa-comment mx-2"></i>
                            Yorum Yap
                        </button>
                    </div>
            })}            

            <div className="modal fade" id="postModal" tabIndex="-1" aria-labelledby="postModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="postModalLabel">Gönderi Oluştur</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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