import { useColorScheme } from '@mui/material'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { api } from '../../api'
import Content from './Content'
import Header from './Header'
import * as S from './styles'

const Home = () => {
  const { mode } = useColorScheme()
  const [data, setData] = useState({
    list: [],
    todo: 0,
    doing: 0,
    done: 0,
    loading: true,
  })

  const handleGetData = async () => {
    setData({ ...data, loading: true })
    try {
      const response = await api.get('get-tasks')
      const respnseData = response.data
      const todo = respnseData.filter(item => item.status === 'todo').length
      const doing = respnseData.filter(item => item.status === 'doing').length
      const done = respnseData.filter(item => item.status === 'done').length

      setData({
        list: respnseData,
        todo,
        doing,
        done,
        loading: false,
      })
    } catch {
      toast.error('Erro ao buscar tarefas')
      setData({ ...data, loading: false })
    }
  }

  useEffect(() => {
    handleGetData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <S.Container mode={mode}>
      <Header todo={data.todo} doing={data.doing} done={data.done} />
      <Content data={data.list} loading={data.loading} />
    </S.Container>
  )
}

export default Home
