import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Song from './components/Song';
import Info from './components/Info';
import axios from 'axios';

function App() {
   
  //def state
  const [searchlyrics, saveSearchLyrics] = useState({});
  const [lyrics, saveLyrics] = useState('');
  const [info, saveInfo] = useState({});

  useEffect(() => {
	if(Object.keys(searchlyrics).length === 0) return;

	const consultAPIlycris = async () => {

	  const {artist, song} = searchlyrics;
	  const urlLyrics = `https://api.lyrics.ovh/v1/${artist}/${song}`;
	  const urlInfo = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;
	  const [lyrics, info] = await Promise.all([ 
		axios(urlLyrics),
		axios(urlInfo)
	  ]);
	
	  saveLyrics(lyrics.data.lyrics);
	  if(info.data.artists != null)
		saveInfo(info.data.artists[0]);
	  else 
		saveInfo({});
	  saveSearchLyrics({});
	}
	consultAPIlycris();
  },[searchlyrics, info]);

  return (
	<Fragment>
	  <Formulario
		saveSearchLyrics={saveSearchLyrics} 
	  />
	  <div className="container mt-5">
		<div className="row">
		  <div className="col-md-6">
			<Info 
			  info={info}
			/>
		  </div>
		  <div className="col-md-6">
			<Song 
			  lyrics={lyrics}
			/>
		  </div>
		</div>
	  </div>
	</Fragment>
  );
}

export default App;
