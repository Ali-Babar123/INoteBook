
function Alert(props) {
    const UpperCase = (word) =>{
        let lower = word.toLowerCase();
          return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
      props.alert && 
      <div className="alert alert-success alert-dismissible fade show" role="alert">
        <strong>{UpperCase(props.alert.tp)}</strong>: {props.alert.msg}
      </div>
    );
  }
  
  export default Alert;
  