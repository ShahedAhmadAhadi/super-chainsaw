import React from 'react'
import { useQuery } from 'react-query'

async function fetchComments(postId) {
    const response = fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    return (await response).json()
}

function PostDetail({post}) {

    const resp = useQuery(["Comments", post.id], () => fetchComments(post.id))
    console.log(resp)
    const {data, isLoading, isError, error} = resp

    if (isLoading) {
        return <h3>Loading...</h3>
    }
    if (isError) {
        return <h3>{error.toString()}</h3>
    }

    return (
        <div>
            <h2 style={{color: '#5511ff'}}>{post.title}</h2>
            <h4>Comments</h4>
            {data && data.map(comment => (
                <li key={comment.id}>
                    {comment.email} : {comment.body}
                </li>
            ))}
        </div>
    )
}

export default PostDetail
