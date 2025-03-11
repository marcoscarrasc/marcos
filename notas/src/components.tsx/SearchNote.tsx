import React, { useState } from "react";

interface Note {
  title: string;
  text: string;
  color: string;
}

interface SearchNoteProps {
  notes: Note[];
  searchNotes: (query: string) => void;
}

const SearchNote: React.FC<SearchNoteProps> = ({ searchNotes }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    searchNotes(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar por título"
      />
    </div>
  );
};

export default SearchNote;