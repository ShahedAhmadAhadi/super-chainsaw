import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
    const response = await fetch(url);
    return response.json()
}

function InfiniteSpecies() {
    return (
        <InfiniteScroll />
    )
}

export default InfiniteSpecies
