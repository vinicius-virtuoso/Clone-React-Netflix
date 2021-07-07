import React from 'react';
import './DestaqueMovie.css';

export const DestaqueMovie = ({item}) => {

    let firstDate = new Date(item.first_air_date);
    let genres = [];

    for (let i in item.genres) {
        genres.push(item.genres[i].name);
    }

    let description = item.overview;
    if(description.length > 220) {
        description = description.substr(0,220) + '...';
    }   

    return (
        <section className="Destaque" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="Destaque--vertical">
                <div className="Destaque--horizontal">
                    <div className="Destaque--name">
                        {item.original_name}
                    </div>
                    <div className="Destaque--info">
                        <div className="Destaque--points">{item.vote_average} Pontos</div>
                        <div className="Destaque--year">{firstDate.getFullYear()}</div>
                        <div className="Destaque--seasons">{item.number_of_seasons} Temporada{item.number_of_seasons != 1 ? 's' : ''}</div>
                    </div>
                    <div className="Destaque--description">
                        {description}
                    </div>
                    <div className="Destaque--buttons">
                        <a href={`/watch/${item.id}`} className="Destaque--btn watchBtn">▶ Assistir</a>
                        <a href={`/list/add/${item.id}`} className="Destaque--btn listBtn">+ Minha Lista</a>
                    </div>
                    <div className="Destaque--genres">
                        <strong>Generos: </strong>
                        {genres.join(', ')}
                    </div>
                </div>
            </div>
        </section>
    )
}
