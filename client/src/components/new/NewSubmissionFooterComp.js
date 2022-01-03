import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { PageContext } from '../../contexts/appContext';

const SubmissionsFooterComp =function () {

  const navigate = useNavigate();
  const [page, setPage] = useContext(PageContext);

  const handleBackClick = () => {
    setPage("submissions");
    navigate('/');
  }
  
  const handleSaveAndContinueClick = (event) => {
    event.preventDefault();
    setPage("submissions");
    navigate('/');
  }
  return (
    <Box 
        sx={{
          height: "73px",
          width:"1918.86px",
          borderTop:"solid 1px #E2E2E2",

      }}>
        <Box paddingX={20}>
          <Button variant="outlined" onClick={handleBackClick}
          // sx={{
          //         ml: "1708px",
          //         mr: "30.5px",
          //         mt: "20.15px",
          //         mb: "19.81px"
          // }}
          > 
            BACK  
          </Button>
          <Button variant="containted" onClick={handleSaveAndContinueClick} type="submit"
          sx={{
                  ml: "1708px",
                  mr: "30.5px",
                  mt: "20.15px",
                  mb: "19.81px"
          }}
          >
            SAVE AND CONTINUE   
          </Button>
        </Box>
    </Box>
  );
}

export default SubmissionsFooterComp;
