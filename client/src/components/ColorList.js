import React, { useState } from "react";
import axios from "axios";
import {axiosWithAuth} from './axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    // e.preventDefault();
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log('put', res.data)
      updateColors(res.data)
    })
    .catch(err => {console.log('Error', err)})
    
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color

    axiosWithAuth()
      .delete(`/colors/${color}`)
      .then(res => {
        console.log(res.data)
        updateColors(colors.filter(item => item.id !== color.id))
        
      })
      .catch(err => console.log(err.response))
  };


  return (
    <div className="colors-wrap">
      <p>colors</p>
      {/* <form onSubmit={addColor}>
        <input
          name='color'
          type='text'
          placeholder='Color'
          value={colorToEdit.color}
          onChange={e => setColorToEdit({...colorToEdit, color: e.target.value})}
          />
          <input
          placeholder='hex'
          value={colorToEdit.code.hex}
          onChange={e => setColorToEdit({...colorToEdit, code: {hex:e.target.value}})}
          />
          <button>Submit</button>
      </form> */}
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      {/* <form>
        <input
          name='color'
          type='text'
          value={colorToEdit.color}
          onChange={e => setColorToEdit({...colorToEdit, color: e.target.value})}
          />
          <input
          value={colorToEdit.code.hex}
          onChange={e => setColorToEdit({...colorToEdit, code: {hex:e.target.value}})}
          />
      </form> */}
    </div>
  );
};

export default ColorList;
