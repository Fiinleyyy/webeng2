import React from 'react';
import DOMPurify from "dompurify"; // Library to sanitize potentially unsafe HTML
import Skeleton from "react-loading-skeleton"; // UI component for loading placeholders
import 'react-loading-skeleton/dist/skeleton.css'; // Styles for Skeleton

// Component to display a single Wikipedia search result
function WikipediaResult(props) {
    // Sanitize the HTML snippet returned from Wikipedia to prevent XSS
    let safeHTMLSnippet = DOMPurify.sanitize(props.snippet);

    return (
        <div>
            {/* Title with clickable link. If loading, show a skeleton instead */}
            <h2>
                <a href={props.url}>
                    {props.loading ? <Skeleton /> : props.title}
                </a>
            </h2>

            {/* Show loading skeleton or the sanitized Wikipedia snippet */}
            {props.loading ? (
                <Skeleton count={3} /> // 3 lines of placeholder text
            ) : (
                <p dangerouslySetInnerHTML={{ __html: safeHTMLSnippet }}></p> // Render cleaned HTML
            )}
        </div>
    );
}

export { WikipediaResult };
