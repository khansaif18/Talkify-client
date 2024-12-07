import React, { useRef, useState } from 'react'
import useChat from '../store/useChatStore'
import { Image, Loader2, Send, SendHorizontal, X } from 'lucide-react'

export default function MessageInput() {

    const [text, setText] = useState('')
    const [imagePreview, setImagePreview] = useState(null)
    const fileInputRef = useRef(null)

    const { sendMessage, isSendingMessage } = useChat()


    const handleImageChange = e => {
        const file = e.target.files[0]

        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleRemoveImage = e => {
        setImagePreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!text.trim() && !imagePreview) return

        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview
            })
            setText('')
            setImagePreview(null)
            if (fileInputRef.current) fileInputRef.current.value = ''
        } catch (error) {
            console.log('Failed to send Message', error)
        }

    }

    return (
        <div className='p-4 w-full'>
            {
                imagePreview && (
                    <div className='mb-3 flex items-center gap-2'>
                        <div className='relative'>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className='w-20 h-20 object-cover rounded-lg border border-x-zinc-700'
                            />
                            <button onClick={handleRemoveImage} type='button' className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center'>
                                <X className='size-3' />
                            </button>
                        </div>
                    </div>
                )
            }

            <form onSubmit={handleSendMessage} className='flex items-center gap-1'>
                <div className='flex-1 flex items-center gap-2'>

                    <input
                        type="file"
                        accept='image/*'
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className='hidden'
                    />
                    
                    <button type='button' className={`bg-base-200 md:p-3 p-1 rounded-lg hover:bg-base-300 transition ${imagePreview ? 'text-emerald-500' : 'text-slate-400'}`} onClick={() => fileInputRef.current?.click()}>
                        <Image size={22} />
                    </button>

                    <input
                        type="text"
                        placeholder='Type message..'
                        value={text}
                        onChange={e => setText(e.target.value)}
                        className='w-full input input-bordered rounded-lg input-sm sm:input-md'
                    />

                </div>

                <button type='submit' className='bg-base-200 py-1 px-3 md:py-3 md:px-5 rounded-lg hover:bg-base-300 transition disabled:pointer-events-none' disabled={!text.trim() && !imagePreview}>
                    {!isSendingMessage ? <SendHorizontal size={22} /> : <Loader2 size={22} className='animate-spin' />}
                </button>
            </form>

        </div>
    )
}
