import React, { Component } from 'react';

import { connect } from 'react-redux';
import TipoEnvio from './tipo_envio/tipo_envio';
import Destino from './destino/destino';
import StepsComponent from './steps/steps';
import Measurements from './measurements/measurements';
import UserData from './userdata/userdata';
import Optionals from './optionals/optionals';
import Priceresult from './priceresult/priceresult';
import Resum from './resum/resum';
import Provider from '../providers/services';
import { Button } from 'antd';

const ref = React.createRef();
class Pages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };
    this.setDisabled = this.setDisabled.bind(this);
  }
  componentDidMount() {
    this.getSeguro();
  }
  getSeguro() {
    Provider.GetSeguro().then(res => this.props.setSeguro(res.data[0]));
  }
  setDisabled() {
    switch (this.props.page) {
      case 1:
        console.log(this.props);
        return (
          (this.props.alto || this.props.alto > 0) &&
          (this.props.ancho || this.props.ancho > 0) &&
          (this.props.largo || this.props.largo > 0)
        );
      case 2:
        console.log(this.props);
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return (
          this.props.nombre !== '' &&
          this.props.email !== '' &&
          regex.test(this.props.email) &&
          (this.props.seguro_status
            ? this.props.precio_producto > 0 &&
              this.props.precio_producto !== ''
            : this.props.precio_producto >= 0 &&
              this.props.precio_producto !== '')
        );
      default:
        return true;
    }
  }
  setPage() {
    switch (this.props.page) {
      case 0:
        return <TipoEnvio />;
      case 1:
        return (
          <div className='row'>
            <div className='col-12 col-lg-4'>
              {' '}
              <Destino />
            </div>
            <div className='col-12 col-lg-8'>
              <Measurements />
            </div>
          </div>
        );
      case 2:
        return (
          <div className='row'>
            <div className='col-12 col-lg-6'>
              {' '}
              <UserData />
            </div>
            <div className='col-12 col-lg-6'>
              <Optionals />
            </div>
          </div>
        );
      case 3:
        return (
          <>
            <div className='row' ref={ref}>
              <div className='col-12 col-lg-6'>
                {' '}
                <Priceresult />
              </div>
              <div className='col-12 col-lg-6'>
                <Resum />
              </div>
            </div>
          </>
        );
      default:
        return <TipoEnvio />;
    }
  }
  render() {
    return (
      <>
        <div className='container'>
          <div id='steps'>
            <StepsComponent />
          </div>
          <div> {this.setPage()}</div>
        </div>

        <div className='row btns_next_prev'>
          <div onClick={() => this.props.changePage(this.props.page - 1)}>
            Anterior
          </div>

          {this.props.page !== 3 ? (
            <Button
              style={{
                backgroundColor: !this.setDisabled() ? '#758b92' : '#004e69'
              }}
              onClick={() =>
                this.setDisabled()
                  ? this.props.changePage(this.props.page + 1)
                  : null
              }
              type='primary'
              block
              size='large'
            >
              Siguiente
            </Button>
          ) : null}
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  page: state.page,
  ancho: state.ancho,
  alto: state.alto,
  largo: state.largo,

  metodo_pago: state.metodo_pago,
  name: state.name,
  email: state.email,
  precio_producto: state.precio_producto,
  seguro_status: state.seguro_status
});
const mapDispatchToProps = dispatch => ({
  changePage(page) {
    dispatch({
      type: 'CHANGE_PAGE',
      page: page
    });
  },
  setSeguro(seguro) {
    dispatch({
      type: 'SET_SEGURO',
      seguro: seguro.percent,
      colombiaImpuesto: seguro.bogotaImpuesto
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
