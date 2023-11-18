import ProductCard from '../partials/ProductCard'

const Products = ({ loading, products }) => {
    return (
        <div className="md:col-span-2 xll:col-span-3 order-2 md:order-1">
            {loading ? <div className="flex justify-center items-center"> Loading ....</div> :
                <div className="grid md:grid-cols-2 xll:grid-cols-3 gap-3">
                    {products.map((item, index) => <ProductCard
                        key={`product${index}`}
                        data={item}
                    />)}
                </div>}
        </div>
    )
}

export default Products