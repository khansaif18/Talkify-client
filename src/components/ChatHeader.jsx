import { ArrowLeft, X } from "lucide-react";
import useChat from "../store/useChatStore";
import useAuth from "../store/useAuthStore";
import { Link } from "react-router-dom";

export default function ChatHeader() {

    const { selectedUser, setSelectedUser } = useChat();
    const { onlineUsers } = useAuth();

    const defaultProfileImageUrl = 'https://img.freepik.com/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=740'

    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between ">
                <div className="flex items-center gap-3 w-full">

                    <div className="avatar">

                        <button className=" rounded p-2 mr-2 cursor-pointer md:hidden hover:bg-base-300 " onClick={() => setSelectedUser(null)}>
                            <ArrowLeft size={20} />
                        </button>

                        <div className="size-10 rounded-full relative">
                            <img
                                src={selectedUser.profilePic || defaultProfileImageUrl}
                                alt={selectedUser.fullName}
                            />
                        </div>
                    </div>

                    <Link className='w-full cursor-pointer' to={`/contact/${selectedUser.username}`}>
                        <h3 className="font-medium">{selectedUser.fullName}</h3>
                        <p className="text-sm text-base-content/70 ">
                            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                        </p>
                    </Link>

                    <button onClick={() => setSelectedUser(null)} className="hidden md:block hover:bg-base-300 rounded p-2 mr-2 ">
                        <X />
                    </button>

                </div>

            </div>
        </div>
    );
};
