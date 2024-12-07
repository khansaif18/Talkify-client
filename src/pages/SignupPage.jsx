import React, { useState } from 'react'
import useAuth from '../store/useAuthStore'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, Shield, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axiosInstance from '../lib/axios'

export default function SignupPage() {

    const [showPassword, setShowPassword] = useState(false)

    const [otp, setOtp] = useState('')

    const [formData, setFormData] = useState({ fullName: '', username: '', email: '', password: '', cnfPassword: '' })
    const { signup, isSigningUp, isSendingOtp, isOtpSent, sendOtp } = useAuth()

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
        if (!formData.username.trim()) return toast.error("Username is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters")
        if (!formData.cnfPassword) return toast.error("Confirm Password is required");
        if (formData.password !== formData.cnfPassword) return toast.error("Confirm password does not match.")
        return true
    }

    const handleSendOtp = (e) => {
        e.preventDefault()
        const success = validateForm()

        if (success === true) {
            sendOtp(formData)
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const success = validateForm()

        if (success === true) {
            try {
                const res = await axiosInstance.post('/auth/verify-otp', { email: formData.email, otp })
                if (res.data.success) {
                    signup(formData)
                }
            } catch (error) {
                toast.error(error?.response?.data?.message)
            }
        }
    }

    // TODO: implement a timer of 5 minute and a Resend Otp Button

    return (
        <div className='mt-16 md:mt-10 min-h-screen'>

            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md md:max-w-lg space-y-3">

                    {/* LOGO */}

                    <div className="text-center mb-4">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <MessageSquare className="size-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                            <p className="text-base-content/60">Get started with your free account</p>
                        </div>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-3 ">


                        <div className="form-control">
                            <label className="label" htmlFor='fullName'>
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    disabled={isOtpSent}
                                    id='fullName'
                                    type="text"
                                    autoComplete='off'
                                    className={`input input-bordered w-full pl-10 placeholder:opacity-30`}
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label" htmlFor='username'>
                                <span className="label-text font-medium">Username</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    disabled={isOtpSent}
                                    id='username'
                                    type="text"
                                    autoComplete='off'
                                    className={`input input-bordered w-full pl-10 placeholder:opacity-30`}
                                    placeholder="johndoe123"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label" htmlFor='email'>
                                <span className="label-text font-medium">Email Address</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    disabled={isOtpSent}
                                    id='email'
                                    type="email"
                                    autoComplete='off'
                                    className={`input input-bordered w-full pl-10 placeholder:opacity-30`}
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label" htmlFor='password'>
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    disabled={isOtpSent}
                                    id='password'
                                    type={showPassword ? "text" : "password"}
                                    className={`input input-bordered w-full pl-10 placeholder:opacity-30 z-10`}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center z-20"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5 text-base-content/40" />
                                    ) : (
                                        <Eye className="size-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label" htmlFor='cnfPassword'>
                                <span className="label-text font-medium">Confirm Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    disabled={isOtpSent}
                                    id='cnfPassword'
                                    type={"password"}
                                    className={`input input-bordered w-full pl-10 placeholder:opacity-30`}
                                    placeholder="••••••••"
                                    value={formData.cnfPassword}
                                    onChange={(e) => setFormData({ ...formData, cnfPassword: e.target.value })}
                                />
                            </div>
                        </div>

                        {
                            isOtpSent &&
                            <div className="form-control">
                                <label className="label" htmlFor='otp'>
                                    <span className="label-text font-medium">Enter 4 Digit OTP</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Shield className="size-5 text-base-content/40" />
                                    </div>
                                    <input
                                        id='otp'
                                        type={"text"}
                                        autoComplete='off'
                                        className={`input input-bordered w-full pl-10 placeholder:opacity-30`}
                                        placeholder={`OTP sent to ${formData.email}`}
                                        value={otp}
                                        onChange={e => setOtp(e.target.value)}
                                    />
                                </div>
                            </div>
                        }

                        {
                            !isOtpSent &&
                            <button className="btn btn-primary w-full" type='button' disabled={isSendingOtp} onClick={handleSendOtp}>
                                {isSendingOtp ?
                                    <>
                                        <Loader2 className="size-5 animate-spin" />
                                        Loading...
                                    </> : 'Get OTP On Email'
                                }

                            </button>
                        }

                        {
                            isOtpSent &&
                            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
                                {isSigningUp ? (
                                    <>
                                        <Loader2 className="size-5 animate-spin" />
                                        Loading...
                                    </>
                                ) : (
                                    "Register"
                                )}
                            </button>
                        }

                    </form>

                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-primary">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}
