import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Tutorial() {
    const [tutorials, setTutorials] = useState([]);

    console.log(useParams());

    // useEffect(() => {
    //     fetch("/tutorial.json")
    //         .then(async (r) => {
    //             if (r.ok) {
    //                 const j = await r.json();
    //                 setTutorials(j);
    //             }
    //         });
    // });

    return (
        <>
        </>
    )
}
