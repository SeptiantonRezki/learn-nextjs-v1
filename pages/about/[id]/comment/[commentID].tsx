import { useRouter } from "next/router"

const CommentID = () => {
    const router = useRouter();
    const { id, commentID } = router.query;
    return (
        <div>Comment Dynamic Routing {id} - {commentID} </div>
    )
}

export default CommentID