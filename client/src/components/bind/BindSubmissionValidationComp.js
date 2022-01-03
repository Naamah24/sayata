import React, { useState, useContext, useEffect } from "react";
import { Grid, Typography, Box, Button, Stack} from '@mui/material';
import { useNavigate }  from 'react-router-dom';

import { PageContext } from '../../contexts/appContext';
import submission from '../../api/submission';
import files from "../../api/files";

function BindSubmissionValidationComp(props) {

    const[subData, setSubData] = useState({});
    const[newSub, setNewSub] = useState();
    const[isUploaded, setIsUploaded] = useState(false);
    const[uploadFile, setUploadFile] = useState("");
    const [page, setPage] = useContext(PageContext);
    const [bound, SetBound] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      async function fetchMyAPI() {
        let resp = await submission.getSubmissionById(props.id);
        setSubData(resp)
        let newData = {
                      compName: subData.companyName,
                      address: subData.companyAddress,
                      annualRev: subData.annualRevenue,
                      subStatus: subData.submissionStatus,
                      signed: subData.submissionSigned,
                      path: subData.signedPath
                    }
        setNewSub(newData);          
        if(subData.submissionSigned){
          setIsUploaded(true);
          setUploadFile(subData.signedPath.replace(/^.*[\\\/]/, ''));
        }
        if(subData.submissionStatus === "BOUND"){
          SetBound(true);
        }
      }
      fetchMyAPI()
    },[ bound, isUploaded, uploadFile ]);
    

    const handleBindClick = async() => {
      if(isUploaded){
        let newData = {...newSub, subStatus: "BOUND"};
        let resp = await submission.updateSubmission(newData, props.id);
        SetBound(true);
      }
      alert("Please upload a signed application before attempting to bind")

    }
    const handleDeleteClick = async() => {
      let newData = ( {...newSub, signed: false, path: ""})
      let resp = await submission.updateSubmission(newData, props.id);
      setIsUploaded(false);
    }
    const handleBackClick = () => {
      navigate('/');
    }
    const handleUploadClick  = async (event) => {
      if(bound){
        alert("Submission is already bound!")
      }
      else{

        let file = event.target.files[0];
        let resp = await files.uploadDocument(props.id, "doc", file);
        setUploadFile(file.name);
        setIsUploaded(true);
      }
    };

    return (
      <form>
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
                PLEASE REVIEW THE SUBMISSION DETAILS AND UPLOAD A SIGNED APPLICATION
            </Typography>
          </Grid>

          <Grid item xs={6} >
            <Typography>
                Submissions ID
            </Typography>
          </Grid>
          <Grid item xs={6} >
            <Typography >
                {subData._id}
            </Typography>
          </Grid>

          <Grid item xs={6} >
            <Typography>
                Company Name
            </Typography>
          </Grid>
          <Grid item xs={6} >
            <Typography >
                {subData.companyName}
            </Typography>
          </Grid>

          <Grid item xs={6} >
            <Typography>
                Address
            </Typography>
          </Grid>
          <Grid item xs={6} >
            <Typography >
                {subData.companyAddress}
            </Typography>
          </Grid>
          <Grid item xs={6} >
            <Typography>
                Annual Revenues
            </Typography>
          </Grid>
          <Grid item xs={6} >
            <Typography >
                {subData.annualRevenue}
            </Typography>
          </Grid>
          <Grid item xs={12} >
            <Box 
              sx={{
                height: "68px",
                width: "627px",
                border: "1px solid #B7B7B7",
                radius: "4px 4px 0 0",
                background: "#F6F6F6"
              }}
            >
              <Typography
                sx={{
                  height: "18px",
                  width: "220px",
                  color: "#5E5E5E",
                  fontFamil:  "Open Sans",
                  fontSize: "17px",
                  fontWeight: "600",
                  spacing: "0",
                  lineHeight: "23px"
                }}

              >
                APPLICATION
              </Typography>
              <Typography
                  sx ={{ 
                    height: "15px",
                    width: "312px",
                    color: "rgba(29,43,48,0.74)",
                    fontFamily:  "Open Sans",
                    fontSize: "12px",
                    fontWeight: "600",
                    spacing: "0",
                    lineHeight: "15px"
                  }}
              >
                Click on the button below to upload the sign application

              </Typography>
            </Box>
            <Box component="span">
              <Stack spacing={8} direction={"row"}
                sx={{
                height: "68px",
                width: "627px",
                border: "1px solid #B7B7B7",
                }}
              >
                <Stack marginX={2} marginY={2}>
                  <input type="file" id="contained-button-file" style={{display:'none'}} onChange={(event) => handleUploadClick(event)} />
                  <label htmlFor="contained-button-file">
                    <Button variant="containted" component="span" 
                        sx={{
      
                                background: "#0EABB7",
                                color: "#FFFFFF",
                                radius: "6px",
                                width: "226px",
                                height: "30px",
                        }}
                        >
                        UPLOAD APPLICATION   
                      </Button> 
                    </label>
                </Stack>
                <Button variant="outlined" onClick={handleDeleteClick}  
                  sx={{
                    height: "23px",
                    width: "89px",
                    border:" 1px solid #919191",
                    opacity: "0.47",
                    radius: "14px",
                    fontSize: "11px",
                    color: "#5E5E5E",
                    textTransform: "lowercase",

                  }}
                > {isUploaded? uploadFile : "no files"} 
                </Button>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} >
              <Box 
                sx={{
                  height: "73px",
                  width:"1918.86px",
                  borderTop:"solid 1px #E2E2E2",
                  mt:"1007px"

                 }}>
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" onClick={handleBackClick}
                    sx={{
                            ml: "1708px",
                            mr: "30.5px",
                            mt: "20.15px",
                            mb: "19.81px"
                    }}
                    > 
                      BACK  
                    </Button>
                    <Button disabled={bound} variant="containted" color="primary" onClick={handleBindClick}
                      sx={{
                              ml: "1708px",
                              mr: "30.5px",
                              mt: "20.15px",
                              mb: "19.81px"
                      }}
                      >
                      BIND SUBMISSION   
                    </Button>
                    
                  </Stack>
                </Box>
          </Grid>
        </Grid>
      </form>
    );
}

export default BindSubmissionValidationComp