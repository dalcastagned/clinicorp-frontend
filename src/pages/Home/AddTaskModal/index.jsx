import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import React from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import * as Yup from 'yup'
import { DefaultModal } from '../../../components/DefaultModal'

import toast from 'react-hot-toast'
import * as S from './styles'

const taskItemSchema = Yup.object().shape({
  description: Yup.string()
    .min(3, 'A descrição deve ter pelo menos 3 caracteres')
    .required('Descrição é obrigatória'),
  responsable: Yup.string()
    .min(2, 'O responsável deve ter pelo menos 2 caracteres')
    .required('Responsável é obrigatório'),
  status: Yup.string().required('Status é obrigatório'),
})

const validationSchema = Yup.object().shape({
  tasks: Yup.array().of(taskItemSchema),
})

const initialTaskValues = {
  description: '',
  responsable: '',
  status: '',
}

const statusOptions = [
  { value: 'todo', label: 'A Fazer' },
  { value: 'doing', label: 'Fazendo' },
  { value: 'done', label: 'Concluída' },
]

const AddTaskModal = ({ id, open, handleClose, handleSubmit: onFormSubmitProp }) => {
  return (
    <Formik
      id={id}
      initialValues={{ tasks: [initialTaskValues] }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await onFormSubmitProp(values.tasks)
          handleClose()
          resetForm()
        } catch {
          toast.error('Erro ao adicionar tarefas')
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleSubmit: formikHandleSubmit,
        resetForm: formikResetForm,
      }) => (
        <DefaultModal
          open={open}
          handleClose={() => {
            formikResetForm()
            handleClose()
          }}
          title='Adicionar tarefas'
          handleSubmit={formikHandleSubmit}
          submitLoading={isSubmitting}
        >
          <Form>
            <FieldArray name='tasks'>
              {({ remove, push }) => (
                <Box>
                  {values.tasks.length > 0 &&
                    values.tasks.map((_, index) => (
                      <S.Card key={index} elevation={2}>
                        <S.FormTitleContainer>
                          <Typography variant='h6' gutterBottom sx={{ mb: 0 }}>
                            Tarefa #{index + 1}
                          </Typography>
                          {values.tasks.length > 1 && (
                            <IconButton
                              color='error'
                              onClick={() => remove(index)}
                              aria-label='Remover Tarefa'
                              disabled={isSubmitting}
                            >
                              <MdDelete />
                            </IconButton>
                          )}
                        </S.FormTitleContainer>
                        <S.FormContainer>
                          <Field name={`tasks.${index}.description`}>
                            {({ field, meta }) => (
                              <TextField
                                {...field}
                                label='Descrição da Tarefa'
                                variant='outlined'
                                fullWidth
                                error={meta.touched && Boolean(meta.error)}
                                helperText={meta.touched && meta.error}
                                disabled={isSubmitting}
                              />
                            )}
                          </Field>
                          <Field name={`tasks.${index}.responsable`}>
                            {({ field, meta }) => (
                              <TextField
                                {...field}
                                label='Responsável'
                                variant='outlined'
                                fullWidth
                                error={meta.touched && Boolean(meta.error)}
                                helperText={meta.touched && meta.error}
                                disabled={isSubmitting}
                              />
                            )}
                          </Field>
                          <FormControl
                            fullWidth
                            variant='outlined'
                            error={
                              touched.tasks?.[index]?.status &&
                              Boolean(errors.tasks?.[index]?.status)
                            }
                            disabled={isSubmitting}
                          >
                            <InputLabel id={`status-label-${index}`}>Status</InputLabel>
                            <Field
                              name={`tasks.${index}.status`}
                              as={Select}
                              labelId={`status-label-${index}`}
                              label='Status'
                            >
                              <MenuItem value=''>
                                <em>Selecione um status</em>
                              </MenuItem>
                              {statusOptions.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Field>
                            <ErrorMessage name={`tasks.${index}.status`}>
                              {msg => (
                                <Typography variant='caption' color='error' sx={{ mt: 0.5 }}>
                                  {msg}
                                </Typography>
                              )}
                            </ErrorMessage>
                          </FormControl>
                        </S.FormContainer>
                      </S.Card>
                    ))}

                  <Button
                    type='button'
                    variant='outlined'
                    startIcon={<CiCirclePlus />}
                    onClick={() => push(initialTaskValues)}
                    disabled={isSubmitting}
                  >
                    Adicionar Nova Tarefa
                  </Button>
                </Box>
              )}
            </FieldArray>
          </Form>
        </DefaultModal>
      )}
    </Formik>
  )
}

export default AddTaskModal
