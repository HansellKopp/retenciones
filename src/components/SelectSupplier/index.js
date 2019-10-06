import React, { useState } from 'react'
import Presenter from './presenter'
import useReactRouter from 'use-react-router'
import { DbService } from '../../service/dbService'

const service = new DbService('Suppliers')
const defaultMeta =  { current_page: 1, skip: 0, limit: 5, sortBy: 'name', ascending: true }

const Container = props => {
    let timeout = null
    const [items, setItems] = useState([])
    const { history } = useReactRouter()

    const handlers = {
        handleAddCompany: () => history.push(`/suppliers/new`),
        handleSearch: q => {
            props.onChange(q)
            if (!q) return
            const meta = { q, ...defaultMeta, 
                where : {
                    rif: { like: `%${q}%` },
                    or: {
                      name: { like: `%${q}%` }
                    }
                }
            }
            if (timeout) window.clearTimeout(timeout)
            timeout = window.setTimeout(async () => { 
                try {
                    let data = await service.getItems(meta)
                    const items = data.map(({ rif, name }) => ({
                        primaryText: rif,
                        secondaryText: name,
                    }))
                    setItems(items)
                } catch (ex) {
                    console.error(ex)
                }
            }, 500)
        },
        handleAutocomplete: (value, index, matches) => {
            const rif = matches[index].primaryText;
            const name = matches[index].secondaryText;
            props.onAutocomplete(name, rif)
        }
    }
    const parameters = { ...props, items, ...handlers }
    return (<Presenter {...parameters} />)
}

export default Container
