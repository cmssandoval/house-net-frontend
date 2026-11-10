import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface SearchFormProps {
  onSearch: (value: string) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [ searchValue, setSearchValue ] = useState('');

  const handleSubmit = ( event: React.SubmitEvent<HTMLFormElement> ) => {
    event.preventDefault();
    onSearch(searchValue.trim());
  };

  return (
    <Form onSubmit={handleSubmit} className="inventory-search-form">
      <Form.Group className="inventory-search-group">
        <Form.Control
          type="text"
          name="search"
          placeholder="Nombre del producto"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button className="inventory-search-button" type="submit">Buscar</Button>
      </Form.Group>
    </Form>
  );
};

export default SearchForm;