import React, { useState } from 'react'
import useAuth from '../store/useAuthStore'
import { Check, ChevronDown, Loader2, UserPlus, X } from 'lucide-react'
import useChat from '../store/useChatStore'
import Tooltip from './Tooltip'

export default function NewContact() {

    const [showFriendRequests, setShowFriendRequests] = useState(false)
    const [showAddNewFriend, setShowAddNewFriend] = useState(false)
    const [value, setValue] = useState('')

    const [selectedContactId, setSelectedContactId] = useState('')

    const defaultProfileImageUrl = 'https://img.freepik.com/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=740'

    const { searchUser, isSearchingUser, searchResult, getPendingUsers, isSendingRequest, sendRequest, pendingContact, isAcceptingRequest, acceptRequest, isRejectingRequest, rejectRequest } = useAuth()
    const { users } = useChat()


    return (
        <div className='w-full overflow-y-auto '>

            <div className='border-b border-base-300 w-full py-4 px-5'>
                <h2 className='font-bold tracking-wide text-xl'>New Contact</h2>
            </div>

            <div className=" w-full py-3 px-2 flex flex-col gap-2 ">

                {/* Friend Requests */}
                <div>
                    <h2 className='bg-neutral px-5 py-2 rounded flex items-center justify-between cursor-pointer' onClick={() => {
                        setShowFriendRequests(prev => !prev)
                        setShowAddNewFriend(false)
                    }}>
                        Requests
                        <ChevronDown size={16} className={`mt-1 transi-transform duration-200 ${showFriendRequests ? 'rotate-0' : ' -rotate-90'}`} />
                    </h2>

                    {
                        showFriendRequests &&
                        <div>
                            {
                                !pendingContact.length > 0 ?
                                    <div className='w-full text-center mt-3 bg-base-200 py-5 rounded'>
                                        <h2 className=''>No Requests</h2>
                                    </div> :
                                    <div className='mt-3 flex flex-col gap-1'>
                                        {
                                            pendingContact.map(contact => (
                                                <div key={contact._id} className={`w-full px-3 py-2 bg-neutral rounded flex flex-col items-center justify-between gap-2 transition-colors`}>

                                                    <div className='flex items-start w-full gap-2'>
                                                        <div className="relative">
                                                            <img
                                                                src={contact.profilePic || defaultProfileImageUrl}
                                                                className="size-10 object-cover rounded-full"
                                                            />
                                                        </div>

                                                        <div>
                                                            <p className="font-medium text-left text-md truncate capitalize">{contact.fullName}</p>
                                                            <p className="font-medium text-left text-sm truncate">{contact.username}</p>
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center justify-center w-full gap-2 py-1'>

                                                        <button className='bg-red-600 text-white p-1 rounded-md hover:bg-red-800 w-[50%] flex justify-center disabled:opacity-30'
                                                            disabled={isRejectingRequest}
                                                            onClick={async () => {
                                                                setSelectedContactId(contact._id)
                                                                await rejectRequest(contact._id)
                                                                await getPendingUsers()
                                                                setSelectedContactId('')
                                                            }}>
                                                            {isRejectingRequest && selectedContactId === contact._id ? < Loader2 size={20} className='animate-spin' /> : <X size={20} />}
                                                        </button>

                                                        <button className='bg-green-600 text-white p-1 rounded-md hover:bg-green-800 w-[50%] flex justify-center disabled:opacity-30'
                                                            disabled={isAcceptingRequest}
                                                            onClick={async () => {
                                                                setSelectedContactId(contact._id)
                                                                await acceptRequest(contact._id)
                                                                await getPendingUsers()
                                                                setSelectedContactId('')
                                                            }} >
                                                            {isAcceptingRequest && selectedContactId === contact._id ? < Loader2 size={20} className='animate-spin ' /> : <Check size={20} />}
                                                        </button>

                                                    </div>

                                                </div>
                                            ))
                                        }
                                    </div>
                            }
                        </div>
                    }
                </div>

                {/* Add New */}
                <div>

                    <h2 className='bg-neutral px-5 py-2 rounded flex items-center justify-between cursor-pointer' onClick={() => {
                        setShowAddNewFriend(prev => !prev)
                        setShowFriendRequests(false)
                    }}>
                        Add New
                        <ChevronDown size={16} className={`mt-1 transi-transform duration-200 ${showAddNewFriend ? 'rotate-0' : ' -rotate-90'}`} />
                    </h2>

                    {
                        showAddNewFriend &&
                        <div>

                            <div className='mt-3 flex w-full justify-center px-1 relative'>
                                <input
                                    type="text"
                                    placeholder='Enter Email / Username'
                                    className='input input-bordered w-full pr-6'
                                    autoComplete='off'
                                    value={value}
                                    onChange={e => {
                                        searchUser(e.target.value)
                                        setValue(e.target.value)
                                    }
                                    }
                                />
                                {isSearchingUser && <span className='absolute right-2 top-[50%] -translate-y-[50%]'><Loader2 size={16} className='animate-spin' /></span>}
                            </div>

                            {
                                <div className="w-full py-1 flex flex-col mt-3">
                                    {
                                        searchResult
                                            .filter(user => !users.some(currUser => currUser._id === user._id))
                                            .map(user => (
                                                <div
                                                    key={user._id}
                                                    className={`w-full px-3 py-2 mb-2 bg-neutral rounded flex items-center justify-between gap-2 transition-colors`}
                                                >
                                                    <div className='flex items-center gap-2'>
                                                        <div className="relative">
                                                            <img
                                                                src={user.profilePic || defaultProfileImageUrl}
                                                                className="size-10 object-cover rounded-full"
                                                                alt='PP'
                                                            />
                                                        </div>

                                                        <div>
                                                            <p className="font-medium text-left text-md truncate capitalize">
                                                                {user.fullName.length < 12 ? user.fullName : user.fullName.slice(0, 10) + '..'}
                                                            </p>
                                                            <p className="font-medium text-left text-sm truncate">
                                                                {user.username.length < 12 ? user.username : user.username.slice(0, 12) + '..'}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <button
                                                        className='bg-green-600 text-white p-2 rounded-md hover:bg-green-800 disabled:opacity-30'
                                                        disabled={isSendingRequest}
                                                        onClick={async () => {
                                                            setSelectedContactId(user._id);
                                                            await sendRequest(user._id);
                                                            setSelectedContactId('');
                                                        }}
                                                    >
                                                        {isSendingRequest && selectedContactId === user._id ?
                                                            <Loader2 size={20} className='animate-spin' />
                                                            :
                                                            <UserPlus size={20} />
                                                        }
                                                    </button>
                                                </div>
                                            ))
                                    }
                                    {searchResult.filter(user => !users.some(currUser => currUser._id === user._id)).length === 0 && value ? (
                                        <div className="w-full text-center mt-3 bg-base-200 py-5 rounded mb-2">
                                            <h2>No Results</h2>
                                        </div>
                                    ) : ''}
                                </div>
                            }
                        </div>
                    }
                </div>

            </div>

        </div>
    )
}
