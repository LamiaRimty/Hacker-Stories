import React from 'react';

const useSemiPersistentState=(key,initialState)=>{ //save & get

  const [ value, setValue ] = React.useState(
    localStorage.getItem(key) || initialState //search box e '' likha thakbe
    
  );

  React.useEffect(()=>
  {
    localStorage.getItem(key,value);
    console.log(value)
  },
    [value,key]); //1st argu=sideeffect occures
  
   
  return [value,setValue];
};


const App=()=>{

  const stories = [
  
    {
      title:'React',
      url: 'https://reactjs.org/',
      author : "Jordan Walke",
      num_commnets: 3,
      points : 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redus.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_commnets: 2,
      points: 5,
      objectID: 1,
  },
  ];
  
  const [ searchTerm ,setSearchTerm]=useSemiPersistentState('search','React');

 
 
  
  const handleSearch =(event)=>{

    setSearchTerm(event.target.value);
 
  };

  const searchedStories=stories.filter(story=>
   story.title.toLowerCase().includes(searchTerm.toLowerCase())
   );
  

  return(
    <div>
      <h1>My Hacker Stories</h1>
      <InputWithLabel
      id="search"
      label="Search"
      value={searchTerm}
      onInputChange={handleSearch}
    />
    <hr/>
    <List list={ searchedStories} />
    </div>
 );
  }
 const InputWithLabel=({
 id,
 label,
 value,
 type='text',
 onInputChange,
})=>(

  <>
  <label htmlFor={id}>{label}</label>
  &nbsp;
  <input
  id={id}
  type={type}
  value={value}
  onchange={onInputChange}
  />
  </>
 );

  

      
  const List=({list})=>
  
    list.map(item=> <Item key={item.objectID} item={item}/>);
     
      const Item=({item})=>(
        <div>
          <span>

            <a href={item.url}>{ item.title}</a>
          </span>
          <span>{ item.author }</span>
          <span>{item.num_commnets}</span>
          <span>{item.points}</span>

        </div>
    );  
     
export default App;
