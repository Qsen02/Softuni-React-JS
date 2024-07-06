import UserRow from "./user-row/UserRow";
import Errors from "./errors/Errors";
import { useState } from "react";
import { useEffect } from "react";
import Thead from "./thead/Thead";
import CreateForm from "./createForm/CreateForm";
import Pagination from "./pagination/Pagination"
import Search from "./search/Search"
import Details from "./details/Details";

export default function Table() {
    let baseUrl = "http://localhost:3030/jsonstore"
    let [users, setUsers] = useState([]);
    let [pending, setPending] = useState(true);
    let [createFormShow, setCreateFormShow] = useState(false);
    let [detailsShow, setDetailsShow] = useState(null);

    function onClickHandler() {
        setCreateFormShow(true);
    }
    function onCloseHandler() {
        setCreateFormShow(false);
    }

    function onDetailsShowHandler(id) {
        (async function onShow() {
            try {
                let response = await fetch(`${baseUrl}/users/${id}`);
                if (!response.ok) {
                    let err = await response.json();
                    throw new Error(err.message);
                }
                let data=await response.json();
                setDetailsShow(data);
            } catch (err) {
                alert(err.message);
                return;
            }
        })()
    }

    useEffect(() => {
        (async function getUsers() {
            try {
                let response = await fetch(`${baseUrl}/users`);
                if (!response.ok) {
                    let err = await response.json();
                    throw new Error(err.message);
                }
                let data = await response.json();
                setUsers(Object.values(data));
                setPending(false);
            } catch (err) {
                alert(err.message);
                return;
            } finally {
                setPending(false);
            }
        })();
    }, [])

    async function onCreateHandler(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        let firstName = formData.get("firstName");
        let lastName = formData.get("lastName");
        let email = formData.get("email");
        let phoneNumber = formData.get("phoneNumber");
        let imageUrl = formData.get("imageUrl");
        let country = formData.get("country");
        let city = formData.get("city");
        let streetNumber = formData.get("city");
        let street = formData.get("street");
        let address = {
            country,
            city,
            street,
            streetNumber
        }
        try {
            if (!firstName || !lastName || !email || !phoneNumber || !imageUrl || !country || !city || !street || !streetNumber) {
                throw new Error("All fields required!");
            }
            let response = await fetch(`${baseUrl}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, email, phoneNumber, imageUrl, address })
            })
            if (!response.ok) {
                let err = await response.json();
                throw new Error(err.message);
            }
            let data = await response.json();
            setUsers(oldUsers => [...oldUsers, data]);
            setCreateFormShow(false);
        } catch (err) {
            alert(err.message);
            return;
        }
    }

    return (
        <section className="card users-container">
            {createFormShow ? <CreateForm onCreate={onCreateHandler} onClose={onCloseHandler} /> : ""}
            {detailsShow ? <Details userData={detailsShow}/> : ""}
            <Search />
            <div className="table-wrapper">
                <table className="table">
                    <div className="loading-shade">
                        {pending
                            ? <div className="spinner"></div>
                            : ""
                        }
                        {/* <Errors />  */}
                    </div>
                    <thead>
                        <Thead />
                    </thead>
                    <tbody>
                        {users.map(user => <UserRow
                            key={user._id}
                            id={user._id}
                            onDetailsShow={onDetailsShowHandler}
                            firstname={user.firstName}
                            lastname={user.lastName}
                            email={user.email}
                            imageUrl={user.imageUrl}
                            phoneNumber={user.phoneNumber}
                            createdAt={user.createdAt}
                        />)}
                    </tbody>
                </table>
            </div>
            <button onClick={onClickHandler} className="btn-add btn">Add new user</button>
            <Pagination />
        </section>
    )
}