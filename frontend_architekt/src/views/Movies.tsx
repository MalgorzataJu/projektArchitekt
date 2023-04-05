import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { ListEmployeeResAll } from "types";
import jwtInterceptor from "../helpers/jwtInterceptor";

const Movies = () => {
  const [movies, setMovies] = useState<ListEmployeeResAll[] | null>([]);

  // useEffect(() => {
  //   // jwtInterceptor
  //   //   .get("http://localhost:3001/employee",
  //   //       { withCredentials: true }
  //   //   )
  //   //   .then((response) => {
  //   //     setMovies(response.data);
  //   //     console.log(movies)
  //   //   });
  // }, []);
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "500px", minWidth: "600px" }}
      >
        <Card>
          <Card.Header>Liked Movies</Card.Header>
          <ListGroup variant="flush">
            {/*{movies.map((item, index) => (*/}
            {/*  <ListGroup.Item key={index}>{item}</ListGroup.Item>*/}
            {/*))}*/}
          </ListGroup>
        </Card>
      </div>
    </>
  );
};

export default Movies;
