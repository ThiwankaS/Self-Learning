import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'


const VisibilityFilter = (prop) => {

    const dispatch = useDispatch()

    return(
        <div>
                all 
                <input 
                    name='filter' 
                    type='radio' 
                    onChange={() => dispatch(filterChange('ALL'))}
                />
                important 
                <input 
                    name='filter' 
                    type='radio' 
                    onChange={() => dispatch(filterChange('IMPORTANT'))}
                />
                non-important 
                <input 
                    name='filter' 
                    type='radio' 
                    onChange={() => dispatch(filterChange('NONIMPORTANT'))}
                />
        </div>
    )
}
export default VisibilityFilter