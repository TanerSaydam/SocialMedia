import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Register(){
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }   

    const handleSubmit = (event) => {
        event.preventDefault();

        var input = document.querySelector('input[type="file"]')        

        const formData = new FormData();
        formData.append("name", inputs["name"]);
        formData.append("email", inputs["email"]);
        formData.append("password", inputs["password"]);
        formData.append("image", input.files[0],input.files[0].name);

        fetch("http://localhost:4000/api/register",{
            method: "POST", 
            body: formData
        })
        .then(res=> res.json())
        .then(
            (res)=>{            
            localStorage.setItem("token", JSON.stringify(res));
            navigate("/");
        },
        (err)=>{
            console.log(err);
        });
    }

    const divStyle = {
        border: "1px solid #ccc",
        padding: "35px",
        borderRadius: "15px",
        backgroundColor: "white"
    }

    return (
        <div className="container d-flex justify-content-center" style={{ marginTop: "10%" }}>
            <div className="col-md-6" style={divStyle}>
                <div className="form-group">
                    <h1 className="alert alert-success text-center">Kayıt Ol</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Ad Soyad</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={inputs.name || ""}
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="image">Profil Resmi</label>
                        <input
                            id="image"
                            type="file"
                            name="image"
                            value={inputs.image || ""}
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="email">Mail Adresi</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={inputs.email || ""}
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="password">Şifre</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={inputs.password || ""}
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <button className="btn btn-outline-success w-100">
                            <i className="fa fa-unlock mx-1"></i>                            
                            Kayıt Ol
                        </button>
                        <Link to="/login" style={{float:"right"}} className="mt-1">Zaten üyemisiniz? Giriş Yap</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}