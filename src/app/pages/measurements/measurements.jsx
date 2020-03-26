import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Switch, Input } from 'antd';
import Provider from '../../providers/services';
const { Option } = Select;

class Measurements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      producto: null
    };
  }
  componentDidMount() {
    this.getProducts();
  }
  selectBox(value) {
    this.setState({ producto: value });
    let producto = this.state.productos.filter(
      a => a.id_box === parseInt(value)
    );
    this.props.setValuesBox(
      (this.props.sistema ? producto[0].w * 2.54 : producto[0].w).toFixed(1),
      (this.props.sistema ? producto[0].h * 2.54 : producto[0].h).toFixed(1),
      (this.props.sistema ? producto[0].l * 2.54 : producto[0].l).toFixed(1),
      (this.props.sistema
        ? producto[0].peso_lb / 2.205
        : producto[0].peso_lb
      ).toFixed(1)
    );
  }
  getProducts() {
    Provider.ListarProductos().then(res => {
      this.setState({ productos: res.data });
    });
  }

  render() {
    return (
      <>
        <div className='card measurements' style={{ height: '100%' }}>
          <div className='card-body'>
            <Switch
              checked={this.props.sistema}
              onChange={this.props.changeSistema}
              checkedChildren='Decimal'
              unCheckedChildren='Ingles'
            />
            <br />
            <div className='form-group'>
              <label htmlFor='input_origen'>Lista de artículos</label>
              <Select
                showSearch
                size='large'
                style={{ width: '100%' }}
                placeholder='Busca un articulo pre definido'
                optionFilterProp='children'
                value={this.state.producto}
                onChange={this.selectBox.bind(this)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.productos.map(producto => (
                  <Option key={producto.id_box}>{producto.nombre}</Option>
                ))}
              </Select>
            </div>
            <div className='form-group'>
              <label htmlFor='input_origen'>Dimensiones</label>
              <div className='row'>
                <div className='col-6 col-sm-4'>
                  <Input
                    value={this.props.ancho}
                    placeholder='ANCHO'
                    suffix={this.props.sistema ? 'cm' : 'in'}
                    onChange={e =>
                      this.props.setValuesBox(
                        e.target.value,
                        this.props.alto,
                        this.props.largo,
                        this.props.peso
                      )
                    }
                    type='phone'
                    style={{ width: '100%', marginBottom: '1rem' }}
                  />
                </div>
                <div className='col-6 col-sm-4'>
                  <Input
                    value={this.props.alto}
                    placeholder='ALTO'
                    suffix={this.props.sistema ? 'cm' : 'in'}
                    onChange={e =>
                      this.props.setValuesBox(
                        this.props.ancho,
                        e.target.value,
                        this.props.largo,
                        this.props.peso
                      )
                    }
                    style={{ width: '100%', marginBottom: '1rem' }}
                  />
                </div>
                <div className='col-6 col-sm-4'>
                  <Input
                    value={this.props.largo}
                    placeholder='LARGO'
                    suffix={this.props.sistema ? 'cm' : 'in'}
                    onChange={e =>
                      this.props.setValuesBox(
                        this.props.ancho,
                        this.props.alto,
                        e.target.value,
                        this.props.peso
                      )
                    }
                    style={{ width: '100%', marginBottom: '1rem' }}
                  />
                </div>
                <div className='col-6'>
                  <Input
                    value={this.props.peso}
                    placeholder='PESO'
                    suffix={this.props.sistema ? 'kg' : 'lb'}
                    onChange={e =>
                      this.props.setValuesBox(
                        this.props.ancho,
                        this.props.alto,
                        this.props.largo,
                        e.target.value
                      )
                    }
                    style={{ width: '100%', marginBottom: '1rem' }}
                  />
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
  origen: state.origen,
  ancho: state.ancho,
  alto: state.alto,
  largo: state.largo,
  peso: state.peso,
  sistema: state.sistema
});
const mapDispatchToProps = dispatch => ({
  setValuesBox(ancho, alto, largo, peso) {
    dispatch({
      type: 'SET_BOX',
      ancho,
      alto,
      largo,
      peso
    });
  },
  changeSistema(value) {
    dispatch({
      type: 'CHANGE_SISTEMA',
      sistema: value
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Measurements);
