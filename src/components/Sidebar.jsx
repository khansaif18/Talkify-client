import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useChat from '../store/useChatStore'
import useAuth from '../store/useAuthStore'
import { CircleUserRound, User2, UserPlus, Users } from 'lucide-react'
import SidebarSkeleton from './skeletons/SidebarSkeleton'
import Contacts from './Contacts'
import NewContact from './NewContact'
import Tooltip from './Tooltip'

export default function Sidebar() {

    const [showTab, setShowTab] = useState({ contacts: true, newContacts: false })

    const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } = useChat()
    const { onlineUsers, getPendingUsers } = useAuth()

    useEffect(() => {
        getPendingUsers()
    }, [showTab])

    if (isUserLoading) return <SidebarSkeleton />

    return (
        <aside className={`h-[85vh] w-full lg:w-80 border-r border-base-300 flex transition-all duration-200 ${selectedUser ? 'hidden lg:flex' : 'flex'}`}>

            <div className="border-r border-base-300 px-3 gap-2 py-2 w-[15%] md:w-[20%] flex flex-col items-center justify-between">

                <div className='flex flex-col gap-2 '>

                    <div className={`relative group rounded hover:bg-base-300 p-3 cursor-pointer ${showTab.contacts ? 'bg-base-300' : ''}`}
                        onClick={() => setShowTab({ contacts: true, newContacts: false })}>
                        <Users className="size-6" />
                        <Tooltip text='Contacts' />
                    </div>

                    <div className={`relative group rounded hover:bg-base-300 p-3 cursor-pointer ${showTab.newContacts ? 'bg-base-300' : ''}`}
                        onClick={() => setShowTab({ contacts: false, newContacts: true })}>
                        <UserPlus className="size-6" />
                        <Tooltip text='New Contact' />
                    </div>

                </div>

                <div className='rounded p-3 cursor-pointer hover:bg-base-300 group relative'>
                    <Link to='/profile'>
                        <CircleUserRound />
                        <Tooltip text='Profile' />
                    </Link>
                </div>

            </div>

            {showTab.contacts && <Contacts />}
            {showTab.newContacts && <NewContact />}

        </aside>
    )
}

/* From Uiverse.io by ayman-ashine */
<div class="flex flex-col items-center gap-2">
    <div class="group relative bg-zinc-300 p-2 rounded-full">
        <span>Top</span>
        <div class="bg-zinc-800 p-2 rounded-md group-hover:flex hidden absolute -top-2 -translate-y-full left-1/2 -translate-x-1/2">
            <span class="text-zinc-400 whitespace-nowrap">Info</span>
            <div
                class="bg-inherit rotate-45 p-1 absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2"
            ></div>
        </div>
    </div>

</div>




// <aside className="h-[85vh] w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">

//     <div className="border-b border-base-300 w-full p-5 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//             <Users className="size-6" />
//             <span className="font-medium hidden lg:block ">Contacts</span>
//         </div>
//     </div>

//     <div className="overflow-y-auto w-full py-3 flex flex-col">
//         {users.map(user => (
//             <button
//                 key={user._id}
//                 onClick={() => setSelectedUser(user)}
//                 className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? 'bg-base-300 ring-1 ring-base-300' : ''
//                     }`}
//             >
//                 <div className="relative">
//                     <img
//                         src={user.profilePic !== '' ? user.profilePic : defaultProfileImageUrl}
//                         alt={user.name}
//                         className="size-12 object-cover rounded-full"
//                     />
//                     {onlineUsers.includes(user._id) && (
//                         <span className="absolute right-0 bottom-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
//                     )}
//                 </div>

//                 <div className="hidden lg:block text-left min-w-0">
//                     <div className="font-medium truncate capitalize">{user.fullName}</div>
//                     <div className="text-sm text-zinc-400">
//                         {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
//                     </div>
//                 </div>
//             </button>
//         ))}
//     </div>
// </aside>
