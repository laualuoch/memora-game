import { ArrowCounterclockwise } from 'react-bootstrap-icons';

const PrimaryButton = ({onClick}) => {
        return (
          <button 
            type="button" 
            className="btn btn-warning" 
            onClick={onClick}>
            <ArrowCounterclockwise />
                Replay
          </button>
        );
}

export default PrimaryButton;