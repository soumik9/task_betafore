import Button from "../../../compoents/Button"


const ProductCard = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden" >
            <div className="px-6 pt-2 pb-4">
                <h3 className="text-[20px] font-semibold text-gray-800 mb-2 w-[90%] truncate">asdasd</h3>
                <p className="text-sm text-gray-600">By xx</p>
                <p className="text-sm text-gray-600 mt-1">Publication Date: asda</p>
                <p className="text-sm text-gray-600 mt-1">Genre: asdas</p>

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