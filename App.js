import React,{ useState } from 'react';

function App() {
//State to keep track of the count
const [count, setCount] = useState(0);

//function to increment the counter
const increment =()=>{
   setCount(count+1);
};

return(
   <div>
     <h1>Counter:{count}</h1>
     <button onClick={increment}>Increment</button>
   </div>
);
}
export default App;
