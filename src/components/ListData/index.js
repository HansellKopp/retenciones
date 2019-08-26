import React, { Fragment } from 'react'
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TablePagination,
  Paper,
  Button,
  Snackbar
} from 'react-md'
import Spinner from '../Spinner'
import FilterBar from '../FilterBar'
import uuid from 'uuid/v1'
import useReactRouter from 'use-react-router'

function ListData (props) {
  const { history } = useReactRouter()

  const eventHandler = {
    handlePagination: (skip, limit) => {
      const page = skip === 0 ? 1 : (skip / limit) + 1
      props.setMeta({ ...props.meta, skip, limit, page })
    },
    handleNewItem: () => {
      history.push(`${props.url}/new`)
    },
    handleGetItem: id => {
      history.push(`${props.url}/${id}`)
    },
    handleSort: column => {
      if (column === props.meta.sortBy) {
        props.meta.ascending = !props.meta.ascending
      } else {
        props.meta.ascending = false
      }
      props.meta.sortBy = column
      props.setMeta({ ...props.meta })
    },
    handleFilter: q => {
      props.setMeta({ ...props.meta, q })
    }
  }

  props = { ...props, ...eventHandler }

  return (
    <Presenter {...props} />
  )
}

const Presenter = props =>
  <section className='md-grid md-grid--40-16'>
    <div className='md-cell md-cell--12'>
      <Paper
        key='1'
        zDepth={1}
        raiseOnHover={false}
        className='mainpaper md-background--card'
      >
        <div className='buttons-container' >
          <h2>{props.title}</h2>
          {props.canCreate &&
            <Button floating primary onClick={props.handleNewItem} tooltipLabel={props.addNew}>add</Button>
          }
        </div>

        <FilterBar listName='supplier' filter={props.handleFilter} />
        { props.loading
          ? <Spinner {...props} />
          : <ListItems {...props} />
        }
      </Paper>
      <Snackbar id='application-toasts' toasts={props.toasts} onDismiss={props.handleDismiss} />
    </div>
  </section>

const ListItems = props => {
  return (
    <div className='md-grid'>
      <DataTable baseId='suppliersTable' className='md-cell md-cell--12'>
        <TableHeader>
          <TableRow selectable={false}>
            {props.fields.map(field =>
              <TableColumn key={field.key}
                role='button'
                onClick={() => props.handleSort(field.key)}
                sorted={props.meta.sortBy === field.key ? props.meta.ascending : null}
                className={field.class}
              >{field.title}
              </TableColumn>)}
            <TableColumn />
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.data.map(item =>
            <TableRow key={uuid()} selectable={false} onClick={() => props.handleGetItem(item.id)}>
              <Fragment>
                {props.fields.map(field =>
                  <TableColumn key={uuid()}
                    className={field.class} style={field.style}
                  >
                    {item[field.key]}
                  </TableColumn>)}
                <TableColumn adjusted={false}><Button icon >chevron_right</Button></TableColumn>
              </Fragment>
            </TableRow>
          )}
        </TableBody>
        <TablePagination
          page={props.meta.page}
          rows={props.total || 0}
          rowsPerPage={parseInt(props.meta.limit)}
          rowsPerPageLabel={'items'}
          onPagination={props.handlePagination}
        />
      </DataTable>
    </div>
  )
}

export default ListData
