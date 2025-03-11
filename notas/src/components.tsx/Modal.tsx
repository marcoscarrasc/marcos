import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


interface NestedModalProps {
  addNote: (note: { text: string; title: string; color: string }) => void;
}

export default function NestedModal({ addNote }: NestedModalProps) {
    const [title,setTitle]= React.useState('');
    const [note, setNote] = React.useState('');
    const [color, setColor] =React.useState('#000000');
  const [open, setOpen] = React.useState(false);
  const handleTitleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTitle(event.target.value);
  };

  const handleNoteChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setNote(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleColorChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setColor(event.target.value);
  }
 
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    addNote({
      text: note,
      title:title,
      color: color,
    });
    setTitle('');
    setNote('');
    setColor('#000000');
    handleClose();
  };

  
 
  return (
    <div>
      <Button color="info" onClick={handleOpen}>
        Crear Nota
      </Button>
      <Modal
        open={open}
        style={{ color: color }}
        onClose={handleClose}
      
     
      >
        <Box sx={style}>
          <form
          onSubmit={handleSubmit}
       
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <TextField
              id="standard-multiline-flexible-title"
              label="Titulo"
              name="title"
              multiline
              maxRows={2}
              variant="standard"
              value={title}
              onChange={handleTitleChange}
              style={{ width: "100%" }}
            />

            <TextField
              id="filled-multiline-static"
              label="Nota"
              name="note"
              multiline
              rows={6}
              defaultValue=""
              variant="filled"
              value={note}
              onChange={handleNoteChange}
              style={{ width: "100%" }}
            />

            <div>
              <label htmlFor="color">Text Color</label>
              <input
                type="color"
                id="color"
                name="color"
                onChange={handleColorChange}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "right", }}>
            <Button type="button" color="error" onClick={handleClose}>
              cancelar
            </Button>
            <Button type="submit" color="primary">
              Agregar
            </Button>
            </div>
           
          </form>
        </Box>
      </Modal>
    </div>
  );
}
   

   