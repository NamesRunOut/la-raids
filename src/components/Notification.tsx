import React, {useContext, useEffect} from 'react'
import styled from "styled-components"
import {motion} from "framer-motion";
import { NotificationContext } from '../contexts/NotificationContext';

const Wrapper = styled(motion.div)`
  position: fixed;
  width: 80%;
  left: 10%;
  top: 3rem;
  z-index: 1000;
  
  border-radius: 0.5rem;
  padding: 0.75rem;
  
  @media (max-width: 1023px) {
    width: 90%;
    left: 5%;
  }
`

const Notification = () => {
    const [setNotification, notification] = useContext(NotificationContext)

    useEffect(() => {
        const timer = setTimeout(() => {
            setNotification({
                color: '',
                message: ''
            })
        }, 3000);
        return () => clearTimeout(timer);
    }, [notification, setNotification])

    return (<>
        {(notification.message === '') ? <></> :
            <Wrapper
                style={{background: notification.color}}
                onClick={() => {
                    setNotification({
                        color: '',
                        message: ''
                    })
                }}
                initial={{
                    y: 100
                }}
                animate={{
                    y: 0
                }}
            >
                {notification.message}
            </Wrapper>
        }
    </>)
}

export default Notification