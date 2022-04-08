import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aereo from '../../../assets/svg/airplane.svg'
import Maritimo from '../../../assets/svg/ship.svg'

import './tipo_envio.css';
class TipoEnvio extends Component {
  render() {
    return (
      <>
        <div className='tipo_envio'>
          <h3 className='title'>¿Qué tipo de envío piensas realizar? </h3>
          <div className='row' style={{ justifyContent: 'center' }}>
            <div className='container col-6 col-lg-4'>
              <div
                onClick={() => this.props.changeTipoEnvio(1)}
                className='card '
                style={{
                  boxShadow:
                    this.props.tipoenvio === 1
                      ? '#0056726b 0px 0px 20px 0px'
                      : null
                }}
              >
                <div className='option '>
                  <img src={Aereo} alt='caja_azul' />
                  <label>Aéreo</label>
                </div>
              </div>
            </div>{' '}
            <div className='container col-6 col-lg-4'>
              <div
                onClick={() => this.props.changeTipoEnvio(2)}
                className='card '
                style={{
                  boxShadow:
                    this.props.tipoenvio === 2
                      ? '#0056726b 0px 0px 20px 0px'
                      : null
                }}
              >
                <div className='option '>
                  <img src={Maritimo} alt='caja_azul' />
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
const mapStateToProps = state => ({
  tipoenvio: state.tipoenvio
});
const mapDispatchToProps = dispatch => ({
  changeTipoEnvio(i) {
    dispatch({
      type: 'CHANGE_TIPOENVIO',
      tipoenvio: i
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TipoEnvio);
