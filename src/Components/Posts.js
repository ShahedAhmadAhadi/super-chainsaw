import React, {useState, useEffect} from 'react'
import { useQuery, useQueryClient } from 'react-query'
import PostDetail from './PostDetail'

async function fetchPosts(pageNum) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`)
    return response.json()
}

const maxPages = 10;

function Posts() {
    const queryClient = useQueryClient()
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        if (currentPage < maxPages) {
            const nextPage = currentPage + 1
            queryClient.prefetchQuery(["posts", currentPage], () => fetchPosts(nextPage))
        }
    }, [currentPage, queryClient])

    const resp = useQuery(["posts", currentPage], () => fetchPosts(currentPage), { staleTime: 2000, keepPreviousData: true})
    console.log(resp)
    const { data, isLoading, isError, error } = resp
    const [selectedPost, setSelectedPost] = useState(null)

    if (isLoading) {
        return <h3>Loading...</h3>
    }

    if (isError) return <><h4>Something went wrong</h4><h4>{error.toString()}</h4></>
    return (
        <div>
            <ul>
                {data && data.map(post => (
                    <li key={post.id}
                    onClick={() => setSelectedPost(post)} className="post">
                        {post.title}
                    </li>
                ))}
            </ul>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <button
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage(previous => previous - 1)}
                >Previous</button>
                <button
                    disabled = {currentPage >= maxPages}
                    onClick={() => setCurrentPage(previous => previous + 1)}
                >Next</button>
            </div>
            {selectedPost && <PostDetail post={selectedPost} />}
        </div>
    )
}

export default Posts
