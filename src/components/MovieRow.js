import React, {useState}from 'react';
import './MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export const MovieRow = ({title, items}) => {

    const [scrollX,setScrollX] = useState(0)

    const handlerLeftArrow =() => {
        let x = scrollX + Math.round(window.innerWidth /2);

        if(x >= 0) {
            x = 0
        }

        setScrollX(x)
    }
    const handlerRightArrow =() => {
        let x = scrollX - Math.round(window.innerWidth /2);
        let listWidth = items.results.length * 150;

        if((window.innerWidth - listWidth) > x) {
            x = (window.innerWidth - listWidth) - 60;
        }

        setScrollX(x)
    }


    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handlerLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: '5rem'}} />
            </div>
            <div className="movieRow--right" onClick={handlerRightArrow}>
                <NavigateNextIcon style={{fontSize: '5rem'}} />
            </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150,

                }}>
                {items.results.length > 0 && items.results.map((item, key) => (
                    <div className="movieRow--movie" key={key}>
                        <img src={`https://image.tmdb.org/t/p/w400${item.poster_path}`} alt={item.original_title}/>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}
