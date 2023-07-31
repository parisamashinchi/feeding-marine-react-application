import React, {FC, PropsWithChildren} from 'react';
import CardIconWithBG from '../../Atoms/CardIconWithBG/CardIconWithBG';

interface CardIconWithTextProps {
    imageUrl: any;
    color: string;
    iconBGColor: string;
    value: number;
    unitText: string;
}

const CardIconWithText: FC<PropsWithChildren<CardIconWithTextProps>> = ({value, unitText, imageUrl, color, iconBGColor}) => {
    return (
        <div style={{display: 'flex'}}>
            <CardIconWithBG imageUrl={imageUrl} color={color} iconBGColor={iconBGColor} size={'18px'} margin={7} radius={10}/>
            <div style={{display:'flex',marginLeft:'6px'}}>
                <p style={{fontWeight: 'bold', marginBottom:0}}>
                  {value}
                  <span style={{fontSize: '9px', color:'#B3B3B3'  ,marginLeft:'5px'}}>&nbsp;{unitText}</span>
                </p>

            </div>

        </div>
    )
}

export default CardIconWithText;
