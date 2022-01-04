import React from 'react';
import axios from 'axios';
import './App.css';
import { ReactComponent as Check } from './check.svg';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query= ';

const useSemiPersistentState = (key, initialState) => { //save & get
   
  const isMounted=React.useRef(false);

  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState //search box e '' likha thakbe

  );

  React.useEffect(() => {
  
    if(!isMounted.current)
    {
      isMounted.current=true;
    }

    else{
      localStorage.setItem(key,value);
    }
  },[value, key]); //1st argu=sideeffect occures

  return [value, setValue];
};




const storiesReducer = (state, action) => {

  switch (action.type) {

    case 'STOREIS_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case 'STORIES_FETCH_SUCCESS':

      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,

      };

    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          story => action.payload.objectID !== story.objectID
        ),
      };

    default:
      return {
        ...state,

      };
    //throw new Error();
  }
};

const getSumComments=stories=>{
 
  return stories.data.reduce(
  (result,value)=>result+value.num_comments,
  0
  );
};

const App = () => {

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');
  const [url, setUrl] = React.useState(
    `${API_ENDPOINT} ${searchTerm}`
  );

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }

  );
  const handleFetchStories = React.useCallback(async () => {

    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const result = await axios.get(url); //ca;; http req,set a call

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,  //when res calls knowing comes back as json already
      });
    }
    catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [url]);


  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory =React.useCallback(
    item => {
      dispatchStories({
        type: 'REMOVE_STORY',
        payload: item,
      });
    },[]);
 

  const handleSearchInput = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT} ${searchTerm} `);
    event.preventDefault();
  };

  const sumComments=React.useMemo(()=>getSumComments(stories),
   [stories,]);


  return (
    <div className="container">
     <h1>My Hacker Stories with {sumComments} comments.</h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      <hr />
      {stories.isError && <p>Something went wrong...</p>}
      {
        stories.isLoading ? (
          <p>Loading...</p>
        ) : (
          <List list={stories.data}
            onRemoveItem={handleRemoveStory}
          />
        )
        }

    </div>
  );
};

const SearchForm = ({
  
  searchTerm,
  onSearchInput,
  onSearchSubmit,

}) => (

  <form
   onSubmit= {onSearchSubmit}
   className='search-form' >
    <InputWithLabel
      id="search"
      value={searchTerm}
      isFocused
      onInputChange={onSearchInput}
    >
      <strong>Search:</strong>

    </InputWithLabel>

    <button
      type="submit"
      disabled={!searchTerm}
      className="button button_large"
    >
      Submit
    </button>
  </form>
);

const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children,

}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused) {

      inputRef.current.focus();
    }
  }, [isFocused]);
  //console.log('B:App');

  return (
    <>
      <label htmlFor={id} className="label"> 
        {children}
      </label>
      &nbsp;

      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
        className="input"
      />
    </>
  );

};




const List = React.memo(
  ({ list, onRemoveItem }) =>
   //console.log('B:List')||
    list.map(item => (
      <Item
        key={item.objectID}
        item={item}
        onRemoveItem={onRemoveItem}
      />))
      
  );


const Item = ({ item, onRemoveItem }) => (


  <div className="item">
    <span style={{width:'40%'}} >

      <a href={item.url}>{item.title}</a>
    </span>

    <span style={{width:'30%'}} >{item.author}</span>
    <span style={{width:'10%'}} >{item.num_commnets}</span>
    <span style={{width:'10%'}} >{item.points}</span>
    <span style={{width:'10%'}} >
    
         <button
        type="button"
        onClick={() => onRemoveItem(item)}
        className="button button_small"
      >
     <Check height="18px" width="18px"/>
      </button>
    </span>
  </div>
);
export default App;