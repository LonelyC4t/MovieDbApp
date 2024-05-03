/* eslint-disable */

import React from "react";
import "./header.css";
import { api } from "../../api/api";

export default class Header extends React.Component {

    debounce = (cb) => {
        let time;
        return function(args) {
            
            clearTimeout(time);
            time = setTimeout(() => {
                cb(args)
            }, 1000)
        }
    };
    render () {

        const { onChange } = this.props;
    
        return (
            <header className="header">
                <div>
                    <button>Search</button>
                    <button>Rated</button>
                </div>  
                <input placeholder="Type to search" 
                        onChange={this.debounce(onChange)}
                />
            </header>
        )
    };
};
