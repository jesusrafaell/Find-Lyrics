import React, { useState } from 'react';

const Formulario = ({saveSearchLyrics}) => {

  const [search, saveSearch] = useState({
	artist: '',
	song: ''
  });

  const [error, saveError] = useState(false);

  const {artist, song} = search; 

  //func for read input
  const handleOnChange = e => {
	saveSearch({
	  ...search,
	  [e.target.name] : e.target.value
	});
  }

  const handleOnSubmit = e => {
	e.preventDefault();
	if(artist.trim() === '' || song.trim() === ''){
	  saveError(true);
	  return;
	}
	saveError(false);
	saveSearchLyrics(search);
  }

  return ( 
	<div className="bg-info">
		  {error ? <p className="alert alert-danger text-center p-3">All fields are required</p>: null}
	  <div className="container">
		<div className="row">
		  <form
			onSubmit={handleOnSubmit}
			className="col card text-white bg-trasparent mb-5 pt-5 pb-2"
		  >
			<fieldset>
			  <legend className="text-center">Find Music By Lyrics</legend>
			  <div className="row">
				<div className="col-md-6">
				  <div className="form-group">
					<label>Artist</label>
					<input
					  type="text"
					  className="form-control"
					  name="artist"
					  placeholder="Name Artist"
					  onChange={handleOnChange}
					  value={artist}
					/>
				  </div>
				</div>
				<div className="col-md-6">
				  <div className="form-group">
					<label>Song</label>
					<input
					  type="text"
					  className="form-control"
					  name="song"
					  placeholder="Name Song"
					  onChange={handleOnChange}
					  value={song}
					/>
				 </div>
				</div>
			  </div>
			  <button 
				type="submit"
				className="btn btn-primary float-right"
			  >Search</button>
			</fieldset>
		  </form>
		</div>
	  </div>
	</div>
  );
};

export default Formulario;
