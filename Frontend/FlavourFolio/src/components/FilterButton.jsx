import { AiTwotoneStar } from "react-icons/ai";
import './filterbutton.css'

const FilterButton = ({title, onPress}) => {
  return (
    <div className="FilterButton" onClick={onPress}>
        {title}
    </div>
  );
};

export default FilterButton;
