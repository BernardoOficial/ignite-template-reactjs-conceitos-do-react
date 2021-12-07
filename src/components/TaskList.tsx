import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { FiTrash, FiCheckSquare } from 'react-icons/fi'

import '../styles/tasklist.scss'

interface Task {
	id: number;
	title: string;
	isComplete: boolean;
}

export function TaskList() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newTaskTitle, setNewTaskTitle] = useState('');

	function handleCreateNewTask() {
		
		if(newTaskTitle.length <= 1) { return };

		let id:number = 0;
		let idCreate = false;

		do {
			id = Math.ceil(Math.random() * 100000);
			const isExist = tasks.find(task => task.id === id);
			if(!isExist) { idCreate = true };
		} while(idCreate === false);
		
		const newTask = { id, title: newTaskTitle, isComplete: false }
		setTasks([...tasks, newTask]);
		setNewTaskTitle('');
		toast.success(`to-do: ${newTask.title.slice(0, 15)}... criado`, {
			position: toast.POSITION.TOP_RIGHT
		});
	}

	function handleToggleTaskCompletion(id: number) {
		
		const newList = tasks.map(task => {
			if(task.id === id) {
				task.isComplete = !task.isComplete

				if(task.isComplete) {
					toast.success(`to-do: ${task.title.slice(0, 15)}... mudou para concluído`, {
						position: toast.POSITION.TOP_RIGHT
					});
				}
				else {
					toast.success(`to-do: ${task.title.slice(0, 15)}... mudou para não concluído`, {
						position: toast.POSITION.TOP_RIGHT
					});
				}
				return task;
			};
			return task;
		});
		setTasks(newList);
	}

	function handleRemoveTask(id: number) {
		const newList = tasks.filter(task => {
			if(task.id !== id) { return task };
			toast.success(`to-do ${task.title.slice(0, 15)}... removido`, {
				position: toast.POSITION.TOP_RIGHT
			});
		});
		setTasks(newList);
	}

	return (
		<section className="task-list container">
			<header>
				<h2>Minhas tasks</h2>

				<div className="input-group">
					<input 
						type="text" 
						placeholder="Adicionar novo todo" 
						onChange={(e) => setNewTaskTitle(e.target.value)}
						value={newTaskTitle}
					/>
					<button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
						<FiCheckSquare size={16} color="#fff"/>
					</button>
				</div>
			</header>

			<main>
				<ul>
					{tasks.map(task => (
						<li key={task.id}>
							<div className={task.isComplete ? 'completed' : ''} data-testid="task" >
								<label className="checkbox-container">
									<input 
										type="checkbox"
										readOnly
										checked={task.isComplete}
										onClick={() => handleToggleTaskCompletion(task.id)}
									/>
									<span className="checkmark"></span>
								</label>
								<p>{task.title}</p>
							</div>

							<button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
								<FiTrash size={16}/>
							</button>
						</li>
					))}
					
				</ul>
			</main>
		</section>
	)
}