import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SearchForm = () => {

  const [ searchValue, setSearchValue ] = useState('');

  const handleSubmit = ( event: React.SubmitEvent<HTMLFormElement> ) => {
    event.preventDefault();
    alert(`Estás buscando ${searchValue}`);
    // Conectar a => context => db.
    setSearchValue('');
  };

  return (
    <Form onSubmit={handleSubmit} className="w-100">
      <Form.Group className="d-flex gap-2 shadow-sm">
        <Form.Control
          type="text"
          name="search"
          placeholder="Nombre del producto"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button type="submit">Buscar</Button>
      </Form.Group>
    </Form>
  );
};

export default SearchForm;