import Members from "./partials/Members"
export default function Team() {
    return (
        <>
            <section class="team_section layout_padding">
                <div class="container-fluid">
                    <div class="heading_container heading_center">
                        <h2 class="">
                            Our <span> Team</span>
                        </h2>
                    </div>

                    <div class="team_container">
                        <div class="row">
                            <Members />
                            <Members />
                            <Members />
                            <Members />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}