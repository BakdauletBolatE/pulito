import React from 'react';
import noDefactImg from "./sneaker.webp";
import defectImg from './defect_sneaker.webp';
function SneakerImg({isDefect}) {
    const noDefectSneakers = (
        <img width="100px" src={noDefactImg} alt="Sneaker"/>
    )
    const isDefectSneakers = (
        <img width="100px" src={defectImg} alt="defectSneaker"/>
    )
    return ( 
        <div>
        <div className="sneaker-item__img">{isDefect ? isDefectSneakers : noDefectSneakers }</div>
        </div>
     );
}

export default SneakerImg;