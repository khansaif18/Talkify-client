import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Copy, Loader2, Mail, User, UserRoundCog } from 'lucide-react'
import useChat from '../store/useChatStore';
import { formatJoiningDate } from '../lib/utils';


export default function ContactProfile() {

    const defaultProfileImageUrl = 'https://img.freepik.com/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=740'

    const navigate = useNavigate()

    const { selectedUser, isDeletingContact, deleteContact } = useChat();
    const [showCopied, setShowCopied] = useState({ username: false, email: false })

    if (!selectedUser) return navigate('/')

    return (
        <div className=' py-12'>
            <div className='max-w-2xl mx-auto p-4 py-8'>
                <div className='bg-base-300 rounded-xl p-6 space-y-8 relative'>

                    <Link to='/' className='flex items-center gap-1 w-fit bg-base-100 px-3 py-2 rounded-md text-sm hover:bg-base-200'>
                        <ArrowLeft size={16} /> Home
                    </Link>


                    <div className='text-center'>
                        <h1 className='text-2xl font-semibold'>Profile</h1>
                        <p className='mt-2'>Contact Profile Information</p>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img
                                src={selectedUser.profilePic || defaultProfileImageUrl}
                                alt="Profile"
                                className='size-32 rounded-full object-cover border-3'
                            />
                        </div>
                    </div>

                    <div className='space-y-6'>

                        <div className="space-y-1.5">

                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Full Name
                            </div>
                            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{selectedUser?.fullName}</p>

                        </div>

                        <div className="space-y-1.5">

                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <UserRoundCog className="w-4 h-4" />
                                Username
                            </div>

                            <div className="relative px-4 py-2.5 bg-base-200 rounded-lg border  flex items-center justify-between">
                                {selectedUser?.username}

                                {showCopied.username && <p className='absolute text-sm rounded-md -top-8 right-0 bg-base-100 px-3 py-[2px]'>Copied</p>}

                                <span onClick={() => {
                                    navigator.clipboard.writeText(selectedUser.username)
                                    setShowCopied({ ...showCopied, username: true })
                                    setTimeout(() => { setShowCopied({ ...showCopied, username: false }) }, 1000)
                                }}>
                                    <Copy size={16} className='opacity-40 cursor-pointer hover:opacity-80 transition-opacity' />
                                </span>
                            </div>

                        </div>

                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2 ">
                                <Mail className="w-4 h-4" />
                                Email Address
                            </div>
                            <div className="relative px-4 py-2.5 bg-base-200 rounded-lg border flex items-center justify-between">
                                {selectedUser?.email}
                                <div className='flex items-center justify-center gap-3'>

                                    <span><Check size={16} className='bg-green-700 rounded-full p-[2px]' /></span>

                                    {showCopied.email === true ? <p className='absolute text-sm rounded-md -top-8 right-0 bg-base-100 px-3 py-[2px]'>Copied</p> : ''}

                                    <span onClick={() => {
                                        navigator.clipboard.writeText(selectedUser.email)
                                        setShowCopied({ ...showCopied, email: true })
                                        setTimeout(() => { setShowCopied({ ...showCopied, email: false }) }, 1000)
                                    }}>
                                        <Copy size={16} className='opacity-40 cursor-pointer hover:opacity-80 transition-opacity' />
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-6 bg-base-300 rounded-xl p-6">
                        <h2 className="text-lg font-medium mb-2">Account Information</h2>
                        <div className=" text-sm">

                            <div className="flex items-center justify-between py-2 ">
                                <span>Member Since</span>
                                <span>{formatJoiningDate(selectedUser.createdAt)}</span>
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <span>Account Status</span>
                                <span className="text-green-500">Active</span>
                            </div>

                        </div>
                    </div>

                    <div className="flex items-center justify-between px-6 ">
                        <h2>Delete Contact</h2>
                        <button className='bg-red-600 text-white p-1 w-[100px] flex justify-center tracking-wide rounded hover:bg-red-800 transition-all duration-300'
                            onClick={() => deleteContact(selectedUser._id)}>
                            {
                                isDeletingContact ?
                                    <span className='flex items-center gap-2'> Deleting <Loader2 className='size-4 animate-spin' /> </span> :
                                    'Delete'
                            }
                        </button>
                    </div>

                </div>
            </div >
        </div >
    )
}
