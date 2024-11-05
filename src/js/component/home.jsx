import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [inputValue, setInputValue] = useState('');
	const [task, setTask] = useState([]);


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
		<h2 className="text">To Do List with React</h2>
		
		<div className="container mt-3">

		<form>
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
		</form>
	
		<ul className="list-group">
			{task.map((tasks, index) => (
				<li className="list-group-item d-flex justify-content-between align-items-center" key={index}>{tasks}<button className="btn btn-light" onClick={() => deleteTask(index)}>x</button></li>
			) )}
		</ul>

		</div>
	</div>
);
};

export default Home;
