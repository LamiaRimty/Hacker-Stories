import React from 'react';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query= ';


const useSemiPersistentState = (key, initialState) => { //save & get

  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState //search box e '' likha thakbe

  );

  React.useEffect(() => {
    localStorage.getItem(key, value);
  },
    [value, key]); //1st argu=sideeffect occures


  return [value, setValue];
};



const storiesReducer = (state, action) => {

  switch (action.type) {

    case 'STOREIS_FETCH_INT':
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


    default:

      return {
        ...state,

      };

    //throw new Error();

  }
};


const App = () => {


  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }

  );




  React.useEffect(() => {
    if (!searchTerm)
      return

    dispatchStories({ type: 'STORIES_FETCH_INT' });


    fetch(`${API_ENDPOINT}${searchTerm}`)
      .then(response => response.json())
      .then(result => { //set a call
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits,
        });

      })
      .catch(() =>
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
      );
  }, [searchTerm]);

  const handleRemoveStory = item => {


    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };


  const handleSearch = event => {

    setSearchTerm(event.target.value);
  };

  return (
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

  return (
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




const List = ({ list, onRemoveItem }) =>

  list.map(item => (
    <Item
      key={item.objectID}
      item={item}
      onRemoveItem={onRemoveItem}
    />));

const Item = ({ item, onRemoveItem }) => (


  <div>
    <span>

      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_commnets}</span>
    <span>{item.points}</span>
    <span>
      <button
        type="button"
        onClick={() => onRemoveItem(item)} >
        Dismiss
      </button>
    </span>
  </div>
);
export default App;
