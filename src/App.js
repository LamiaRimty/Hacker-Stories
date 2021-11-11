import React from 'react';

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
  const [searchTerm,setSearchTerm]=React.useState('');

  const handleSearch =(event)=>{

    setSearchTerm(event.target.value);
  };

  const searchedStories=stories.filter(story=>
   story.title.toLowerCase().includes(searchTerm.toLowerCase())
   );
  

  return(
    <div>
      <h1>My Hacker Stories</h1>
  
    <Search search={searchTerm} onSearch={handleSearch} />
    <hr/>

    <List list={ searchedStories} />
    </div>
 );
  };

  const Search=(props)=>(
    <div>
        
        <label htmlFor="search"> Search:</label> 
        <input id="search" 
        type="text"
        value={props.search} 
        onChange={props.onSearch} 
         />
       
      </div>
  
  );

  
  const List=(props)=>(
  
    <ul>
      {props.list.map((item) =>(
     
        <li key={item.objectID}>
          <span>
            <a href={item.url}>{ item.title}</a>
          </span>
          <span>{ item.author }</span>
          <span>{item.num_commnets}</span>
          <span>{item.points}</span>
  
        </li>
      ))}
    </ul>
  );
 
  

export default App;
