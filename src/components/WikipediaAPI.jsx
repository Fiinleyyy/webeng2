import React from 'react';
import { useEffect, useState } from "react";
import { WikipediaResult } from "./WikipediaResult";

// Component to search Wikipedia using the MediaWiki API
function SearchWikipedia({ searchTerm }) {
    const [wikipediaResults, setWikipediaResults] = useState([]); // Search result list
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        // Exit if no search term is provided
        if (!searchTerm) return;

        const baseUrl = "https://en.wikipedia.org/w/api.php";

        // Helper function to build URL with query parameters
        const buildUrl = (baseUrl, searchParams) => {
            const queryString = new URLSearchParams(searchParams).toString();
            return `${baseUrl}?${queryString}`;
        };

        // Fetch Wikipedia search results and resolve page URLs
        const fetchWikipediaResults = async () => {
            setLoading(true); // Start loading

            // First request: search for page titles matching the term
            const url1 = buildUrl(baseUrl, {
                origin: "*",           // Needed for CORS
                action: "query",
                format: "json",
                list: "search",        // Search for pages
                formatVersion: "2",
                srsearch: searchTerm   // The search term
            });

            const response1 = await fetch(url1);
            const data1 = await response1.json();
            const results = data1.query?.search ?? []; // Extract search results

            // Extract page IDs from search results
            const pageIds = results.map(r => r.pageid);

            // Second request: get full URLs for the pages using page IDs
            const url2 = buildUrl(baseUrl, {
                origin: "*",
                action: "query",
                prop: "info",
                inprop: "url",          // Include full page URL
                format: "json",
                pageids: pageIds.join("|")
            });

            const response2 = await fetch(url2);
            const data2 = await response2.json();
            const pages = data2.query?.pages ?? {};

            // Attach full URL to each result
            results.forEach(r => {
                r.url = pages[r.pageid]?.fullurl;
            });

            setWikipediaResults(results); // Save final result list
            setLoading(false);            // Stop loading
        };

        fetchWikipediaResults(); // Trigger fetch
    }, [searchTerm]); // Run effect when searchTerm changes

    return (
        <section className="wikipedia-results">
            {/* Render a list of WikipediaResult components */}
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
    );
}

export { SearchWikipedia };
