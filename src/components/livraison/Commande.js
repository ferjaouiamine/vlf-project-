/* eslint-disable */
import React from 'react';
// material
import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { UserListHead } from '../../sections/@dashboard/user';
import Iconify from '../Iconify';
import Article from '../../sections/@dashboard/articles/Article';
import ArticleLivPage from '../../sections/@dashboard/articles/ArticleLivPage';
import AlertDialogSlide from 'src/sections/@dashboard/articles/AlertDialogSlide';
import Label from '../Label';

// ----------------------------------------------------------------------
// eslint-disable-next-line react/prefer-stateless-function

class Commande extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    TABLE_HEAD: [
      { id: 'command', label: 'Commande', alignRight: false },
      { id: 'client', label: 'Client', alignRight: false },
    ],
    open: false,
  };

  openForm(){
    const { open } = this.state
    this.setState({ open : !open })
  }


  render() {
    const { livraison, handleClickShowForm } = this.props;
    
    const { TABLE_HEAD, open } = this.state;
    let color;

  if (livraison.status === 'delivered') {
    color = 'success';
  } else if (livraison.status === 'cancelled') {
    color = 'error';
  }
  else if(livraison.status === 'undelivered') {
    color = 'error';
  }
  else {
    color = 'warning';
  }
    
    return (
      <div style={{ marginBottom: '1%', overflow: 'visible !important', overflowy: 'visible !important' }} Name="reference">
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ marginBottom: '0%' }}>
          {/* <Typography variant="h8" gutterBottom>
            Commande : {this.props.livraison.reference}
          </Typography> */}
          <Typography gutterBottom variant="caption" sx={{ color: '#2f4858', display: 'block' }}>
            <Iconify icon="eva:shopping-cart-outline" sx={{ width: 16, height: 16, mr: 1.5 }} />
            <b>{this.props.livraison.reference}</b>
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} style={{ marginBottom: '0%' }}>
          <div>
            <Typography gutterBottom variant="caption" sx={{ color: '#2f4858', display: 'block' }}>
              <Iconify icon="eva:person-outline" sx={{ width: 16, height: 16, mr: 1.5 }} />
              {this.props.livraison.orderer.name}
            </Typography>
            <Typography gutterBottom variant="caption" sx={{ color: '#2f4858', display: 'block' }}>
              <Iconify icon="eva:phone-outline" sx={{ width: 16, height: 16, mr: 1.5 }} />
              {this.props.livraison.orderer.phone}
            </Typography>
          </div>
          <div style={{ marginLeft: '-5%' }}>
            <Typography gutterBottom variant="caption" sx={{ color: '#2f4858', display: 'block' }}>
              <Iconify icon="eva:home-outline" sx={{ width: 16, height: 16, mr: 1.5 }} />
              {this.props.livraison.address.address1}
            </Typography>
            <Typography gutterBottom variant="caption" sx={{ color: '#2f4858', display: 'block' }}>
              <Iconify icon="eva:home-outline" sx={{ width: 16, height: 16, mr: 1.5 }} />
              {this.props.livraison.address.address2}
            </Typography>
          </div>
          <Typography gutterBottom variant="caption" sx={{ color: '#2f4858', display: 'block' }}>
            <Iconify icon="bx:user-voice" sx={{ width: 16, height: 16, mr: 1.5 }} />
            {livraison.owner?.userName}
          </Typography>
        </Stack>
        <Stack direction="row" mb={5} alignItems="center" justifyContent="space-between" style={{ marginTop: '3%' }}>
          <ArticleLivPage items={this.props.livraison.items} />
          <div Name="ficheSatisfaction">
          <Label variant="ghost" color={color}>
                  {livraison.status}
                </Label>
          <Button
            Name="ficheSatisfaction"
            variant="contained"
            onClick={e => this.openForm()}
            style={{ marginTop: '5%' }}
          >
            <Iconify icon="ant-design:file-done-outlined" />
          </Button>
          </div>
          <AlertDialogSlide open={open} setOpen={e => this.openForm() } order={livraison} formSatisfaction= {livraison.feedbackForm} handleClickShowForm={e => handleClickShowForm(e)} />
        </Stack>
        <hr style={{ marginTop: '-2%' }} id="livSeparator" Name="separator" />
      </div>
    );
  }
}

export default Commande;
