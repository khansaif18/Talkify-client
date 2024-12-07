import React, { useEffect } from 'react'
import useAuth from '../store/useAuthStore'
import useChat from '../store/useChatStore'

export default function Contacts() {

    const defaultProfileImageUrl = 'https://img.freepik.com/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=740'

    const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } = useChat()
    const { onlineUsers, authUser } = useAuth()

    useEffect(() => {
        getUsers()
    }, [getUsers])


    return (
        <div className='w-full'>

            <div className='border-b border-base-300 w-full py-4 px-5'>
                <h2 className='font-bold tracking-wide text-xl'>Contacts</h2>
            </div>

            <div className="overflow-y-auto w-full py-3 flex flex-col gap-1">
                {users.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? 'bg-base-300 ring-1 ring-base-300' : ''}`}>
                        <div className="relative">
                            <img
                                src={user.profilePic !== '' ? user.profilePic : defaultProfileImageUrl}
                                alt={user.name}
                                className="size-12 object-cover rounded-full"
                            />
                            {onlineUsers.includes(user._id) && (
                                <span className="absolute right-0 bottom-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                            )}
                        </div>

                        <div className=" text-left min-w-0">
                            <div className="font-medium truncate capitalize">{user.fullName}</div>
                            <div className="text-sm text-zinc-400">
                                {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
                            </div>
                        </div>
                    </button>
                ))}
            </div>

        </div>
    )
}
