/* eslint-disable */
import React from 'react';


export default class Generes extends React.Component{

    

    render(){
        const {genres, itemData} = this.props;
        let ids = itemData.genre_ids;
        
        
        let elementGeneres = ids.map((idGen) => {
            
            let idx = genres.findIndex((elem) => elem.id === idGen)
            console.log(idx);
            return <span key = {idGen}>{ idx ? genres[idx].name : `none`}</span>
        })

        return (
            elementGeneres
        )
    };
};