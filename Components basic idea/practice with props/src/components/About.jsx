import AboutHeading from "./AboutHeading";
import AboutDescription from "./AboutDescription";

export default function About() {
    return (
        <>
            <section className="about_section layout_padding">
                <div className="container  ">
                    <AboutHeading />
                    <AboutDescription />
                </div>
            </section>
        </>
    );
}
