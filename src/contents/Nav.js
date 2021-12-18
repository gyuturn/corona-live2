import React from 'react'
import { Link,useHistory } from "react-router-dom";
import { useEffect, useState } from 'react'



const Nav = () => {
    

    return(
        <nav className="nav">
            <ul id="country">
                <Link to="/korea" className="nation" id="korea"><li >국내</li></Link>
                <Link to="/japan" className="nation" id="japan"><li >일본</li></Link>
                <Link to="/spain" className="nation" id="spain"><li>스페인</li></Link>
                <Link to="/germany" className="nation" id="germany"><li >독일</li></Link>
                <Link to="/brazil" className="nation" id="brazil"><li >브라질</li></Link>
                <Link to="/france" className="nation"id="france"><li >프랑스</li></Link>
                <Link to="/portugal" className="nation" id="portugal"><li >포르투갈</li></Link>
            </ul>
            

        </nav>
    )
}

export default Nav