//its a front page when anyone visit the website will see this page first

import NotesComponent from "./NotesComponent";

const Home = (props) => {

  // we have used alert component by passing a props using destructing method 
  const {showAlert} = props;
  return (
    <div>
      <NotesComponent showAlert={showAlert}/>
    </div>
  );
};

export default Home