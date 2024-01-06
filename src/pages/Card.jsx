import { useEffect, lazy, useState, Suspense } from "react"
import { useParams } from "react-router-dom"

const CardImage = lazy(()=>import('../components/CardImage'))
const LoadImage = () =>{
    return(
    <>
        <div className="placeholder-image placeholder-glow">
            <div className="placeholder"></div>
        </div>
    </>
    )
}


const themes = [
    { id: "1", imgUrl: "img/1.avif" },
    { id: "2", imgUrl: "img/2.jpg" },
    { id: "3", imgUrl: "img/3.jpg" },
    { id: "4", imgUrl: "img/4.jpg" },
];



const Card = () =>{
    const {id} = useParams()
    const [cardData, setCardData] = useState(null)
    const [selectedThemeId, setSelectedThemeId] = useState("");

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch(`https://gitf-card-dfbae-default-rtdb.firebaseio.com/GiftData/${id}.json`);
                const data = await response.json();
                setCardData(data);
                setSelectedThemeId(data?.selectedTheme);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        

        fetchData()
    },[id])

    useEffect(() => {
        const selectedTheme = themes.find(theme => theme.id === selectedThemeId);
        if (selectedTheme) {
            document.body.style.backgroundImage = `url(${selectedTheme.imgUrl})`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat";
        }
    }, [selectedThemeId]);

    return(
        <>
            <div className=" card">
                <div className="col-md-5 p-4 ms-auto me-auto mt-3">
                    <h1 className="text-roboto-bold" >{cardData?.title}</h1>
                    <p className="text-secondary fs-14">By: {cardData?.author}</p>
                    <Suspense   fallback={<LoadImage/>}>
                        <CardImage imgUrl={cardData?.imageUrl} />
                    </Suspense>
                    
                    
                    <p className="mt-3 fs-14">
                        {cardData?.message}
                    </p>

                </div>
            </div>
            
        </>
    )
}

export default Card