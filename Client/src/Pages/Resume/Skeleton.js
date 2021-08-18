import React from 'react'
import { Button , Tooltip} from '@material-ui/core'
import { useHistory } from 'react-router'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import PreviewChips from '../../Components/Resume/Form/PreviewChips'

import './Resume.css'

const Skeleton = ({children, ...props}) => {

    const {mainTitle, next, previewChips} = props
    const history = useHistory()


    return (
    <div className='root-container skeleton'>
        <div style={{ width:'400px'}}>
            <h2 className='form-main-title'>{mainTitle}</h2>
        </div>
        <div className='form-container' style={{width:'400px', margin:' 30px  0px 0px 50px'}}>
            {children}
        </div>
        <div style={{ width:'400px', marginTop:'30px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between'}}>
            <div>
                <h3 className='form-title' style={{paddingTop:'20px', textAlign:'center'}}>Preview</h3>
                {previewChips &&
                    <div style={{marginTop:'30px', width:'370px'}}>
                        <PreviewChips previews={previewChips}/>
                    </div>
                }
            </div>
           
            {next && next !== '' && 
                <div> 
                    <Tooltip title='Pass and go without saving'>
                        <Button 
                            endIcon={<ArrowForwardIcon style ={{color:'#574b90'}}/>} 
                            style ={{color:'#574b90', fontWeight:'600'}}
                            onClick={()=>  history.push(next)}
                        >
                            Next
                        </Button>
                    </Tooltip>
                </div>
            }
        </div>
        
    </div>
    )
}

export default Skeleton