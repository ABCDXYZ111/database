import { useState, useEffect } from 'react';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {setData(data);})
      .catch(error => console.error(error));
  }, []);
  console.log(data);
  return (
    <ul>
      {data.map(item => <li key={item.id}>{item.name}</li>)}
      {data.map(item => <li key={item.id}>{item.email}</li>)}
    </ul>
  );
}
