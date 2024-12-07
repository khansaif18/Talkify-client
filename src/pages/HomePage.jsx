import React from 'react'
import useChat from '../store/useChatStore'
import Sidebar from '../components/Sidebar'
import NoChatSelected from '../components/NoChatSelected'
import ChatContainer from '../components/ChatContainer'

export default function HomePage() {

    const { selectedUser } = useChat()

    return (
        <div className='h-screen bg-base-200 '>
            <div className='flex items-center justify-center pt-20 px-4'>
                <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-[95%] h-[calc(100vh-8rem)]"'>
                    <div className='flex  rounded-lg overflow-hidden '>
                        <Sidebar />
                        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
                    </div>
                </div>
            </div>
        </div>
    )
}
