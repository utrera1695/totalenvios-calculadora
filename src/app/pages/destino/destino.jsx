import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import Provider from '../../providers/services';
import './destino.css';
const { Option } = Select;
class Destino extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paises: [],
      origenes: [],
      estados: [],
      ciudades: [],
      estado: ''
    };
    this.selectPais = this.selectPais.bind(this);
  }
  componentDidMount() {
    this.getPais();
    this.getOrigenes();
  }
  getOrigenes() {
    Provider.ListarOrigenes().then(res => {
      this.setState({ origenes: res.data });
      this.props.selectOrigen(
        res.data[0].id_origen.toString(),
        res.data[0].nombreSucursal
      );
    });
  }
  getPais() {
    Provider.ListarPaises().then(res => {
      this.setState({ paises: res.data });
      this.props.selectPais(res.data[0].id_pais.toString(), res.data);
      Provider.ListarEstados(res.data[0].id_pais).then(estado => {
        this.setState({ estados: estado.data });
        this.selectEstado(estado.data[0]);
      });
    });
  }
  selectPais(value) {
    Provider.ListarEstados(value).then(res => {
      this.setState({ estados: res.data });
      this.selectEstado(res.data[0]);
    });
    this.props.selectPais(
      value,
      this.state.paises.filter(a => a.id_pais === parseInt(value))
    );
  }
  selectEstado(value) {
    Provider.ListarCiudades(value).then(res => {
      this.setState({ ciudades: res.data });
      this.props.selectCiudad(res.data[0].id_ciudades_det.toString(), res.data);
    });
    this.setState({ estado: value });
  }
  render() {
    return (
      <>
        <div
          className='card'
          style={{ backgroundColor: '#004e69', color: 'white', height: '100%' }}
        >
          <div className='card-body'>
            <div className='form-group select_destino'>
              <label htmlFor='input_origen'>Origen</label>
              <Select
                showSearch
                size='large'
                bordered={false}
                style={{ width: '100%' }}
                optionFilterProp='children'
                value={this.props.origen}
                onChange={value =>
                  this.props.selectOrigen(
                    value,
                    this.state.origenes.filter(
                      a => a.id_origen === parseInt(value)
                    )
                  )
                }
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.origenes.filter(a=> a.nombreSucursal === 'Miami').map(origen => (
                  <Option key={origen.id_origen}>
                    {origen.nombreSucursal}
                  </Option>
                ))}
              </Select>
            </div>
            <div className='form-group select_destino'>
              <label htmlFor='input_origen'>Destino</label>
              <Select
                showSearch
                size='large'
                bordered={false}
                style={{ width: '100%', marginBottom: '1rem' }}
                placeholder='Pais'
                value={this.props.pais}
                optionFilterProp='children'
                onChange={value => this.selectPais(value)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.paises.filter(a=> a.nombrePais === 'Venezuela').map(pais =>
                  pais.nombrePais === 'Colombia' &&
                  this.props.tipoenvio !== 1 ? null : (
                    <Option key={pais.id_pais}>{pais.nombrePais}</Option>
                  )
                )}
              </Select>
              <Select
                showSearch
                size='large'
                bordered={false}
                style={{ width: '100%', marginBottom: '1rem' }}
                placeholder='Estados'
                optionFilterProp='children'
                value={this.state.estado}
                onChange={value => this.selectEstado(value)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.estados.map(estado => (
                  <Option key={estado}>{estado}</Option>
                ))}
              </Select>
              <Select
                showSearch
                size='large'
                bordered={false}
                style={{ width: '100%' }}
                placeholder='Ciudades'
                value={this.props.ciudad}
                optionFilterProp='children'
                onChange={value =>
                  this.props.selectCiudad(
                    value,
                    this.state.ciudades.filter(
                      a => a.id_ciudades_det === parseInt(value)
                    )
                  )
                }
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.ciudades.map(ciudad => (
                  <Option key={ciudad.id_ciudades_det}>
                    {ciudad.nombreCiudades_det}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  pais: state.pais,
  nombrePais: state.nombrePais,
  origen: state.origen,
  ciudad: state.ciudad,
  tipoenvio: state.tipoenvio
});
const mapDispatchToProps = dispatch => ({
  selectPais(value, nombrePais) {
    dispatch({
      type: 'SELECT_PAIS',
      pais: value,
      nombrePais: nombrePais[0].nombrePais
    });
  },
  selectOrigen(value, nombreOrigen) {
    dispatch({
      type: 'SELECT_ORIGEN',
      origen: value,
      nombreOrigen: nombreOrigen[0].nombreSucursal
    });
  },
  selectCiudad(value, ciudad) {
    dispatch({
      type: 'SELECT_CIUDAD',
      ciudad: value,
      ciudadSelect: ciudad[0]
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Destino);
