// import React from "react";
import { Header } from "../../components/header/Header";
import { AddBook } from "../../components/addBook/AddBook";
import css from "./homePage.module.scss";
// import { Library } from "../../components/library/Library";
// import { addBookRequest } from "../../app/redux/api/types";

const HomePage = () => {

  return (
    <div className={css.container}>
      <Header />
      <AddBook />
    </div>
  );
};

export default HomePage;
