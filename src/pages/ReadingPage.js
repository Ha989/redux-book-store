import React, { useState, useEffect } from "react";
import { Container, Box, Card, Stack, CardMedia, CardActionArea, Typography, CardContent } from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReadingList, removeBook } from "../components/book/bookSlice"; 
import ClearIcon from '@mui/icons-material/Clear';

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const ReadingPage = () => {
  const dispatch = useDispatch();
  const readingList = useSelector(state => state.book.readingList);
  const status = useSelector(state => state.status);
  const navigate = useNavigate();
  const [removeBookId, setRemoveBookId] = useState("");
  


  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };
  
  
  useEffect(() => {
    if( removeBookId ) {
      dispatch(removeBook(removeBookId));
      setRemoveBookId("");
    } else {
      dispatch(getReadingList());
    }

  }, [dispatch,removeBookId]);

  const bookRemoved = (bookId) => {
    setRemoveBookId(bookId);
  }


  return (
    <Container>
      <Typography variant="h3" sx={{ textAlign: "center" }} m={3}>Book Store</Typography>
      {status ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }} >
          <ClipLoader color="inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Stack direction="row" spacing={2} justifyContent="space-around" flexWrap={"wrap"}>
          {
          readingList?.map((book) => (
            <Card
              key={book.id}
              sx={{
                width: "12rem",
                height: "27rem",
                marginBottom: "2rem",
              }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`${BACKEND_API}/${book.imageLink}`}
                  alt={`${book.title}`}
                  onClick={() => handleClickBook(book.id)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {`${book.title}`}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    {`${book.author}`}
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute", top: "5px", right: "5px",
                      backgroundColor: "secondary.light", color: "secondary.contrastText",
                      padding: "0", minWidth: "1.5rem"
                    }}
                    size="small"
                    onClick={() => bookRemoved(book.id)}
                  >
                    <ClearIcon/>
                  </Box>
                </CardContent>
                  
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}
    </Container >
  );
};

export default ReadingPage;
