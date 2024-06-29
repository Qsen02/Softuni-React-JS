import Subscribe from "./Subscribe";
import Links from "./Links";
import InfoDetails from "./infoDetails";
import Socials from "./Socials";
import Adresses from "./Adresses";

export default function Info() {
    return (
        <>
            <section className="info_section layout_padding2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-3 info_col">
                            <Adresses />
                            <Socials />
                        </div>
                        <div className="col-md-6 col-lg-3 info_col">
                            <InfoDetails />
                        </div>
                        <div className="col-md-6 col-lg-2 mx-auto info_col">
                            <Links />
                        </div>
                        <div className="col-md-6 col-lg-3 info_col ">
                            <Subscribe />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}