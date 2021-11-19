import React from 'react'
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroller'
import Person from './Person';

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async () => {
    const response = await fetch("https://swapi.dev/api/people/");
    return response.json()
}

function InfiniteSpecies() {
    const infiniteQ = useInfiniteQuery("sw-people", ({ pageParam = initialUrl }) => { fetchUrl(pageParam) }, {
        getNextPageParam: (lastPage) => lastPage.next || undefined
    })
    const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error } = infiniteQ
    console.log(infiniteQ)
    if (isLoading) {
        return <div className="loading">Loading...</div>
    }
    if (isError) {
        return   <div>Error!</div>
    }
    console.log(data)
    return (
        <div>
        {isFetching && <div className="fetch">Loading...</div>}
        <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
            {data.pages.map(pageData => {
                return pageData.results.map(person => {
                    return (
                        <Person key={person.name} name={person.name} hairColor={person.hairColor} eyeColor={person.eyeColor} />
                    )
                }
            )})}

        </ InfiniteScroll>
        </div>
    )
}

export default InfiniteSpecies
