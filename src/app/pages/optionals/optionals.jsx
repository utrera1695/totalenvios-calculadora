import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Switch, Select, Button } from 'antd';
const { Option } = Select;

class Optionals extends Component {
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
        <div className='card optional'>
          <div className='card-body'>
            <div className='form-group'>
                <label htmlFor='input_origen'>Opcionales</label>
                <div>
                <label className="label_switch">Seguro <Switch /></label>
            </div>
            <div>
                <label className="label_switch">Otros cargos <Switch /></label>
            </div>
            </div>
            
            <div className='form-group'>
              <label htmlFor='input_origen'>Metodo de pago</label>
              <Select
                showSearch
                size='large'
                bordered={false}
                style={{ width: '100%' }}
                placeholder='Select a person'
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

export default connect(mapStateToProps, mapDispatchToProps)(Optionals);
