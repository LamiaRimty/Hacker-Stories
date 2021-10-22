import React from 'react';

function getTitile(title){
  return title;
}

function App() {
 
  
  return (
    <div>
      <h1> Hello {getTitile('React')} </h1>
      <label htmlFor="search"> Search: </label>
      <input id="search" type="text"/>
    </div>
  );
}

export default App;
