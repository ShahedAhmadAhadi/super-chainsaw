import React from 'react'
import { useQuery, useMutation } from 'react-query'

async function fetchComments(postId) {
    const response = fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    return (await response).json()
}

async function deletePost(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {method: "DELETE"});
    return response.json()
}

async function updatePost(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {method: "PATCH", data: {title: "REAct query!"}});
    return response.json()
}

function PostDetail({post}) {

    const resp = useQuery(["Comments", post.id], () => fetchComments(post.id))
    console.log(resp)
    const {data, isLoading, isError, error} = resp

    const deleteMutation = useMutation(postId => deletePost(postId));
    const updateMutation = useMutation(postId => updatePost(postId));

    if (isLoading) {
        return <h3>Loading...</h3>
    }
    if (isError) {
        return <h3>{error.toString()}</h3>
    }

    return (
        <div>
            <h2 style={{color: '#5511ff'}}>{post.title}</h2>
            <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
            {deleteMutation.isError && (
                <p style={{color: 'red'}}>Error deleting Post</p>
            )}
            {deleteMutation.isLoading && (
                <p style={{color: 'brown'}}>Loading...</p>
            )}
            {deleteMutation.isSuccess && (
                <p style={{color: 'green'}}>Success</p>
            )}
            <button onClick={() => updateMutation.mutate(post.id)}>Update</button>
            {updateMutation.isError && (
                <p style={{color: 'red'}}>Error updating Post</p>
            )}
            {updateMutation.isLoading && (
                <p style={{color: 'brown'}}>Loading...</p>
            )}
            {updateMutation.isSuccess && (
                <p style={{color: 'green'}}>Update success</p>
            )}
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
