import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";
import SearchForm from "../components/SearchForm";
import { FormProvider } from "../form";
import { useForm } from "react-hook-form";
import { Container, Alert, Box, Card, Stack, CardMedia, CardActionArea, Typography, CardContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../components/book/bookSlice";



const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const HomePage = () => {
  const dispatch = useDispatch();
  const books = useSelector(state => state.book.books);
  const status = useSelector(state => state.book.status);
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState("");
  const totalPage = 10;
  const limit = 10;
  const navigate = useNavigate()


  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  useEffect(() => {
    dispatch(fetchData({ pageNumber, limit: 10, query }));
  }, [dispatch, pageNumber, query, limit]);

  //--------------form

  const defaultValues = {
    searchQuery: ""
  };

  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    setQuery(data.searchQuery)
  }
  return (
    <Container>
      <Stack sx={{ display: "flex", alignItems: "center", m: "2rem" }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>Book Store</Typography>
        {status && <Alert severity="info">{status}</Alert>}
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            mb={2}
          >
            <SearchForm />
          </Stack>
        </FormProvider>
        <PaginationBar
          pageNum={pageNumber}
          setPageNum={setPageNumber}
          totalPageNum={totalPage}
        />
      </Stack>
      <div>
        {status ? (
          <Box sx={{ textAlign: "center", color: "primary.main" }} >
            <ClipLoader color="inherit" size={150} loading={true} />
          </Box>
        ) : (
          <Stack direction="row" spacing={2} justifyContent="space-around" flexWrap="wrap">
            {books.map((book) => (
              <Card
                key={book.id} onClick={() => handleClickBook(book.id)}
                sx={{
                  width: "12rem",
                  height: "25rem",
                  mb: "2rem",
                }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="280px"
                    image={`${BACKEND_API}/${book.imageLink}`}
                    alt={`${book.title}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {`${book.title}`}
                    </Typography>

                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        )}
      </div>
    </Container>
  );
};

export default HomePage;
