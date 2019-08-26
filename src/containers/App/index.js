import React from 'react'
import uuid from 'uuid/v1'
import { Route, Switch } from 'react-router-dom'
import { Subheader, Divider, NavigationDrawer, Button } from 'react-md'
import logo from '../../assets/img/logo.png'
import NavLink from '../../components/NavLink'
import { seedSupplier } from '../../model/supplier'
import Supplier from '../../containers/Supplier'
import SupplierList from '../../containers/SupplierList'

const Home = () => <div>Home</div>
const Document = () => <div>Document</div>
const DocumentList = () => <div>DocumentList</div>
const User = () => <div>User</div>
const UserList = () => <div>UserList</div>
const Role = () => <div>Role</div>
const RoleList = () => <div>RoleList</div>

const navItems = [
  { key: 'suppliers', permission: 'suppliers_read', label: 'Proveedores', to: '/suppliers/', icon: 'face' },
  { key: 'documents', permission: 'documents_read', label: 'Retenciones', to: '/documents/', icon: 'date_range' },
  { key: 'user', permission: 'user_update', label: 'Usuarios', to: '/admin/users', icon: 'face' },
  { key: 'role', permission: 'role_update', label: 'Roles', to: '/admin/roles', icon: 'security' }
]

const createMenuItems = (props) => {
  if (props.label) return (<NavLink exact label={props.label} to={props.to} icon={props.icon} key={uuid()} />)
  if (props.divider) return (<Divider key={uuid()} />)
  if (props.subheader) return (<Subheader key={uuid()} primaryText={props.primaryText} />)
  return props
}

const App = props =>
  <Route
    render={({ location }) =>
      <NavigationDrawer
        drawerTitle={<a href='/' onClick={props.performLogoLink} className='logo'><img src={logo} alt='Logo' /></a>}
        toolbarTitle={'Retenciones'}
        navItems={navItems.map((props, index) => createMenuItems(props, index))}
        toolbarActions={[<Button mini floating secondary iconChildren={'cloud_download'} key='user-avatar' onClick={() => { seedSupplier() } } />]}
      >
        <Switch key={uuid()}>
          <Route path='/suppliers/:id' location={location} component={Supplier} />
          <Route path='/suppliers' location={location} component={SupplierList} />
          <Route path='/documents/:id' location={location} component={Document} />
          <Route path='/documents' location={location} component={DocumentList} />
          <Route path='/admin/users/:id' location={location} component={User} />
          <Route path='/admin/users' location={location} component={UserList} />
          <Route path='/admin/roles/:id' location={location} component={Role} />
          <Route path='/admin/roles' location={location} component={RoleList} />
          <Route path='/' location={location} component={Home} />
        </Switch>
      </NavigationDrawer>
    }
  />

export default App
