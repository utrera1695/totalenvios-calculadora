import React, { Component } from 'react';
import { connect } from 'react-redux';
import CajaAzul from '../../../assets/svg/ico_cajas-azul-sola2.svg';
import './tipo_envio.css';
class TipoEnvio extends Component {
  render() {
    return (
      <>
        <div className='tipo_envio'>
          <h3 className='title'>¿Qué tipo de envio piensas realizar? </h3>
          <div className='row' style={{ justifyContent: 'center' }}>
            <div className='container col-6 col-lg-3'>
              <div className='card '>
                <div className='option '>
                  <img src={CajaAzul} alt='caja_azul' />
                  <label>Aéreo</label>
                </div>
              </div>
            </div>{' '}
            <div className='container col-6 col-lg-3'>
              <div className='card '>
                <div className='option '>
                  <img src={CajaAzul} alt='caja_azul' />
                  <label>Marítimo</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TipoEnvio);
