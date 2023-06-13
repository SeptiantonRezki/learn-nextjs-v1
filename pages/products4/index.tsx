
import useSWR from 'swr';

const fetcher = (...args: any[]) => fetch(args[0]).then((res: any) => res.json());
const Products = () => {
    const { data, error } = useSWR(
        "http:localhost:5000/products",
        fetcher
    );
    console.log(data)
    if (error) return "An error has occurred.";
    if (!data) return "Loading...";
    return (
        <div>
            {
                (data as []).map((item: any) => {
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
