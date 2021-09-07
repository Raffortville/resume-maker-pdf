import React from 'react'

const PreviewList = props => {

    const {items, title} = props
    console.log(items)

    return (
        <>
            <h3 style={{textAlign: 'center'}}>{title}</h3>
            <ul>
                {items.map((item, i) =>
                    <li key={i}> 
                        {item}
                    </li>
                )}
            </ul>
        </>
    )
}

export default PreviewList