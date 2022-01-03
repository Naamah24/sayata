import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import { PageContext } from '../../contexts/appContext';
//import logo from '../../static/';

function HeaderComp() {


    const [page, setPage] = useContext(PageContext);
    // const handleLinkClick = () => {
    //     setPage("submissions");
    // }

    return (        
        <AppBar sx={{
            position: "static",
            height: "95px",
            background: 'linear-gradient(36.07deg, #457378 0%, #0EABB7 55.47%, #18B4BB 74.65%, #53EAD1 100%)',
        }}
        >
            <Toolbar>
                <>
                <Box
                    sx={{
                        color: "primary",
                        fontSize: "24px",
                        fontWeight: "bold",
                        textTransform: "uppercase"
                    }}
                >
                    <Typography color="#FFFFFF" fontSize="24px" fontWeight={'bold'} >
                        {page}
                    </Typography>
                </Box>
                </>
            </Toolbar>
        </AppBar>
    )
 }

export default HeaderComp
