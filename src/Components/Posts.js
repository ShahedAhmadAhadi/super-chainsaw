import React, {useState} from 'react'
import { useQuery } from 'react-query'
import PostDetail from './PostDetail'

async function fetchPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10&_pages=0")
    return response.json()
}

function Posts() {
    const resp = useQuery("posts", fetchPosts, { staleTime: 4000})
    console.log(resp)
    const { data, isLoading, isError, error } = resp

    if (isLoading) {
        return <h3>Loading...</h3>
    }

    const [selectedPost, setSelectedPost] = useState(null)

    if (isError) return <><h4>Something went wrong</h4><h4>{error.toString()}</h4></>

    return (
        <div>
            <ul>
                {data && data.map(post => (
                    <li key={post.id}
                    onClick={() => setSelectedPost(post)}>
                        {post.title}
                    </li>
                ))}
            </ul>
            {selectedPost && <PostDetail post={selectedPost} />}
        </div>
    )
}

export default Posts
