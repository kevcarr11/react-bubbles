import React, { useState } from "react";
import axiosWithAuth from "./utils/axiosWithAuth"

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${colors.id}`, colorToEdit)
      .then(res => {
        console.log(res.data)
        updateColors([...colors, res.data])
        setColorToEdit(initialColor)
        setEditing(false)
        

      })
      .catch(err => console.log(err))
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const saveAdd = e => {
    e.preventDefault()
    axiosWithAuth()
    .post(`/api/colors`, colorToAdd)
    .then(res => {
      updateColors([...colors, res.data])
      setColorToAdd(initialColor)
      setEditing(false)
    })
  } 

  const deleteColor = color => {
    // make a delete request to delete this color
    if (window.confirm("Are you sure you want to delete this color?")) {
      updateColors(colors.filter(item => item.id !== color.id))

      axiosWithAuth()
        .delete(`/api/colors/${colors.id}`)
        .then(() => console.log("Color was deleted"))
        .catch(err => console.log(err))
    }
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
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
      <form>
        <legend>Add color</legend>
        <label>
          color name:
            <input
            onChange={e =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
            value={colorToAdd.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value }
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
      </form>
    </div>
  );
};

export default ColorList;
