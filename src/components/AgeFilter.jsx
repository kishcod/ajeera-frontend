import React from "react";
export default function AgeFilter({age,setAge}){
  return (
    <div style={{textAlign:'center',padding:20}}>
      <label>Age: {age}</label><br/>
      <input type="range" min="16" max="60" value={age}
        onChange={e=>setAge(e.target.value)} />
    </div>
  )
}