import { useState, useEffect, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import fileDownload from 'js-file-download'
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

import files from '../../api/files';
import submission from '../../api/submission';
import { PageContext } from '../../contexts/appContext';

function SubmissionsGridComp() {

  
const[tableData, setTableData] = useState([]);
const[uploadFile, setUploadFile] = useState();
const [page, setPage] = useContext(PageContext)
const navigate = useNavigate();

useEffect(() => {
  async function fetchMyAPI() {
    let resp = await submission.getAllSubmissions();
    setTableData(resp.data);
    //setPage("submissions");
  }
  fetchMyAPI()
},[uploadFile,tableData])

//TODO: Create helper file for files methods 

const handleClickDownload = async (event, cellValues) => {
    if (cellValues.row.signedPath !== undefined){
      let filename = cellValues.row.signedPath.replace(/^.*[\\\/]/, '');
      let filePath = cellValues.row.signedPath;
      let resp = await files.downloadDocument(filename);
      let fileExtension;
      fileExtension = filePath.split('.');
      fileExtension = fileExtension[fileExtension.length -1];
      fileDownload(resp.data, `${filename}.${fileExtension}`);
    }

};
const handleClickUpload  = async (event, cellValues) => {
  let file = event.target.files[0];
  let id = cellValues.row._id;
  let resp = await files.uploadDocument(id, "doc", file);
  setUploadFile(file.name);
};

const handleClickCell = (cellValues) => {
  if(cellValues.row.submissionStatus === 'NEW')
    setPage(`${cellValues.row.companyName} - Bind Submission`);
    navigate(`/bindsubmission/${cellValues.row._id}`);
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const columns = [
  { 
    field: '_id',
    headerName: 'SUBMISSION ID',
    type: 'string',
    flex: 1,
    headerAlign: "left",
  },
  { 
    field: 'companyName',
    headerName: 'COMPANY NAME',
    type: 'string',
    flex: 1,
    headerAlign: "left"
  },
  {
    field: 'companyAddress',
    headerName: 'PHYSICAL ADDRESS',
    type: 'string',
    flex: 1,
    headerAlign: "left"
  },

  { 
    field: 'annualRevenue',
    headerName: 'ANNUAL REVENUE',
    flex: 1,
    type: 'string',
    headerAlign: "left",
    textAlign: "left",
    valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
  },

  {
    field: 'submissionStatus',
    headerName: 'STATUS',
    flex: 1,
    headerAlign: "left"
  },
  {
    field: "submissionSigned",
    headerName: 'SIGNED APPLICATION',
    flex: 1,
    renderCell: (cellValues) => {
      if(cellValues.row.submissionSigned ){
        let filename = cellValues.row.signedPath.replace(/^.*[\\\/]/, '');
        return (
          <span>
          <Button
              variant="text"
              fontzise= "60"
              color="primary"
              size="small"
              onClick={(event) => {
                handleClickDownload(event, cellValues);
              }}
          >
             {filename}
                <FileDownloadIcon color='primary' fontSize='40' a/> 
             </Button>
          </span>
        );
      }
      return (
        <Stack>
            <input type="file" style={{display:'none'}} id="contained-button-file" onChange={(event) => handleClickUpload(event, cellValues)} />
            <Button variant="outlined" component="span" fontSize= "60" color='primary'> 
              Click here to upload   
            </Button>
        </Stack>
      );
    }
  }
];
  return (
      <Box sx={{ height: 795, width: 1, mb: 2, textAlign: 'left'}}>
          <DataGrid
            sx={{
              border: 'none',
              borderBottom: '1px solid #E2E2E2',
              textAlign: 'left',
              mt: '116px',
              ml: '30px',
              mr: '30px',
              mb: '169px'            }}
            rows={tableData}
            columns={columns}
            hideFooterPagination= {true}
            getRowId={(row) => row._id}
            headerHeight={18}
            rowHeight={80} 
            onCellClick={handleClickCell}
           />
      </Box>
  );
}
export default SubmissionsGridComp;
