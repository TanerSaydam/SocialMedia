import { Link, Outlet, useNavigate } from "react-router-dom";
import { LeftPanel } from "./LeftPanel";

function Layout() {

    const navigate = useNavigate();
    let name = "";

    if (!localStorage.getItem("token")) {
        navigate("/login");
    } else {
        name = JSON.parse(localStorage.getItem("token"))["email"];
    }

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark" style={{borderRadius: "15px"}}>
                <div className="container-fluid">
                    <a className="navbar-brand">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Ana Sayfa</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <button onClick={logout} className="btn btn-danger mx-1" >
                                <i className="fa fa-power-off"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            <div className="row mt-4" style={{marginLeft: "40px"}}>
                <div className="col-md-3" style={{marginRight: "40px"}}>
                    <LeftPanel />
                </div>
                <div className="col-md-8">
                    <Outlet />
                </div>

            </div>
        </>
    );
}

export default Layout;