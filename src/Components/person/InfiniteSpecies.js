import React from 'react'
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroller'
import Person from './Person';

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
    const response = await fetch(url);
    return response.json()
}

function InfiniteSpecies() {
    const infiniteQ = useInfiniteQuery("sw-people", ({ pageParam = initialUrl }) => { fetchUrl(pageParam) }, {
        getNextPageParam: (lastPage) => lastPage.next || undefined
    })
    const { data, fetchNextPage, hasNextPage, isLoading } = infiniteQ
    console.log(infiniteQ)
    if (isLoading) {
        <div className="loading">Loading...</div>
    }
    return (
        <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
            {data && data.pages.map(pageData => {
                return pageData.results.map(person => {
                    return (
                        <Person key={person.name} name={person.name} hairColor={person.hairColor} eyeColor={person.eyeColor} />
                    )
                }
            )})}

        </ InfiniteScroll>
    )
}

export default InfiniteSpecies
