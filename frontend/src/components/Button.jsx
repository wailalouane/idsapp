const  Button = ({bgColor, color, size, text, borderRadius}) => {
    const handleClick = async () => {
        try {
          fetch("http://localhost:5000/fonction");
        } catch (err) {
          console.error(err);
        }
      };
    return ( 
        
        <button type='button' onClick={handleClick}
        style={{backgroundColor: bgColor, color, borderRadius}}
        className={`text-${size} p-3 hover:drop-shadow-xl `}>

            {text}
        </button>
     );
}
 
export default Button;