import React, { useContext, useEffect } from "react";

import NoteContext from "../context/NoteContext";

const About = () => {
    // const a = useContext(NoteContext)
    // useEffect(()=>{
    //   a.update();
    // },[])
  return (
    <div>
      this is about page
     {/* this is about {a.state.name} and he is in class {a.state.Class}  */}
    </div>
  );
};

export default About;
