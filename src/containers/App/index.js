import React, { useEffect } from 'react'
import { useStateValue } from '../../state'
import uuid from 'uuid/v1'
import { Route, Switch } from 'react-router-dom'
import { Subheader, Divider, NavigationDrawer, Button } from 'react-md'
import { DbService } from '../../service/dbService'
import logo from '../../assets/img/logo.png'
import NavLink from '../../components/NavLink'
import { seedSupplier } from '../../model/supplier'
import Parameter from '../../containers/Parameter'
import Supplier from '../../containers/Supplier'
import SupplierList from '../../containers/SupplierList'
import Withholding from '../../containers/Withholding'
import WithholdingList from '../../containers/WithholdingList'
import { unregister } from '../../registerServiceWorker'

const service = new DbService('Parameters')

const Home = () => <div>Home</div>

const navItems = [
  { key: 'suppliers', permission: 'suppliers_read', label: 'Proveedores', to: '/suppliers/', icon: 'face' },
  { key: 'withholdings', permission: 'withholdings_read', label: 'Retenciones', to: '/withholdings/', icon: 'date_range' },
  { divider: true },
  { key: 'parameters', permission: 'parameters_read', label: 'Parametros', to: '/admin/parameters/1', icon: 'settings_applications' }
]

const createMenuItems = (props) => {
  if (props.label) return (<NavLink exact label={props.label} to={props.to} icon={props.icon} key={uuid()} />)
  if (props.divider) return (<Divider key={uuid()} />)
  if (props.subheader) return (<Subheader key={uuid()} primaryText={props.primaryText} />)
  return props
}

const toolbarActions = () => {
  if(navigator.onLine) {
    return ([
      <Button mini floating secondary iconChildren={'refresh'} tooltipLabel={'update'}  onClick={() => { 
        unregister()
        document.location.reload()
      } 
      } />,
      <Button mini floating secondary iconChildren={'cloud_download'} tooltipLabel={'load db'} onClick={() => { seedSupplier() } } />,
    ])
  }
  return null
}

const App = props => {
  const [{ parameters }, dispatch] = useStateValue();
  console.log(parameters)
  useEffect(() => {
    async function fetchData () {
      try {
        if(parameters.loading) {
          const data = await service.getItemById(1)
          dispatch({
            type: 'updateParameters',
            parameters: { ...data, loading: false }
          })
        }
      } catch (ex) {
        console.error(ex)
      }
    }
    fetchData()
  }, [parameters.loading, dispatch])

    return (
      <Route
        render={({ location }) =>
          <NavigationDrawer
            drawerTitle={<a href='/' onClick={props.performLogoLink} className='logo'><img src={logo} alt='Logo' /></a>}
            toolbarTitle={`${parameters.name} - Retenciones`}
            navItems={navItems.map((props, index) => createMenuItems(props, index))}
            toolbarActions={toolbarActions}
          >
            <Switch key={uuid()}>
              <Route path='/suppliers/:id' location={location} component={Supplier} />
              <Route path='/suppliers' location={location} component={SupplierList} />
              <Route path='/withholdings/:id' location={location} component={Withholding} />
              <Route path='/withholdings' location={location} component={WithholdingList} />
              <Route path='/admin/parameters/:id' location={location} component={Parameter} />
              <Route path='/' location={location} component={Home} />
            </Switch>
          </NavigationDrawer>
        }
      />
    )
  }

export default App
