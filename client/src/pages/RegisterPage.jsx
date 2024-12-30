import React from 'react'
import { useForm } from "react-hook-form"
import { registerRequest } from '../api/auth';
import { useNavigate } from 'react-router';

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
            await registerRequest(values)
            navigate('/tasks');
        } catch (error) {
            console.log(error);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="px-6 py-8">
                        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
                            Crea tu cuenta
                        </h2>
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        {...register("email", { required: "El email es requerido" })}
                                        className="text-neutral-600 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                        placeholder="franco@gmail.com"
                                    />
                                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Contraseña
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        {...register("password", { required: "La contraseña es requerida" })}
                                        className="text-neutral-600 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                        placeholder="••••••••"
                                    />
                                    {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Registrarse
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-center text-sm text-gray-500">
                            ¿Ya tienes una cuenta?{' '}
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault(); 
                                    handleLoginRedirect(); 
                                }}
                                className="font-medium text-gray-600 hover:text-gray-500"
                            >
                                Inicia sesión
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;
