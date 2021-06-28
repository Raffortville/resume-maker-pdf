import React from 'react'
import {Chip} from '@material-ui/core'

const previewChips = props => {

    const {previews} = props

    return (
        <>
            {previews.map((e, i) =>
                e.chips.length > 0 &&
                <>
                    <h3 style={{textDecoration:'underline'}}>{e.title}</h3>
                    <div className='preview-card' key={i}>
                        {e.chips.map((j, idx) =>
                            <Chip
                                key={idx}
                                style={{color:'#574b90', margin:'5px 5px'}} variant="outlined" 
                                label={j}
                                onDelete={() => console.log('delete')} 
                            />
                        )}
                    </div>
                </>
            )}
            
        </>
    )
}

export default previewChips

