import Button from "../../compoents/Button"
import Input from "../../compoents/Input"
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useState } from "react";

export const loginSchema = Yup.object().shape({
    password: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
});

const Login = () => {

    // hooks
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    });

    // states
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (getData) => {
        console.log(getData);
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md min-w-[375px] mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Login </h1>
                        </div>

                        <form onSubmit={handleSubmit(handleLogin)}>
                            <div className="divide-y divide-gray-200">
                                <div className="pt-8 text-base leading-6 space-y-3 text-gray-700 sm:text-lg sm:leading-7">

                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                label="Email"
                                                id="email"
                                                type="email"
                                                placeholder="soumik@gmail.com"
                                                value={field.value}
                                                onChange={field.onChange}
                                                error={errors.email?.message}
                                                labelRequired
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="password"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                label="Password"
                                                id="password"
                                                placeholder="****************"
                                                value={field.value}
                                                onChange={field.onChange}
                                                error={errors.password?.message}
                                                type={showPassword ? 'text' : 'password'}
                                                showPassword={showPassword}
                                                setShowPassword={setShowPassword}
                                                passwordToggle
                                                labelRequired
                                                autoComplete="new-password"
                                            />
                                        )}
                                    />
                                </div>

                                <div className="mt-6">
                                    <Button
                                        text='Login'
                                        css='w-full'
                                    />
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login