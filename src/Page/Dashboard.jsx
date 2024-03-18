import Typography from '@material-ui/core/Typography';
//import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './dashboard.css';
import {  makeStyles } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Card } from 'antd';
import axios from 'axios';
import { useEffect , useState  } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import Man3Icon from '@mui/icons-material/Man3';
import { AgeBarChart, SexBarChart } from '../Components/UserChart';


const useStyles = makeStyles((theme) => ({
    customGrid: {
        height: '500px', // Adjust the height as needed
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        cursor: 'pointer',
       
      },
      paper2: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, auto)', 
        gap: '10px', 
        cursor: 'pointer',
       
      },
      paper3:{
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        display: 'grid',
        cursor: 'pointer',
       
    },
    customH3: {
        fontSize: '42px',  
        fontFamily: 'poppins, sans-serif',
        color:'#265380',
    },
    customSubtitle: {
        fontSize: '15px', 
        textAlign: 'center',
        fontFamily: 'poppins, sans-serif',
      },
    
    }));

    function Dashboard() {
        const classes = useStyles();
        const [userData, setUserData] = useState([]);
        //const [answerCounts, setAnswerCounts] = useState({});
        const [userSexes, setUserSexes] = useState({
          Male: 0,
          Female: 0,
          Other: 0,
        });
        const [ageRanges, setAgeRanges] = useState({
            '0-10': 0,
            '11-20': 0,
            '21-30': 0,
            '31-40': 0,
            '41-50': 0,
            '51+': 0,
          });
        useEffect(() => {
            const fetchData = async () => {
              try {
                const response = await axios.get("http://127.0.0.1:5000/api/users");
                const userDataArray = JSON.parse(response.data.users);
        
                // Extracting user_age, user_sex, and counting total number of users
                setUserData(userDataArray);
                const maleCount = userDataArray.filter(user => user.user_sex === 'Male').length;
                const femaleCount = userDataArray.filter(user => user.user_sex === 'Female').length;
                const otherCount = userDataArray.filter(user => user.user_sex === ' ').length;
                setUserSexes({ Male: maleCount, Female: femaleCount, Other: otherCount });
              // Calculate counts for age ranges
            const ageRangeCounts = {
              '0-10': 0,
              '11-20': 0,
              '21-30': 0,
              '31-40': 0,
              '41-50': 0,
              '51+': 0,
            };

            userDataArray.forEach(user => {
              const age = user.user_age;
              if (age <= 10) ageRangeCounts['0-10']++;
              else if (age <= 20) ageRangeCounts['11-20']++;
              else if (age <= 30) ageRangeCounts['21-30']++;
              else if (age <= 40) ageRangeCounts['31-40']++;
              else if (age <= 50) ageRangeCounts['41-50']++;
              else ageRangeCounts['51+']++;
            });
            setAgeRanges(ageRangeCounts);

           // Count users with eye symptoms
           

      
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

         
    
        fetchData();
      }, []);
       
      


    return (
       <>  
          <div className ="Fonthead"><h1>Dashboard</h1>
                         <div className = "subtext"> 
                             Home / Dashboard
                         </div>
          </div>
          <Card style={{height: '800px', padding:'30px'}} className='card'>
             <Grid container spacing={3} className={classes.customGrid} >

                 < Grid item xs={3} sm={3}>
                        <Paper className={classes.paper}  elevation={2} 
                        sx={{ borderRadius: '10px', 
                        boxShadow: '0px 3px 10px #DFE4F7' ,   
                        border: '1px solid #bebebe', 
                        display: 'flex', 
                        alignItems: 'center', 
                        padding: '10px' }}>
                        <PersonIcon style={{  color: '#2c3d78', fontSize: '60px',marginLeft:'40px',marginRight: '60px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                           
                            <Typography variant="h3" className={classes.customH3}>{userData.length}</Typography>
                            <Typography variant="subtitle1" style={{ textAlign: 'center' }} className={classes.customSubtitle}>User</Typography>
                        </div>
                        </Paper>
                 </Grid>

                 < Grid item xs={6} sm={6}>
                      
                         <Paper className={classes.paper2}  elevation={2} 
                         sx={{ borderRadius: '10px' , 
                         boxShadow: '0px 3px 10px #DFE4F7' ,   
                         border: '1px solid #bebebe',
                         display: 'flex', 
                         alignItems: 'center', 
                         padding: '10px' }}> 
                           <ManIcon style={{  color: '#2c3d78', fontSize: '60px',marginLeft:'45px',marginRight: '20px' }} />
                             
                             <div style={{ display: 'flex', flexDirection: 'column' }}>
                           
                                 <Typography variant="h3" style={{  color: '#2c3d78'}}  className={classes.customH3}>{userSexes.Male}</Typography>
                                 <Typography variant="subtitle1" style={{ textAlign: 'center' }} className={classes.customSubtitle}>Male</Typography>
                             </div>
                             <WomanIcon style={{  color: '#791f37', fontSize: '60px',marginLeft:'30px',marginRight: '20px' }} />
                             <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <Typography variant="h3"  style={{  color: '#791f37'}}  className={classes.customH3} >{userSexes.Female}</Typography>
                                  <Typography variant="subtitle1" style={{ textAlign: 'center' }} className={classes.customSubtitle}>Female</Typography>
                             </div>
                             <Man3Icon style={{  color: '#20541b', fontSize: '60px',marginLeft:'30px',marginRight: '20px' }} />
                             <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <Typography variant="h3"  style={{  color: '#20541b'}} className={classes.customH3}>{userSexes.Other}</Typography>
                                  <Typography variant="subtitle1" style={{ textAlign: 'center' }} className={classes.customSubtitle}>Other</Typography>
                             </div>
                        </Paper>
                 </Grid>
                 
                 < Grid item xs={3} sm={3}>
                         <Paper className={classes.paper3}  elevation={2} 
                         sx={{ borderRadius: '10px' , 
                         boxShadow: '0px 3px 10px #DFE4F7' ,   
                         border: '1px solid #bebebe' }} >
                         <div style={{ display: 'flex', flexDirection: 'column' , height: '100%' }}>
                            {Object.entries(ageRanges).map(([range, count]) => (
                             <div key={range} style={{ display: 'flex', justifyContent: 'space-between' }}>
                             <Typography variant="subtitle1" style={{ textAlign: 'left' , marginTop:'4px' , fontSize: '18px'}} >{range} yrs</Typography>
                             <Typography variant="h3" className={classes.customH3}>{count} </Typography>
                            </div>
                            ))}
                        </div>
                        </Paper>
                 </Grid> 
                

                 <Grid item xs={6} sm={6}>
                    <Typography>Sex Barchart</Typography>
                      <SexBarChart userSexes={userSexes} />
                 </Grid>

                 <Grid item xs={6} sm={6} >
                 <Typography>Gender Barchart</Typography>
                       <AgeBarChart ageRanges={ageRanges} />
                 </Grid>
                 
             

                
             </Grid>


          </Card>
         
          </>
                
    );
}

export default Dashboard;