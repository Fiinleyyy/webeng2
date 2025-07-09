
import DOMPurify from "dompurify";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

function WikipediaResult(props) {
    let safeHTMLSnippet = DOMPurify.sanitize(props.snippet);
    return (
        <div>
            <h2><a href={props.url}>{props.loading ? <Skeleton/> : props.title}</a></h2>
            {props.loading ? (
                <Skeleton count={3} />
            ) : (
                <p dangerouslySetInnerHTML={{__html: safeHTMLSnippet}}></p>
            )}
        </div>
    )
}
// function WikipediaResult(props) {
//     let safeHTMLSnippet = DOMPurify.sanitize(props.snippet);

//     return (
//         <div>
//             <h2>
//                 <a href={props.url}>
//                     {props.loading ? <Skeleton width={200} /> : props.title}
//                 </a>
//             </h2>

//             {props.loading ? (
//                 <Skeleton count={3} />
//             ) : (
//                 <p dangerouslySetInnerHTML={{ __html: safeHTMLSnippet }}></p>
//             )}
//         </div>
//     );
// }


export {WikipediaResult};