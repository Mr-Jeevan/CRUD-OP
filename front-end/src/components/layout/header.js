import { useState } from "react";


function Header() {
    const [iconChange, seticonChange] = useState(false);
    const iconChangeForSlider = () => {
        if (iconChange) {
            seticonChange(false);
        } else {
            seticonChange(true);

        }
    }

    const sideBarHideShow = (event) => {
        const sidebarToggle = document.body.querySelector('#sidebarToggle');
        if (sidebarToggle) {
            // Uncomment Below to persist sidebar toggle between refreshes
            // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
            //     document.body.classList.toggle('sb-sidenav-toggled');
            // }
            // sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');

            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
            // });
        }
    }
    return (
        <>
            <nav className="navbar p-2 navbar-expand-lg navbar-dark bg-dark border-bottom">
                <div className="container-fluid">
                    {/* <button className="btn btn-primary" id="sidebarToggle">Toggle Menu</button> */}
                    <span className="text-light" style={{ cursor: 'pointer', fontSize: '25px' }} id="sidebarToggle" onClick={sideBarHideShow}>{iconChange ? <i onClick={iconChangeForSlider} className="fa-solid fa-circle-arrow-right"></i> : <i onClick={iconChangeForSlider} className="fa-solid fa-circle-arrow-left"></i>}</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                            <li className="nav-item active"><a className="nav-link" href="#!">Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="#!">Link</a></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#!">Action</a>
                                    <a className="dropdown-item" href="#!">Another action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#!">Something else here</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;