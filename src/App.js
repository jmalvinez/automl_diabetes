import { useEffect, useState } from "react";
import './App.css';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const App = () => {
  const fields = [
    {
      key: 'pregnancies',
      label: 'Pregnancies'
    },
    {
      key: 'plasmaGlucose',
      label: 'Plasma Glucose'
    },
    {
      key: 'diastolicBp',
      label: 'Diastolic BP'
    },
    {
      key: 'tricepThickness',
      label: 'Tricep Thickness'
    },
    {
      key: 'serumInsulin',
      label: 'Serum Insulin'
    },
    {
      key: 'bmi',
      label: 'BMI'
    },
    {
      key: 'diabetesPedigree',
      label: 'Diabetes Pedigree'
    },
    {
      key: 'age',
      label: 'Age'
    }
  ];

  const [age, setAge] = useState();
  const [bmi, setBmi] = useState();
  const [diabetesPedigree, setDiabetesPedigree] = useState();
  const [diastolicBp, setDiastolicBp] = useState();
  const [checked, setChecked] = useState(false);
  const [plasmaGlucose, setPlasmaGlucose] = useState();
  const [pregnancies, setPregnancies] = useState();
  const [result, setResult] = useState('');
  const [serumInsulin, setSerumInsulin] = useState();
  const [tricepThickness, setTricepThickness] = useState();

  const handleChange = (name, event) => {
    switch (name) {
      case 'age':
        setAge(event.target.value);
        break;
      case 'bmi':
        setBmi(event.target.value);
        break;
      case 'diabetesPedigree':
        setDiabetesPedigree(event.target.value);
        break;
      case 'diastolicBp':
        setDiastolicBp(event.target.value);
        break;
      case 'plasmaGlucose':
        setPlasmaGlucose(event.target.value);
        break;
      case 'pregnancies':
        setPregnancies(event.target.value);
        break;
      case 'serumInsulin':
        setSerumInsulin(event.target.value);
        break;
      case 'tricepThickness':
        setTricepThickness(event.target.value);
        break;
      default:
    }

    setChecked(false);
  };

  const handleCheck = (event) => {
    const url = 'http://az-demo-api-management.azure-api.net/score';
    const data = [[
        10000000,
        pregnancies,
        plasmaGlucose,
        diastolicBp,
        tricepThickness,
        serumInsulin,
        bmi,
        diabetesPedigree,
        age
    ]];
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        'Ocp-Apim-Subscription-Key': '2b51b235f5154a5c91c0aefec24b7f35'
      },
      body: JSON.stringify({ data })
    };

    event.preventDefault();
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
      const value = JSON.parse(data).result[0];

      setResult(`${value} - ${!value ? 'Not' : ''} Diabetic`);
      setChecked(true);
    });
  };

  const renderInputs = (inputs) => inputs.map(input =>
    <div key={input.key}>
      <TextField
        label={input.label}
        margin='normal'
        onChange={(event) => handleChange(input.key, event)}
      />
    </div>
  );

  useEffect(() => {
    if (!checked) {
      setResult('');
    }
  }, [checked]);

  return (
    <Container className='app' maxWidth='xs'>
      <Paper className='paper' elevation={3}>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className='title'>
                AutoML Diabetes
              </div>
            </Grid>
            <Grid item xs={6}>
              {renderInputs(fields.slice(0, fields.length/2))}
            </Grid>
            <Grid item xs={6}>
              {renderInputs(fields.slice(fields.length/2))}
            </Grid>
            <Grid item xs={12}>
              <div className='check-result'>
                <Button
                  onClick={handleCheck}
                  type = 'submit'
                  variant='contained'
                >
                  Check
                </Button>
                <TextField
                  label='Result'
                  value={result} variant='outlined'
                />
              </div>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default App;
