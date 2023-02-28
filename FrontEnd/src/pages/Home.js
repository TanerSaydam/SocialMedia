function Home() {
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

    const post = {
        userImg: image,
        userName: "Taner Saydam",
        content: `I have just published an article on how to use HttpClient with practical examples in C#, as well as some networking basics!

            In the world of microservice architecture, remote communication between multiple services is essential.

            Understanding how things work under the hood is imperative, and that starts with the basics of networking.

            Cheers! 👋`
    }

    const posts = [];


    const postElements = () => {
        for (let i = 0; i < 10; i++) {
            posts.push(post);
        }
    }   

    return (
        <>
            <div className="form-group" style={divStyle}>
                <img src={image} style={imgStyle} />                
                <input placeholder="Ne düşünüyorsun?" className="home-input-control mx-2"/>
                <button className="btn btn-primary">Paylaş</button>
            </div>
            <hr />

            {postElements()}
            
            {posts.map((element, i) => {
                return (
                    <div key={i} className="form-group mt-4" style={divStyle}>
                        <img src={element.userImg} style={imgStyle} />
                        <label className="mx-2">element.userName</label>
                        <p dangerouslySetInnerHTML={{__html: element.content}}>
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
                );
            })}
        </>

    );
}

export default Home;