import React, {createContext, useState} from 'react'

// @ts-ignore
export const NotificationContext: any = createContext()

const Notification = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) => {
    const [notification, setNotification] = useState({
        color: '',
        message: ''
    })

    return (
        <NotificationContext.Provider value={[setNotification, notification]}>
            {props.children}
        </NotificationContext.Provider>
    )
}


export {Notification}