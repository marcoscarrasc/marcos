interface Note {
    title: string;
    text: string;
    color: string;
  }
  
  interface NotesTableProps {
    notes: Note[];
  }
const NotesTable: React.FC<NotesTableProps> = ({ notes }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Nota</th>
           
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => (
            <tr key={index}>
                <td>
                    {note.title}
                </td>
              <td style={{ color: note.color }}>{note.text}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default NotesTable;