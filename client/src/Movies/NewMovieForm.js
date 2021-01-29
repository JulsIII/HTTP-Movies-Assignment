import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useHistory, useParams } from "react-router-dom";

function NewMovieForm(props) {
  // const { id } = useParams();
  // const { push } = useHistory();
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    director: "",
    metascore: null,
    stars: "",
  });

  useEffect(() => {
    axios
      .post(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        const starsString = res.data.stars.join(", ");
        const movieAdd = {
          ...res.data,
          stars: starsString,
        };
        setFormValues(movieAdd);
      })
      push(`/movies/${id}`);
      .catch((err) => console.log(err.response));
  }, []);

    const handleChanges = ev => {
      ev.persist();
      let value = ev.target.value;
      if (ev.target.name === 'metascore') {
        value = parseInt(value, 10);
      }
  
      setMovie({
        ...movie,
        [ev.target.name]: value
      });
    };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        onChange={handleChanges}
        value={formValues.title}
      />
      <label htmlFor="metascore">Metascore</label>
      <input
        id="metascore"
        name="metascore"
        onChange={handleChanges}
        value={formValues.metascore}
      />
      <label htmlFor="director">Director</label>
      <input
        id="director"
        name="director"
        onChange={handleChanges}
        value={formValues.director}
      />
      <label htmlFor="stars">Stars</label>
      <input
        id="stars"
        name="stars"
        onChange={handleChanges}
        value={formValues.stars}
      />
      <button>Add Movie</button>
    </form>
  );
}

export default NewMovieForm;