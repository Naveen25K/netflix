import React from 'react';
import Row from './Row';
import request from './request';
import Header from './Header';
import Banner from './Banner';

const App = ()=>{
  return (
    <>
    <Header />
    <Banner />
      <Row title="Trending on Netflix" fetchURL={request.fetchTrending} isLargeRow="true" className="firstRow"/>
      <Row title="Original on Netflix" fetchURL={request.fetchNetflixOriginals}/>
      <Row title="Top_rated on Netflix" fetchURL={request.fetchTopRated}/>
      <Row title="Action on Netflix" fetchURL={request.fetchActionMovie}/>
      <Row title="Comedy on Netflix" fetchURL={request.fetchComedyMovie}/>
      <Row title="Horror on Netflix" fetchURL={request.fetchHorrorMovie}/>
      <Row title="Romance on Netflix" fetchURL={request.fetchRomanceMovie}/>
      <Row title="Documentry on Netflix" fetchURL={request.fetchDocumentries}/>
      </>

  );
}

export default App;
