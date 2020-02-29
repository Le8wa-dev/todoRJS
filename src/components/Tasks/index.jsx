import React from 'react';
import axios from 'axios';

import editSvg from './../../assets/img/edit.svg';

import './Tasks.scss';
import AddTaskForm from './AddTaskForm';
import Task from './Task';

const Tasks = ({ list, onEditTitle, onAddTask, withoutEmpty, onRemoveTask, onEditTask, onCompleteTask }) => {

	const editTitle = () => {
		const newTitle = window.prompt('Название списка', list.name);
		if (newTitle) {
			onEditTitle(list.id, newTitle);
			axios.patch('http://localhost:3001/lists/' + list.id, {
				name: newTitle
			})
				.catch(() => {
					alert('Не удалось обновить название списка');
				});
		}
	}

	return (
		<div className="tasks">
			<h2 className="tasks__title" style={{ color: list.color.hex }}>
				{list.name}
				<img onClick={editTitle} src={editSvg} alt="edit-icon" />
			</h2>

			<div className="tasks__items">

				{!withoutEmpty && list.tasks && !list.tasks.length && <h3>Задачи отсутствуют</h3>}

				{list.tasks &&
					list.tasks.map(task => (
						<Task key={task.id}
							list={list}
							{...task}
							onRemove={onRemoveTask}
							onEdit={onEditTask}
							onComplete={onCompleteTask} />
					))
				}

				<AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
			</div>
		</div>
	)
}

export default Tasks;
