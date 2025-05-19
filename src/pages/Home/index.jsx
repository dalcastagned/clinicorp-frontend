import { Button, useColorScheme } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { CiCirclePlus } from 'react-icons/ci'
import { api } from '../../api'
import AddTaskModal from './AddTaskModal'
import Content from './Content'
import Header from './Header'
import * as S from './styles'

const MAIN_HEADER_ID = 'task-list-main-title'
const ADD_TASK_MODAL_ID = 'add-task-modal-dialog'

const Home = () => {
  const { mode } = useColorScheme()
  const [data, setData] = useState({
    list: [],
    todo: 0,
    doing: 0,
    done: 0,
    loading: true,
  })
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false)

  const addTaskButtonRef = useRef(null)

  const handleGetData = async () => {
    setData(prevData => ({ ...prevData, loading: true }))
    try {
      const response = await api.get('get-tasks')
      const responseData = response.data || []
      const todo = responseData.filter(item => item.status === 'todo').length
      const doing = responseData.filter(item => item.status === 'doing').length
      const done = responseData.filter(item => item.status === 'done').length

      setData({
        list: responseData,
        todo,
        doing,
        done,
        loading: false,
      })
    } catch {
      toast.error('Erro ao buscar tarefas')
      setData(prevData => ({ ...prevData, list: [], todo: 0, doing: 0, done: 0, loading: false }))
    }
  }

  const handleAddTask = async values => {
    try {
      await api.post('insert-tasks', values)
      toast.success('Tarefa(s) adicionada(s) com sucesso')
      handleGetData()
      return Promise.resolve()
    } catch (error) {
      toast.error('Erro ao adicionar tarefa(s)')
      return Promise.reject(error)
    }
  }

  useEffect(() => {
    handleGetData()
  }, [])

  const handleOpenModal = () => {
    setOpenAddTaskModal(true)
  }

  const handleCloseModal = () => {
    setOpenAddTaskModal(false)
  }

  return (
    <S.Container component='main' mode={mode} aria-labelledby={MAIN_HEADER_ID}>
      <Header todo={data.todo} doing={data.doing} done={data.done} />
      <Button
        ref={addTaskButtonRef}
        variant='outlined'
        size='large'
        startIcon={<CiCirclePlus aria-hidden='true' />}
        sx={{ width: '50%' }}
        onClick={handleOpenModal}
        aria-controls={ADD_TASK_MODAL_ID}
        aria-haspopup='dialog'
        aria-expanded={openAddTaskModal}
      >
        Adicionar tarefas
      </Button>
      <Content data={data.list} loading={data.loading} />
      {openAddTaskModal && (
        <AddTaskModal
          id={ADD_TASK_MODAL_ID}
          open={openAddTaskModal}
          handleClose={handleCloseModal}
          handleSubmit={handleAddTask}
        />
      )}
    </S.Container>
  )
}

export default Home
