import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useState } from "react";

const SearchForm = () => {

  const [ searchValue, setSearchValue ] = useState('');

  const handleSubmit = ( event: React.SubmitEvent<HTMLFormElement> ) => {
    event.preventDefault();
    alert(`Estás buscando ${searchValue}`);
    // Conectar a => context => db.
    setSearchValue('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="d-flex gap-2">
        <Form.Control
          type="text"
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