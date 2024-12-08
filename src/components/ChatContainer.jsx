import React, { useEffect, useRef, useState } from 'react'
import useChat from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from './skeletons/MessageSkeleton'
import useAuth from '../store/useAuthStore'
import { formatMessageTime } from '../lib/utils'
import { EllipsisVertical, Trash } from 'lucide-react'

// export default function ChatContainer() {

//     const chatContainerRef = useRef(null);
//     const chatEndRef = useRef(null)

//     const { isMessagesLoading, messages, selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages } = useChat()
//     const { authUser } = useAuth()
//     const defaultProfileImageUrl = 'https://img.freepik.com/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=740'

//     useEffect(() => {
//         const chatContainer = chatContainerRef.current;
//         const isNearBottom = chatContainer.scrollHeight - chatContainer.scrollTop <= chatContainer.clientHeight + 100;

//         if (isNearBottom && chatEndRef.current) {
//             chatEndRef.current.scrollIntoView({ behavior: "auto" });
//         }
//     }, [messages]);


//     useEffect(() => {
//         getMessages(selectedUser._id)
//         subscribeToMessages()

//         return () => unsubscribeFromMessages()

//     }, [selectedUser._id, getMessages])



//     if (isMessagesLoading) return (
//         <div className='flex-1 flex flex-col overflow-auto '>
//             <ChatHeader />
//             <MessageSkeleton />
//             <MessageInput />
//         </div>
//     )


//     return (
//         <div className='flex-1 flex flex-col overflow-auto h-[85vh]' ref={chatContainerRef}>

//             <ChatHeader />

//             <div className='flex-1 overflow-auto p-4'>
//                 {messages && messages.map(message => (

//                     <div key={message._id} className={`chat ${message.senderId === authUser._id ? ' chat-end  ' : ' chat-start '}`}>

//                         <div className='chat-image avatar'>
//                             <div className='size-10 rounded-full border'>
//                                 <img
//                                     src={message.senderId === authUser._id ? authUser.profilePic || defaultProfileImageUrl : selectedUser.profilePic || defaultProfileImageUrl}
//                                     alt="ProfilePic"
//                                 />
//                             </div>
//                         </div>

//                         {/* <div className={`chat-bubble flex flex-col ${message.senderId === authUser._id ? "bg-primary text-primary-content" : "bg-base-200 "}`}> */}
//                         <div className={`chat-bubble flex flex-col ${message.senderId === authUser._id ? "bg-primary text-primary-content" : "bg-base-300 text-base-content"}`}>
//                             {
//                                 message.image && (
//                                     <img
//                                         src={message.image}
//                                         alt="Attachment"
//                                         className='sm:max-w-[200px] rounded-md mb-2'
//                                     />
//                                 )
//                             }
//                             {message.text && <p>{message.text}</p>}
//                         </div>

//                         <div className='chat-header mb-1 '>
//                             <time className='text-xs opacity-50 ml-1'>
//                                 {formatMessageTime(message.createdAt)}
//                             </time>
//                         </div>

//                     </div>
//                 ))}

//                 <div ref={chatEndRef}></div>

//             </div>

//             <MessageInput />

//         </div>
//     )
// }


export default function ChatContainer() {
    const chatContainerRef = useRef(null);
    const chatEndRef = useRef(null);

    const { isMessagesLoading, messages, selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages, deleteMessage } = useChat();
    const { authUser } = useAuth();
    const defaultProfileImageUrl = 'https://img.freepik.com/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=740';

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        const isNearBottom = chatContainer.scrollHeight - chatContainer.scrollTop <= chatContainer.clientHeight + 100;

        if (isNearBottom && chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "auto" });
        }
    }, [messages])

    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser._id);
            subscribeToMessages();

            return () => unsubscribeFromMessages();
        }
    }, [selectedUser, getMessages]);

    if (!selectedUser) return null;

    if (isMessagesLoading)
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );

    return (
        <div className="flex-1 flex flex-col overflow-auto h-[85vh]" ref={chatContainerRef}>
            <ChatHeader />
            <div className="flex-1 overflow-auto p-4">
                {messages &&
                    messages.map((message) => (
                        <div
                            key={message._id}
                            className={`chat relative ${message.senderId === authUser._id ? 'chat-end pl-10' : 'chat-start pr-10'}`}
                        >
                            <div className="chat-image avatar">
                                <div className="size-10 rounded-full border">
                                    <img
                                        src={
                                            message.senderId === authUser._id
                                                ? authUser.profilePic || defaultProfileImageUrl
                                                : selectedUser.profilePic || defaultProfileImageUrl
                                        }
                                        alt="ProfilePic"
                                    />
                                </div>
                            </div>

                            <div
                                className={`msg chat-bubble flex items-center cursor-default flex-col ${message.senderId === authUser._id
                                    ? 'bg-primary text-primary-content'
                                    : 'bg-base-300 text-base-content'
                                    }`}
                            >
                                {message.image && (
                                    <img
                                        src={message.image}
                                        alt="Attachment"
                                        className="sm:max-w-[200px] rounded-md mb-2"
                                    />
                                )}
                                {message.text && <p>{message.text}</p>}


                                {
                                    authUser._id == message.senderId ?
                                        <span className={`dots text-primary absolute p-2 -left-8 py-1 cursor-pointer `}
                                            onClick={() => deleteMessage(message._id)}>
                                            <Trash size={16} />
                                        </span> : ''
                                }

                            </div>


                            <div className="chat-header mb-1">
                                <time className="text-xs opacity-50 ml-1">
                                    {formatMessageTime(message.createdAt)}
                                </time>
                            </div>
                        </div>
                    ))}
                <div ref={chatEndRef}></div>
            </div>
            <MessageInput />
        </div>
    );
}