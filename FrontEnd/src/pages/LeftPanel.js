export function LeftPanel(){
    const divStyle = {
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "15px",
        backgroundColor: "white"
    }

    const imgStyle = {
        width: "150px",
        borderRadius: "150px"
    }


    const user = JSON.parse(localStorage.getItem("token")).user;
    let image = (user != null && user != undefined) ? user.image : "";
    
    return (
        <div style={divStyle}>
            <div className="text-center">
            <img src={image} style={imgStyle} />
            <h5>Taner Saydam</h5>
            </div>
            <hr/>
            <p>Bağlantı Sayısı: 1000</p>
            <p>Profilini Görüntüleyenler: 500</p>
        </div>
    );
}