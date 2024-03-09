import React from "react";
import { useGlobalContext } from "./context";

const SearchForm = () => {
  const { inputValue, error, inputHandler } = useGlobalContext();
  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <h2>search movies</h2>
      <input
        type="text"
        className="form-input"
        value={inputValue}
        onChange={(e) => inputHandler(e)}
      />
      {error.show && <div className="error">{error.msg}</div>}
    </form>
  );
};

export default SearchForm;
