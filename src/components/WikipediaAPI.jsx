import { useEffect, useState } from "react";
import { WikipediaResult } from "./WikipediaResult";

function SearchWikipedia({ searchTerm }) {
    const [wikipediaResults, setWikipediaResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!searchTerm) return;

        const baseUrl = "https://en.wikipedia.org/w/api.php";
        const buildUrl = (baseUrl, searchParams) => {
            const queryString = new URLSearchParams(searchParams).toString();
            return `${baseUrl}?${queryString}`;
        };

        const fetchWikipediaResults = async () => {
            setLoading(true);
            const url1 = buildUrl(baseUrl, {
                origin: "*",
                action: "query",
                format: "json",
                list: "search",
                formatVersion: "2",
                srsearch: searchTerm
            });

            const response1 = await fetch(url1);
            const data1 = await response1.json();
            const results = data1.query?.search ?? [];

            const pageIds = results.map(r => r.pageid);
            const url2 = buildUrl(baseUrl, {
                origin: "*",
                action: "query",
                prop: "info",
                inprop: "url",
                format: "json",
                pageids: pageIds.join("|")
            });

            const response2 = await fetch(url2);
            const data2 = await response2.json();
            const pages = data2.query?.pages ?? {};

            results.forEach(r => {
                r.url = pages[r.pageid]?.fullurl;
            });

            setWikipediaResults(results);
            setLoading(false);
        };

        fetchWikipediaResults();
    }, [searchTerm]);

    return (
        <>
            <section className="wikipedia-results">
                {wikipediaResults.map((result) => (
                    <WikipediaResult
                        key={result.pageid}
                        title={result.title}
                        snippet={result.snippet}
                        url={result.url}
                        loading={loading}
                    />
                ))}
            </section>
        </>

    );
}

export { SearchWikipedia };
