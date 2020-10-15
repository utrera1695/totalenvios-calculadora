import {
    createStore
} from 'redux'
/* import update from 'react-addons-update' */


const initialState = {
    page: 0,
    sistema: false,
    tipoenvio: 1,
    pais: null,
    nombrePais: '',
    origen: null,
    nombreOrigen: '',
    ciudad: null,
    ciudadSelect: null,
    ancho: null,
    alto: null,
    largo: null,
    peso: null,
    tarifa: null,
    seguro: 0,
    otrosCargos: 0,
    otroscargos_status: false,
    seguro_status: false,
    metodo_pago: null,
    name: '',
    email: '',
    empresa: '',
    precio_producto: 0,
    colombiaImpuesto: null,
    producto: null,
    min: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_PAGE': {
            return ({
                ...state,
                page: action.page >= 0 && action.page <= 3 ? action.page : state.page
            })
        }
        case 'SET_EMAIL': {
            return ({
                ...state,
                email: action.email
            })
        }
        case 'SET_NAME': {
            return ({
                ...state,
                name: action.name
            })
        }
        case 'SET_EMPRESA': {
            return ({
                ...state,
                empresa: action.empresa
            })
        }
        case 'SET_SEGURO': {
            return ({
                ...state,
                seguro: action.seguro,
                colombiaImpuesto: action.colombiaImpuesto
            })
        }
        case 'SET_PRECIO': {
            return ({
                ...state,
                precio_producto: action.precio_producto
            })
        }
        case 'SET_SEGURO_STATUS': {
            return ({
                ...state,
                seguro_status: action.seguro_status
            })
        }
        case 'SET_MIN': {
            return ({
                ...state,
                min: action.min
            })
        }
        case 'SET_OTROS_CARGOS': {
            return ({
                ...state,
                otrosCargos: action.otrosCargos
            })
        }
        case 'SET_OTROS_CARGOS_STATUS': {
            return ({
                ...state,
                otroscargos_status: action.otroscargos_status
            })
        }
        case 'SET_METODO_PAGO': {
            return ({
                ...state,
                metodo_pago: action.metodo_pago
            })
        }
        case 'CHANGE_TIPOENVIO': {
            return ({
                ...state,
                tipoenvio: action.tipoenvio
            })
        }
        case 'CHANGE_SISTEMA': {
            return ({
                ...state,
                sistema: action.sistema,
                ancho: (action.sistema ? state.ancho * 2.54 : state.ancho / 2.54).toFixed(1),
                alto: (action.sistema ? state.alto * 2.54 : state.alto / 2.54).toFixed(1),
                largo: (action.sistema ? state.largo * 2.54 : state.largo / 2.54).toFixed(1),
                peso: (action.sistema ? state.peso / 2.205 : state.peso * 2.205).toFixed(1)
            })
        }
        case 'SELECT_ORIGEN': {
            return ({
                ...state,
                origen: action.origen,
                nombreOrigen: action.nombreOrigen
            })
        }
        case 'SELECT_PAIS': {
            return ({
                ...state,
                pais: action.pais,
                nombrePais: action.nombrePais
            })
        }
        case 'SELECT_CIUDAD': {
            return ({
                ...state,
                ciudad: action.ciudad,
                ciudadSelect: action.ciudadSelect
            })
        }
        case 'SET_BOX': {
            return ({
                ...state,
                ancho: action.ancho,
                alto: action.alto,
                largo: action.largo,
                peso: action.peso,
                producto: action.producto
            })
        }
        default:
            return ({
                ...state
            })
    }
}

export default createStore(reducer)