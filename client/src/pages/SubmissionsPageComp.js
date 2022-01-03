import { Grid } from '@mui/material';
import React from 'react';

import SubmissionsGridComp from '../components/submissions/SubmissionsGridComp';
import SubmissionsFooterComp from '../components/submissions/SubmissionsFooterComp';

function SubmissionsPageComp() {
    
    return (
        <>
        <Grid container height={1080} width={1920}>
            <Grid item xs={2} sm={4} md={6} lg={12}>
                <SubmissionsGridComp/> 
            </Grid>
        </Grid>
        <SubmissionsFooterComp/>
        </>
    );
}
export default SubmissionsPageComp;

