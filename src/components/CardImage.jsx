import React from 'react'

function CardImage({imgUrl}) {
    return (
        <div className="mt-3 img-card">
            <img src={imgUrl} alt="" className="img-fluid" />
        </div>
    );
}

export default CardImage
