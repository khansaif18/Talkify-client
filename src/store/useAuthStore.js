import { create } from 'zustand'
import axiosInstance from '../lib/axios'
import debounce from 'lodash.debounce';
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'

const useAuth = create((set, get) => ({
    authUser: null,
    socket: null,
    onlineUsers: [],

    searchResult: [],
    pendingContact: [],

    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isSendingOtp: false,
    isOtpSent: false,
    isCheckingUsername: false,
    isUsernameAvailable: false,
    isSearchingUser: false,
    isSendingRequest: false,
    isAcceptingRequest: false,
    isRejectingRequest: false,
    usernameRes: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
            set({ authUser: res.data.user })
            get().connectSocket()
        } catch (error) {
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    validateUsername: debounce(async (username) => {
        try {
            if (!username) return
            set({ isCheckingUsername: true })
            set({ usernameRes: null })
            const res = await axiosInstance.post(`/auth/username/${username}`)
            set({ usernameRes: res?.data?.message })
            // toast.success(res?.data?.message)
            set({ isUsernameAvailable: true })
        } catch (error) {
            // toast.error(error?.response?.data?.message)
            set({ usernameRes: error?.response?.data?.message })
            set({ isUsernameAvailable: false })
        } finally {
            set({ isCheckingUsername: false })
        }
    }, 1000),

    sendOtp: async (data) => {
        set({ isSendingOtp: true })
        try {
            const res = await axiosInstance.post('/auth/send-otp', data)
            set({ isOtpSent: true })
            toast.success(res?.data?.message)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            set({ isSendingOtp: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            set({ authUser: res.data.user })
            toast.success('Account created successfully')

            get().connectSocket()
        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post('/auth/login', data)
            set({ authUser: res.data.user })
            toast.success('Logged in successfully')

            get().connectSocket()
        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout')
            set({ authUser: null })
            toast.success('Logged out successfully')

            get().disConnectSocket()
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    },

    updateProfile: async ({ username, fullName, profilePic }) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put('/auth/update-profile', { username, fullName, profilePic })
            set({ authUser: res.data.user })
            toast.success('Profile updated successfully')
        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            set({ isUpdatingProfile: false })
        }
    },

    searchUser: debounce(async (value) => {
        try {
            if (!value.trim()) return
            set({ isSearchingUser: true })
            const res = await axiosInstance.get(`/contact/search/${value}`)
            set({ searchResult: res.data.users })
        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            set({ isSearchingUser: false })
        }
    }, 1000),

    sendRequest: async (contactId) => {
        try {
            if (!contactId) return
            set({ isSendingRequest: true })
            const res = await axiosInstance.post('/contact/send-request', { contactId })
            toast.success(res?.data?.message)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            set({ isSendingRequest: false })
        }
    },

    acceptRequest: async (contactId) => {
        try {
            if (!contactId) return
            set({ isAcceptingRequest: true })
            const res = await axiosInstance.post('/contact/accept-request', { contactId })
            toast.success(res?.data?.message)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            set({ isAcceptingRequest: false })
        }
    },

    rejectRequest: async (contactId) => {
        try {
            if (!contactId) return
            set({ isRejectingRequest: true })
            const res = await axiosInstance.get(`/contact/reject-request/${contactId}`)
            toast.success(res?.data?.message)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            set({ isRejectingRequest: false })
        }
    },

    getPendingUsers: async () => {
        try {
            const res = await axiosInstance.get('/contact/get-pending-users')
            set({ pendingContact: res.data.users })
        } catch (error) {
            set({ pendingContact: [] })
        }
    },

    connectSocket: async () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return
        const socket = io(import.meta.env.VITE_BACKEND_API_URL, {
            query: {
                userId: authUser._id
            }
        })
        socket.connect()
        set({ socket: socket })

        socket.on('getOnlineUsers', userIds => {
            set({ onlineUsers: userIds })
        })
    },

    disConnectSocket: async () => {
        if (get().socket?.connected) get().socket.disconnect()
    }
}))

export default useAuth