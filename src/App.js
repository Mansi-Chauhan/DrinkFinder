import './App.css';
import React, { useEffect } from "react";
import NavBarComponent from '../src/components/navbar/nav-bar';
import { Row, Col } from 'react-bootstrap';
import Index from '../src/components/dashboard/index';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from "react-toastify";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  background:{
    background:'linear-gradient(to right, #e2e2e2, #9c9b99, #e2e2e2);',
    height:'100%',
    overflow:'auto',
  },
 
}));

function App() {

  const classes = useStyles();

  const [alcoholic, setAlcoholic] = React.useState(true);
  const [alcoholicFilterData, setAlcoholicFilterData] = React.useState([]);

  // Alcoholic Filter
  useEffect(() => {
    // call api
    var type = alcoholic ? 'Alcoholic' : 'Non_Alcoholic';
    const res = axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a="+type);
    res.then(res => {
        if(res.status === 200){
          setAlcoholicFilterData(res.data['drinks']);
        }
    }).catch((error) => {
    })
  },[alcoholic])

  // update alcoholic status
  function updateAlcoholicStatus(){
    setAlcoholic(!alcoholic);
  }

  return (
    <div className="App" class="height_at">
      <NavBarComponent />
      <div className={classes.background}> 
        <Row >
          <Col xs={3} md={3} lg={3}>
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked onChange={updateAlcoholicStatus} />} label="Alcoholic" />
            </FormGroup>
          </Col>
          <Col xs={9} md={9} lg={9}>
          </Col>
        </Row>

        <Row class="height_at">
          <Col>
            <Index alcoholicFilterData={alcoholicFilterData} updateAlcoholicStatus={updateAlcoholicStatus}/>
          </Col>
        </Row>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
