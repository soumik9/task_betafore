
const AuthCardLayout = ({ title, children }) => {
    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md min-w-[375px] mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold text-center">{title}</h1>
                        </div>

                        {children}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthCardLayout