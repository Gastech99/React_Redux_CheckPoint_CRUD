import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@material-ui/core';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { updateUser, getSingleUser } from '../redux/action';


export default function EditTask() {
  const [state, setState] = useState({
    name:'',
    description:'',
    isDone:''
  })

  const [error, setError] = useState("");

  const {name, description, isDone} = state;
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let {id} = useParams();
  let {user} = useSelector((state) => state.data)
  const handleInputChange = (e) => {
    let {name, value} = e.target;
    setState({...state, [name]:value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !description || !isDone){
      setError("Veuillez remplir tous les champs svp !!!")
    }else{
      dispatch(updateUser(state, id))
      navigate("/")
      setError('')
    }
  }

  useEffect(() => {
      dispatch(getSingleUser(id))
  }, []);

  useEffect(() => {
    if(user){
      setState({...user})
    }
  }, [user])

  return (
    <div>
      <h2>Modifier une tache</h2>
      {error && <h6 style={{ color: "red"}}>{error}</h6>}
      <Button variant='contained' 
        color='secondary' type="submit"
        style={{width:'100px'}} 
        onClick={() => navigate('/')} >Go Back</Button>
      <Box
      component="form"
      sx={{
        marginTop:10,
        '& > :not(style)': { m: 1, width: '45ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField id="standard-basic" 
        label="Name Task" variant="standard" 
        type='text' value={name || ""} onChange={handleInputChange}
        name="name" />
      <br/>
      <TextField id="standard-basic" 
        label="Description" variant="standard" 
        type='text' value={description || ""} onChange={handleInputChange}
        name="description" />
      <br/>
      <TextField id="standard-basic" 
        label="Is Done Or No" variant="standard" 
        type='text' value={isDone || ""} onChange={handleInputChange}
        name="isDone" />
      <br/>
      <Button variant='contained' 
        color='primary' type="submit" 
        style={{width:'100px'}} onChange={handleInputChange} >Modifier</Button>
      </Box>
    </div>
  )
}
