import { useEffect, useState } from "react";
import { WikipediaResult } from "./WikipediaResult";
import "../css/InfoMessage.css"

function SearchWikipedia({ searchTerm, secondarySearchTerm}) {
    const [wikipediaResults, setWikipediaResults] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        console.log("Searching")
        if (!searchTerm|| searchTerm === "Unknown") {
            setWikipediaResults(["Unknown"]);
            return;
        }

        const baseUrl = "https://en.wikipedia.org/w/api.php";
        const buildUrl = (baseUrl, searchParams) => {
            const queryString = new URLSearchParams(searchParams).toString();
            return `${baseUrl}?${queryString}`;
        };

        const fetchWikipediaResults = async (searchTerm) => {
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

            return results;
        };

        const search = async () => {
            setLoading(true);

            if (!searchTerm || searchTerm === "Unknown") {
                setWikipediaResults(["Unknown"]);
                setLoading(false);
                return;
            }

            let results = await fetchWikipediaResults(searchTerm);



            if ((results.length === 0) && secondarySearchTerm && secondarySearchTerm !== "Unknown") {
                results = await fetchWikipediaResults(secondarySearchTerm);
            }

            if (results.length === 0) {
                setWikipediaResults(["Unknown"]);
            } else {
                setWikipediaResults(results);
            }

            setLoading(false);
        };
        search();
    }, [searchTerm]);



    return (
        <>
            <section className="wikipedia-results">
    {
        wikipediaResults.length === 0 ? null : (
            wikipediaResults.map((result) => {
                if (result === "Unknown") {
                    return (
                        <div className="wikipediaInfoMessage" key="unknown">
                            No Wikipedia results found for this location.
                        </div>
                    );
                } else {
                    return (
                        <WikipediaResult
                            key={result.pageid}
                            title={result.title}
                            snippet={result.snippet}
                            url={result.url}
                            loading={loading}
                        />
                    );
                }
            })
        )
    }

            </section>

        </>

    );
}

export { SearchWikipedia };
