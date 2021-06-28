import React from 'react'
import {Chip} from '@material-ui/core'

const previewChips = props => {

    const {previews} = props

    return (
        <>
            {previews.map((e, i) =>
                e.chips.length > 0 &&
                <div key={i} style={{marginBottom:'20px'}}>
                    <h3 style={{textDecoration:'underline'}}>{e.title}</h3>
                    <div className='preview-card' >
                        {e.chips.map((j, idx) =>
                            <Chip
                                key={idx}
                                style={{color:'#596275', margin:'5px 5px'}} variant="outlined" 
                                label={j}
                                onDelete={() => e.delete(j)} 
                            />
                        )}
                    </div>
                </div>
            )}
            
        </>
    )
}

export default previewChips

