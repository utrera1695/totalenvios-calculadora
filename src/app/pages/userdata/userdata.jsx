import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';

class UserData extends Component {

  render() {
    return (
      <>
        <div className='card'>
          <div className='card-body'>
          <div className='form-group select_destino'>
              <label htmlFor='input_origen'>Mis datos</label>
              <Input size="large" placeholder="Nombre y Apellido" 
                    style={{ width: '100%', marginBottom: '1rem' }} />
              <Input size="large" placeholder="Empresa (opcional)" 
                    style={{ width: '100%', marginBottom: '1rem' }} />
              <Input size="large" placeholder="Correo electrónico" 
                    style={{ width: '100%', marginBottom: '1rem' }} />
    
          </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserData);
