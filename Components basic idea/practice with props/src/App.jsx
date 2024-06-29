import About from './components/About';
import Services from './components/Services';
import Team from './components/Team';
import WhySection from './components/Why';
import Info from './components/Info';
import Nav from './components/Nav';

function App() {
    return (
        <>
            <div className="hero_area">
                <div className="hero_bg_box">
                    <div className="bg_img_box">
                        <img src="images/hero-bg.png" alt="" />
                    </div>
                </div>
                <header className="header_section">
                    <div className="container-fluid">
                        <nav className="navbar navbar-expand-lg custom_nav-container ">
                            <a className="navbar-brand" href="index.html">
                                <span>
                                    Finexo
                                </span>
                            </a>

                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className=""> </span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <Nav />
                            </div>
                        </nav>
                    </div>
                </header>
            </div>
            <About />
            <Services />
            <Team />
            <WhySection />
            <Info />
            <section className="footer_section">
                <div className="container">
                    <p>
                        &copy; <span id="displayYear"></span> All Rights Reserved By
                        <a href="https://html.design/">Free Html Templates</a>
                    </p>
                </div>
            </section>
        </>
    );
}

export default App;
