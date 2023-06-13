import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

interface ProductModel {
    id: number;
    name: string;
    price: number;
}

interface ProductDetailProps {
    product: ProductModel;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {

    // solusi 2
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>
    }


    return (
        <div>
            {product.name} = {product.price}
        </div>
    );
};

export default ProductDetail

export const getStaticPaths = async () => { // nama harus seperti  ini
    // const response = await fetch(`http://localhost:5000/products`) // generate all data
    const response = await fetch(`http://localhost:5000/products?_limit=2`) // maka yang akan di generate 2 (hasil dari API adalah 2), walapun kita mempunyai 4 data
    const data = await response.json();
    // const paths = data.map((item: any) => {
    //     return {
    //         params: {
    //             productId: `${item.id}`
    //         }
    //     }
    // })
    const paths = data.map((item: any) => ({
        params: {
            productId: `${item.id}` // item.id saja tidak bisa harus => `${item.id}`
        }
    }))
    // return {
    //     paths : paths
    // }
    return {
        paths,
        fallback: 'blocking', // false, true dan blocking
        // 1. false  => setiap paramter yang tidak di build saat buildtime maka di tampilkan sebagai 404, meskipun kita mempunya datanya http://localhost:5000/products?_limit=2
        //           => langsung di arahkan ke 404


        // 2. blocking => next js saat build time akan membuild 2 data (karena limit), tetapi saat di akses pagenya dengan id : 3, maka akan otomatis menambahkan 3.html dan 3.json dan 4 seterusnya => next/server/pages/products/
        //          => dan jika datanya tidak ada dalam API,. maka tidak akan menampilkan 404, melainkan data - dan akan tetap generate 6.html dan 6.json => http://localhost:5000/products?_limit=2
        //          => hanya membutuhkan solusi 1
    
        // 3. true => jika data tidak ditemukan (3.html dan 3.json) next js akan menampilkan versi fallback pada saat initial Req => merupakan menampilkan error 
        // bisa kita handle dengan solusi 2 dan error yang di tampilkan akan di handle => dengan ditampilka sebuah loading , kemudian baru data di tampilkan
        // kalau data tidak di temukan, maka akan dihandle dengan solusi 1
        // cocok digunakan untuk page SSG, di mana datanya sangat banyak


        // NOTED LAGI => INI TIDAK TERHUBUNG KE API, JADI KETIKA ADA DATA DI UPDATE, ATAU DI TAMBAH,. MAKA TIDAK AKAN TERBACA UPDATE DATA TERBARUNYA
        // jadi jika ada perubahan solusinya
        // 1.  membuild ulang project kita => tidak efisien
        // 2. INCREMENTAL STATIC REGENERATION (ISR)
        // => PROSES YANG DIJALANKAN ISR
        // 1. api update data
        // 2. user reload page => disini belum bisa ada updean => karena next js membuild baru lagi
        // 3. user reload lagi => disini data yang di update baru terlihat updatenya (di tampilkan data terbaru)
    }

}
export const getStaticProps = async ({ params }: GetStaticPropsContext) => { // function ini akan berjalan di sisi server
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
        revalidate : 1, // cara menggunakna INCREMENTAL STATIC REGENERATION (ISR) => waktunya berupa detik revalidate dijalankan

    }

}
