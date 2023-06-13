import { useRouter } from 'next/router';
import styles from '../../styles/about.module.css'


const About = () => {
    const router = useRouter();
    const { page, limit } = router.query;
    return (
        <div>
            <div className={styles.container}>
                TEST
            </div>
            This page have page : {page} limit: {limit}
        </div>
    )
}


export default About;