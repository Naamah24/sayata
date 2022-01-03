import { useContext } from 'react'
import styled from '@emotion/styled';
import { PageContext } from '../../contexts/appContext'
import HeaderComp from './HeaderComp';


export default function LayoutComp({ children }) {
    const [page] = useContext(PageContext);

    return (
        <div style={{width: "1920px", height: "1080px"}}>
            <>
                <HeaderComp/>
                     { children }
            </>


        </div>
    )
}
