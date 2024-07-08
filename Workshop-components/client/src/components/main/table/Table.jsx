import UserRow from "./user-row/UserRow";
import { useState } from "react";
import { useEffect } from "react";
import Thead from "./thead/Thead";
import CreateForm from "./createForm/CreateForm";
import Pagination from "./pagination/Pagination"
import Search from "./search/Search"
import Details from "./details/Details";
import NotFound from "./notFound/NotFound";
import FailedToFetch from "./failedToFetch/FailedToFetch";
import NoContent from "./noContent/NoContent";
import DeleteForm from "./deleteForm/DeleteForm";
import EditForm from "./editForm/EditFrom";

export default function Table() {
    let baseUrl = "http://localhost:3030/jsonstore"
    let [users, setUsers] = useState([]);
    let [pending, setPending] = useState(true);
    let [createFormShow, setCreateFormShow] = useState(false);
    let [detailsShow, setDetailsShow] = useState(null);
    let [isFailedToFetch, setIsFailedToFetch] = useState(false);
    let [resultsNotFind, setResultsNotFind] = useState(false);
    let [isNoContent, setIsNoContent] = useState(false);
    let [isShowDeleteForm, setIsShowDeleteForm] = useState(null);
    let [isShowEditForm, setIsShowEditForm] = useState(null);
    let [page, setPage] = useState(1);
    let [maxPages, setMaxPages] = useState(1);

    let criteries = {
        "First name": "firstName",
        "Last name": "lastName",
        "Email": "email",
        "Phone": "phoneNumber",
        "Created": "createdAt"
    }

    function onClickHandler() {
        setCreateFormShow(true);
    }
    function onCloseHandler() {
        setCreateFormShow(false);
    }

    function closeDetailsHandler() {
        setDetailsShow(false);
    }

    function showDeleteFormHandler(id) {
        (async function getCurUser() {
            try {
                let response = await fetch(`${baseUrl}/users/${id}`);
                if (!response.ok) {
                    throw new Error(err);
                }
                let data = await response.json();
                setIsShowDeleteForm(data);
            } catch (err) {
                setIsFailedToFetch(true);
                return;
            }
        })()
    }

    function closeDeleteFormHandler() {
        setIsShowDeleteForm(null);
    }

    function showEditFormHandler(id) {
        (async function getCurUser() {
            try {
                let response = await fetch(`${baseUrl}/users/${id}`);
                if (!response.ok) {
                    throw new Error(err);
                }
                let data = await response.json();
                setIsShowEditForm(data);
            } catch (err) {
                setIsFailedToFetch(true);
                return;
            }
        })()
    }

    function closeEditFormHandler() {
        setIsShowEditForm(null);
    }

    async function onDeleteUser(id) {
        try {
            let response = await fetch(`${baseUrl}/users/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
            if (!response.ok) {
                throw new Error(err);
            }
            let data = await response.json();
            setUsers(oldUsers => oldUsers.filter(el => el._id != data._id));
            setIsShowDeleteForm(null);
        } catch (err) {
            setIsFailedToFetch(true);
            return;
        }
    }
    function onEditHandler(event) {
        event.preventDefault();
        (async function onEdit() {
            const id = event.target.id;
            console.log(id);
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
            let createdAt = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
            let updatedAt = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
            try {
                if (!firstName || !lastName || !email || !phoneNumber || !imageUrl || !country || !city || !street || !streetNumber) {
                    throw new Error("All fields required!");
                }
                let response = await fetch(`${baseUrl}/users/${id}`, {
                    method: "put",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ firstName, lastName, email, phoneNumber, imageUrl, createdAt, updatedAt, address, _id: id })
                })
                if (!response.ok) {
                    setIsFailedToFetch(true);
                    return;
                }
                let data = await response.json();
                setUsers(oldUsers => {
                    let user = oldUsers.find(el => el._id == data._id);
                    let index = oldUsers.indexOf(user);
                    oldUsers[index] = data;
                    return [...oldUsers];
                })
                setIsShowEditForm(null);
            } catch (err) {
                alert(err.message);
                return;
            }
        })()
    }

    function onDetailsShowHandler(id) {
        (async function onShow() {
            try {
                let response = await fetch(`${baseUrl}/users/${id}`);
                if (!response.ok) {
                    throw new Error(err);
                }
                let data = await response.json();
                setDetailsShow(data);
            } catch (err) {
                setIsFailedToFetch(true);
                return;
            }
        })()
    }
    async function getUsers(limit, page) {
        try {
            let response = await fetch(`${baseUrl}/users`);
            if (!response.ok) {
                throw new Error(err);
            }
            let data = await response.json();
            let dataArray = Object.values(data);
            if (dataArray.length == 0) {
                setIsNoContent(true);
            }
            let userCollcetions = [];
            while (dataArray.length != 0) {
                let users = []
                for (let i = 0; i < limit; i++) {
                    if (dataArray.length == 0) {
                        break;
                    } else {
                        let user = dataArray.shift();
                        users.push(user);
                    }
                }
                userCollcetions.push(users);
            }
            if (page - 1 > userCollcetions.length - 1) {
                return;
            }
            setUsers(userCollcetions[page - 1]);
            setMaxPages(userCollcetions.length);
            setPending(false);
        } catch (err) {
            setIsFailedToFetch(true);
            return;
        } finally {
            setPending(false);
        }
    }

    useEffect(() => {
        let limit = Number(document.querySelector(".limit").value);
        getUsers(limit, page)
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
        let createdAt = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
        let updatedAt = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
        try {
            if (!firstName || !lastName || !email || !phoneNumber || !imageUrl || !country || !city || !street || !streetNumber) {
                throw new Error("All fields required!");
            }
            let response = await fetch(`${baseUrl}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, email, phoneNumber, imageUrl, createdAt, updatedAt, address })
            })
            if (!response.ok) {
                setIsFailedToFetch(true);
                return;
            }
            let data = await response.json();
            setUsers(oldUsers => [...oldUsers, data]);
            setCreateFormShow(false);
        } catch (err) {
            alert(err.message);
            return;
        }
    }

    async function onSearchHandler(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        let criteria = formData.get("criteria");
        let value = formData.get("search");
        try {
            if (criteria == "Not selected") {
                throw new Error("Please select one criteria");
            }
            if (!value) {
                throw new Error("Enter search value!");
            }
            let response = await fetch(`${baseUrl}/users`);
            if (!response.ok) {
                setIsFailedToFetch(true);
                return;
            }
            let data = await response.json();
            setUsers(Object.values(data).filter(el => el[criteria].toLowerCase().includes(value.toLowerCase())));
            if (Object.values(data).filter(el => el[criteria].toLowerCase().includes(value.toLowerCase())).length == 0) {
                setResultsNotFind(true);
            } else {
                setResultsNotFind(false);
            }
        } catch (err) {
            alert(err.message);
            return;
        }
    }

    function onSortUsersHandler(target) {
        let head = target.textContent;
        let criteria = criteries[head];
        setUsers(oldUsers => {
            let sortedUsers = oldUsers.sort((a, b) => a[criteria].localeCompare(b[criteria]));
            return [...sortedUsers];
        });
    }

    function onUnsortUsersHandler(target) {
        let head = target.textContent;
        let criteria = criteries[head];
        setUsers(oldUsers => {
            let sortedUsers = oldUsers.sort((a, b) => b[criteria].localeCompare(a[criteria]));
            return [...sortedUsers];
        });
    }

    async function paginationHandler(event) {
        let limit = Number(event.target.value);
        await getUsers(limit, page);
    }
    function onNextPage() {
        setPage(oldValue => oldValue + 1);;
    }
    function onPreviousPage() {
        setPage(oldValue => oldValue - 1);
    }
    function onFirstPage() {
        setPage(1);
    }
    function onLastPage() {
        setPage(oldValue => oldValue = maxPages);
    }

    useEffect(() => {
        let limit = Number(document.querySelector(".limit").value);
        getUsers(limit, page);
    }, [page])

    return (
        <section className="card users-container">
            {createFormShow ? <CreateForm onCreate={onCreateHandler} onClose={onCloseHandler} /> : ""}
            {detailsShow ? <Details userData={detailsShow} onClose={closeDetailsHandler} /> : ""}
            {isShowDeleteForm ? <DeleteForm userId={isShowDeleteForm._id} onClose={closeDeleteFormHandler} onDelete={onDeleteUser} /> : ""}
            {isShowEditForm ? <EditForm userData={isShowEditForm} onClose={closeEditFormHandler} onEdit={onEditHandler} /> : ""}
            <Search onSearch={onSearchHandler} />
            <div className="table-wrapper">
                {pending || resultsNotFind || isFailedToFetch || isNoContent
                    ? <div className="loading-shade">
                        {pending
                            ? <div className="spinner"></div>
                            : ""
                        }
                        {resultsNotFind ? <NotFound /> : ""}
                        {isFailedToFetch ? <FailedToFetch /> : ""}
                        {isNoContent ? <NoContent /> : ""}
                    </div>
                    : ""
                }
                <table className="table">
                    <thead>
                        <Thead onSortUsers={onSortUsersHandler} onUnsortUsers={onUnsortUsersHandler} />
                    </thead>
                    <tbody>
                        {users.map(user => <UserRow
                            onShowDeleteForm={showDeleteFormHandler}
                            onShowEditForm={showEditFormHandler}
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
            <Pagination
                paginationHandler={paginationHandler}
                page={page}
                maxPages={maxPages}
                nextPage={onNextPage}
                previousPage={onPreviousPage}
                firstPage={onFirstPage}
                lastPage={onLastPage}
            />
        </section>
    )
}