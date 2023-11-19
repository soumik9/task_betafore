import Button from "../../compoents/Button"
import Input from "../../compoents/Input"
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { axiosPOST } from "../../hooks/axiosMethods";
import { useAtom } from "jotai";
import { atomIsAuthenticate, atomToken, atomUser } from "../../hooks/atomState";
import { useNavigate } from "react-router-dom";
import { setOnLocalStorage } from "../../hooks/helpers";
import AuthCardFooter from "../../compoents/AuthCardFooter";
import AuthCardLayout from "../../compoents/AuthCardLayout";

const loginSchema = Yup.object().shape({
    password: Yup.string().required("password is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
});

const Login = () => {

    // global
    const navigate = useNavigate();

    // hooks
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    });

    // states
    const [token, setToken] = useAtom(atomToken);
    const [loading, setLoading] = useState(false);
    const [isAuthenticate, setIsAuthenticate] = useAtom(atomIsAuthenticate);
    const [user, setUser] = useAtom(atomUser);
    const [showPassword, setShowPassword] = useState(false);

    // if token redirect
    useEffect(() => {
        if (isAuthenticate && token && user) {
            navigate('/')
        }
    }, [navigate, isAuthenticate, token, user])

    // login action
    const handleLogin = async (getData) => {

        // getting data
        const getPOST = await axiosPOST('auth/signin', getData, setLoading);

        // if success
        if (getPOST.success) {
            setToken(getPOST.data.accessToken);
            setUser(getPOST.data.user);
            setIsAuthenticate(true);

            setOnLocalStorage('token', getPOST.data.accessToken);
        }
    }

    return (
        <AuthCardLayout>
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
                            isLoading={loading}
                            loadingText='Loging in'
                        />
                    </div>

                </div>
            </form>

            <AuthCardFooter
                text={`Don't have account?`}
                url='/signup'
                linkText='Create account'
            />
        </AuthCardLayout>

    )
}

export default Login