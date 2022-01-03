import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import { useContext } from 'react';
import { PageContext } from '../../contexts/appContext';


const SubmissionsFooterComp =function () {

  const navigate = useNavigate();
  const [page, setPage] = useContext(PageContext);

  const handleNewClick = () => {
    setPage("New - Create Submission");
    navigate('/newsubmission');
  }
  return (
    <Box 
        sx={{
          height: "73px",
          width:"1918.86px",
          borderTop:"solid 1px #E2E2E2",

      }}>
      <Button variant="containted" onClick={handleNewClick}
        sx={{
            fontSize: "14px",
            background: '#0EABB7',
            size: "medium",
            textTransform:'capitalize',
            hover: 'none',
            width: '181px',
            ml: "1708px",
            mr: "30.5px",
            mt: "20.15px",
            mb: "19.81px"
            }}
            >
            <AddBoxTwoToneIcon color='rgba(0,0,0,0.3)' variant="contained" /> 
            new submission
      </Button>
    </Box>
  );
}

export default SubmissionsFooterComp;
