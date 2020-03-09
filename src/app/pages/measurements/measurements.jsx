import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Switch, Input, Button } from 'antd';
const { Option } = Select;

class Measurements extends Component {
  onChange(value) {
    console.log(`selected ${value}`);
  }

  onBlur() {
    console.log('blur');
  }

  onFocus() {
    console.log('focus');
  }

  onSearch(val) {
    console.log('search:', val);
  }
  render() {
    return (
      <>
        <div className='card'>
          <div className='card-body'>
            <Switch checkedChildren='Decimal' unCheckedChildren='Ingles' />
            <br />
            <div className='form-group'>
              <label htmlFor='input_origen'>Lista de articulos</label>
              <Select
                showSearch
                size='large'
                style={{ width: '100%' }}
                placeholder='Busca un articulo pre definido'
                optionFilterProp='children'
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onSearch={this.onSearch}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value='jack'>Jack</Option>
                <Option value='lucy'>Lucy</Option>
                <Option value='tom'>Tom</Option>
              </Select>
            </div>
            <div className='form-group'>
              <label htmlFor='input_origen'>Dimensiones</label>
              <div className='row'>
                <div className='col-6 col-sm-4'>
                  <Input
                    placeholder='ANCHO'
                    suffix='cm'
                    style={{ width: '100%', marginBottom: '1rem' }}
                  />
                </div>
                <div className='col-6 col-sm-4'>
                  <Input
                    placeholder='ALTO'
                    suffix='cm'
                    style={{ width: '100%', marginBottom: '1rem' }}
                  />
                </div>
                <div className='col-6 col-sm-4'>
                  <Input
                    placeholder='LARGO'
                    suffix='cm'
                    style={{ width: '100%', marginBottom: '1rem' }}
                  />
                </div>
                <div className='col-6'>
                  <Input
                    placeholder='PESO'
                    suffix='kg'
                    style={{ width: '100%', marginBottom: '1rem' }}
                  />
                </div>
              </div>
            </div>
            <Button type='primary' block size='large'>
              Siguiente
            </Button>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Measurements);
