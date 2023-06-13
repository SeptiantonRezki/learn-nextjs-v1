import { GetStaticPropsContext } from "next";

interface ProductModel {
    id: number;
    name: string;
    price: number;
}

interface ProductDetailProps {
    product: ProductModel;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {


    return (
        <div>
            {product.name} = {product.price}
        </div>
    );
};

export default ProductDetail

export const getServerSideProps = async ({ params }: GetStaticPropsContext) => { // function ini akan berjalan di sisi server
    const response = await fetch(`http://localhost:5000/products/${params?.productId}`)
    const data = await response.json();
    // ini sudah tidak bisa di pakai lagi,. kalau dipakai akan mendapatkan error 
    // error berupa kita memerlukan getStaticPath
    // solusi 1
    if (!data.id) { // blocking => untuk mengatasi generate file id yang tidak ditemukan (6.html dan 6.json) dengan return 404  
        return {
            notFound: true
        }
    }
    return {
        props: {
            product: data
        },
    }

}
