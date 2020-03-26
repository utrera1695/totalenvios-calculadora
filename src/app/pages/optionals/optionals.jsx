import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Select, Input } from 'antd';
import Provider from '../../providers/services';

const { Option } = Select;

class Optionals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: []
    };
  }
  componentDidMount() {
    this.getPaymenMethods();
  }
  onChange(value) {
    console.log(`selected ${value}`);
  }

  getPaymenMethods() {
    Provider.GetPaymentMethods().then(res => {
      this.setState({ payments: res.data });
      this.props.setMetodoDePago(res.data);
    });
  }

  render() {
    return (
      <>
        <div className='card optional' style={{ height: '100%' }}>
          <div className='card-body'>
            <div className='form-group'>
              <label htmlFor='input_origen'>Opcionales</label>
              <label style={{ fontSize: '12px', color: 'grey' }}>
                Para productos con un valor mayor a $500 es recomendable agregar
                el seguro.
              </label>
              <div>
                <label className='label_switch'>
                  Seguro{' '}
                  <Switch
                    checked={this.props.seguro_status}
                    checkedChildren={this.props.seguro + '%'}
                    onChange={value => this.props.setSeguro(value)}
                  />
                </label>
              </div>
              <div>
                <label className='label_switch'>
                  Otros cargos{' '}
                  <Switch
                    checked={this.props.otroscargos_status}
                    onChange={value => this.props.setOtrosCargosState(value)}
                  />
                </label>
                {this.props.otroscargos_status ? (
                  <Input
                    size='large'
                    placeholder='Ingresa el cargo'
                    suffix={'$'}
                    value={this.props.otrosCargos}
                    onChange={e => this.props.setOtrosCargos(e.target.value)}
                    style={{ width: '100%', marginBottom: '1rem' }}
                  />
                ) : null}
              </div>
            </div>

            <div className='form-group'>
              <label htmlFor='input_origen'>Método de pago</label>
              <Select
                showSearch
                size='large'
                bordered={false}
                style={{ width: '100%' }}
                placeholder='Select a person'
                optionFilterProp='children'
                value={
                  this.props.metodo_pago
                    ? this.props.metodo_pago.id_payment.toString()
                    : ''
                }
                onChange={value =>
                  this.props.setMetodoDePago(
                    this.state.payments.filter(
                      a => a.id_payment === parseInt(value)
                    )
                  )
                }
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.payments.map(payment => (
                  <Option key={payment.id_payment}>{payment.name}</Option>
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
  seguro: state.seguro,
  otrosCargos: state.otrosCargos,
  seguro_status: state.seguro_status,
  otroscargos_status: state.otroscargos_status,
  metodo_pago: state.metodo_pago
});
const mapDispatchToProps = dispatch => ({
  setOtrosCargos(value) {
    dispatch({
      type: 'SET_OTROS_CARGOS',
      otrosCargos: value
    });
  },
  setOtrosCargosState(value) {
    dispatch({
      type: 'SET_OTROS_CARGOS_STATUS',
      otroscargos_status: value
    });
  },
  setSeguro(value) {
    dispatch({
      type: 'SET_SEGURO_STATUS',
      seguro_status: value
    });
  },
  setMetodoDePago(value) {
    dispatch({
      type: 'SET_METODO_PAGO',
      metodo_pago: value[0]
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Optionals);
