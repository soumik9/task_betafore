import CartCard from "./components/CartCard"
import ProductCard from "./partials/ProductCard"


const Home = () => {
    return (
        <main className="bg-gray-200 py-32">
            <div className="container">

                <div className="grid grid-cols-4 gap-5">

                    <div className="col-span-3">

                        <div className="grid grid-cols-3 gap-5">
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                        </div>

                    </div>

                    <div>
                        <CartCard />
                    </div>


                </div>

            </div>
        </main>
    )
}

export default Home