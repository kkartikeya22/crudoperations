import React, { useState, useEffect } from 'react'
import api from '../api'

const Crud = () => {
    const [items, setItems] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    //read
    const fetchItems = async () => {
        const response = await api.get('/api/items')
        setItems(response.data)
    }

    useEffect(() => {
        fetchItems();
    }, [])

    //create
    const createItem = async () => {
        await api.post('/api/items', { name, description }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        fetchItems()
    }
    //update
    const updateItem = async(id) =>{
        await api.put(`/api/items/${id}`,{name,description},{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        fetchItems()
    }

    //delete
    const deleteItem = async(id) =>{
        await api.delete(`api/items/${id}`,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        fetchItems();
    }

    return (
        <div>
            <h2>CRUD operations</h2>
            <input type="text" name={name} value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" name={description} value={description} onChange={(e) => setDescription(e.target.value)} />
            <button onClick={createItem}>Create</button>
            <ul>
                {items.map(item=>(
                    <li key={item._id}>
                        {item.name}-{item.description}
                        <button onClick={()=>updateItem(item._id)}>Update</button>
                        <button onClick={()=>deleteItem(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Crud
