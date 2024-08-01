export default function GameDetailsComments({
    content,
    user
}) {
    return (
        <li className="comment">
            <p>{user.email}: {content}</p>
        </li>
    )
}