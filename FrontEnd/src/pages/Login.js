import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let api = "http://localhost:4000/api/login";
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs)
        };
        fetch(api, requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.message == undefined){
                    localStorage.setItem("token", JSON.stringify(data));
                    navigate("/");
                }else{
                    alert(data.message);
                }
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
                    <h1 className="alert alert-primary text-center">Giriş Formu</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
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
                        <button className="btn btn-outline-primary w-100">
                            <i className="fa fa-unlock mx-1"></i>                            
                            Giriş Yap
                        </button>
                        <Link to="/register" style={{float: "right"}} className="mt-1">Kayıt Ol</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;