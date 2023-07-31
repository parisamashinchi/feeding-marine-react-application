import React, {FC, PropsWithChildren} from 'react';


interface CardIconWithBGProps {
    imageUrl: string;
    color: string;
    iconBGColor: string;
    size: string;
    margin: number;
    radius: number;
}

const CardIconWithBG: FC<PropsWithChildren<CardIconWithBGProps>> = ({imageUrl, color, iconBGColor, size, margin, radius}) => {
    return (
        <div style={{
            backgroundColor: iconBGColor,
            width: `calc( ${size} + ${margin * 2}px )`,
            height: `calc( ${size} + ${margin * 2}px )`,
            borderRadius: radius,
            marginTop: '10px',
        }}>
            <img src={imageUrl} style={{
                fill: color, margin: `${margin}px`
            }} width={size} height={size}/>
        </div>
    )
}

export default CardIconWithBG;
