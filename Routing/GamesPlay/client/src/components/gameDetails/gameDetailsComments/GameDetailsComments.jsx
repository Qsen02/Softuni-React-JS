export default function GameDetailsComments({
    content,
    author
}) {
    return (
        <li className="comment">
            <p>{author}: {content}</p>
        </li>
    )
}