import React, { useEffect, useState } from 'react'
import useAuth from '../store/useAuthStore'
import { Camera, Check, Copy, Loader2, Mail, SaveAll, SquarePen, User, UserRoundCog } from 'lucide-react'
import { formatJoiningDate } from '../lib/utils'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function ProfilePage() {

    const { authUser, updateProfile, isUpdatingProfile, isCheckingUsername, isUsernameAvailable, usernameRes, validateUsername } = useAuth()

    const [isEditingProfile, setIsEditingProfile] = useState(false)
    const [showCopied, setShowCopied] = useState({ username: false, email: false })

    const [selectedImage, setSelectedImage] = useState(null)
    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')

    useEffect(() => {
        setFullName(authUser.fullName)
        setUsername(authUser?.username)
        validateUsername(authUser?.username)
    }, [authUser, isEditingProfile])


    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = async () => {
            const base64Image = reader.result
            setSelectedImage(base64Image)
        }
    }

    const handleUpdateProfile = async () => {
        if (!fullName || !username) toast.error('Fields can not be blank')
        if (isUsernameAvailable === false) toast.error('Select an available Username')
        if (fullName.trim() === authUser.fullName.trim() && username.trim() === authUser.username.trim() && !selectedImage) {
            return setIsEditingProfile(false)
        }
        // await validateUsername(username)
        await updateProfile({ username, fullName, profilePic: selectedImage })
        setIsEditingProfile(false)
    }


    const defaultProfileImageUrl = 'https://img.freepik.com/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=740'

    return (
        <div className=' py-12'>
            <div className='max-w-2xl mx-auto p-4 py-8'>
                <div className='bg-base-300 rounded-xl p-6 space-y-8 relative'>

                    <div className='w-full absolute right-0 top-2 flex flex-row-reverse items-center justify-between px-5'>

                        {
                            !isEditingProfile ?

                                <button className='bg-base-100 px-5 py-2 rounded-md text-sm hover:bg-green-800 hover:text-white' onClick={() => setIsEditingProfile(true)}>Edit</button> :

                                <div className='flex gap-2'>

                                    <button className='bg-base-100 px-5 py-2 rounded-md text-sm w-[90px] hover:bg-base-200' onClick={() => setIsEditingProfile(false)}>Cancel</button>

                                    <button className='bg-base-100 hover:bg-green-800 px-5 py-2 rounded-md text-sm flex items-center justify-center w-[90px] disabled:opacity-60 disabled:pointer-events-none' disabled={isUpdatingProfile}>
                                        {
                                            isUpdatingProfile?
                                                <>
                                                Saving<Loader2 size = { 16 } className = 'animate-spin ml-1' />
                                            </> : 'Save'
                                        }
                    </button>

                </div>
                        }

                <Link to='/' className='bg-base-100 px-5 py-2 rounded-md text-sm hover:bg-base-200'>
                    Home
                </Link>

            </div>


            <div className='text-center'>
                <h1 className='text-2xl font-semibold'>Profile</h1>
                <p className='mt-2'>Your Profile Information</p>
            </div>

            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <img
                        src={selectedImage || authUser?.profilePic || defaultProfileImageUrl}
                        alt="Profile"
                        className='size-32 rounded-full object-cover border-3'
                    />
                    {
                        isEditingProfile &&
                        <label htmlFor="avatar-upload" className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? " animate-pulse pointer-events-none " : ""}`}>
                            <Camera className='w-5 h-5 text-base-200' />
                            <input
                                type="file"
                                id="avatar-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                                disabled={isUpdatingProfile}
                            />
                        </label>
                    }
                </div>
            </div>

            <div className='space-y-6'>

                <div className="space-y-1.5">
                    {
                        !isEditingProfile ?
                            <>
                                <div className="text-sm text-zinc-400 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Full Name
                                </div>
                                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
                            </> :
                            <>
                                <div className="text-sm text-zinc-400 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Full Name
                                </div>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    className='px-4 py-2.5 bg-base-200 rounded-lg border outline-none w-full'
                                />
                            </>
                    }
                </div>

                <div className="space-y-1.5">
                    {
                        !isEditingProfile ?
                            <>
                                <div className="text-sm text-zinc-400 flex items-center gap-2">
                                    <UserRoundCog className="w-4 h-4" />
                                    Username
                                </div>


                                <p className="relative px-4 py-2.5 bg-base-200 rounded-lg border  flex items-center justify-between">
                                    {authUser?.username}

                                    {showCopied.username && <p className='absolute text-sm rounded-md -top-8 right-0 bg-base-100 px-3 py-[2px]'>Copied</p>}

                                    <span onClick={() => {
                                        navigator.clipboard.writeText(authUser.username)
                                        setShowCopied({ ...showCopied, username: true })
                                        setTimeout(() => { setShowCopied({ ...showCopied, username: false }) }, 1000)
                                    }}>
                                        <Copy size={16} className='opacity-40 cursor-pointer hover:opacity-80 transition-opacity' />
                                    </span>
                                </p>
                            </> :
                            <>
                                <div className="text-sm text-zinc-400 flex items-center gap-2">
                                    <UserRoundCog className="w-4 h-4" />
                                    Username
                                </div>
                                <div className='relative'>
                                    <input
                                        type="text"
                                        value={username}
                                        className='px-4 py-2.5 bg-base-200 rounded-lg border outline-none w-full'
                                        onChange={e => {
                                            setUsername(e.target.value)
                                            validateUsername(e.target.value)
                                        }}
                                    />
                                    {isCheckingUsername && <span className='absolute right-2 top-[50%] -translate-y-[50%]'><Loader2 size={16} className='animate-spin' /></span>}
                                </div>
                                {
                                    usernameRes ?
                                        <p className={`text-sm ml-1 ${usernameRes === 'username is available' ? 'text-green-600' : 'text-red-600'}`}>
                                            {usernameRes}
                                        </p> : ''
                                }
                            </>
                    }
                </div>

                <div className="space-y-1.5">
                    <div className="text-sm text-zinc-400 flex items-center gap-2 ">
                        <Mail className="w-4 h-4" />
                        Email Address
                    </div>
                    <p className="relative px-4 py-2.5 bg-base-200 rounded-lg border flex items-center justify-between">
                        {authUser?.email}
                        <div className='flex items-center justify-center gap-3'>

                            <span><Check size={16} className='bg-green-700 rounded-full p-[2px]' /></span>

                            {showCopied.email === true ? <p className='absolute text-sm rounded-md -top-8 right-0 bg-base-100 px-3 py-[2px]'>Copied</p> : ''}

                            <span onClick={() => {
                                navigator.clipboard.writeText(authUser.email)
                                setShowCopied({ ...showCopied, email: true })
                                setTimeout(() => { setShowCopied({ ...showCopied, email: false }) }, 1000)
                            }}>
                                <Copy size={16} className='opacity-40 cursor-pointer hover:opacity-80 transition-opacity' />
                            </span>
                        </div>
                    </p>
                </div>

            </div>

            <div className="mt-6 bg-base-300 rounded-xl p-6">
                <h2 className="text-lg font-medium mb-2">Account Information</h2>
                <div className=" text-sm">

                    <div className="flex items-center justify-between py-2 ">
                        <span>Member Since</span>
                        <span>{formatJoiningDate(authUser.createdAt)}</span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                        <span>Account Status</span>
                        <span className="text-green-500">Active</span>
                    </div>

                </div>
            </div>

        </div>
            </div >
        </div >
    )
}
