import React from 'react'
import {Spinner} from 'react-bootstrap'
function ChatRoom() {
    const styles = {
        height : 100,
        width : 100,
        margin : 200,
        alignContent : 'center',

    }
    return (
        <div>
            <Spinner style={styles} animation="border" variant="primary" />
        </div>
    )
}

export default ChatRoom
