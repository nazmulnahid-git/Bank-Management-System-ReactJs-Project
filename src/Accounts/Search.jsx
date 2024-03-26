import React, { useEffect, useState } from 'react'
const design = {
  div : {
    textAlign : "right",
    
  },
  input : {
    height : "20px"
  }
}


const Search = (props) => {
  const [acc,setAcc] = useState ('')
  const handleChange =  (e) => {
    setAcc(e.target.value);
  }
  useEffect(() => {
    props.pass(acc);
  }, [acc]);
  return (
    <div style={design.div}>
      <input
        type="text"
        placeholder='Enter Account Number'
        style={design.input}
        value = {acc}
        onChange={handleChange}
      />
    </div>
  )
}

export default Search
