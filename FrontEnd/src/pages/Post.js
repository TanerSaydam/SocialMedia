export default function ({ posts, myClick }) {
    const divStyle = {
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "15px",
        backgroundColor: "white"
    }

    const imgStyle = {
        width: "40px",
        borderRadius: "20px"
    }

    const user = JSON.parse(localStorage.getItem("token")).user;    

    const convertISOStringToMonthDay = date => {
        const tempDate = new Date(date).toString().split(' ');
        const formattedDate = `${+tempDate[2]} ${tempDate[1]} ${tempDate[3]} ${tempDate[4]}`;
        return formattedDate;
    };

    const likeOrUnlikePost = async (post_id) => {
        const api = "http://localhost:4000/api/post/like";
        
        let model = {
            _id: "",
            user_id: user._id,
            post_id: post_id
        };

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(model)
        }

        const result = await fetch(api, requestOptions);   
        myClick();
    }  

    const remove = async (post_id) => {
        const api = "http://localhost:4000/api/post/removeById";

        let model = {
            _id: post_id
        };

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(model)
        };

        const result = await fetch(api, requestOptions);
        myClick();
    }

    return posts.map((element, i) =>
        <div key={i} className="form-group mt-4" style={divStyle}>
            <img src={element.users[0].image} style={imgStyle} />
            <label className="mx-2">{element.users[0].name}</label>
            <span>{convertISOStringToMonthDay(element.date)}</span>
            <hr />
            <p dangerouslySetInnerHTML={{ __html: element.content }}>
            </p>
            <hr />
            {
               element.likes.length > 0 ?
               <button onClick={() => likeOrUnlikePost(element._id)} className="btn btn-default text-primary">
               <i className="fa-regular fa-thumbs-up mx-2"></i>
                Beğenme
           </button>
           : 
           <button onClick={() => likeOrUnlikePost(element._id)} className="btn btn-default">
                <i className="fa-regular fa-thumbs-up mx-2"></i>
                Beğen
            </button>
            }    
            {
                element.user_id === user._id ? 
                <button onClick={() => remove(element._id)} className="btn btn-outline-default text-danger mx-2">
                    <i className="fa fa-trash text-danger mx-2"></i>
                    Sil
                </button>
                : ""
            }        
            
        </div>
    );
}