import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [inputValue, setInputValue] = useState('');
	const [task, setTask] = useState([]);

	/// nueva parte de 
	
	useEffect(()=>{
		crearUsuario()
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
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		};
		try{
			const resp = await fetch('https://playground.4geeks.com/todo/users/edvin', options)
			if(!resp.ok) {
				throw new Error('error', Error)
			}
				const data = resp.json();
				console.log(data);
				setTask(data.todos);
				console.log(setTask);
			}catch (error){
				console.error('error bringing the username', error)
			}
	}

	const manejarUpdate = async() => {
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify()
		};
		try{
			const resp = await fetch('https://playground.4geeks.com/todo/todos/195', options)
			if(!resp.ok) {
				throw new Error('error', Error)
			}
			const data = resp.json();
			console.log(data);
		}catch (error){
			console.error('error updating');
			
		}
	}

	const eliminarTarea = async () => {
		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try{
			const resp = await fetch('https://playground.4geeks.com/todo/users/edvin', options)
			if(!resp.ok) {
				throw new Error('error deleting', Error)
			}
		}catch (error) {
			console.error('error deleting');
		}
	}

	useEffect(()=> {
		recibirTarea();
	})

 /// hasta aqui 
	const handleChange = (e) => {
		console.log("valor actual:", e.target.value);
		setInputValue(e.target.value);
	}

	const addTask = (tasks) => {
		console.log("Tareas recibidas: ", tasks);
		
		if (tasks.trim() !== "") {
			setTask([...task, tasks]);
			console.log("lista de tareas", [...task, tasks]);
			
			setInputValue("")
		}

	}

		const deleteTask = (indexToDelete) => {
			setTask(task.filter((_, index) => index !== indexToDelete));
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
			{task.map((tasks, index) => (
				<li className="list-group-item d-flex justify-content-between align-items-center" key={index}>{tasks.label}<button className="btn btn-light" onClick={() => deleteTask(index)}>x</button></li>
			) )}
		</ul>

		<p className="mt-3">
					{task.length} {task.length === 1 ? "task" : "tasks"} in the list
				</p> 

		</div>
	</div>
);
};

export default Home;

