import React, { Component } from 'react';
import { connect } from 'react-redux';
import './resum.css';
import CajaAzul from '../../../assets/svg/ico_cajas-azul-sola2.svg';
class Resum extends Component {
  setDiasaEntrega() {
    switch (this.props.tipoenvio) {
      case 1: {
        switch (this.props.nombrePais) {
          case 'Venezuela': {
            if (this.props.ciudadSelect.nombreRegion === 'Centro') {
              return '5 días hábiles';
            } else {
              return '7 a 10 días hábiles';
            }
          }
          case 'Colombia':
            return '5 a 7 días hábiles';
          case 'Panamá':
            return '5 a 7 días hábiles';
          default:
            break;
        }
        break;
      }
      case 2: {
        switch (this.props.nombrePais) {
          case 'Venezuela': {
            if (this.props.ciudadSelect.nombreRegion === 'Centro') {
              return '3 semanas';
            } else {
              return '4 semanas';
            }
          }
          case 'Panamá':
            return '15 días hábiles';
          default:
            break;
        }
        break;
      }
      default:
        break;
    }
  }
  render() {
    return (
      <>
        <div className='card' style={{ height: '100%' }}>
          <div className='card-body'>
            <div className='container'>
              <div className='resum_title'>
                <img src={CajaAzul} alt='box' style={{ width: '15%' }} />
                <label>Tiempo estimado de entrega</label>
                <h4>{this.setDiasaEntrega()}</h4>
              </div>
            </div>
            <div className='container'>
              <table className='table'>
                <tbody>
                  <tr>
                    <td>Envío</td>
                    <td>{this.props.tipoenvio === 1 ? 'Aéreo' : 'Marítimo'}</td>
                  </tr>
                  <tr>
                    <td>País</td>
                    <td>{this.props.nombrePais}</td>
                  </tr>
                  <tr>
                    <td>Estado</td>
                    <td>{this.props.ciudadSelect.nombreEstadosDet}</td>
                  </tr>
                  <tr>
                    <td>Ciudad</td>
                    <td>{this.props.ciudadSelect.nombreCiudades_det}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='container'>
              <div className='container user_desc'>
                <label>Nombre y Apellido</label>
                <p>{this.props.name}</p>
              </div>
              <div className='container user_desc'>
                <label>Correo electrónico</label>
                <p>{this.props.email}</p>
              </div>
              {this.props.empresa !== '' ? (
                <div className='container user_desc'>
                  <label>Empresa</label>
                  <p>{this.props.empresa}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  ciudadSelect: state.ciudadSelect,
  tipoenvio: state.tipoenvio,
  nombrePais: state.nombrePais,
  name: state.name,
  email: state.email,
  empresa: state.empresa
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Resum);
