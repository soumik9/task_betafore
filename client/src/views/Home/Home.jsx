import { useEffect, useState } from "react"
import CartCard from "./components/CartCard"
import { axiosGET } from "../../hooks/axiosMethods";
import { useAtom } from "jotai";
import { atomToken } from "../../hooks/atomState";
import Products from "./components/Products";


const Home = () => {

    // states
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [token] = useAtom(atomToken);

    // fetching data
    useEffect(() => {
        const fetchData = async () => {
            const dataGET = await axiosGET('product', setLoading, token);
            setProducts(dataGET);
        };
        fetchData();
    }, [token])

    return (
        <main className="bg-gray-200 py-32">
            <div className="container">

                <div className="grid md:grid-cols-3 xll:grid-cols-4 lg:gap-5 md:gap-2">
                    <Products
                        products={products}
                        loading={loading}
                    />

                    <div className="order-1 mb-4 md:mb-0 md:order-2">
                        <CartCard />
                    </div>
                </div>

            </div>
        </main>
    )
}

export default Home