import React from 'react'

async function fetchComments(postId) {
    const response = fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    return (await response).json()
}

function PostDetail() {
    return (
        <div>
            
        </div>
    )
}

export default PostDetail
