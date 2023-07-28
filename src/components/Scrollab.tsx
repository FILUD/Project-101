// components/ScrollableTabsButtonAuto.tsx
import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';


const Scrollab: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
    <center>

    <Box sx={{ maxWidth: { xs: 720, sm: 'fit-content' }, bgcolor: 'background.none' }}>
        
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{
          '& .MuiTabs-scroller': {
            '& .MuiTab-root': {

              color: 'white', // Modify the text color
              backgroundColor: '#1A5D1A', // Modify the background color of the tabs
              '&.Mui-selected': {
                backgroundColor: '#F1C93B', // Modify the background color of the selected tab
              },
              '&:hover': {
                backgroundColor: '#F1C93B', // Modify the background color on hover
              },
            },
          },
        }}
      >
        
        <Tab label={<Link to="/home" className='text-tap' >Home</Link>} />
        <Tab label={<Link to="/about" className='text-tap' >About</Link>} />
        <Tab label={<Link to="/myprofile" className='text-tap' >Profile</Link>} />

      </Tabs>
      
    </Box>
    </center>
    </div>
  );
};

export default Scrollab;
