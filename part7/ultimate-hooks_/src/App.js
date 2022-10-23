import { useState, useEffect } from "react";
import axios from "axios";
import { setNotificationOn } from "./reducers/notificationReducer"
import Notification from "./components/notification";
import { useDispatch } from 'react-redux'

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const all = await axios.get(baseUrl);
      setResources(all.data);
    };
    fetchData();
  }, [baseUrl]);

  const create = async (data) => {
    const res = await axios.post(baseUrl, data);
    setResources(resources.concat(res.data));
  };

  const service = {
    create,
  };

  return [resources, service];
};

const App = () => {
  const dispatch = useDispatch()

  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    dispatch(setNotificationOn('Note added!', 5))
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
    dispatch(setNotificationOn('Person added!', 5))
  };

  return (
    <div>
      <h2>notes</h2>
      <Notification/>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
