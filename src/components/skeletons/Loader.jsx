import React from "react";

export default function Loader() {
    return (
        <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
            <div className="absolute inset-0">
                {[...Array(50)].map((_, index) => (
                    <div
                        key={index}
                        className="absolute w-1 h-1 bg-white rounded-full animate-star"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${Math.random() * 3 + 2}s`,
                        }}
                    />
                ))}
            </div>

            <div className="relative flex justify-center items-center">
                <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                <div className="absolute w-8 h-8 bg-white rounded-full animate-pulse"></div>
            </div>
            <h2 className="mt-6 text-xl font-semibold text-white">Please Wait For a Moment</h2>
            <p className="mt-2 text-sm text-gray-400">It Might Take Upto a Min (Only For The First Time)</p>
        </div>
    )
}
