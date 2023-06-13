
const Products = ({ ...props }) => { // dan function ini  akan berjalan di sisi client
    const { products } = props;
    return (
        <div>
            {
                (products as []).map((item: any) => {
                    return (
                        <ul key={item.id}>
                            <li>
                                {item.name} {item.price}
                            </li>
                        </ul>
                    )
                })
            }
        </div>
    )
}

export default Products


// nama function gak boleh aneh2 harus bernama : getStaticProps

export const getStaticProps = async () => { // function ini akan berjalan di sisi server
    const response = await fetch('http://localhost:5000/products')
    const data = await response.json();
    console.log(data) // membuktikan berjalan di sisi server 
    return {
        props: {
            products: data
        },
        revalidate: 1, // cara menggunakna INCREMENTAL STATIC REGENERATION (ISR) => waktunya berupa detik revalidate dijalankan
    }
}

// ini keunikan next js kita bisa mebuat berjalan di sis server dan client berjalan di file sama