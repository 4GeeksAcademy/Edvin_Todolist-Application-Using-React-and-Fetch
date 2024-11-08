import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [inputValue, setInputValue] = useState('');
	const [task, setTask] = useState([]);
	
	/// nueva parte de 
	
	useEffect(()=>{
		recibirTarea();
		crearUsuario();
	},[])

	const crearUsuario = async() => {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify()
		}; 
		try{
			const resp = await fetch('https://playground.4geeks.com/todo/users/edvin', options)
		if(!resp.ok) {
			throw new Error('error: ', Error)
		}
		const data = await resp.json();
		console.log('Usuaro creado', data)
		}catch (error) {
			console.error('error creating the username', error)
		}
	}


	const recibirTarea = async() => {
		
		try{
			const resp = await fetch('https://playground.4geeks.com/todo/users/edvin')
			if(!resp.ok) {
				throw new Error('error', Error)
			}
				const data = await resp.json();
				console.log(data);
				setTask(data.todos);
				console.log(setTask);
			}catch (error){
				console.error('error bringing the username', error)
			}
	}



	const eliminarTarea = async (id) => {
		console.log('id recibido', id);
		
		const actualizarTarea = {label: 'tarea eliminada',
			is_done: true
		}
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(actualizarTarea)
		};
		try{
			const resp = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, options)
			if(!resp.ok) {
				throw new Error('error deleting', Error)
			} 
			recibirTarea();
		}catch (error) {
			console.error('error deleting');
		}
	}

 /// hasta aqui 
	const handleChange = (e) => {
		console.log("valor actual:", e.target.value);
		setInputValue(e.target.value);
	}

	const addTask = (event) => {
		console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', event)
		const newTask = {
			label: event,
			is_done: false
		}
		
		// let addNewTask = [...task, newTask];
		// console.log('listaDeTareasActualicada', addNewTask)

		
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newTask)
			}; 
			
			fetch('https://playground.4geeks.com/todo/todos/edvin', options)
			.then(resp => {
				console.log('respuesta del servidor', resp);	
				return resp.json();			
			}) 
			.then(()=>{
				setInputValue('');
				recibirTarea();
			})
			.catch(error => console.error(error)) 			
			
		}

return(
	<div className="text-center mt-5">
		<h2 className="text">To Do List with React and Fetch</h2>
		
		<div className="container mt-3">

			<input
				className="form-control"
				placeholder="Add new task"
				type="text"
				value={inputValue}
				onChange={handleChange}
				onKeyDown={(e) => {
					if (e.key === "Enter") { addTask(inputValue) }
				} 
			} />

	

		<ul className="list-group">
			{task.filter(el => !el.is_done).map((tasks, id) => (
				<li className="list-group-item d-flex justify-content-between align-items-center" key={id}>{tasks.label}
				<button className="btn btn-light" onClick={() => eliminarTarea(tasks.id)}>x</button></li>
			) )}
		</ul>

		<p className="mt-3">
					{task.filter(el => !el.is_done).length} {task.length === 1 ? "task" : "tasks"} in the list
				</p> 

		</div>
	</div>
);
};

export default Home;

