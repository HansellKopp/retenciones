  
import React, { useState, useEffect } from "react";

const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
        const res = await fetch(url)
        const data = await res.json()
        const items = data.results
        setData(items)
        setLoading(false)
    }
    fetchData()
    }, [url])
  return { data, loading }
};

// usage
// const { data, loading } = useFetch("https://api.randomuser.me/");

export default useFetch
