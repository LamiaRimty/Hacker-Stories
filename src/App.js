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
  const [searchTerm , setSearchTerm ]=React.useState('React');  //search box e React likha thakbe

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

  const Search=({ search,onSearch })=>( //concise to block body

    //again block to concise body
  
    <div>
        
        <label htmlFor="search"> Search:</label> 
        <input id="search" 
        type="text"
        value={search} //search box e likha thakbe
        onChange={ onSearch} //search ta change & new add kra jabe
      
        />
       
      </div>
    
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
