import { useRouter } from "next/router"

const Add = () => {
    const router = useRouter();
    const publish = () => {
        console.log('Publish About')
        router.push('/contact');
    }
    return (
        <div>
            <h2>ADD NEW BLOG</h2>
            <button onClick={publish}>publish blog</button>
        </div>
    )
}

export default Add