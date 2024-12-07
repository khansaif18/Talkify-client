import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import useAuth from "./useAuthStore";

const useChat = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,

    isSendingMessage: false,
    isUsersLoading: false,
    isMessagesLoading: false,
    isDeletingMessage: false,

    setSelectedUser: (selectedUser) => {
        set({ selectedUser })
    },

    getUsers: async () => {
        set({ isUsersLoading: true })
        try {
            const res = await axiosInstance.get('/message/users')
            set({ users: res.data.users })
        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true })
        try {
            const res = await axiosInstance.get(`/message/${userId}`)
            set({ messages: res.data.messages })
        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get()
        set({ isSendingMessage: true })
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData)
            set({ messages: [...messages, res.data.messages] })
        } catch (error) {
            // toast.error(error?.response?.data?.message)
        } finally {
            set({ isSendingMessage: false })
        }
    },

    deleteMessage: async (msgId) => {
        try {
            if (!msgId) return
            set({ isDeletingMessage: true })
            set((state) => ({
                messages: state.messages.filter(msg => msg._id !== msgId)
            }))
            axiosInstance.get(`/message/delete/${msgId}`)
            // toast.success(res?.data?.message)
        } catch (error) {
            // toast.error(error?.response?.data?.message)
        } finally {
            set({ isDeletingMessage: false })
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get()
        if (!selectedUser) return

        const socket = useAuth.getState().socket
        socket.on('newMessage', newMessage => {
            if (newMessage.senderId !== selectedUser._id) return
            set({ messages: [...get().messages, newMessage] })
        })
    },

    unsubscribeFromMessages: () => {
        const socket = useAuth.getState().socket
        socket.off('newMessage')
    }
}))

export default useChat