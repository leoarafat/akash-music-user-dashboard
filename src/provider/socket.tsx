/* eslint-disable react-refresh/only-export-components */
import React, { ReactNode, useContext, useEffect } from 'react';

import io, { Socket } from "socket.io-client";
import { useMemo } from "react";
import { socketURL } from "../redux/api/apiSlice";


interface SocketContextValue {
    socket: Socket;
}


export const SocketContext = React.createContext<SocketContextValue | null>(null);

export const useSocket= ()=>{
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
}

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children })=>{
    
    const socket = useMemo(() => io(socketURL), []);

    useEffect(() => {
        const handleConnection = () => {
            console.log("Connected to socket server");
        };

        socket.on("connect", handleConnection);
        return () => {
            socket.off('connect', handleConnection);
        };
        
    }, [socket]);
    


    return(
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}