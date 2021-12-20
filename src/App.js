import React from 'react';

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

const getAsyncStories =()=>  //simulate 3rd party api
new Promise ((resolve,reject)=>
  setTimeout(reject,2000)
  ); 

const useSemiPersistentState=(key,initialState)=>{ //save & get

  const [ value, setValue ] = React.useState(
    localStorage.getItem(key) || initialState //search box e '' likha thakbe
    
  );

  React.useEffect(()=>
  {
    localStorage.getItem(key,value);
  },
    [value,key]); //1st argu=sideeffect occures
  
   
  return [value,setValue];
};



const storiesReducer=(state,action)=>{
 
 switch (action.type){

   case 'SET_STOREIS_INT':
   return //retun wht stories inside of an action
 {
   ...state,
   isLoading:true,
   isError:false,
 };
  
 case 'STORIES_FETCH_SUCCESS':

return{
...state,
isLoading:false,
isErrorL:false,
data:action.payload,

};

case 'STORIES_FETCH_FAILURE':
  return{
    ...state,
    isLoading:false,
    isError:true,
  };

  case 'REMOVE_STORY':
    return{ 
      ...state,
    state.data.filter(
      story=>action.payload.objectID!==story.objectID

    ),
    };

default:

throw new Error();

  }
};

const App=()=>{

   
  const [ searchTerm ,setSearchTerm]=useSemiPersistentState('search','React');
 const [ stories,dispatchStories ]= React.useReducer( 
   storiesReducer,
   {data:[] ,isLoading: false , isError:false}
   
   );
 


 
 React.useEffect(()=>{
  dispatchStories({ type:'STORIES_FETCH_INT'});

   getAsyncStories()
   .then(result=>{ //set a call
     dispatchStories({
       type:'STORIES_FETCH_SUCCESS',
       payload: result.data.stories,
      });

    })
   .catch(()=>
        dispatchStories({ type: 'STORIES_FETCH_FAILURE'})
   );
      },[]);

  const handleRemoveStory =item =>{

    
  dispatchStories({
    type:'REMOVE_STORY',
    payload:item,
  });
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
    { stories.isError && <p>Something went wrong</p> }
    {
      stories.isLoading?(<p>Loading...</p>):( <List list={ searchedStories} onRemoveItem={handleRemoveStory}/>
        )
    }

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
  onChange={onInputChange}
  />
  </>
  );
  
 };

  

      
  const List=({list,onRemoveItem})=>
  
    list.map(item=> (
    <Item 
    key={item.objectID} 
    item={item}
    onRemoveItem={onRemoveItem}
    />));
     
      const Item=({item,onRemoveItem})=>(
       

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
             onClick={()=>onRemoveItem(item)}
             
            >
            Dismiss
            </button>
          </span>
        </div>
      );
export default App;
