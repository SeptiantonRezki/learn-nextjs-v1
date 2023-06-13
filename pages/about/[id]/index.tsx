import { useRouter } from "next/router"

const AboutID = () => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div>About Dynamic Routing {id} </div>
    )
}

export default AboutID