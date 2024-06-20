import React from 'react';
// material
import { Autocomplete,
        Button,
        Stack,
        Table,
        TableBody,
        TableCell,
        TableContainer,
        TableRow,
        TextField,
        Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Iconify from '../Iconify';
import { UserListHead } from '../../sections/@dashboard/user';

// ----------------------------------------------------------------------
// eslint-disable-next-line react/prefer-stateless-function


class AddLiv extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state= {
    TABLE_HEAD_CMD: [
        { id: 'delete', label: 'Annuler', alignRight: false },
        { id: 'command', label: 'Commande', alignRight: false },
        { id: 'client', label: 'Client', alignRight: false },
        { id: 'article', label: 'Articles', alignRight: false },
      ],
      date: new Date(),
      selectedValue:'',
      commandsToAdd: [],
  }

  changeDateLiv(e) {
    this.setState({ date: e })
  }

  selectCommand(e){
    const { commandsToAdd, commandslist }= this.state
    const cmdTable = commandsToAdd
    const isExist = commandsToAdd.filter(x => x.commandeID === e.commandeID)
    if(isExist.length === 0){
    if(e !== null && e !== undefined){
      cmdTable.push(e)
      this.setState({ commandsToAdd : cmdTable, selectedValue : e.label })
    }
  }
  }

  deleteCommand(cmd){
    const { commandsToAdd, commandslist }= this.state
    const cmdTable = commandsToAdd
    const index = cmdTable.indexOf(cmd)
    cmdTable.splice(index, 1)
    this.setState({ commandsToAdd : cmdTable })
  }

    render(){
        const { commandeData, commandslist } = this.props
        const { TABLE_HEAD_CMD, date, selectedValue , commandsToAdd} = this.state

        return (
          <>
          <div style={{ position: 'fixed', width:'35%', marginRight:'5px', marginTop:'-1%'}}>
           <button style={{ float: 'right', border: 'none' }} onClick={e => this.props.closeForm()}>
           <Iconify icon="iconoir:cancel" style={{ fontSize: '30' }} />
          </button>
          <Typography variant="h4" gutterBottom>
              Nouvelle livraison
            </Typography>
            </div>
          <br />
          <Stack spacing={3} style={{marginTop:'6%'}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
              label="Date"
              inputFormat="MM/dd/yyyy"
              onChange={e => this.changeDateLiv(e)}
              value={date}
              renderInput={(params) => <TextField {...params} />} />
            </LocalizationProvider>
            <TextField name="camion" label="Camion" style={{ marginLeft: '2%' }} />
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={commandslist}
            value={selectedValue}
            onChange={(event, newValue) => {
              this.selectCommand(newValue);
            }}
            // sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Ajouter des commandes" />}
          />
          </Stack>
          <TableContainer>
            <Table>
              <UserListHead
                headLabel={TABLE_HEAD_CMD}
                useCheckBox={false}
              />
              <TableBody>
                    {commandsToAdd.length > 0 ?  commandsToAdd.map(cmd => (
                        <TableRow>
                          <TableCell component="th" scope="row" padding="none" style={{textAlign: 'center'}}>
                          <Iconify icon="ic:baseline-cancel" style={{color:'red', fontSize:30}} onClick={e =>this.deleteCommand(cmd)} />
                       </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                         {cmd.commandeID}
                       </TableCell>
                       <TableCell component="th" scope="row" padding="none">
                         {cmd.client}
                       </TableCell>
                       <TableCell component="th" scope="row" padding="none">
                         {cmd.Articles.map(article => (
                           <Typography>
                           {article.ArticleName} {article.Quantite}
                         </Typography>
                         ))}
                       </TableCell>
                   </TableRow>
                    )) : 
                    <TableRow />
                    }
                
                    </TableBody>
            </Table>
          </TableContainer>
          
          <Button style={{ float: 'right', margin:'1%' }} 
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}>
            Confirmer la livraison
          </Button>
        </>
      );
    }

  
}

export default AddLiv
