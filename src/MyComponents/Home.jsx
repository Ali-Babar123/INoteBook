
import Notes from "./Notes";


// Home.js
const Home = (props) => {
  const {showAlert} = props;
  return (
    <div >
    <Notes showAlert={showAlert}/>
    </div>
  );
};

export default Home;