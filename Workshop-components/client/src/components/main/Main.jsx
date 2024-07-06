import Search from "./search/Search"
import Table from "./table/Table"
import Pagination from "./pagination/Pagination"

export default function Main() {
    return (
        <main className="main">
            <section className="card users-container">
                <Search />
                <div className="table-wrapper">
                    <Table />
                </div>
                <button class="btn-add btn">Add new user</button>
                <Pagination />
            </section>
        </main >
    )
}