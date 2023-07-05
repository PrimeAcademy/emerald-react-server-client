import { useState, useEffect } from 'react';
// import React from 'react';
// const useState = React.useState;
import axios from 'axios';

function App () {
 
  const [creatureList, setCreatureList] = useState([
    {name :'Unicorn', origin: 'Britain'},
    {name : 'Sphinx', origin: 'Egypt'},
    {name: 'Jackalope', origin: 'America'}
  ]);
  const [creatureNameInput, setCreatureNameInput ] = useState('');
  const [creatureOriginInput, setCreatureOriginInput] = useState('');
  
  const fetchCreatures = () => {
    /* Alternative syntax for axios call:
    axios.get('/creature')
    .then(...)
    */
    axios({
      method: 'GET',
      url: '/creature'
    }).then( response => {
      // response.data is where the server response data we care about is
      console.log('response is: ', response.data);
      setCreatureList(response.data);
    }).catch(error =>{
      console.log('error with fetchCreatures: ', error);
    });
  }

  // Hook into the React lifecycle and run fetchCreatures when
  // this component loads 
  // React equivalent to jQuery's onReady()
  useEffect(() => {
    fetchCreatures();
  }, []);
  // ^ The empty array is saying that this should only run once, 
  // when the component loads

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitted!');

    axios({
      method: 'POST',
      url: '/creature',
      data: {
        name: creatureNameInput,
        origin: creatureOriginInput
      }
    }).then(response => {
      fetchCreatures();
      // Clear inputs
      setCreatureNameInput('');
      setCreatureOriginInput('');
    }).catch(error => {
      console.log('Error with post creature: ', error);
    });
  }


  return (
    <div>
      <form>
        <input placeholder='Creature name' onChange={(event) => setCreatureNameInput(event.target.value)} value={creatureNameInput} />
        <input placeholder='Creature origin' onChange={(event) => setCreatureOriginInput(event.target.value)} value={creatureOriginInput} />
        <button onClick={handleSubmit}>Add new creature</button>
      </form>

      <ul>
        {creatureList.map(creature => (
          <li key={creature.name}>
            {creature.name} is from {creature.origin}
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App
