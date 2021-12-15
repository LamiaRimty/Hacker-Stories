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

  const initialStories = [
  
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

 const [ stories,setStories ]= React.useState(initialStories)
 
  const handleRemoveStory =item =>{

    const newStories = stories.filter(

    story=>item.objectID!=story.objectID
    
    );

    setStories(newStories);
  };


  const handleSearch =(event)=>{

    setSearchTerm(event.target.value);
  }
  const searchedStories=stories.filter(story=>
   story.title.toLowerCase().includes(searchTerm.toLowerCase())
   );
  

  return(
    <div>
      <h1>My Hacker Stories</h1>
      <InputWithLabel
      id="search"
      value={searchTerm}
      isFocused
      onInputChange={handleSearch}
    >
      <strong>Search:</strong>
      </InputWithLabel>
    <hr/>
    <List list={ searchedStories} onRemoveItem={handleRemoveStory}/>
    </div>
 );
}

 const InputWithLabel=({
 id,
 value,
 type='text',
 onInputChange,
 isFocused,
 children,

}) =>{
    const inputRef=React.useRef();

  React.useEffect(()=> {
    if(isFocused){

    inputRef.current.focus();
  }
 },[isFocused]);
  
  return(
    <>
    <label htmlFor={id}>{children}</label>
  &nbsp;
  <input
  ref={inputRef}
  id={id}
  type={type}
  value={value}
  onhange={onInputChange}
  />
  </>
  );
  
 };

  

      
  const List=({list,onRemoveItem})=>
  
    list.map(item=> 
    <Item 
    key={item.objectID} 
    item={item}
    onRemoveItem={onRemoveItem}
    />);
     
      const Item=({item,onRemoveItem})=>{
        function handleRemoveItem(){
        onRemoveItem(item);
        }
      return(
        <div>
          <span>

            <a href={item.url}>{ item.title}</a>
          </span>
          <span>{ item.author }</span>
          <span>{item.num_commnets}</span>
          <span>{item.points}</span>
          <span>
            <button
             type="button" 
             onClick={()=>{onRemoveItem(item);
            }} 
            >
            Dissmiss
            </button>
          </span>
        </div>
      );
      }
export default App;
