import { useAtom } from "jotai";
import Button from "../../../compoents/Button";
import { atomCartItems, atomIsAuthenticate } from "../../../hooks/atomState";
import Swal from 'sweetalert2';

const ProductCard = (data) => {
    // destructuring
    const { id, title, description, price } = data.data;

    // states
    const [isAuthenticate] = useAtom(atomIsAuthenticate);
    const [cartItems, setCartItems] = useAtom(atomCartItems);

    // add item to cart
    const handleAddCartItem = (data) => {
        // if there are two items in cart
        if (cartItems.length === 2) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You have already added two items!",
            });
            return;
        }

        // if the item is already added
        if (cartItems.find((item) => item.id === data.id)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You have already added this item!",
            });
            return;
        }

        // setting items
        setCartItems([...cartItems, data]);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
            <div className="px-2 pt-2 pb-3 flex-grow">
                <div className="relative">
                    <img src='https://isowall.co.za/wp-content/uploads/2017/12/demo-image.jpg' className="h-[200px] w-full" alt={title} />
                    <h2 className="text-[18px] font-semibold text-white my-2 absolute top-0 right-2 bg-slate-400 px-2 py-1 rounded-md">
                        {price} BDT
                    </h2>
                </div>

                <h3 className="text-[20px] font-semibold text-gray-800 my-2 w-[90%] truncate">{title}</h3>
                <p className="text-sm text-gray-600 text-justify">{description}</p>
            </div>

            <div className="mt-auto mb-2 px-2">
                <div className="flex gap-2 justify-end ">
                    <Button
                        text='Add to Cart'
                        disabled={!isAuthenticate || cartItems.find((item) => item.id === id)}
                        onClick={() => handleAddCartItem(data.data)}
                        type='button'
                        css='w-[160px]'
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
