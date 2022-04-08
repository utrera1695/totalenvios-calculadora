import React, { Component } from 'react';
import { connect } from 'react-redux';
import Provider from '../../providers/services';
import './priceresult.css';
import { Button } from 'antd';

import * as fileDownload from 'js-file-download';
class PriceResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      totalmonto: 0,
      subtotal: 0,
      pesovolumetrico: 0,
      piescubicos: 0,
      ismin: false,
      totalnormal: 0,
    };
  }
  componentDidMount() {
    console.log(this.props);
    this.calcularcosto();
  }
  componentDidUpdate() {
    console.log(this.props);
  }
  calcularPesoVolumetrico(ancho, alto, largo, sistema) {
    if (!sistema) {
      /* ingles */
      console.log('Peso volumetrico',ancho * alto * largo);
      return (ancho * alto * largo) / 166;
    } else {
      /* decimal */
      console.log('Peso volumetrico', (ancho / 2.54) * (alto / 2.54) * (largo / 2.54));
      return ((ancho / 2.54) * (alto / 2.54) * (largo / 2.54)) / 166;
    }
  }
  calcularPiesCubicos(ancho, alto, largo, sistema) {
    if (!sistema) {
      /* ingles pie3*/
      console.log('Pies cubicos',ancho * alto * largo);
      return (ancho * alto * largo) / 1728;
    } else {
      /* decimal */
      console.log('Pies cubicos',(ancho / 2.54) * (alto / 2.54) * (largo / 2.54));
      return ((ancho / 2.54) * (alto / 2.54) * (largo / 2.54)) / 1728;
    }
  }
  getTarifa(ciudad, tipoenvio, origen) {
    if (tipoenvio === 1) {
      return origen === '1' ? ciudad.tarifaAir1 : ciudad.tarifaAir2;
    } else {
      return origen === '1' ? ciudad.tarifaOcean1 : ciudad.tarifaOcean2;
    }
  }
  getMinTarifa(ciudad, tipoenvio) {
    if (tipoenvio === 1) {
      /* AEREO */
      let min = this.props.min.filter((a) => a.type === 1);
      return ciudad.nombreRegion === 'Centro'
        ? min[0].tarifamin1
        : min[0].tarifamin2;
    } else {
      /* MARITIMO */
      let min = this.props.min.filter((a) => a.type === 2);
      return ciudad.nombreRegion === 'Centro'
        ? min[0].tarifamin1
        : min[0].tarifamin2;
    }
  }
  getIsMin(sistema, tipoenvio, medida) {
    if (tipoenvio === 1) {
      /* AEREO */
      let min = this.props.min.filter((a) => a.type === 1);
      return medida <= min[0].lbmin;
    } else {
      /* MARITIMO */
      let min = this.props.min.filter((a) => a.type === 2);
      return medida <= min[0].lbmin;
    }
  }
  pesoInLb(sistema, peso) {
    if (sistema) {
      return peso * 2.205;
    }
    return peso;
  }
  calcularcosto() {
    var total = 0;
    var tarifa = this.getTarifa(
      this.props.ciudadSelect,
      this.props.tipoenvio,
      this.props.origen
    );
    console.log('Tarifa',tarifa)
    console.log('Tipo de envio',this.props.tipoenvio)
    var subtotal = 0;
    var totalmonto = 0;
    const pesoLb = this.pesoInLb(this.props.sistema, this.props.peso)
    console.log('pesoLb', pesoLb)
    /* si el envio es aereo */
    if (this.props.tipoenvio === 1) {
      /* se calcula el peso volumetrico */
      let pesoVolumetrico = this.calcularPesoVolumetrico(
        parseFloat(this.props.ancho),
        parseFloat(this.props.alto),
        parseFloat(this.props.largo),
        this.props.sistema
      );
      /* se calcula el total normal */
      let totalnormal =
        pesoVolumetrico > parseFloat(pesoLb)
          ? Math.round(pesoVolumetrico.toFixed(2)) * tarifa
          : Math.round(parseFloat(pesoLb).toFixed(2)) * tarifa;
      console.log('total normal', totalnormal);
      /* se veifica si se aplica el minimo*/
      let isMin = this.getIsMin(
          this.props.sistema,
          this.props.tipoenvio,
          pesoVolumetrico > parseFloat(pesoLb)
              ? pesoVolumetrico
              : parseFloat(pesoLb)
      )
      console.log('es minimo', isMin )
      /* se saca el total */
      total =
        isMin && this.props.nombrePais === 'Venezuela'
          ? this.getMinTarifa(this.props.ciudadSelect, this.props.tipoenvio)
          :totalnormal;
      console.log('total', total)
      console.log('peso volumetrico', pesoVolumetrico);

      this.setState({
        ismin: isMin && this.props.nombrePais === 'Venezuela',
        totalnormal: totalnormal,
        total: total,
        pesovolumetrico: pesoVolumetrico,
        subtotal:
          total +
          (this.props.seguro_status
            ? ((this.props.precio_producto * this.props.seguro) / 100).toFixed(
                2
              )
            : 0) +
          (this.props.otroscargos_status
            ? parseFloat(this.props.otrosCargos)
            : 0),
      });
      subtotal = this.setSubTotal(
        total,
        this.props.seguro_status
          ? ((this.props.precio_producto * this.props.seguro) / 100).toFixed(2)
          : 0,
        this.props.otroscargos_status ? parseFloat(this.props.otrosCargos) : 0
      );
      totalmonto = this.setTotalMonto(
        total,
        this.props.seguro_status
          ? ((this.props.precio_producto * this.props.seguro) / 100).toFixed(2)
          : 0,
        this.props.otroscargos_status ? parseFloat(this.props.otrosCargos) : 0,
        this.props.metodo_pago.tipo === 0
          ? (subtotal * this.props.metodo_pago.percent) / 100
          : this.props.metodo_pago.percent
      );
      this.setState({ subtotal: subtotal, totalmonto: totalmonto });
    } else {
      /* se calculan los pies cubicos */
      let piescubicos = this.calcularPiesCubicos(
        parseFloat(this.props.ancho),
        parseFloat(this.props.alto),
        parseFloat(this.props.largo),
        this.props.sistema
      );
      /* se saca el total */
      let totalnormal = piescubicos * tarifa;
      /* se verifica si es minimo */
      let isMin = this.getIsMin(this.props.sistema, this.props.tipoenvio, piescubicos)
      total =
        isMin && this.props.nombrePais === 'Venezuela'
          ? this.getMinTarifa(this.props.ciudadSelect, this.props.tipoenvio)
          : totalnormal;
      this.setState({
        ismin: isMin && this.props.nombrePais === 'Venezuela',
        totalnormal: totalnormal,
        total: total,
      });
      /* se calcula el subtotal */
      subtotal = this.setSubTotal(
        total,
        this.props.seguro_status
          ? ((this.props.precio_producto * this.props.seguro) / 100).toFixed(2)
          : 0,
        this.props.otroscargos_status ? parseFloat(this.props.otrosCargos) : 0
      );
      totalmonto = this.setTotalMonto(
        total,
        this.props.seguro_status
          ? ((this.props.precio_producto * this.props.seguro) / 100).toFixed(2)
          : 0,
        this.props.otroscargos_status ? parseFloat(this.props.otrosCargos) : 0,
        this.props.metodo_pago.tipo === 0
          ? (subtotal * this.props.metodo_pago.percent) / 100
          : this.props.metodo_pago.percent
      );
      this.setState({
        subtotal: subtotal,
        totalmonto: totalmonto,
        piescubicos: piescubicos,
      });
    }
  }
  setSubTotal(a, b, c) {
    if (this.props.nombrePais !== 'Colombia') {
      a = parseFloat(a);
      b = parseFloat(b);
      c = parseFloat(c);
      let result = parseFloat(a + b + c).toFixed(2);
      return result;
    } else {
      a = parseFloat(a);
      b = parseFloat(b);
      c = parseFloat(c);
      let d =
        this.props.precio_producto <= this.props.colombiaImpuesto.referencia
          ? (this.props.precio_producto * this.props.colombiaImpuesto.menor) /
            100
          : (this.props.precio_producto * this.props.colombiaImpuesto.mayor) /
            100;
      let result = parseFloat(a + b + c + d).toFixed(2);
      return result;
    }
  }
  setTotalMonto(a, b, c, d) {
    if (this.props.nombrePais === 'Colombia') {
      a = parseFloat(a);
      b = parseFloat(b);
      c = parseFloat(c);
      d = parseFloat(d);
      let e =
        this.props.precio_producto <= this.props.colombiaImpuesto.referencia
          ? (this.props.precio_producto * this.props.colombiaImpuesto.menor) /
            100
          : (this.props.precio_producto * this.props.colombiaImpuesto.mayor) /
            100;
      let result = parseFloat(a + b + c + d + e).toFixed(2);
      return result;
    } else {
      a = parseFloat(a);
      b = parseFloat(b);
      c = parseFloat(c);
      d = parseFloat(d);
      let result = parseFloat(a + b + c + d).toFixed(2);
      return result;
    }
  }
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
  downloadPdf() {
    let data = {
      ismin: this.state.ismin,
      totalnormal: this.state.totalnormal,
      montoflete: this.state.total.toFixed(2),
      valorseguro: this.props.seguro,
      impaouesto: 0,
      seguro: ((this.props.precio_producto * this.props.seguro) / 100).toFixed(
        2
      ),
      otroscargos: this.props.otrosCargos,
      totalmonto: this.state.subtotal,
      metodonombre: this.props.metodo_pago.name,
      metodotipo: this.props.metodo_pago.tipo,
      metodovalor: this.props.metodo_pago.percent,
      metodototal:
        this.props.metodo_pago.tipo === 0
          ? (
              (this.state.subtotal * this.props.metodo_pago.percent) /
              100
            ).toFixed(2)
          : this.props.metodo_pago.percent,
      totalpagar: this.state.totalmonto,
      tiposistema: this.props.sistema,
      ancho: this.props.ancho,
      alto: this.props.alto,
      largo: this.props.largo,
      piescubicos: this.state.piescubicos,
      pesolb: this.props.peso,
      peso:
        this.state.pesovolumetrico > this.props.peso
          ? this.state.pesovolumetrico.toFixed(2)
          : this.props.peso,
      tipopeso:
        this.state.pesovolumetrico > this.props.peso ? 'volumétrico' : '',
      tipoenvio: this.props.tipoenvio,
      pais: this.props.nombrePais,
      estado: this.props.ciudadSelect.nombreEstadosDet,
      ciudad: this.props.ciudadSelect.nombreCiudades_det,
      nombre: this.props.name,
      correo: this.props.email,
      empresa: this.props.empresa,
      tiempoentrega: this.setDiasaEntrega(),
      valorimpuesto:
        this.props.nombrePais === 'Colombia'
          ? this.props.precio_producto <= this.props.colombiaImpuesto.referencia
            ? this.props.colombiaImpuesto.menor
            : this.props.colombiaImpuesto.mayor
          : 0,
      impuesto:
        this.props.nombrePais === 'Colombia'
          ? this.props.precio_producto <= this.props.colombiaImpuesto.referencia
            ? (this.props.precio_producto * this.props.colombiaImpuesto.menor) /
              100
            : (this.props.precio_producto * this.props.colombiaImpuesto.mayor) /
              100
          : 0,
    };
    Provider.DownloadPdf(data).then((res) => {
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const objectUrl = window.URL.createObjectURL(blob);
      window.open(objectUrl);
      fileDownload(blob, 'resumeTotalEnvios.pdf');
    });
  }
  render() {
    return (
      <>
        <div
          className='card result'
          style={{ backgroundColor: '#fc3c3d', color: 'white', height: '100%' }}
        >
          <div className='card-body'>
            <div
              className='card'
              style={{
                backgroundColor: 'white',
                color: 'white',
                boxShadow: 'none',
              }}
            >
              <table className='table'>
                <tbody>
                  {this.state.ismin ? (
                    <>
                      <tr>
                        <td>Monto flete</td>
                        <td>${this.state.totalnormal.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Total a pagar (Por Mínimo)</td>
                        <td>${this.state.total.toFixed(2)}</td>
                      </tr>
                    </>
                  ) : (
                    <tr>
                      <td>Monto flete</td>
                      <td>${this.state.total.toFixed(2)}</td>
                    </tr>
                  )}
                  {this.props.seguro_status ? (
                    <tr>
                      <td>Seguro ({this.props.seguro}%)</td>
                      <td>
                        $
                        {(
                          (this.props.precio_producto * this.props.seguro) /
                          100
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ) : null}
                  {this.props.nombrePais === 'Colombia' ? (
                    <tr>
                      <td>
                        Impuesto (
                        {this.props.precio_producto <=
                        this.props.colombiaImpuesto.referencia
                          ? this.props.colombiaImpuesto.menor
                          : this.props.colombiaImpuesto.mayor}
                        %)
                      </td>
                      <td>
                        $
                        {this.props.precio_producto <=
                        this.props.colombiaImpuesto.referencia
                          ? (this.props.precio_producto *
                              this.props.colombiaImpuesto.menor) /
                            100
                          : (this.props.precio_producto *
                              this.props.colombiaImpuesto.mayor) /
                            100}
                      </td>
                    </tr>
                  ) : null}
                  {this.props.otroscargos_status ? (
                    <tr>
                      <td>Otros cargos</td>
                      <td>${this.props.otrosCargos}</td>
                    </tr>
                  ) : null}
                  <tr className='totalmonto'>
                    <td>Total monto</td>
                    <td>${this.state.subtotal}</td>
                  </tr>
                  <tr className='metodopago'>
                    <td valign='baseline'>
                      <label>Método de pago</label>
                      <p>
                        Comisión {this.props.metodo_pago.name} (
                        {this.props.metodo_pago.tipo === 0
                          ? this.props.metodo_pago.percent + '%'
                          : '$' + this.props.metodo_pago.percent.toFixed(2)}
                        )
                      </p>
                    </td>
                    <td valign='baseline'>
                      $
                      {this.props.metodo_pago.tipo === 0
                        ? (
                            (this.state.subtotal *
                              this.props.metodo_pago.percent) /
                            100
                          ).toFixed(2)
                        : this.props.metodo_pago.percent}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='card-body'>
                <div className='totalpay'>
                  <label>Total a pagar</label>
                  <h3>${this.state.totalmonto}</h3>
                  <p>
                    Caja de{' '}
                    <b>
                      {this.props.sistema
                        ? this.props.ancho +
                          'cm x ' +
                          this.props.alto +
                          'cm x ' +
                          this.props.largo +
                          'cm'
                        : this.props.ancho +
                          'in x ' +
                          this.props.alto +
                          'in x ' +
                          this.props.largo +
                          'in'}
                    </b>
                    <b>
                      {this.props.sistema
                          ? ' y un peso de ' + this.props.peso + 'kg'
                          : ' y un peso de ' + this.props.peso + 'lb'
                      }</b>
                    {this.props.tipoenvio === 1
                      ? ', con un peso volumétrico de ' +
                        (Math.round(this.props.sistema ? (this.state.pesovolumetrico/2.205).toFixed(2):this.state.pesovolumetrico.toFixed(2))) +
                        (this.props.sistema ? 'kg' : 'lb')
                      : ', de ' +
                        this.state.piescubicos.toFixed(2) +
                        ' pies cúbicos'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Button
            className='shared'
            type='primary'
            block
            size='large'
            onClick={() => this.downloadPdf(this)}
          >
            <i className='fas fa-share-alt'></i> COMPARTIR
          </Button>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  ciudadSelect: state.ciudadSelect,
  ancho: state.ancho,
  alto: state.alto,
  largo: state.largo,
  peso: state.peso,
  seguro: state.seguro,
  otrosCargos: state.otrosCargos,
  seguro_status: state.seguro_status,
  tipoenvio: state.tipoenvio,
  origen: state.origen,
  otroscargos_status: state.otroscargos_status,
  sistema: state.sistema,
  metodo_pago: state.metodo_pago,
  nombrePais: state.nombrePais,
  name: state.name,
  email: state.email,
  empresa: state.empresa,
  precio_producto: state.precio_producto,
  colombiaImpuesto: state.colombiaImpuesto,
  min: state.min,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PriceResult);
