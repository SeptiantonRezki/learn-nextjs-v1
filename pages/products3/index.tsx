import { useEffect, useState } from "react"
const Products = ({ }) => { 
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            const response = await fetch('http:localhost:5000/products')
            const data = await response.json();
            setProducts(data);
        }
        getProducts();
    }, [])
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
