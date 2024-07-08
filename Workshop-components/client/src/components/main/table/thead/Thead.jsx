import TheadRow from "./thead-row/TheadRow"

export default function Thead({
    onSortUsers,
    onUnsortUsers
}) {
    let heads = ["First name", "Last name", "Email", "Phone", "Created"]
    return (
        <tr>
            <th>Image</th>
            {heads.map(el => <TheadRow key={el} name={el} sortUsers={onSortUsers} unsortUsers={onUnsortUsers}/>)}
            <th>Actions</th>
        </tr>
    )
}