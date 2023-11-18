import { useAtom } from "jotai";
import { atomCartItems } from "../../../hooks/atomState";
import Swal from 'sweetalert2'

const CartCard = () => {

    // states
    const [cartItems, setCartItems] = useAtom(atomCartItems);

    // remove from cart
    const hanldeRemoveCartItem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                setCartItems(cartItems.filter((item) => item.id !== id));
                Swal.fire({
                    title: "Removed!",
                    text: "Your file has been removed.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden h-max-[400px]" >
            <div className="py-5 px-2.5">
                <p className="text-center text-[20px] font-medium border-b">Cart Items</p>

                <div className="my-4 space-y-3 border-b pb-4">
                    <p className="flex items-center gap-2">
                        <span className="text-red-500 text-[24px]">*</span>
                        Two Items can be sclectable
                    </p>
                    <p className="flex items-center gap-2">
                        <span className="text-red-500 text-[24px]">*</span>
                        After refresh items will be removed
                    </p>
                </div>

                <>
                    {cartItems.map((item, index) => <div key={`cart${index}`} className="flex mb-3 border-b pb-3">

                        <div className="w-20">
                            <img className="h-full rounded-sm" src="https://isowall.co.za/wp-content/uploads/2017/12/demo-image.jpg" alt="" />
                        </div>

                        <div className=" space-y-2.5 ml-4 flex-grow">
                            <p className="font-bold">{item.title}</p>
                            <p className="text-red-500 text-sm">{item.price} BDT</p>

                            <button
                                type="button"
                                className="font-semibold hover:text-red-500 trans text-gray-500 text-xs"
                                onClick={() => hanldeRemoveCartItem(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>)}
                </>

            </div>
        </div >
    )
}

export default CartCard