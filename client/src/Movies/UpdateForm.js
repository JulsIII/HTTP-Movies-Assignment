import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

function UpdateForm(props) {
  const { id } = useParams();
  const { push } = useHistory();
  const [formValues, setFormValues] = useState({
    id: null,
    title: "",
    director: "",
    metascore: null,
    stars: "",
    
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        const starsString = res.data.stars.join(", ");
        const movieUpdate = {
          ...res.data,
          stars: starsString,
        };
        setFormValues(movieUpdate);
      })
      .catch((err) => console.log(err.response));
  }, []);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const starsArr = formValues.stars.split(", ");
    const movieToUpdate = {
      ...formValues,
      stars: starsArr,
    };
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movieToUpdate)
      .then((res) => {
        props.updateMovies(
          props.movieList.map((movie) => {
            if (movie.id === res.data.id) {
              return res.data;
            } else {
              return movie;
            }
          })
        );
        push(`/movies/${id}`);
      })
      .catch((err) => console.log(err));
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
      <button>Update Movie</button>
    </form>
  );
}

export default UpdateForm;