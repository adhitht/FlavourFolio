import { AiTwotoneStar } from "react-icons/ai";
import './filterbutton.css'

const FilterButtonUnselec = ({title, onPress}) => {
  return (
    <div className="FilterButtonUnselec" onClick={onPress}>
        {title}
    </div>
  );
};

const FilterButtonSelec = ({title, onPress}) => {
  return (
    <div className="FilterButtonSelec" onClick={onPress}>
        {title}
    </div>
  );
};

export { FilterButtonSelec, FilterButtonUnselec} ;
