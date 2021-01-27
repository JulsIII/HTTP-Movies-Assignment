import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
    id: 5,
    title: 'Tombstone',
    director: 'George P. Cosmatos',
    metascore: 89,
    stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
  };

const UpdateForm = props => {
  const { push } = useHistory();
  const [movie, setMovie] = useState(initialMovie);
  // const id = props.match.params.id;
  const { id } = useParams();
  
  useEffect(()=>{
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res=>{
        setMovie(res.data);
      })
      .catch(err=>{
        console.log(err);
      });
  }, []);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "metascore") {
      value = parseInt(value, 100);
    }

    setMovie({
      ...movie,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res=>{
        props.setMovies(res.data);
        push(`/movie-list/${id}`);
      })
      .catch(err=>{
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          onChange={changeHandler}
          placeholder="id"
          value={movie.id}
        />
        <div className="baseline" />

        <input
          type="number"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="string"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="string"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
        />
        <div className="baseline" />

        <input
          type="string"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={movie.stars}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;