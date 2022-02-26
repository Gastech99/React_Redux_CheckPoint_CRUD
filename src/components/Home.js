import React, {useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { deleteUser, loadUsers } from '../redux/action';
import {useDispatch, useSelector} from 'react-redux';
import { Button } from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import SearchBar from './SearchBar';



const useButttonStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'primary',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    }
  }
}))

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 900,
    marginTop: 100,
  },
});


function Home() {
  const classes = useStyles();
  const buttonStyles = useButttonStyles();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { users } = useSelector(state => state.data)

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const handleDelete = (id) => {
    if(window.confirm("Vous etes sure de vouloir supprimer cet element ?")){
      dispatch(deleteUser(id))
    }
  }
  const confirm = (e) => {
    navigate('/addTask')
}
  

  return (
    <div>
      <div style={useButttonStyles.root}>
      <br/>
        <Button variant='contained' color='primary' onClick={() => confirm()} >Add Task</Button>
      </div>
      <br/>
      <br/>
      <SearchBar />
      <br/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Nom_Tache</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Is_Done</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell align="center">{user.name}</StyledTableCell>
                <StyledTableCell align="center">{user.description}</StyledTableCell>
                <StyledTableCell align="center">{user.isDone}</StyledTableCell>
                <StyledTableCell align="center">
                  <div className={buttonStyles.root}>
                    <ButtonGroup variant='contained' aria-label='contained primary button group'>
                      <Button style={{marginRight: '5px'}} color='primary' onClick={() => navigate(`/editTask/${user.id}`)} >Edit</Button>
                      <Button color='secondary' onClick={() => handleDelete(user.id)}>Delete</Button>
                    </ButtonGroup>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Home;