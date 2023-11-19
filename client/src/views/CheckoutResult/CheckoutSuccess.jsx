import { Link } from "react-router-dom"

const CheckoutSuccess = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-center items-center w-[350px] h-[150px]">
                <p className="text-[30px] font-medium">Checkout Success</p>

                <Link to='/' className='mt-2 hover:underline hover:text-primary-700 text-primary trans'>
                    Go back to Home
                </Link>
            </div>
        </div>
    )
}

export default CheckoutSuccess