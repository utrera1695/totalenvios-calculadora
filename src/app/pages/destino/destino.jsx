import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import './destino.css';
const { Option } = Select;
class Destino extends Component {
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
        <div
          className='card'
          style={{ backgroundColor: '#004e69', color: 'white' }}
        >
          <div className='card-body'>
            <div className='form-group select_destino'>
              <label htmlFor='input_origen'>Origen</label>
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
            <div className='form-group select_destino'>
              <label htmlFor='input_origen'>Destino</label>
              <Select
                showSearch
                size='large'
                bordered={false}
                style={{ width: '100%', marginBottom: '1rem' }}
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
              <Select
                showSearch
                size='large'
                bordered={false}
                style={{ width: '100%', marginBottom: '1rem' }}
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
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Destino);
