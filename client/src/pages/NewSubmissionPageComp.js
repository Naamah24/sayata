import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material'
import SubmissionFormComp from '../components/submissions/SubmissionFormComp';
import NewSubmissionFooterComp from '../components/new/NewSubmissionFooterComp';


function NewSubmissionPageComp() {

    return (
        <Grid containter
            sx={{
            mt: '119px',
            ml: '50.3px',
            width: '886px'
            }}>
            <Grid item  xs={2} sm={4} md={6} lg={12} >
                <Box
                    sx={{
                        width: "1920px",
                        heigth: "74px",
                        mt: "119px",
                        gutterBottom: "true",
                        borderBottom: "1px solid"
                    }}
                    >
                    <Typography fontSize={"33px"} component="div" mt={"30.44px"} ml={"49.4px"} mb={"39px"} fontWeightLight color={'#457378'}>
                        Basic Information
                    </Typography>
                </Box>
            </Grid>
            <Grid item >
                <SubmissionFormComp/>
            </Grid>
        </Grid>
    );
}
export default NewSubmissionPageComp;

