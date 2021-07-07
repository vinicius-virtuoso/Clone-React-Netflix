import React, {useEffect , useState} from 'react';
import Tmdb from './Tmdb';
import { MovieRow } from './components/MovieRow';
import { DestaqueMovie } from './components/DestaqueMovie';

import './App.css';
import { Header } from './components/Header';

function App() {

  const [MovieList , setMovieList] = useState([]);
  const [DestaqueMovieDatata , setDestaqueMovieDatata] = useState(null);
  const [DarkHeader, setDarkHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list)

      //Pegando o filme em detaque de
      let originals = list.filter((img) => img.slug === 'originals');

      let radonMovie = Math.floor(Math.random() * (originals[0].items.results.length - 1));

      let chosen = originals[0].items.results[radonMovie];

      let chosenInfo = await Tmdb.getMovieInfo(chosen.id,'tv');
      setDestaqueMovieDatata(chosenInfo)
    }

    loadAll();
  },[])

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setDarkHeader(true);
      } else {
        setDarkHeader(false);
      }
    }

    window.addEventListener('scroll',scrollListener);

    return () => {
      window.removeEventListener('scroll',scrollListener);
    }
  },[])

  return (
    <div className="App">
      <Header dark={DarkHeader}/>

      {DestaqueMovieDatata  &&
        <DestaqueMovie item={DestaqueMovieDatata} />
      }

      <section className="list">
        {MovieList.map((movie,key) => (
          <MovieRow key={key} title={movie.title} items={movie.items}/>
        ))}
      </section>

      <footer>
        Feito por <span role="Author" aria-label="Author">Vinicius Virtuoso.</span>
        <br/>
        Creditos: <br /><a href="https://youtu.be/tBweoUiMsDg" >Bonieky Lacerda</a> e <a href="https://www.themoviedb.org/" >Themoviedb.org</a>
      </footer>

      {MovieList.length <= 0 &&
      <div className="loading">
        <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="loading"/>
      </div>
      }
    </div>
  );
}

export default App;


// Header
//       Destaque
//       Lista
//       Footer
