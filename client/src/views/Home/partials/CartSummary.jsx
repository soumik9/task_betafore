import Button from '../../../compoents/Button'
import { loadStripe } from '@stripe/stripe-js';
import { axiosPOST } from '../../../hooks/axiosMethods';
import { atomCartItems, atomToken, atomUser } from '../../../hooks/atomState';
import { useAtom } from 'jotai';
import { useState } from 'react';
import toast from 'react-hot-toast';

const CartSummary = () => {

    // sattes
    const [user] = useAtom(atomUser);
    const [token] = useAtom(atomToken);
    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useAtom(atomCartItems);

    // Using reduce to get the total
    const total = cartItems.reduce((prev, currentValue) => {
        return prev + currentValue.price;
    }, 0);

    // handle checkout
    const handleCheckout = async () => {
        const stripe = await loadStripe(String(import.meta.env.VITE_STRIPE_PUBLISH_KEY));

        const body = {
            products: cartItems,
            user: user._id,
            total,
        }

        // getting data
        const getPOST = await axiosPOST('checkout/session', body, setLoading, token);

        const sessionID = getPOST.data.id
        const result = stripe.redirectToCheckout({
            sessionId: sessionID
        })

        if (sessionID) {
            setCartItems([])
        }

        if (result.error) {
            toast.error('Error on session!')
        }
    }

    return (
        <div>
            <p className="text-[20px] text-center font-medium">Total: <span className="text-primary">{total}</span>  BDT</p>

            <Button
                text='Checkout'
                css='w-full mt-2'
                disabled={!cartItems.length}
                onClick={handleCheckout}
                isLoading={loading}
                loadingText={'Checking Out'}
            />
        </div>
    )
}

export default CartSummary