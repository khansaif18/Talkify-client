import React, { useState } from 'react'
import useAuth from '../store/useAuthStore'
import { ChevronDown, Loader2, UserPlus } from 'lucide-react'

export default function NewContact() {

    const [showFriendRequests, setShowFriendRequests] = useState(false)
    const [showAddNewFriend, setShowAddNewFriend] = useState(false)
    const [value, setValue] = useState('')

    const defaultProfileImageUrl = 'https://img.freepik.com/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=740'

    const { searchUser, isSearchingUser, searchResult, getPendingUsers, isSendingRequest, sendRequest, pendingContact, isAcceptingRequest, acceptRequest, isRejectingRequest, rejectRequest } = useAuth()

    return (
        <div className='w-full overflow-y-auto'>

            <div className='border-b border-base-300 w-full py-4 px-5'>
                <h2 className='font-bold tracking-wide text-xl'>New Contact</h2>
            </div>

            <div className=" w-full py-3 px-2 flex flex-col gap-2">

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
                                searchResult.length === 0 && value ?
                                    <div className='w-full text-center mt-3 bg-base-200 py-5 rounded mb-2'>
                                        <h2 className=''>No Result</h2>
                                    </div>
                                    :
                                    <div className="w-full py-1 flex flex-col mt-3">

                                        {
                                            searchResult && searchResult.map(user => (
                                                <div key={user._id} className={`w-full px-3 py-2 mb-2   bg-neutral rounded flex items-center justify-between gap-2 transition-colors`}>

                                                    <div className='flex items-center gap-2'>
                                                        <div className="relative">
                                                            <img
                                                                src={user.profilePic || defaultProfileImageUrl}
                                                                className="size-10 object-cover rounded-full"
                                                            />
                                                        </div>

                                                        <div>
                                                            <p className="font-medium text-left text-md truncate capitalize">{user.fullName}</p>
                                                            <p className="font-medium text-left text-sm truncate">{user.username}</p>
                                                        </div>
                                                    </div>

                                                    <button className='bg-primary p-2 rounded-md  hover:opacity-9 disabled:cursor-not-allowed' onClick={() => sendRequest(user._id)} disabled={isSendingRequest}>
                                                        {isSendingRequest ? <Loader2 size={20} className='animate-spin' /> : <UserPlus size={20} />}
                                                    </button>

                                                </div>
                                            ))
                                        }
                                    </div>
                            }
                        </div>
                    }
                </div>

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
                                        <h2 className=''>No New Requests</h2>
                                    </div> :
                                    <div className='mt-3'>
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

                                                    <div className='flex items-center justify-center w-full gap-2'>
                                                        <button className='bg-secondary p-1 rounded-md opacity-90 hover:opacity-100 w-[50%] flex items-center justify-center gap-1'
                                                            disabled={isRejectingRequest}
                                                            onClick={async () => {
                                                                await rejectRequest(contact._id)
                                                                await getPendingUsers()
                                                            }}>
                                                            {isRejectingRequest ? 'Wait..' : 'Reject'} {isRejectingRequest ? < Loader2 size={14} className='animate-spin mt-1' /> : ''}
                                                        </button>
                                                        <button className='bg-secondary p-1 rounded-md opacity-90 hover:opacity-100 w-[50%] flex items-center justify-center gap-1'
                                                            disabled={isAcceptingRequest}
                                                            onClick={async () => {
                                                                await acceptRequest(contact._id)
                                                                await getPendingUsers()
                                                            }} >
                                                            {isAcceptingRequest ? 'Wait..' : 'Accept'}  {isAcceptingRequest ? < Loader2 size={14} className='animate-spin mt-1' /> : ''}
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

            </div>

        </div>
    )
}
