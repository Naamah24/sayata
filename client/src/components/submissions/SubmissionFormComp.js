import React, { useState, useContext } from "react";
import { Grid, TextField, Typography, Box, Button} from '@mui/material';
import { useNavigate }  from 'react-router-dom';

import { PageContext } from '../../contexts/appContext';
import submission from '../../api/submission';

const defaultValues = {
    compName: "",
    address: "",
    annualRev: "",
    subStatus:"",
    signed:"",
    path:""
};


function SubmissionForm() {

    const [companyName, setCompanyName] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [revenue, setRevenue] = useState("");
    const [page, setPage] = useContext(PageContext);
    const navigate = useNavigate();

    const handleBackClick = () => {
      navigate('/');
    }
    const handleSaveAndContinueClick = (event) => {
      event.preventDefault();
      let newSub = {
        compName: companyName,
        address: `${address1} - ${address2}`,
        annualRev: revenue,
        subStatus: "NEW",
        signed: false,
        path: ""
      }
      let resp = submission.addSubmission(newSub);
      setPage("submissions");
      navigate('/');
    }

    return (
      <form onSubmit={handleSaveAndContinueClick}>
        <Grid container direction="row" spacing={5}>
          <Grid item xs={12}>
            <Typography 
                gutterBottom 
                component="div" 
                fontSize={"12px"} 
                fontFamily={"OpenSans"} 
                fontWeight={600} 
                color={"#42767C"} 
                borderColor={"#B7B7B7"} 
                borderBottom={"1px solid"} 
                marginTop={"20px"}
            >
                PLEASE FILL IN THE FOLLOWING FIELDS
            </Typography>
          </Grid>
          <Grid item xs={6} >
             <TextField
                onChange={(e) => setCompanyName(e.target.value)}
                label="Company Name"
                id="compName"
                fullWidth             />
           </Grid>

           <Grid item xs={6} >
            <TextField 
                onChange={(e) => setRevenue(e.target.value)}
                label="Annual Revenue" 
                id="annualRev" 
                fullWidth            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h4" component="div" borderBottom={"1px solid"} color={'#B7B7B7'}>
            </Typography>
          </Grid>

          <Grid item xs={6} >
             <TextField
                onChange={(e) => setAddress1(e.target.value)}
                label="Physical address"
                id="addressMain"
                fullWidth
            />
            </Grid>

            <Grid item xs={6} >
                <TextField
                    onChange={(e) => setAddress2(e.target.value)}
                    id="addressSecondary" 
                    fullWidth                />
            </Grid>
            <Grid item xs={12} >
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
          </Grid>
        </Grid>
      </form>
    );
}

export default SubmissionForm