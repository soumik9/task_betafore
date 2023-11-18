import Button from "../../../compoents/Button"

const ProductCard = (data) => {

    // distructuring
    const { title, description, price } = data.data;

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden" >
            <div className="px-2 pt-2 pb-3">

                <div className="relative">
                    <img src='https://isowall.co.za/wp-content/uploads/2017/12/demo-image.jpg' className="h-[200px] w-full" />
                    <h2 className="text-[18px] font-semibold text-white my-2 absolute top-0 right-2 bg-slate-400 px-2 py-1 rounded-md">
                        {price} BDT
                    </h2>
                </div>

                <h3 className="text-[20px] font-semibold text-gray-800 my-2 w-[90%] truncate">{title}</h3>
                <p className="text-sm text-gray-600 text-justify">{description}</p>

                <div className="mt-6 flex gap-2 justify-end">
                    <Button
                        text='Add to Cart'
                        // disabled={!auth.isAuthenticated}
                        // onClick={(event) => handleCurrentPlan(event)}
                        type='button'
                        css='w-[160px]'
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCard