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
              <Input
                value={this.props.name}
                onChange={e => this.props.setName(e.target.value)}
                size='large'
                placeholder='Nombre y Apellido'
                style={{ width: '100%', marginBottom: '1rem' }}
              />
              <Input
                size='large'
                value={this.props.empresa}
                onChange={e => this.props.setEmpresa(e.target.value)}
                placeholder='Empresa (opcional)'
                style={{ width: '100%', marginBottom: '1rem' }}
              />
              <Input
                value={this.props.email}
                onChange={e => this.props.setEmail(e.target.value)}
                size='large'
                placeholder='Correo electrónico'
                style={{ width: '100%', marginBottom: '1rem' }}
              />
            </div>
            <div className='form-group select_destino'>
              <label htmlFor='input_origen'>Precio del producto</label>
              <Input
                value={this.props.precio_producto}
                onChange={e => this.props.setPrecioProducto(e.target.value)}
                size='large'
                placeholder='precio estimado del o los productos'
                prefix='$'
                style={{ width: '100%', marginBottom: '1rem' }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  name: state.name,
  email: state.email,
  empresa: state.empresa,
  precio_producto: state.precio_producto
});
const mapDispatchToProps = dispatch => ({
  setEmail(value) {
    dispatch({
      type: 'SET_EMAIL',
      email: value
    });
  },
  setName(value) {
    dispatch({
      type: 'SET_NAME',
      name: value
    });
  },
  setPrecioProducto(value) {
    dispatch({
      type: 'SET_PRECIO',
      precio_producto: value
    });
  },
  setEmpresa(value) {
    dispatch({
      type: 'SET_EMPRESA',
      empresa: value
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserData);
