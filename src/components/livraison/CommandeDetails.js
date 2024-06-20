import React from 'react';
// material
import { Button, Input, Stack,
        Table,
        TableBody,
        TableCell,
        TableContainer,
        TableRow,
        TextField,
        Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import dayjs, { Dayjs } from 'dayjs';
import Iconify from '../Iconify';
import { UserListHead } from '../../sections/@dashboard/user';
import Label from '../Label';

// ----------------------------------------------------------------------
// eslint-disable-next-line react/prefer-stateless-function


class CommandeDetails extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state= {
    TABLE_HEAD: [
        { id: 'id', label: 'Réference', alignRight: false },
        { id: 'nom', label: 'Nom', alignRight: false },
        { id: 'quantite', label: 'Quantité', alignRight: false },
        { id: 'delete', label: '', alignRight: true },
      ],
      editableRow: undefined,
      ref:'',
      nom:'',
      quantite:'',
      client:'',
      commande:'',
      dateDeb:'',
      dateFin:'',
  }


  editRow(article){
    this.setState({
      editableRow : article.ArticleId,
    ref : article.ArticleId,
    nom: article.ArticleName,
    quantite: article.Quantite })
  }

  cancelEditRow(article){
    this.setState({ editableRow : undefined })
  }

    render(){
        const { commandeData } = this.props
        const { TABLE_HEAD, editableRow, ref, nom, quantite, client, commande, dateDeb, dateFin } = this.state

        return (
          <>
          <div style={{ position: 'fixed', width:'35%', marginRight:'5px'}}>
            <button style={{ float: 'right', border: 'none' }} onClick={e => this.props.closeForm()}>
            <Iconify icon="iconoir:cancel" style={{ fontSize: '30' }} />
          </button>
          <Typography variant="h4" gutterBottom>
              Détails de la commande
            </Typography>
            </div>
          <br />
          <Stack spacing={3} style={{marginTop:'6%'}}>
            <div>
            <TextField name="Client" label="Client" value={commandeData.client} style={{ marginLeft: '2%' }} />
            <Button variant="contained" style={{marginLeft:'7%', marginTop:'1%'}} startIcon={<Iconify icon="fluent:form-28-regular" />}>
              Formulaire de satisfaction
              </Button>
            </div>
            <div>
            <TextField name="Commande" label="Commande" value={commandeData.commandeID} style={{ marginLeft: '2%' }} />
            <Label variant="ghost" color={(commandeData.statut !== 'Delivered' && 'warning') || 'success'} sx={{marginLeft:'3%', marginTop:'3%'}}>
                {commandeData.statut}
              </Label>
            </div>
            {commandeData.statut === 'Delivered' ? 
          <>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Date debut intervention"
              name='DateDeb'
              value={dateDeb !== '' ? dateDeb : commandeData.date_debut_intervention}
              renderInput={(params) => <TextField {...params} />}
              style={{ marginLeft: '2%' }}
              readOnly
            />
            <DateTimePicker
              label="Date fin intervention"
              name='DateFin'
              value={dateFin !== '' ? dateFin : commandeData.date_fin_intervention}
              renderInput={(params) => <TextField {...params} />}
              style={{ marginLeft: '2%' }}
              readOnly
            />
        </LocalizationProvider>
          </>
          :
          <>
          </>  
          }
          </Stack>
          <TableContainer>
            <Table>
              <UserListHead
                headLabel={TABLE_HEAD}
                useCheckBox={false}
              />
              <TableBody>
                {commandeData ? commandeData.Articles.map(article => (
                  <TableRow>
                    {editableRow === article.ArticleId ?
                    <>
                    <TableCell component="th" scope="row" padding="none"  style={{width:'30%'}}>
                    <Input
                      value={ref}
                      onChange={e => this.onChangeRow(e,article, 'reference')}
                      // className={classes.input}
                        />
                      
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none"  style={{width:'30%'}}>
                    <Input
                      value={nom}
                      onChange={e => this.onChangeRow(e,article, 'nomArticle')}
                      // className={classes.input}
                        />
                      
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none" style={{textAlign: 'center', width:'10%'}}>
                    <Input
                      value={quantite}
                      onChange={e => this.onChangeRow(e,article, 'quantiteArticle')}
                      // className={classes.input}
                        />
                      
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none" style={{textAlign: 'center', width:'10%'}}>
                      <Iconify icon="fxemoji:cancellationx" style={{color:'#2F4858', fontSize:20}} onClick={e => this.cancelEditRow(article)} />
                      <Iconify icon="dashicons:saved" style={{color:'green', fontSize:20}}  />
                       </TableCell>
                    </>
                    :
                    <>
                    <TableCell component="th" scope="row" padding="none" style={{width:'30%'}}>
                      {article.ArticleId}
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none" style={{width:'30%'}}>
                      {article.ArticleName}
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none"  style={{textAlign: 'center', widthwidth:'10%'}}>
                      {article.Quantite}
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                    <Iconify icon="ic:baseline-cancel" style={{color:'#dc3545', fontSize:20}} />
                      <Iconify icon="ant-design:edit-filled" style={{color:'#2F4858', fontSize:20}} onClick={e => this.editRow(article)} />
                      </TableCell>
                    </>
    }
                  </TableRow>
                )) :
                  <TableRow />
                }

              </TableBody>
            </Table>
          </TableContainer>
        </>
      );
    }

  
}

export default CommandeDetails

// export function CustomTableCell ({ row, name, onChange }) {
//   const classes = useStyles();
//   const { isEditMode } = row;
//   return (
//     <TableCell align="left" className={classes.tableCell}>
//       {isEditMode ? (
//         <Input
//           value={row[name]}
//           name={name}
//           onChange={e => onChange(e, row)}
//           className={classes.input}
//         />
//       ) : (
//         row[name]
//       )}
//     </TableCell>
//   );
// };