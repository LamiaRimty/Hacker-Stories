import React from 'react';


const list = [
  
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

function App(){
 return (
   <div>
     
     <h1>My Hacker Stories</h1>
    <label htmlFor="search" >Search</label>
    <input id="search" type="text"/>

    <hr/>
  <List/> 
  
</div>

 );

}

function List() {
  return (

    <ul>
    {list.map(function(item) //returns a new array containing the results of calling a function on every element in this array
    {  
     return( 
       <li key={item.objectID}>
       <span>
        <a href={item.url}>{item.title}</a>
       </span>
       <span>{item.author}</span>
       <span>{item.num_commnets}</span>
       <span>{item.points}</span>


      </li>
     );
    })}
 </ul>

  );
}


const App=()=>(
 
    <div>
      <h1>My Hacker Stories</h1>

    <label htmlFor="search" >Search: </label>
    <input id="search" type="text" ></input>
    <hr/>
    <List/>
    </div>
  
);
  
  const list=()=>
     list.map(item =>(
     
        <div key={item.objectID}>
          <span>
            <a href={item.url}>{ item.title}</a>
          </span>
          <span>{ item.author }</span>
          <span>{item.num_commnets}</span>
          <span>{item.points}</span>
  
        </div>
     ));
 
  

export default App;
