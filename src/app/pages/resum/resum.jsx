import React, { Component } from 'react';
import { connect } from 'react-redux';
import './resum.css'
import CajaAzul from '../../../assets/svg/ico_cajas-azul-sola2.svg';
class Resum extends Component {

  render() {
    return (
      <>
        <div className='card'>
          <div className='card-body'>
                <div className="container">
                    <div className="resum_title">
                        <img src={CajaAzul} alt="box" style={{width:'15%'}}/>
                    <label>Tiempo estimado de entrega</label>
                    <h4>5 a 7 días hábiles</h4>
                    </div>
                </div>
                <div className="container">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td>Envio</td>
                                <td>Aereo</td>
                            </tr>
                            <tr>
                                <td>País</td>
                                <td>Venezuela</td>
                            </tr>
                            <tr>
                                <td>Estado</td>
                                <td>Bolívar</td>
                            </tr>
                            <tr>
                                <td>Ciudad</td>
                                <td>Puerto Ordaz</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="container" style={{display:'flex'}}>

                <div className="container user_desc">
                    <label>Nombre y Apellido</label>
                    <p>Victor Utrera</p>
                </div>
                <div className="container user_desc">
                    <label>Correo electrónico</label>
                    <p>Victor Utrera</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Resum);
